export type sun = {
  sunrise: number,
  sunset: number
}

export type misc = {
  pressure: number,
  humidity: number,
  dewPoint: number,
  clouds: number,
  uvi: number,
  visibility: number,
  windSpeed: number,
  windDeg: number
}

export type weather = {
  description: string
  icon: string | string[]
  iconCode: string | string[]
  class: string
}

export type current = {
  dt: number,
  temp: number,
  feelsLike: number,
  weather: weather | null
}

export type alert = {
  senderName: string,
  event: string,
  start: number,
  end: number,
  description: string
}

export type hour = {
  dt: number,
  temp: number,
  feelsLike: number,
  pop: number,
  clouds: number,
  uvi: number,
  windSpeed: number,
  windDeg: number,
  weather: weather
}

export type aqi = {
  dt: number,
  aqi: number,
  co: number,
  so2: number,
  o3: number,
  pm25: number,
  pm10: number
}

export type precipitation = {
  dt: number,
  precipitation: number
}
