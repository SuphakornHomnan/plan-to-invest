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


-- unsafePerformIO $ getStdRandom $ randomR (1,999999999) 

-- Index router
type UserAPI = "api":>"saving" :> ReqBody '[JSON] SavingInfo :> Post '[JSON] ResponseInfo 
          :<|> "api":>"retire" :> ReqBody '[JSON] RetireInfo :> Post '[JSON] ResponseRetireฺ
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
    dieAge :: Float,
    assetPerMonth :: Float
  } deriving Generic
instance FromJSON RetireInfo
instance ToJSON RetireInfo

-- Model Response

data ResponseInfo = ResponseInfo 
  {
    leverage :: Float,
    oneYear :: Float,
    fiveYear :: Float,
    tenYear :: Float,
    fifteenYear :: Float,
    twentyYear :: Float,
    twentyFiveYear :: Float,
    thrityYear :: Float,
    thrityFiveYear :: Float,
    fortyYear :: Float
  } deriving Generic
instance ToJSON ResponseInfo

data ResponseRetireฺ = ResponseRetireฺ
  {
    totalAsset :: Float,
    liveOnAge :: Float
  } deriving Generic
instance ToJSON ResponseRetireฺ


-- Controller

resultForInvestPlan :: SavingInfo -> ResponseInfo
resultForInvestPlan res = ResponseInfo leverage' oneYear' fiveYear' tenYear' fifteenYear' twentyYear' twentyFiveYear' thrityYear' thrityFiveYear' fortyYear'

  where 
        ans = foldl (\acc cur -> acc+ value res) 0 [1..12]
        leverage' = multi res
        oneYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1]
        fiveYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..5]
        tenYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..10]
        fifteenYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..15]
        twentyYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..20]
        twentyFiveYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..25]
        thrityYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..30]
        thrityFiveYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..35]
        fortyYear' = foldl (\acc cur -> ans + acc +((ans+acc)*(leverage'/100)) ) 0 [1..40]


 
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
app = serve userAPI router

-- run on port
start :: IO ()
start = run 8081 app