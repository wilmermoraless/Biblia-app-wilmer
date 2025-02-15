const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "3595ts",
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})