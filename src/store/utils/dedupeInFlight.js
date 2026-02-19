/**
 * Deduplicates in-flight async requests by key.
 * If the same key is requested again before the first promise settles, returns the same promise.
 * After the promise settles (resolve or reject), the key is cleared so the next request goes through.
 */
const inFlight = new Map();

export function withDedupe(key, fn) {
  const existing = inFlight.get(key);
  if (existing) return existing;

  const promise = Promise.resolve().then(fn).then(
    (value) => {
      inFlight.delete(key);
      return value;
    },
    (err) => {
      inFlight.delete(key);
      throw err;
    }
  );
  inFlight.set(key, promise);
  return promise;
}
