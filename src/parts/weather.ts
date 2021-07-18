import { ref, Ref } from 'vue'

type weather = {
  convertTempTo: (unit: 'c' | 'f', temp: number) => number,
  convertSpeedTo: (unit: 'c' | 'f', speed: number) => number,
  convertDistanceTo: (unit: 'c' | 'f', distance: number) => number,
  currentUnit: Ref<'c' | 'f'>,
}

/**
 * Weather data handling
 * @returns data and methods for weather data handling
 */
export default (): weather => {
  const currentUnit = ref<'c' | 'f'>('c')

  /**
   * Convert temperature based on the given unit
   * @param unit unit name, 'c' for celsius and 'f' for faorde
   * @param temp celsius temperature
   * @returns converted temperature
   */
  const convertTempTo = (unit: 'c' | 'f', temp: number) => {
    if (unit === 'c') {
      return temp
    }
    return (temp * 9 / 5) + 32
  }

  /**
   * Convert speed based on the given unit
   * @param unit unit name, 'c' for m/s and 'f' for mph
   * @param speed speed in m/s
   * @returns converted speed
   */
  const convertSpeedTo = (unit: 'c' | 'f', speed: number) => {
    if (unit === 'c') {
      return speed
    }
    return speed * 2.2369362920544
  }

  /**
   * Convert distance based on the given unit
   * @param unit unit name, 'c' for km and 'f' for miles
   * @param speed distance in km
   * @returns converted speed
   */
  const convertDistanceTo = (unit: 'c' | 'f', distance: number) => {
    if (unit === 'c') {
      return distance
    }
    return distance * 0.62137119
  }

  return {
    convertTempTo,
    convertSpeedTo,
    convertDistanceTo,
    currentUnit
  }
}
