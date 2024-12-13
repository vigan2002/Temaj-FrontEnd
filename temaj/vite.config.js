// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        open: false,
        host: "0.0.0.0",
        port: 4173,
        headers: {
            'Cache-Control': 'public, max-age=31536000',
        }
    },
    preview: {
        headers: {
            'Cache-Control': 'public, max-age=31536000',
        },
    },

})
;
