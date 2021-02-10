{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
module Paths_api (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/Users/suphakornhomnan/Documents/FPPro/api/.stack-work/install/x86_64-osx/d91f90e2ca05fcb20170872ac58f464bb72dc31775cbdc6faaa422d879889538/8.10.3/bin"
libdir     = "/Users/suphakornhomnan/Documents/FPPro/api/.stack-work/install/x86_64-osx/d91f90e2ca05fcb20170872ac58f464bb72dc31775cbdc6faaa422d879889538/8.10.3/lib/x86_64-osx-ghc-8.10.3/api-0.1.0.0-KGAXZpEMRd7FTHx8bTpIfj-api-exe"
dynlibdir  = "/Users/suphakornhomnan/Documents/FPPro/api/.stack-work/install/x86_64-osx/d91f90e2ca05fcb20170872ac58f464bb72dc31775cbdc6faaa422d879889538/8.10.3/lib/x86_64-osx-ghc-8.10.3"
datadir    = "/Users/suphakornhomnan/Documents/FPPro/api/.stack-work/install/x86_64-osx/d91f90e2ca05fcb20170872ac58f464bb72dc31775cbdc6faaa422d879889538/8.10.3/share/x86_64-osx-ghc-8.10.3/api-0.1.0.0"
libexecdir = "/Users/suphakornhomnan/Documents/FPPro/api/.stack-work/install/x86_64-osx/d91f90e2ca05fcb20170872ac58f464bb72dc31775cbdc6faaa422d879889538/8.10.3/libexec/x86_64-osx-ghc-8.10.3/api-0.1.0.0"
sysconfdir = "/Users/suphakornhomnan/Documents/FPPro/api/.stack-work/install/x86_64-osx/d91f90e2ca05fcb20170872ac58f464bb72dc31775cbdc6faaa422d879889538/8.10.3/etc"

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "api_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "api_libdir") (\_ -> return libdir)
getDynLibDir = catchIO (getEnv "api_dynlibdir") (\_ -> return dynlibdir)
getDataDir = catchIO (getEnv "api_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "api_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "api_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
