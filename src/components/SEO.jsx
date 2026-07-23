import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enterprise SEO helper component to dynamically manage document head meta tags,
 * canonical link, Open Graph, Twitter Cards, and dynamic JSON-LD schema.
 */
export default function SEO({
  title = "Bhuvan Thodeti | AI Developer, Full Stack Developer & Generative AI Engineer",
  description = "Bhuvan Thodeti is an AI Developer, Full Stack Developer, Generative AI Engineer, and Web Developer building intelligent applications, AI solutions, automation systems, and modern web experiences.",
  keywords = "Bhuvan Thodeti, Bhuvan, AI Developer, Generative AI Engineer, Full Stack Developer, Software Engineer, Web Developer, React Developer, Next.js Developer, Node.js Developer, Portfolio, Machine Learning, Artificial Intelligence, Hyderabad, India, Student Developer, Open Source, Cloud Computing",
  image = "https://www.bhuvanthodeti.in/bt.jpeg",
  path = "",
  author = "Bhuvan Thodeti",
  creator = "Bhuvan Thodeti",
  publisher = "Bhuvan Thodeti",
  category = "Technology, Artificial Intelligence, Web Development",
  type = "website",
  jsonLd = null,
}) {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const canonicalUrl = `https://www.bhuvanthodeti.in${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;

  useEffect(() => {
    // 1. Title Tag
    document.title = title;

    // 2. Helper to set/update meta tag
    const setMetaTag = (name, content, attrName = 'name') => {
      let el = document.querySelector(`meta[${attrName}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('title', title);
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', author);
    setMetaTag('creator', creator);
    setMetaTag('publisher', publisher);
    setMetaTag('category', category);

    // Robots Directives
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph Metadata
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:image', image, 'property');
    setMetaTag('og:type', type, 'property');
    setMetaTag('og:site_name', 'Bhuvan Thodeti Portfolio', 'property');
    setMetaTag('og:locale', 'en_US', 'property');

    // Twitter Card Metadata
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', '@BhuvanThod88374');
    setMetaTag('twitter:creator', '@BhuvanThod88374');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Dynamic JSON-LD Script Tag
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
  }, [title, description, keywords, image, canonicalUrl, author, creator, publisher, category, type, jsonLd]);

  return null;
}
