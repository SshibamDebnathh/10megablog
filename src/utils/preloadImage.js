export function preloadImage(url, id = '') {
    if (!url) return;
  
    const exists = document.querySelector(`link[rel="preload"][href="${url}"]`);
    if (exists) return;
  
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    if (id) link.id = id;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
  