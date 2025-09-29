/**
 * Augments the global Worker scope with properties injected by the Rspack plugin
 * (API_URL and IS_PRODUCTION), ensuring type safety within the service worker.
 */
declare global {
  interface WorkerGlobalScope {
    API_URL: string;
    IS_PRODUCTION: boolean;
  }
}

// Makes this file an external module, allowing global scope augmentation.
export {};
