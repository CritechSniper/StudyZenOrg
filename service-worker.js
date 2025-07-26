const CACHE_NAME = 'studyzen-cache-v3';

const urlsToCache = [
    '/',

    '/home.html', 
    '/home.css', 
    '/home.js',
    '/0522.mp4', 
    '/secret....html',
    '/StudyZen.svg',
    '/icon-192x192.png',
    '/icon-512x512.png',
    
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
    '/main/settings.html',
    '/main/chat.html',

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
    '/main/css/settings.css',
     '/mian/css/chat.css',

    '/main/icons/OL.svg',
    '/main/icons/UL.svg',

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
    '/main/js/settings.js',
    '/main/js/chat.js',

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

    '/main/Settings Icons/Settings.svg',
    '/main/Settings Icons/Theme.svg',

    '/main/xtras/accuracygame.html',
    '/main/xtras/calculator.html',
    '/main/xtras/flashcards.html',
    '/main/xtras/sudoko.html', 
    '/main/xtras/typingtest.html',
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching all app shell assets');
                return Promise.all(
                    urlsToCache.map(url => {
                        return fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    console.warn(`Service Worker: Failed to fetch ${url} (Status: ${response.status})`);
                                    return Promise.reject(new Error(`Failed to fetch ${url}`));
                                }
                                return cache.put(url, response);
                            })
                            .catch(error => {
                                console.error(`Service Worker: Error caching ${url}:`, error);
                                return Promise.reject(error);
                            });
                    })
                );
            })
            .catch((error) => {
                console.error('Service Worker: Final caching failed for addAll operation:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        console.log('Service Worker: Network fetch failed for', event.request.url);
                        return caches.match(event.request)
                            .then(responseFromCache => {
                                if (responseFromCache) {
                                    return responseFromCache;
                                }
                                return new Response('<h1>Offline</h1><p>This content is not available offline.</p>', {
                                    headers: { 'Content-Type': 'text/html' }
                                });
                            });
                    });
            })
    );
});
