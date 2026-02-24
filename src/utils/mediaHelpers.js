/**
 * Shared helpers for featuredImage / featuredVideo / featuredVideoExternal (renderMedia logic).
 * Use wherever section or hero data has featuredImage, featuredVideo, or featuredVideoExternal.
 */

export function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (url.includes('youtube.com/embed/')) return url;
  return null;
}

export function getYouTubeThumbnailUrl(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return null;
}

export function isYouTubeUrl(url) {
  if (!url) return false;
  return /youtube\.com|youtu\.be/.test(url);
}

/**
 * Derive media content from section/hero data (featuredImage, featuredVideo, featuredVideoExternal).
 * @param {object} data - Object with optional featuredImage, featuredVideo, featuredVideoExternal
 * @param {object} opts - { formatImage: (v) => url, formatVideo: (v) => url }
 * @param {string} title - Optional alt/title for media
 * @returns {{ mediaType, mediaUrl, videoUrl, isYouTube, backgroundImage, title }}
 */
export function getMediaContent(data, opts = {}, title = '') {
  if (!data) {
    return { mediaType: 'image', mediaUrl: '', videoUrl: null, isYouTube: false, backgroundImage: '', title };
  }
  const formatImage = opts.formatImage || ((v) => (v ? (typeof v === 'string' ? v : v?.url) : ''));
  const formatVideo = opts.formatVideo || ((v) => (v ? (typeof v === 'string' ? v : v?.url) : ''));

  const externalVideo = data.featuredVideoExternal || '';
  const featuredVideo = formatVideo(data.featuredVideo);
  const featuredImage = formatImage(data.featuredImage);

  let mediaType = 'image';
  let mediaUrl = featuredImage;
  let videoUrl = null;
  let isYouTube = false;

  if (externalVideo) {
    mediaType = 'video';
    videoUrl = externalVideo;
    isYouTube = isYouTubeUrl(externalVideo);
    mediaUrl = isYouTube ? (getYouTubeThumbnailUrl(externalVideo) || featuredImage || '') : (featuredImage || '');
  } else if (featuredVideo) {
    mediaType = 'video';
    videoUrl = featuredVideo;
    mediaUrl = featuredImage || featuredVideo;
  }

  const resolvedTitle = title || data?.heading || data?.title || data?.name || '';
  return {
    mediaType,
    mediaUrl,
    videoUrl,
    isYouTube,
    backgroundImage: featuredImage,
    title: resolvedTitle,
  };
}
