/**
 * Service worker: precaches app shell (HTML, JS, CSS) so repeat visits load from cache.
 * Built by Workbox InjectManifest during production build; manifest is injected at compile time.
 */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

/* eslint-disable-next-line no-restricted-globals */
precacheAndRoute(self.__WB_MANIFEST || []);
clientsClaim();
