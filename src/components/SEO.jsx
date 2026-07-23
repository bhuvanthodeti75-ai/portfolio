import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Helper component to dynamically manage document head meta tags, title, canonical link, and JSON-LD schema.
 */
export default function SEO({
  title = "Bhuvan Thodeti | AI Developer | Full Stack Developer",
  description = "Portfolio of Bhuvan Thodeti, AI Developer, Full Stack Developer & student. Explore top AI projects, web apps & engineering skills.",
  keywords = "Bhuvan Thodeti, Bhuvan, Bhuvan Portfolio, Bhuvan Thodeti Portfolio, AI Developer, Full Stack Developer, Web Developer, Software Engineer, Student Developer, React Developer, Next.js Developer, Portfolio",
  image = "https://www.bhuvanthodeti.in/bt.jpeg",
  path = "",
  jsonLd = null,
}) {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const canonicalUrl = `https://www.bhuvanthodeti.in${currentPath}`;

  useEffect(() => {
    // 1. Update Title (under 60 characters)
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (name, content, attrName = 'name') => {
      let el = document.querySelector(`meta[${attrName}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Meta Description & Keywords
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // Open Graph
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:image', image, 'property');

    // Twitter Tags
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // 3. Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Update dynamic JSON-LD if provided
    let scriptTag = document.getElementById('dynamic-jsonld');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, image, canonicalUrl, jsonLd]);

  return null;
}
