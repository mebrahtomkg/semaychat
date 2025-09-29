const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported in this browser.');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      window.SERVICE_WORKER_URL,
      { scope: '/' },
    );

    if (registration.installing) {
      console.log('Service worker installing');
    } else if (registration.waiting) {
      console.log('Service worker installed');
    } else if (registration.active) {
      console.log('Service worker active');
    }
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

export default registerServiceWorker;
