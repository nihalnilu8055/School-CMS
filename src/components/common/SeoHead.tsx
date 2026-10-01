import React, { useEffect } from 'react';
import { useSite } from '../../context/SiteContext';

export const SeoHead: React.FC = () => {
  const { seo, settings } = useSite();

  useEffect(() => {
    document.title = seo.meta_title || settings.school_name;

    const setMeta = (key: string, value: string, attr: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMeta('description', seo.meta_description);
    setMeta('keywords', seo.keywords);
    setMeta('og:title', seo.meta_title, 'property');
    setMeta('og:description', seo.meta_description, 'property');
    setMeta('og:image', seo.og_image, 'property');
    setMeta('twitter:card', seo.twitter_card);

    const icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (icon && settings.favicon_url) icon.href = settings.favicon_url;
  }, [seo, settings]);

  return null;
};
