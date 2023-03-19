function isServiceWorkerWithCachesAvailable() {
  return "serviceWorker" in navigator && caches && import.meta.env.PROD;
}

function register() {
  if (!isServiceWorkerWithCachesAvailable()) {
    return;
  }

  try {
    navigator.serviceWorker.register("/sw.js");
  } catch (error) {
    console.error("ServiceWorker register error: ", error);
  }
}

const unregister = async () => {
  if (!isServiceWorkerWithCachesAvailable()) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    registration.unregister();
  } catch (error) {
    console.error("ServiceWorker unRegister error: ", error);
  }
};

export const serviceWorker = { register, unregister };
