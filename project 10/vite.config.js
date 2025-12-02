import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'products.html',
        partners: 'partners.html',
        support: 'support.html',
        about: 'about.html',
        contact: 'contact.html'
      }
    }
  }
})