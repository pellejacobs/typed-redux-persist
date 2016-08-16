declare interface Constants {
  keyPrefix: string
  REHYDRATE: string
  REHYDRATE_ERROR: string
}

declare module 'redux-persist/constants' {
  var constants: Constants
  export = constants
}
