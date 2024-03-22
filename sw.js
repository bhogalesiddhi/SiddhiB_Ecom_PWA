// self.addEventListener('install', function(event) {
//     event.waitUntil(
//       caches.open('offline')
//         .then(function(cache) {
//           return cache.addAll([
//             '/',
//             '/index.html',
//             // Add other essential static assets (CSS, JavaScript, images)
//           ]);
//         })
//     );
//   });
  
//   self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       fetch(event.request)
//         .catch(function() {
//           return caches.match(event.request)
//             .then(function(matching) {
//               return matching || caches.match('offline.html');
//             });
//         })
//     );
//   });
  
// self.addEventListener('fetch', function(event) {
//     const req = event.request;
//     const url = new URL(req.url);

//     if(url.origin === location.origin){
//       event.respondWith(cacheFirst(req));
//     }
//     else{
//       event.respondWith(networkFirst(req));
//     }

//   });

//   async function cacheFirst(req){
//     return await caches.match(req) || fetch(req);
//   }

//   async function networkFirst(req){
//     const cache = await caches.open("dynamic-pwa");
//     try{
//       const res = await fetch(req);
//       cache.put(req,res.clone());
//       return res;
//     }catch(error){
//       const cachedResponse = await cache.match(req);
//       return cachedResponse || await caches.match("./noconnection.json")
//     }
//   }

self.addEventListener('fetch', function(event) {
  const req = event.request;
  const url = new URL(req.url);

  event.respondWith(
    (async function() {
      try {
        if (url.origin === location.origin) {
          const cachedResponse = await cacheFirst(req);
          if (cachedResponse) {
            console.log("Fetch successful (from cache):", req.url);
          } else {
            console.log("Fetch successful (from network):", req.url);
          }
          return cachedResponse;
        } else {
          const response = await networkFirst(req);
          console.log("Fetch successful (from network):", req.url);
          return response;
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        // Handle errors gracefully here, e.g., return a cached response or display an error message
      }
    })()
  );
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(req);
    caches.open("dynamic-pwa").then((cache) => cache.put(req, response.clone()));
    // Log after caching to accurately reflect success
    console.log("Fetch successful (from network, cached):", req.url);
    return response;
  } catch (error) {
    console.error("CacheFirst fetch failed:", req.url, error);
    throw error; // Re-throw to allow handling in the main fetch event listener
  }
}

async function networkFirst(req) {
  try {
    const cache = await caches.open("dynamic-pwa");
    const response = await fetch(req);
    cache.put(req, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(req);
    if (cachedResponse) {
      console.log("Fetch successful (from cache):", req.url);
      return cachedResponse;
    }

    console.error("NetworkFirst fetch failed, no cached response:", req.url, error);
    throw error; // Re-throw to allow handling in the main fetch event listener
  }
}


self.addEventListener('sync',event => {
  if(event.tag == 'helloSync'){
    console.log("helloSync [sw.js]");
  }
});
  
// Push notification event listener
self.addEventListener('push', event => {
  if (event && event.data) {
    var data = event.data.json();
    if (data.method === "pushMessage") {
      if ('showNotification' in self.registration) {
        event.waitUntil(self.registration.showNotification("Siddhi is Testing", {
          body: data.message
        }));
      } else {
        // Handle browsers that don't support `showNotification`
      }
    }
  }
});