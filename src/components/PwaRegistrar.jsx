'use client';

import React from 'react';

export function PwaRegistrar() {
  React.useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
      return;
    }

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    };

    if (document.readyState === 'complete') {
      register();
      return;
    }

    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
