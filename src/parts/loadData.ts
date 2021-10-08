import { onBeforeUnmount, onMounted, reactive, ref, Ref } from 'vue'
import weathers from '../data/weathers'

import { sun, misc, current, alert, hour, aqi, precipitation } from '../types/weather'

type loadData = {
  loading: Ref<boolean>,
  inited: Ref<boolean>,
  sun: sun,
  misc: misc,
  current: current,
  hourly: hour[],
  precipitation: precipitation[],
  alerts: alert[],
  aqi: aqi,
  load: () => Promise<void>
}

/**
 * Handle data loading
 * @returns data and methods for loading weather data
 */
export default (): loadData => {
  const loading = ref(false)
  const inited = ref(false)

  // Sunrise and sunset times
  const sun = reactive<sun>({
    sunrise: 0,
    sunset: 0
  })

  // Miscellaneous data
  const misc = reactive<misc>({
    pressure: 0,
    humidity: 0,
    dewPoint: 0,
    clouds: 0,
    uvi: 0,
    visibility: 0,
    windSpeed: 0,
    windDeg: 0
  })

  // Current weather data
  const current = reactive<current>({
    dt: 0,
    temp: 0,
    feelsLike: 0,
    weather: null
  })

  // Hourly weather data
  const hourly = reactive<hour[]>([])

  // Weather alerts
  const alerts = reactive<alert[]>([])

  // AQI data
  const aqi = reactive<aqi>({
    dt: 0,
    aqi: 0,
    co: 0,
    so2: 0,
    o3: 0,
    pm25: 0,
    pm10: 0
  })

  // Precipitation data
  const precipitation = reactive<precipitation[]>([])

  let timer = -1

  /**
   * Load weather data from API
   */
  const load = async () => {
    if (loading.value) {
      return
    }

    loading.value = true

    const response = await fetch('https://weather.axton.im', {
      credentials: 'omit'
    }).then((response) => response.json()).catch(() => {
      return false
    })

    if (response === false) {
      loading.value = false
      return
    }

    // Update miscellaneous data
    misc.pressure = response.current.pressure
    misc.humidity = response.current.humidity
    misc.dewPoint = response.current.dew_point
    misc.clouds = response.current.clouds
    misc.uvi = response.current.uvi
    misc.visibility = response.current.visibility
    misc.windSpeed = response.current.wind_speed
    misc.windDeg = response.current.wind_deg

    // Update current weather
    current.dt = response.current.dt
    current.temp = response.current.temp
    current.feelsLike = response.current.feels_like
    current.weather = weathers[`id${response.current.weather[0].id}`]

    // Update hourly weather
    hourly.splice(0)

    if (response.hourly) {
      for (const item of response.hourly.slice(0, 36)) {
        hourly.push({
          dt: item.dt,
          temp: item.temp,
          feelsLike: item.feels_like,
          pop: item.pop,
          clouds: item.clouds,
          uvi: item.uvi,
          windSpeed: item.wind_speed,
          windDeg: item.wind_deg,
          weather: weathers[`id${item.weather[0].id}`]
        })
      }
    }

    // Update precipitation
    precipitation.splice(0)

    if (response.minutely) {
      for (const item of response.minutely) {
        precipitation.push(item)
      }
    }

    // Update alerts
    alerts.splice(0)

    if (response.alerts) {
      for (const item of response.alerts) {
        alerts.push({
          senderName: item.sender_name,
          event: item.event,
          start: item.start,
          end: item.end,
          description: item.description
        })
      }
    }

    // Load AQI from API
    const aqiResponse = await fetch('https://weather.axton.im/aqi.json', {
      credentials: 'omit'
    }).then((response) => response.json()).catch(() => {
      return false
    })

    if (aqiResponse === false) {
      return
    }

    // Update AQI data
    aqi.dt = aqiResponse.list[0].dt
    aqi.aqi = aqiResponse.list[0].main.aqi
    aqi.co = aqiResponse.list[0].components.co
    aqi.so2 = aqiResponse.list[0].components.so2
    aqi.o3 = aqiResponse.list[0].components.o3
    aqi.pm25 = aqiResponse.list[0].components.pm2_5
    aqi.pm10 = aqiResponse.list[0].components.pm10

    sun.sunrise = response.current.sunrise
    sun.sunset = response.current.sunset

    loading.value = false
    if (!inited.value) {
      inited.value = true
    }

    // Set next update time
    timer = setTimeout(() => {
      load()
    }, (response.current.dt * 1000 + 960000) - new Date().valueOf())
  }

  onBeforeUnmount(() => {
    if (timer !== -1) {
      clearInterval(timer)
    }
  })

  onMounted(load)

  return {
    loading,
    inited,
    sun,
    misc,
    current,
    hourly,
    precipitation,
    alerts,
    aqi,
    load
  }
}
