import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  extract: {
    include: [
      'src/**/*.vue',
      'index.html'
    ]
  },
  darkMode: 'class',
  safelist: ['sunny-morning', 'sunny-noon', 'sunny-evening', 'sunny-night', 'cloud-morning', 'cloud-noon', 'cloud-evening', 'cloud-night', 'cloudy-morning', 'cloudy-noon', 'cloudy-evening', 'cloudy-night', 'sand-morning', 'sand-noon', 'sand-evening', 'sand-night', 'dark-morning', 'dark-noon', 'dark-evening', 'dark-night', 'sunny-morning-card', 'sunny-noon-card', 'sunny-evening-card', 'sunny-night-card', 'cloud-morning-card', 'cloud-noon-card', 'cloud-evening-card', 'cloud-night-card', 'cloudy-morning-card', 'cloudy-noon-card', 'cloudy-evening-card', 'cloudy-night-card', 'sand-morning-card', 'sand-noon-card', 'sand-evening-card', 'sand-night-card', 'dark-morning-card', 'dark-noon-card', 'dark-evening-card', 'dark-night-card'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#660099',
          light: '#D099E0'
        }
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', '"Noto Sans"', '"Helvetica Neue"', 'Helvetica', '"Nimbus Sans L"', 'Arial', '"Liberation Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Noto Sans CJK SC"', '"Source Han Sans SC"', '"Source Han Sans CN"', '"Microsoft YaHei"', '"Wenquanyi Micro Hei"', '"WenQuanYi Zen Hei"', '"ST Heiti"', 'SimHei', '"WenQuanYi Zen Hei Sharp"', 'sans-serif'],
        dispaly: ['Montserrat', '-apple-system', '"Noto Sans"', '"Helvetica Neue"', 'Helvetica', '"Nimbus Sans L"', 'Arial', '"Liberation Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Noto Sans CJK SC"', '"Source Han Sans SC"', '"Source Han Sans CN"', '"Microsoft YaHei"', '"Wenquanyi Micro Hei"', '"WenQuanYi Zen Hei"', '"ST Heiti"', 'SimHei', '"WenQuanYi Zen Hei Sharp"', 'sans-serif']
      },
      fontSize: {
        '7.5xl': '5.25rem'
      },
      screens: {
        xs: '520px'
      },
      padding: {
        half: '50%',
        full: '100%'
      },
      keyframes: {
        loading1: {
          '0%': {
            right: '110%',
            width: '20px'
          },
          '50%': {
            right: '-125%',
            width: '250px'
          },
          '100%': {
            right: '-125%',
            width: '250px'
          }
        },
        loading2: {
          '0%': {
            right: '100%',
            width: '250px'
          },
          '60%': {
            right: '100%',
            width: '250px'
          },
          '100%': {
            right: '-10%',
            width: '20px'
          }
        }
      },
      animation: {
        loading1: 'loading1 infinite 2.2s ease-in',
        loading2: 'loading2 infinite 2.2s -0.3s ease-out'
      }
    }
  },
  shortcuts: {
    btn: 'appearance-none inline-block rounded-md text-dark-100 font-dispaly font-medium outline-none focus:outline-none focus:(ring-3 ring-gray-500 ring-opacity-60)',
    'flex-center': 'flex items-center justify-center',
    'flex-vertical': 'flex flex-col item-center',
    'title-small': 'flex item-center text-size-sm opacity-60',

    'sunny-morning': 'bg-gradient-to-b from-light-blue-800 to-cool-gray-500 text-true-gray-50',
    'sunny-noon': 'bg-gradient-to-br from-light-blue-600 to-teal-500',
    'sunny-evening': 'bg-gradient-to-b from-blue-900 to-blue-gray-800',
    'sunny-night': 'bg-gradient-to-br from-blue-gray-800 to-cool-gray-900',

    'sunny-morning-card': 'bg-light-blue-900 text-gray-50',
    'sunny-noon-card': 'bg-gray-50 text-dark-50',
    'sunny-evening-card': 'bg-blue-gray-900 text-gray-50',
    'sunny-night-card': 'bg-gray-800 text-gray-100',

    'cloud-morning': 'bg-gradient-to-br from-blue-gray-500 to-cool-gray-500',
    'cloud-noon': 'bg-gradient-to-b from-blue-gray-400 to-blue-400',
    'cloud-evening': 'bg-gradient-to-b from-cool-gray-700 to-gray-800',
    'cloud-night': 'bg-gradient-to-b from-true-gray-800 to-cool-gray-900',

    'cloud-morning-card': 'bg-blue-gray-600 text-gray-50',
    'cloud-noon-card': 'bg-gray-50 text-dark-50',
    'cloud-evening-card': 'bg-gray-700 text-gray-100',
    'cloud-night-card': 'bg-gray-800 text-gray-100',

    'cloudy-morning': 'bg-gradient-to-br from-gray-500 to-cool-gray-400',
    'cloudy-noon': 'bg-gradient-to-br from-blue-gray-400 to-gray-300',
    'cloudy-evening': 'bg-gradient-to-br from-true-gray-600 to-cool-gray-700',
    'cloudy-night': 'bg-gradient-to-b from-true-gray-800 to-dark-800',

    'cloudy-morning-card': 'bg-gray-600 text-gray-100',
    'cloudy-noon-card': 'bg-gray-600 text-gray-100',
    'cloudy-evening-card': 'bg-gray-800 text-gray-100',
    'cloudy-night-card': 'bg-true-gray-800 text-gray-100',

    'sand-morning': 'bg-gradient-to-br from-warm-gray-600 to-true-gray-400',
    'sand-noon': 'bg-gradient-to-b from-warm-gray-500 to-warm-gray-300',
    'sand-evening': 'bg-gradient-to-br from-warm-gray-800 to-warm-gray-600',
    'sand-night': 'bg-gradient-to-b from-warm-gray-900 to-dark-700',

    'sand-morning-card': 'bg-warm-gray-600 text-gray-100',
    'sand-noon-card': 'bg-warm-gray-700 text-gray-100',
    'sand-evening-card': 'bg-warm-gray-800 text-gray-100',
    'sand-night-card': 'bg-warm-gray-800 text-gray-100',

    'dark-morning': 'bg-gradient-to-br from-true-gray-700 to-cool-gray-500',
    'dark-noon': 'bg-gradient-to-br from-cool-gray-700 to-gray-500',
    'dark-evening': 'bg-gradient-to-b from-true-gray-800 to-cool-gray-900',
    'dark-night': 'bg-gradient-to-b from-true-gray-900 to-dark-900',

    'dark-morning-card': 'bg-true-gray-700 text-gray-100',
    'dark-noon-card': 'bg-gray-800 text-gray-100',
    'dark-evening-card': 'bg-cool-gray-800 text-gray-100',
    'dark-night-card': 'bg-dark-700 text-gray-100'
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent'
        },
        '.bottom-safe': {
          'margin-bottom': 'env(safe-area-inset-bottom)'
        },
        '.horizontal': {
          'user-select': 'none',
          cursor: 'grab',
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none'
        },
        '.horizontal.grabbing': {
          cursor: 'grabbing'
        },
        '.horizontal::-webkit-scrollbar': {
          display: 'none'
        }
      }
      addUtilities(newUtilities)
    })
  ]
})
