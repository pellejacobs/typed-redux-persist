import { Store, StoreEnhancer, Reducer } from 'redux'

interface CreateTransformConfig {
  whitelist?: string[]
  blacklist?: string[]
}

interface PersistStoreConfig<S> {
  blacklist?: string[]
  whitelist?: string[]
  /**
   * a storage object is an object that implements setItem, getItem, removeItem and getAllKeys 
   */
  storage?: any
  transforms?: ReduxPersist.Transform<S>[]
  /**
   * Debounce interval applied to storage calls.
   */
  debounce?: number
}

declare namespace ReduxPersist {
  interface Transform<S> { 
    in: Reducer<S> 
    out: Reducer<S> 
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

  var storages: {
    asyncLocalStorage: any
    asyncSessionStorage: any
  }

  function createTransform<S>(inbound: Reducer<S>, outbound: Reducer<S>, config?: {}): Transform<S>

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
  function persistStore<S>(store: Store<S>, config?: PersistStoreConfig<S>, callback?: () => any): Persistor
}

export = ReduxPersist
