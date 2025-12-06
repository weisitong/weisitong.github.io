import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'products.html',
        'product-resistors': 'product-resistors.html',
        'product-capacitors': 'product-capacitors.html',
        'product-inductors': 'product-inductors.html',
        'product-diodes': 'product-diodes.html',
        'product-crystals': 'product-crystals.html',
        'product-connectors': 'product-connectors.html',
        partners: 'partners.html',
        support: 'support.html',
        about: 'about.html',
        contact: 'contact.html'
      }
    }
  }
})