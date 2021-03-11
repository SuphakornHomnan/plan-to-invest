{-# LANGUAGE DataKinds #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TypeOperators #-}

module Server (app, start, userAPI) where

import Control.Monad.Except
import Control.Monad.Reader
import Data.Aeson
-- import Lucid
import qualified Data.Aeson.Parser
import Data.Aeson.Types
import Data.Attoparsec.ByteString
import Data.ByteString (ByteString)
import Data.List
import Data.Maybe
import Data.String.Conversions
import Data.Time.Calendar
import GHC.Generics
import Network.HTTP.Media ((//), (/:))
import Network.Wai
import Network.Wai.Handler.Warp
import Prelude.Compat
import Servant
import Servant.Types.SourceT (source)
import System.Directory
import System.IO.Unsafe
import System.Random
import Text.Blaze
import qualified Text.Blaze.Html
import Text.Blaze.Html.Renderer.Utf8
import Prelude ()
import Network.Wai.Middleware.Cors




-- unsafePerformIO $ getStdRandom $ randomR (1,999999999) 

-- Index router
type UserAPI = "api":>"saving" :> ReqBody '[JSON] SavingInfo :> Post '[JSON] ResponseInfo 
          :<|> "api":>"retire" :> ReqBody '[JSON] RetireInfo :> Post '[JSON] ResponseRetireฺ
-- Model Request

data SavingInfo = SavingInfo
  {
    value :: Float,
    multi :: Float,
    year :: Int
  } deriving Generic
instance FromJSON SavingInfo
instance ToJSON SavingInfo

data RetireInfo = RetireInfo
  {
    nowAge :: Float,
    retireAge :: Float,
    dieAge :: Float,
    assetPerMonth :: Float
  } deriving Generic
instance FromJSON RetireInfo
instance ToJSON RetireInfo

-- Model Response

data ResponseInfo = ResponseInfo 
  {
    leverage :: Float,
    indexYear :: [Int],
    asset :: [Float]
  } deriving Generic
instance ToJSON ResponseInfo

data ResponseRetireฺ = ResponseRetireฺ
  {
    totalAsset :: Float,
    liveOnAge :: Float
  } deriving Generic
instance ToJSON ResponseRetireฺ
-- helper function
calculateAsset :: (Fractional a, Enum a, Num b) => a -> a -> [b] -> a
calculateAsset ans leverage list =  foldl (\acc cur -> ans + acc +((ans+acc)*(leverage/100)) ) 0 list

dynamicYear year
  | year >= 0   && year < 5  = 5
  | year >= 5  && year < 10 = 10
  | year >= 10 && year < 15 = 15
  | year >= 15 && year < 20 = 20
  | year >= 20 && year < 25 = 25
  | year >= 25 && year < 30 = 30
  | year >= 30 && year < 35 = 35
  | year >= 35 && year < 40 = 40
  | year >= 40 && year < 45 = 45
  | year >= 45 && year < 50 = 50
  | year >= 50 && year < 55 = 55
  | year >= 55 && year < 60 = 60
yearList :: (Num a, Enum a) => a -> [a]
yearList amountY = [1..amountY]

yearIndex year 
  | year >= 0   && year < 5  = [1,5]
  | year >= 5  && year < 10 = [1,5,10]
  | year >= 10 && year < 15 = [1,5,10,15]
  | year >= 15 && year < 20 = [1,5,10,15,20]
  | year >= 20 && year < 25 = [1,5,10,15,20,25]
  | year >= 25 && year < 30 = [1,5,10,15,20,25,30]
  | year >= 30 && year < 35 = [1,5,10,15,20,25,30,35]
  | year >= 35 && year < 40 = [1,5,10,15,20,25,30,35,40]
  | year >= 40 && year < 45 = [1,5,10,15,20,25,30,35,40,45]
  | year >= 45 && year < 50 = [1,5,10,15,20,25,30,35,40,45,50]
  | year >= 50 && year < 55 = [1,5,10,15,20,25,30,35,40,45,50,55]
  | year >= 55 && year < 60 = [1,5,10,15,20,25,30,35,40,45,50,55,60]

-- Controller

resultForInvestPlan :: SavingInfo -> ResponseInfo
resultForInvestPlan res = ResponseInfo leverage' year' asset'

  where 
        ans = foldl (\acc cur -> acc+ value res) 0 [1..12]
        leverage' = multi res
        -- helper function
        handleAssetList :: [Int] -> [Float] -> [Float]
        handleAssetList [] [] = []
        handleAssetList [] result = result
        handleAssetList (x:xs) result = [asset] ++ handleAssetList xs [asset]
          where asset = calculateAsset ans leverage' $ yearList x
        year' = yearIndex $ year res
        asset' = handleAssetList year' []
        
resultForRetirePlan :: RetireInfo -> ResponseRetireฺ
resultForRetirePlan res = ResponseRetireฺ totalAsset' liveOnAge'

  where
        totalAsset' = assetPerMonth res*12*(dieAge res - retireAge res)
        liveOnAge' = dieAge res - retireAge res

-- secondResultForRetirePlan :: SecondRetireInfo ->

-- index controller
router :: Server UserAPI
router = results
    :<|> retire
  where 
        results :: SavingInfo -> Handler ResponseInfo
        results clientInfo = return (resultForInvestPlan clientInfo)
        retire :: RetireInfo -> Handler ResponseRetireฺ
        retire clientRequest = return (resultForRetirePlan clientRequest)

-- proxy
userAPI :: Proxy UserAPI
userAPI = Proxy

-- run service
app :: Application
app = cors ( const $ Just (simpleCorsResourcePolicy  { corsRequestHeaders = ["Content-Type"] }) ) (serve userAPI router) 

-- run on port
start :: IO ()
start = run 8081 app