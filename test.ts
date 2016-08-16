import { createStore, Reducer } from 'redux'
import * as assert from 'assert';

import { persistStore, autoRehydrate, storages, Persistor, createTransform } from 'redux-persist';

assert.equal(typeof persistStore, 'function')
assert.equal(typeof autoRehydrate, 'function')

const theReducer: Reducer<any> = (state: any, action: any) => state

var store = createStore<any>(theReducer, autoRehydrate())
var persistor = persistStore<{}>(store, { storage: storages.asyncSessionStorage })
persistor.purgeAll()

var inbound: Reducer<any> = (inboundState: any, action: any) => inboundState
var outbound: Reducer<any> = (outboundState: any, action: any) => outboundState

let myTransform = createTransform(inbound, outbound, { whitelist: ['specialReducer'] })

persistStore(store, { transforms: [myTransform] })

import * as constants from 'redux-persist/constants'
assert.equal(typeof constants.REHYDRATE, 'string')

