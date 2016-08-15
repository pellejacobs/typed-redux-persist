import { Store, StoreEnhancer } from 'redux'

interface PersistStoreConfig {
  blacklist: string[]
  whitelist: string[]
  /**
   * a storage object is an object that implements setItem
   */
  storage: any
}

declare namespace ReduxPersist {
  interface Constants {
    keyPrefix: string
    REHYDRATE: string
    REHYDRATE_ERROR: string
  }

  interface Persistor {
    /**
     * Remove the stored state of certain keys.
     * 
     * @param keys Keys to purge 
     */
    purge: (keys: string[]) => void
    /**
     * Remove the entire stored state
     */
    purgeAll: () => void
    pause: () => void
    resume: () => void
    /**
     * Rehydrate some state into the store
     * 
     * @param incoming State to rehyrdrate into the store
     * @param [options] Has a serial option to define whether the incoming is serialized
     * 
     * @returns the state that got hydrated into the the store
     */
    rehydrate: (incoming: {} | string, options?: { serial: boolean }) => {}
  }

  /**
   * @param [config] Has a log option enable logging to the console
   * 
   * @returns a StoreEnhancer that will automatically shallow merge the persisted state for each key. It additionally 
   *  queues any actions that are dispatched before rehydration is complete, and fires them after rehydration is 
   *  finished. 
   */
  function autoRehydrate<S>(config?: { log: boolean }): StoreEnhancer<S>

  /**
   * Enable automatic persisting of a redux store
   * 
   * @param store Redux store to be persisted
   * @param [config] Object with configuration
   * @param [callback] Function called on completion
   * 
   * @returns Persistor object to manipulate the state further
   */
  function persistStore<S>(store: Store<S>, config?: PersistStoreConfig, callback?: () => any): Persistor
}

export = ReduxPersist

declare module "redux-persist/constants" {
  var constants: ReduxPersist.Constants
  export = constants
}