import { computed, ComputedRef, Ref, ref } from 'vue'

import { hour } from '../types/weather'

type chartConfig = {
  datasets: {
    line: {
      pointRadius: number
    }
  },
  events: string[],
  elements: {
    point: {
      radius: number
    }
  },
  scales: {
    x: {
      display: boolean
    },
    y: {
      display: boolean
    }
  }
}

type tempList = {
  [index: string]: number
}

type ScrollEvent = {
  target: {
    scrollLeft: number
  }
}

type chart = {
  chartConfig: chartConfig,
  twoDayTemp: ComputedRef<tempList>,
  onScroll: (e: ScrollEvent) => void,
  onMouseDown: (e: MouseEvent) => void,
  onMouseUp: () => void,
  onMouseMove: (e: MouseEvent) => void,
  horizontal: Ref<HTMLElement | null>,
  getBgColor: (weather: string, span: string) => string
}

/**
 * Handle data processing for chart
 * @returns data and methods for drawing chart
 */
export default (hourly: hour[], convertTempTo: (unit: 'c' | 'f', temp: number) => number, currentUnit: Ref<'c' | 'f'>): chart => {
  // Chart configuration
  const chartConfig = {
    datasets: {
      line: {
        pointRadius: 0
      }
    },
    events: [],
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  }

  // Compute a list of temperature values for the next two days based on the unit
  const twoDayTemp = computed(() => {
    const result: tempList = {}

    result[`${hourly[0].dt - 1800}`] = convertTempTo(currentUnit.value, hourly[0].temp) + 100

    for (const item of hourly) {
      result[`${item.dt}`] = convertTempTo(currentUnit.value, item.temp) + 100
    }

    result[`${hourly[hourly.length - 1].dt + 1800}`] = convertTempTo(currentUnit.value, hourly[hourly.length - 1].temp) + 100

    return result
  })

  // Handle mouse drag
  let scrollLeft = 0
  let originX = 0
  let originLeft = 0
  const horizontal = ref<HTMLElement | null>(null)

  /**
   * Handle scroll event
   * @param e scroll event
   */
  const onScroll = (e: ScrollEvent) => {
    scrollLeft = e.target.scrollLeft
  }

  /**
   * Handle mouse down event
   * @param e mouse down event
   */
  const onMouseDown = (e: MouseEvent) => {
    originX = e.pageX
    originLeft = scrollLeft

    if (horizontal.value) {
      horizontal.value.classList.add('grabbing')
    }
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
  }

  /**
   * Handle mouse up event
   * @param e mouse up event
   */
  const onMouseUp = () => {
    if (horizontal.value) {
      horizontal.value.classList.remove('grabbing')
    }
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousemove', onMouseMove)
  }

  /**
   * Handle mouse move event
   * @param e mouse move event
   */
  const onMouseMove = (e: MouseEvent) => {
    const offset = e.pageX - originX
    const left = originLeft - offset
    if (horizontal.value) {
      horizontal.value.scrollLeft = left
    }
  }

  /**
   * Get background color based on weather
   * @param weather weather condition
   * @param span time span
   * @returns background color
   */
  const getBgColor = (weather: string, span: string) => {
    if (span === 'morning') {
      if (weather === 'sunny') {
        return '12, 74, 110'
      }
      if (weather === 'cloud') {
        return '71, 85, 105'
      }
      if (weather === 'cloudy') {
        return '75, 85, 99'
      }
      if (weather === 'sand') {
        return '87, 83, 78'
      }
      return '64, 64, 64'
    } else if (span === 'noon') {
      if (weather === 'sunny') {
        return '249, 250, 251'
      }
      if (weather === 'cloud') {
        return '249, 250, 251'
      }
      if (weather === 'cloudy') {
        return '75, 85, 99'
      }
      if (weather === 'sand') {
        return '68, 64, 60'
      }
      return '31, 41, 55'
    } else if (span === 'evening') {
      if (weather === 'sunny') {
        return '15, 23, 42'
      }
      if (weather === 'cloud') {
        return '55, 65, 81'
      }
      if (weather === 'cloudy') {
        return '31, 41, 55'
      }
      if (weather === 'sand') {
        return '41, 37, 36'
      }
      return '31, 41, 55'
    } else {
      if (weather === 'sunny') {
        return '31, 41, 55'
      }
      if (weather === 'cloud') {
        return '31, 41, 55'
      }
      if (weather === 'cloudy') {
        return '38, 38, 38'
      }
      if (weather === 'sand') {
        return '41, 37, 36'
      }
      return '27, 27, 27'
    }
  }

  return {
    chartConfig,
    twoDayTemp,
    onScroll,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    horizontal,
    getBgColor
  }
}
