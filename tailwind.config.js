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
			preset: [
				// Enable 'enhancements' per each registered theme:
				{ name: "rocket", enhancements: true }
			] 
        }
      })
    ],
  }