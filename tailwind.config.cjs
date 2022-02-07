module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-background': "url('/images/camera-mobile.jpg')",
        'desktop-background': "url('/images/camera-desktop.jpg')",
      },
      fontFamily: {
        'body': ['"Roboto"'],
      }
    }
  },
  plugins: []
};