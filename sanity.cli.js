// E:/karaoke-app/sanity.cli.js
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '48wq30y4', // <-- Tu mismo Project ID real de Sanity
    dataset: 'production',
  },
});