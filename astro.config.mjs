// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [sanity(
    {
      projectId: '48wq30y4',
      dataset: 'production',
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-09-15", // insert the current date to access the latest version of the API
    }
  ), react()]
});