import { persistStore, autoRehydrate } from 'redux-persist';
import { constants } from 'redux-persist/constants'
import * as assert from 'assert';


assert.equal(typeof persistStore, 'function')
assert.equal(typeof autoRehydrate, 'function')

assert.equal(typeof constants.REHYDRATE, 'String')
