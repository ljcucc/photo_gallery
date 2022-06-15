if (enableServiceWorker) {
  // working with service-worker in order to make PWA installation works
  window.addEventListener('load', () => {
    async function registerSW() {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('./service-worker.js');
        } catch (e) {
          console.log('ServiceWorker registration failed. Sorry about that.', e);
        }
      } else {
        console.log('Your browser does not support ServiceWorker.');
      }
    }
    registerSW();
  });
}