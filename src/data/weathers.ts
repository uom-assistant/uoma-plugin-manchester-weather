import { weather } from '../types/weather'

type weatherList = {
  [index: string]: weather
}

// Define all weathers
const weathers: weatherList = {
  id200: {
    description: 'thunderstorm with light rain',
    icon: 'weather-lightning-rainy',
    iconCode: '\\F067E',
    class: 'dark'
  },
  id201: {
    description: 'thunderstorm with rain',
    icon: 'weather-lightning-rainy',
    iconCode: '\\F067E',
    class: 'dark'
  },
  id202: {
    description: 'thunderstorm with heavy rain',
    icon: 'weather-lightning-rainy',
    iconCode: '\\F067E',
    class: 'dark'
  },
  id210: {
    description: 'light thunderstorm',
    icon: 'weather-lightning',
    iconCode: '\\F0593',
    class: 'cloudy'
  },
  id211: {
    description: 'thunderstorm',
    icon: 'weather-lightning',
    iconCode: '\\F0593',
    class: 'dark'
  },
  id212: {
    description: 'heavy thunderstorm',
    icon: 'weather-lightning',
    iconCode: '\\F0593',
    class: 'dark'
  },
  id221: {
    description: 'ragged thunderstorm',
    icon: 'weather-lightning',
    iconCode: '\\F0593',
    class: 'dark'
  },
  id230: {
    description: 'thunderstorm with light drizzle',
    icon: 'weather-lightning-rainy',
    iconCode: '\\F067E',
    class: 'dark'
  },
  id231: {
    description: 'thunderstorm with drizzle',
    icon: 'weather-lightning-rainy',
    iconCode: '\\F067E',
    class: 'dark'
  },
  id232: {
    description: 'thunderstorm with heavy drizzle',
    icon: 'weather-lightning-rainy',
    iconCode: '\\F067E',
    class: 'dark'
  },
  id300: {
    description: 'light intensity drizzle',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id301: {
    description: 'drizzle',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id302: {
    description: 'heavy intensity drizzle',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id310: {
    description: 'light intensity drizzle rain',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id311: {
    description: 'drizzle rain',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id312: {
    description: 'heavy intensity drizzle rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloud'
  },
  id313: {
    description: 'shower rain and drizzle',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id314: {
    description: 'heavy shower rain and drizzle',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id321: {
    description: 'shower drizzle',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloud'
  },
  id500: {
    description: 'light rain',
    icon: 'weather-rainy',
    iconCode: '\\F0597',
    class: 'cloudy'
  },
  id501: {
    description: 'moderate rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloudy'
  },
  id502: {
    description: 'heavy intensity rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloudy'
  },
  id503: {
    description: 'very heavy rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'dark'
  },
  id504: {
    description: 'extreme rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'dark'
  },
  id511: {
    description: 'freezing rain',
    icon: 'weather-snowy-rainy',
    iconCode: '\\F067F',
    class: 'cloud'
  },
  id520: {
    description: 'light intensity shower rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloudy'
  },
  id521: {
    description: 'shower rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloudy'
  },
  id522: {
    description: 'heavy intensity shower rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloudy'
  },
  id531: {
    description: 'ragged shower rain',
    icon: 'weather-pouring',
    iconCode: '\\F0596',
    class: 'cloudy'
  },
  id600: {
    description: 'light snow',
    icon: 'weather-snowy',
    iconCode: '\\F0598',
    class: 'cloudy'
  },
  id601: {
    description: 'snow',
    icon: 'weather-snowy',
    iconCode: '\\F0598',
    class: 'cloudy'
  },
  id602: {
    description: 'heavy snow',
    icon: 'weather-snowy-heavy',
    iconCode: '\\F0F36',
    class: 'cloudy'
  },
  id611: {
    description: 'sleet',
    icon: 'weather-snowy-rainy',
    iconCode: '\\F067F',
    class: 'cloudy'
  },
  id612: {
    description: 'light shower sleet',
    icon: 'weather-snowy-rainy',
    iconCode: '\\F067F',
    class: 'cloudy'
  },
  id613: {
    description: 'shower sleet',
    icon: 'weather-snowy-rainy',
    iconCode: '\\F067F',
    class: 'cloudy'
  },
  id615: {
    description: 'light rain and snow',
    icon: 'weather-snowy-rainy',
    iconCode: '\\F067F',
    class: 'cloudy'
  },
  id616: {
    description: 'rain and snow',
    icon: 'weather-snowy-rainy',
    iconCode: '\\F067F',
    class: 'cloudy'
  },
  id620: {
    description: 'light shower snow',
    icon: 'weather-snowy',
    iconCode: '\\F0598',
    class: 'cloudy'
  },
  id621: {
    description: 'shower snow',
    icon: 'weather-snowy',
    iconCode: '\\F0598',
    class: 'cloudy'
  },
  id622: {
    description: 'heavy shower snow',
    icon: 'weather-snowy-heavy',
    iconCode: '\\F0F36',
    class: 'cloudy'
  },
  id701: {
    description: 'mist',
    icon: 'weather-hazy',
    iconCode: '\\F0598',
    class: 'cloudy'
  },
  id711: {
    description: 'smoke',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'cloudy'
  },
  id721: {
    description: 'haze',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'cloudy'
  },
  id731: {
    description: 'sand/dust whirls',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'sand'
  },
  id741: {
    description: 'fog',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'cloudy'
  },
  id751: {
    description: 'sand',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'sand'
  },
  id761: {
    description: 'dust',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'sand'
  },
  id762: {
    description: 'volcanic ash',
    icon: 'weather-fog',
    iconCode: '\\F0591',
    class: 'dark'
  },
  id771: {
    description: 'squalls',
    icon: 'weather-windy',
    iconCode: '\\F059D',
    class: 'dark'
  },
  id781: {
    description: 'tornado',
    icon: 'weather-tornado',
    iconCode: '\\F0F38',
    class: 'dark'
  },
  id800: {
    description: 'clear sky',
    icon: ['white-balance-sunny', 'weather-night'],
    iconCode: ['\\F05A8', '\\F0594'],
    class: 'sunny'
  },
  id801: {
    description: 'few clouds',
    icon: ['weather-partly-cloudy', 'weather-night-partly-cloudy'],
    iconCode: ['\\F0595', '\\F0F31'],
    class: 'cloud'
  },
  id802: {
    description: 'scattered clouds',
    icon: ['weather-partly-cloudy', 'weather-night-partly-cloudy'],
    iconCode: ['\\F0595', '\\F0F31'],
    class: 'cloud'
  },
  id803: {
    description: 'broken clouds',
    icon: 'cloud-outline',
    iconCode: '\\F0590',
    class: 'cloudy'
  },
  id804: {
    description: 'overcast clouds',
    icon: 'cloud-outline',
    iconCode: '\\F0590',
    class: 'cloudy'
  }
}

export default weathers
