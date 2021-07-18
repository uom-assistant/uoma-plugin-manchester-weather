import { computed, ComputedRef, Ref, ref, onBeforeUnmount } from 'vue'

import { sun } from '../types/weather'

type time = {
  currentTime: Ref<Date>,
  transformDateTime: (dateTime: Date) => Date,
  formatDate: (date: Date, iso: string, format: (mo: string, da: string) => string) => string,
  formatTime: (date: Date) => string,
  formatDateTime: (date: Date, iso: string, format: (mo: string, da: string, hr: string, mi: string) => string) => string,
  currentTimeInMan: ComputedRef<Date>,
  currentSpan: ComputedRef<string>,
  daySpan: (date: Date) => string,
  rotateDeg: ComputedRef<number>,
  brightness: ComputedRef<number>
}

/**
 * Handle time computing
 * @param sun sun object
 * @returns data and methods for time computing and converting
 */
export default (sun: sun): time => {
  const currentTime = ref(new Date())

  /**
   * Transform the given time to manchester time
   * @param date Date object
   * @returns transformed time
   */
  const transformDateTime = (dateTime: Date) => {
    return new Date(dateTime.toLocaleString('en-US', { timeZone: 'Europe/London' }))
  }

  /**
   * Format the given time to date
   * @param date Date object
   * @returns formatted string
   */
  const formatDate = (date: Date, iso: string, format: (mo: string, da: string) => string) => {
    return format(new Intl.DateTimeFormat(iso, { month: 'numeric' }).format(date), new Intl.DateTimeFormat(iso, { day: 'numeric' }).format(date))
  }

  /**
   * Format the given time to date time
   * @param date Date object
   * @returns formatted string
   */
  const formatDateTime = (date: Date, iso: string, format: (mo: string, da: string, hr: string, mi: string) => string) => {
    return format(new Intl.DateTimeFormat(iso, { month: 'numeric' }).format(date), new Intl.DateTimeFormat(iso, { day: 'numeric' }).format(date), `${date.getHours()}`.padStart(2, '0'), `${date.getMinutes()}`.padStart(2, '0'))
  }

  /**
   * Format the given time
   * @param date Date object
   * @returns formatted string
   */
  const formatTime = (date: Date) => {
    return `${`${date.getHours()}`.padStart(2, '0')}:${`${date.getMinutes()}`.padStart(2, '0')}`
  }

  // Current time in manchester
  const currentTimeInMan = computed(() => {
    return transformDateTime(currentTime.value)
  })

  // Current time span
  const currentSpan = computed(() => {
    if (sun.sunrise === 0 || sun.sunset === 0) {
      return 'morning'
    }

    const now = currentTime.value.valueOf() / 1000

    if (now < sun.sunrise - 1800) {
      return 'night'
    } else if (now >= sun.sunrise - 1800 && now < sun.sunrise + 7200) {
      return 'morning'
    } else if (now >= sun.sunrise + 7200 && now < sun.sunset) {
      return 'noon'
    } else if (now >= sun.sunset && now < sun.sunset + 3600) {
      return 'evening'
    }
    return 'night'
  })

  /**
   * Time span for a given date
   * @param date Date object
   * @returns time span name
   */
  const daySpan = (date: Date) => {
    if (sun.sunrise === 0 || sun.sunset === 0) {
      return 'morning'
    }

    let now = date.valueOf() / 1000
    if (now > sun.sunset + 3600) {
      now -= 86400
    }
    if (now > sun.sunset + 3600) {
      now -= 86400
    }

    if (now < sun.sunrise - 1800) {
      return 'night'
    } else if (now >= sun.sunrise - 1800 && now < sun.sunrise + 7200) {
      return 'morning'
    } else if (now >= sun.sunrise + 7200 && now < sun.sunset) {
      return 'noon'
    } else if (now >= sun.sunset && now < sun.sunset + 3600) {
      return 'evening'
    }
    return 'night'
  }

  // Rotate angle for sun animation
  const rotateDeg = computed(() => {
    return (currentTime.value.valueOf() - (sun.sunrise * 1000)) / ((sun.sunset - sun.sunrise) * 1000) * 180
  })

  // Sun light background brightness for sun animation
  const brightness = computed(() => {
    if ((rotateDeg.value > 3 && rotateDeg.value < 177) || rotateDeg.value < -8 || rotateDeg.value > 188) {
      return 0
    }
    if ((rotateDeg.value < -1 && rotateDeg.value > -4) || (rotateDeg.value > 181 && rotateDeg.value < 184)) {
      return 0.6
    }
    if (rotateDeg.value >= -1 && rotateDeg.value <= 3) {
      return ((3 - rotateDeg.value) / 4) * 0.6
    }
    if (rotateDeg.value <= -4 && rotateDeg.value >= -8) {
      return ((rotateDeg.value + 8) / 4) * 0.6
    }
    if (rotateDeg.value >= 177 && rotateDeg.value <= 181) {
      return ((rotateDeg.value - 177) / 4) * 0.6
    }
    return ((188 - rotateDeg.value) / 4) * 0.6
  })

  // Update current time every 10 seconds
  let timer = -1
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 10000)

  onBeforeUnmount(() => {
    clearInterval(timer)
  })

  return {
    currentTime,
    transformDateTime,
    formatDate,
    formatTime,
    formatDateTime,
    currentTimeInMan,
    currentSpan,
    daySpan,
    rotateDeg,
    brightness
  }
}
