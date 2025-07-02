/* service-worker.js */

// A name for your cache. This should be incremented every time you update your app's files
// (HTML, CSS, JS, images, videos) to ensure users get the latest version.
const CACHE_NAME = 'studyzen-cache-v12'; // Incrementing to v12 for SVG path correction

// List all the important files your app needs to work.
// Paths are relative to the 'StudyZen_Project_Root' folder, where this service-worker.js file is located.
const urlsToCache = [
    '/', // Represents the very root of your website (e.g., yourdomain.com/)

    // Files directly in the StudyZen_Project_Root folder
    '/home.html', 
    '/home.css', 
    '/home.js',
    '/0522.mp4', 
    '/secret....html',
    '/StudyZen.svg',
    '/icon-192x192.png',
    '/icon-512x512.png',
    
    // Files directly in the 'main/' subfolder (HTML pages)
    '/main/404.html', 
    '/main/access-denied.html', 
    '/main/feedback.html', 
    '/main/home.html',
    '/main/login.html', 
    '/main/notes.html', 
    '/main/privacy.html', 
    '/main/profile.html', 
    '/main/register.html', 
    '/main/terms.html', 
    '/main/timetable.html', 
    '/main/todo.html', 
    '/main/xtras.html', 

    // CSS files inside main/css/
    '/main/css/extras.css', 
    '/main/css/feedback.css', 
    '/main/css/Home.css', 
    '/main/css/loaderS.css',
    '/main/css/LRcss.css', 
    '/main/css/notes.css',
    '/main/css/Profile.css',
    '/main/css/Scss.css', 
    '/main/css/timetable.css',
    '/main/css/todo.css', 

    // Icon files inside main/icons/
    '/main/icons/OL.svg',
    '/main/icons/UL.svg',

    // JavaScript files inside main/js/
    '/main/js/access/checkaccess.js',
    '/main/js/access/getaccess.js', 
    '/main/js/loginregister/Ljs.js',
    '/main/js/loginregister/Rjs.js',
    '/main/js/saverestoreData/restoreNotes.js', 
    '/main/js/saverestoreData/restoreTable.js', 
    '/main/js/saverestoreData/restoreTodo.js', 
    '/main/js/saverestoreData/saveNotes.js', 
    '/main/js/saverestoreData/saveTable.js', 
    '/main/js/saverestoreData/saveTodo.js', 
    '/main/js/home.js', 
    '/main/js/js.js', 
    '/main/js/Loader.js', 
    '/main/js/notes.js',
    '/main/js/profile.js',
    '/main/js/todo.js',
    '/main/js/toggles.js',

    // Main Icons inside main/Main Icons/ (SVG subfolder removed)
    '/main/Main Icons/SVG/Asset 1.svg', 
    '/main/Main Icons/SVG/Asset 2.svg', 
    '/main/Main Icons/About.svg', 
    '/main/Main Icons/Dashboard.svg', 
    '/main/Main Icons/DoubleSideArrow.svg', 
    '/main/Main Icons/Feedback.svg', 
    '/main/Main Icons/Home.svg', 
    '/main/Main Icons/Notes.svg', 
    '/main/Main Icons/Person.svg', 
    '/main/Main Icons/S.svg', 
    '/main/Main Icons/Table.svg', 
    '/main/Main Icons/To-do.svg', 
    '/main/Main Icons/Xtras.svg', 

    // Extras HTML files inside xtras/
    '/main/xtras/accuracygame.html',
    '/main/xtras/calculator.html',
    '/main/xtras/flashcards.html',
    '/main/xtras/sudoko.html', 
    '/main/xtras/typingtest.html',
];

// When the service worker is first installed (like when the user first visits your site)
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME) // Open your cache
            .then((cache) => {
                console.log('Service Worker: Caching all app shell assets');
                // Use Promise.all to log individual failures more clearly
                return Promise.all(
                    urlsToCache.map(url => {
                        return fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    console.warn(`Service Worker: Failed to fetch ${url} (Status: ${response.status})`);
                                    return Promise.reject(new Error(`Failed to fetch ${url}`)); // Reject to fail addAll
                                }
                                return cache.put(url, response);
                            })
                            .catch(error => {
                                console.error(`Service Worker: Error caching ${url}:`, error);
                                return Promise.reject(error); // Re-throw to fail addAll
                            });
                    })
                );
            })
            .catch((error) => {
                console.error('Service Worker: Final caching failed for addAll operation:', error);
            })
    );
});

// When the service worker is activated (like when a new version is ready)
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete old caches that are not the current one
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// When the app tries to fetch something (like a page, image, or script)
self.addEventListener('fetch', (event) => {
    // We only want to cache GET requests (for files, not sending data)
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request) // Try to find the requested file in the cache first
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse; // If found in cache, return it
                }

                // If not in cache, try to fetch from the network
                return fetch(event.request)
                    .then((response) => {
                        // Check if we got a valid response from the network
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response; // If not good, just return the response as is
                        }

                        // IMPORTANT: Clone the response because it's a stream and can only be used once
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME) // Open the cache again
                            .then((cache) => {
                                cache.put(event.request, responseToCache); // Save the new response to the cache
                            });

                        return response; // Return the network response
                    })
                    .catch(() => {
                        // If fetching from the network fails (e.g., no internet)
                        console.log('Service Worker: Network fetch failed for', event.request.url);
                        // Return a cached version if available, or a fallback.
                        // This prevents the "Failed to convert value to 'Response'" error.
                        return caches.match(event.request) // Try to match again in cache (should already be there if install succeeded)
                            .then(responseFromCache => {
                                if (responseFromCache) {
                                    return responseFromCache;
                                }
                                // Fallback for truly uncached items (e.g., if a new file was added but not yet cached)
                                // You could return a custom offline page here:
                                // return caches.match('/offline.html');
                                // Or a generic error response:
                                return new Response('<h1>Offline</h1><p>This content is not available offline.</p>', {
                                    headers: { 'Content-Type': 'text/html' }
                                });
                            });
                    });
            })
    );
});
