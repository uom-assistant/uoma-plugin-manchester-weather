import { Ref, computed, ComputedRef } from 'vue'

import { precipitation } from '../types/weather'

type rain = {
  remain: ComputedRef<precipitation[]>,
  remainArray: ComputedRef<number[]>,
  isRainning: ComputedRef<boolean>,
  maxPrecipitation: ComputedRef<number>,
  nextMinute: ComputedRef<number>
}

/**
 * Rainning data handling
 * @returns data and methods for rainning data handling
 */
export default (precipitation: precipitation[], currentTime: Ref<Date>): rain => {
  // Further precipitation data
  const remain = computed(() => precipitation.filter((item) => item.dt * 1000 >= currentTime.value.valueOf()))

  // Further precipitation data as a one-dimensional array
  const remainArray = computed(() => remain.value.map((item) => item.precipitation))

  // Whether it is raining
  const isRainning = computed(() => remain.value[0] && remain.value[0].precipitation > 0)

  // Max precipitation in the future
  const maxPrecipitation = computed(() => Math.max(...remainArray.value))

  // How many minutes left until the next precipitation change
  const nextMinute = computed(() => {
    let count = 0

    for (const item of remain.value) {
      if ((item.precipitation === 0 && isRainning.value) || (item.precipitation > 0 && !isRainning.value)) {
        break
      }
      count += 1
    }

    return count
  })

  return {
    remain,
    remainArray,
    isRainning,
    maxPrecipitation,
    nextMinute
  }
}
