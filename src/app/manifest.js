export default function manifest() {
  return {
    name: 'The PickUp Club',
    short_name: 'PickUp Club',
    description: 'Find, host, and manage local pickup baseball games.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f6f7fb',
    theme_color: '#111827',
    categories: ['sports', 'social', 'lifestyle'],
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
