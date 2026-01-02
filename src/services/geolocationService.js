/**
 * Geolocation service for detecting user location
 * Falls back to IP-based geolocation if browser geolocation is not available
 */

export const detectUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      // Fallback to IP-based geolocation
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => resolve({
          country: data.country_code,
          countryName: data.country_name,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
        }))
        .catch(reject);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        // Fallback to IP-based geolocation
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => resolve({
            country: data.country_code,
            countryName: data.country_name,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
          }))
          .catch(reject);
      },
      {
        timeout: 5000,
        enableHighAccuracy: false,
      }
    );
  });
};

export const getLanguageFromCountry = (countryCode) => {
  const countryLanguageMap = {
    'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en',
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es', 'VE': 'es',
    'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'MC': 'fr',
    'DE': 'de', 'AT': 'de', 'CH': 'de',
    'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
    'IT': 'it', 'PT': 'pt', 'BR': 'pt', 'RU': 'ru', 'JP': 'ja', 'KR': 'ko',
  };
  return countryLanguageMap[countryCode?.toUpperCase()] || 'en';
};

export const getCountryFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    return {
      country: data.countryCode,
      countryName: data.countryName,
      city: data.city,
    };
  } catch (error) {
    console.error('Error getting country from coordinates:', error);
    return null;
  }
};


