module.exports = {
    content: [
      './src/routes/**/*.{html,js,svelte}', 
    ],
    theme: {
      extend: {
        // Custom theme extensions if needed
      },
    },
    plugins: [
      require('skeleton')({
        themes: {
            preset: [ { name: "rocket", enhancements: true } ] 
        }
      })
    ],
  }