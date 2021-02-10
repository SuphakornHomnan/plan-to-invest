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

-- Index router
type UserAPI =
    "money" :> Capture "month" Int :> Capture "year" Int :> Get '[JSON] Money
    :<|> "saving" :> ReqBody '[JSON] SavingInfo :> Post '[JSON] ResponseInfo 
    :<|> "retire" :> ReqBody '[JSON] RetireInfo :> Post '[JSON] ResponseRetire
-- Model Request

data SavingInfo = SavingInfo
  {
    value :: Float,
    multi :: Float
  } deriving Generic
instance FromJSON SavingInfo
instance ToJSON SavingInfo

data RetireInfo = RetireInfo
  {
    nowAge :: Float,
    retireAge :: Float,
    asset :: Float
  } deriving Generic
instance FromJSON RetireInfo
instance ToJSON RetireInfo

data RetireResult = RetireResult
  {
    savingMonth :: Float,
    levelReq :: Float
  } deriving Generic
instance FromJSON RetireResult
instance ToJSON RetireResult

-- Model Response
data Money = Money
  {
    month :: Int,
    year :: Int
  } deriving Generic
instance ToJSON Money

data ResponseInfo = ResponseInfo 
  {
    leverage :: Float,
    oneYear :: Float,
    threeYear :: Float,
    fiveYear :: Float,
    tenYear :: Float,
    thrityYear :: Float
  } deriving Generic
instance ToJSON ResponseInfo

data ResponseRetire = ResponseRetire
  {
    _id :: Int,
    savingMoney :: Float
  } deriving Generic
instance ToJSON ResponseRetire

-- Controller

resultForInvestPlan :: SavingInfo -> ResponseInfo
resultForInvestPlan res = ResponseInfo leverage' oneYear' threeYear' fiveYear' tenYear' thrityYear'

  where 
        ans = foldl (\acc cur -> acc+ (value res)) 0 [1..12]
        leverage' = multi res
        oneYear' = foldl (\acc cur -> ans + acc +((ans+acc)*((multi res)/100)) ) 0 [1]
        threeYear' = foldl (\acc cur -> ans + acc +((ans+acc)*((multi res)/100)) ) 0 [1..3]
        fiveYear' = foldl (\acc cur -> ans + acc +((ans+acc)*((multi res)/100)) ) 0 [1..5]
        tenYear' = foldl (\acc cur -> ans + acc +((ans+acc)*((multi res)/100)) ) 0 [1..10]
        thrityYear' = foldl (\acc cur -> ans + acc +((ans+acc)*((multi res)/100)) ) 0 [1..30]
 
resultForRetirePlan :: RetireInfo -> ResponseRetire
resultForRetirePlan res = ResponseRetire _id' savingMoney'

  where
        _id' = unsafePerformIO $ getStdRandom $ randomR (1,999999999) 
        savingMoney' = (asset res) / ((((retireAge res) - (nowAge res))*12))

-- index controller
router :: Server UserAPI
router = money
    :<|> results
    :<|> retire
  where money :: Int -> Int -> Handler Money
        money month year = return (Money month year)
        
        results :: SavingInfo -> Handler ResponseInfo
        results clientInfo = return (resultForInvestPlan clientInfo)
        retire :: RetireInfo -> Handler ResponseRetire
        retire clientRequest = return (resultForRetirePlan clientRequest)

-- proxy
userAPI :: Proxy UserAPI
userAPI = Proxy

-- run service
app :: Application
app = serve userAPI router

-- run on port
start :: IO ()
start = run 8081 app