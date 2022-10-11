/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
      fontfamily: {
        sans: ['Inter', 'sans-serif']
      },
    extend: {
      colors:{
        
      },
      backgroundImage: {
        galaxy: "url('/background_g.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 10.00%, #43E7AD 50.00%, #E1D55D 90.00%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [],
}
