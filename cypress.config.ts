const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "3595ts",
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Configuración de eventos si es necesario
    },
    env: {
      apiUrl: 'https://api.scripture.api.bible/v1',
      bibleId: '592420522e16049f-01'
    }
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
})