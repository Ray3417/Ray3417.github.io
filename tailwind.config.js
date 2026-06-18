/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F0',
        creamWarm: '#F7EFE3',
        skyBlue: '#87CEEB',
        deepSky: '#5BA3D9',
        grassGreen: '#8FB996',
        softGreen: '#B5D8B0',
        woodBrown: '#C4A882',
        warmBrown: '#A67C52',
        morandi: '#D4C5B9',
        softPink: '#F2D7D5',
        textDark: '#3D3D3D',
        textLight: '#6E6E6E',
        textFaint: '#A8A8A8'
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', 'Georgia', 'serif'],
        inter: ['"Inter"', 'sans-serif']
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-slower': 'floatSlower 10s ease-in-out infinite',
        'fade-in': 'fadeIn .8s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-8px) translateX(4px)' },
          '66%': { transform: 'translateY(-4px) translateX(-3px)' }
        },
        floatSlower: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
