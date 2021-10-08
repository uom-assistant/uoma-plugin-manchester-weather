<template>
  <div class="absolute inset-0 z-10 w-full h-full" :class="`${(current.weather && inited) ? current.weather.class : 'sunny'}-${currentSpan}`"/>
  <main class="absolute inset-0 z-20 box-border overflow-x-hidden overflow-y-auto w-full h-full flex flex-col items-center p-5 no-tap-highlight bottom-safe" :class="`${(current.weather && inited && (current.weather.class === 'cloudy' || current.weather.class === 'sand') && currentSpan === 'noon') ? 'text-gray-900' : 'text-gray-50'}${(loading && !inited) ? ' justify-center' : ' justify-start'}`">
    <div class="h-6px w-200px relative overflow-hidden bg-opacity-30 bg-gray-50 rounded-full" v-if="loading && !inited">
      <div class="animate-loading1 bg-gray-50 absolute h-full top-0 rounded-full"></div>
      <div class="animate-loading2 bg-gray-50 absolute h-full top-0 rounded-full"></div>
    </div>

    <header class="w-full flex flex-row items-center justify-between" v-if="inited">
      <h1 class="font-dispaly text-2xl font-medium">Manchester</h1>

      <div class="flex flex-row">
        <Popover class="relative" v-slot="{ open }" v-if="alerts.length > 0">
          <PopoverButton class="text-lg inline-flex items-center justify-center mr-2 h-7 w-7 mt-1 transition-all duration-200 rounded-md outline-none focus:outline-none focus:(ring-4 ring-gray-500 ring-opacity-60)" :class="open ? 'bg-gray-50 text-dark-100' : ''">
            <mdi-alert-circle-outline/>
          </PopoverButton>

          <teleport to="body">
            <transition
              enter-active-class="transition-all scale-95 duration-200 ease-out"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition-all scale-100 duration-120 ease-in"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <PopoverPanel class="absolute z-30 w-11/12 left-1/24 top-16 rounded-lg mx-auto shadow-xl p-4 transform max-h-17/20 overflow-auto" :class="currentSpan === 'evening' || currentSpan === 'night' ? 'text-gray-50 bg-dark-200' : 'bg-gray-50 text-gray-900'">
                <h1 class="flex flex-row items-center justify-start text-size-lg">
                  <mdi-alert-circle-outline class="text-red-600 mr-2"/>
                  {{ $t('weather alert') }}
                </h1>
                <div v-for="(alert, index) in alerts" :key="`alert-${index}`" class="mt-3">
                  <h2 class="font-bold">{{ alert.event }}</h2>
                  <div class="opacity-50 text-size-sm mt-1">{{ formatDateTime(transformDateTime(new Date(alert.start * 1000)), $i18n.locale, localeTimeFormat[$i18n.locale].dateTimeFormat) }} - {{ formatDateTime(transformDateTime(new Date(alert.end * 1000)), $i18n.locale, localeTimeFormat[$i18n.locale].dateTimeFormat) }}</div>
                  <p class="whitespace-pre-wrap opacity-80 text-size-sm mt-1">{{ alert.description }}</p>
                  <span class="text-size-xs opacity-60">{{ $t('by', [alert.senderName]) }}</span>
                </div>
              </PopoverPanel>
            </transition>
          </teleport>
        </Popover>

        <div class="h-9 w-17 bg-gray-50 rounded-lg bg-opacity-50 relative">
          <div class="absolute inset-0 z-2 w-full h-full p-1">
            <button @click="currentUnit = 'c'" class="btn w-7 h-7 pt-0.5 mr-1 transition-all" :class="currentUnit === 'f' ? 'delay-200 duration-200' : 'transition-none'">C</button>
            <button @click="currentUnit = 'f'" class="btn w-7 h-7 pt-0.5 transition-all" :class="currentUnit === 'c' ? 'delay-200 duration-200' : 'transition-none'">F</button>
          </div>
          <div class="absolute bg-gray-50 w-7 h-7 rounded-md z-1 top-1 shadow-md transition-all duration-200" :class="currentUnit === 'f' ? 'left-9' : 'left-1'"/>
        </div>
      </div>
    </header>

    <section v-if="current.weather && inited" class="pt-25 w-full">
      <h1 class="text-7.5xl leading-4 flex flex-row items-center justify-start font-dispaly font-medium">
        <WeatherIcon :icon="current.weather.icon" :span="currentSpan" class="text-6xl mr-6"/>
        {{ parseFloat(convertTempTo(currentUnit, current.temp).toFixed(1)) }}°
      </h1>
      <h2 class="mt-3 text-lg">{{ current.weather && inited ? $t(current.weather.description) : '' }}<span class="opacity-75">&nbsp;&nbsp;•&nbsp;&nbsp;{{ $t('feels like', [`${parseFloat(convertTempTo(currentUnit, current.feelsLike).toFixed(1))}°`]) }}</span></h2>
      <h2 class="mt-1 text-md opacity-75" v-if="!isRainning && maxPrecipitation === 0">{{ $t('no rain') }}</h2>
    </section>

    <section v-if="inited && (isRainning || maxPrecipitation > 0)" class="mt-3 w-full rounded-lg p-4 shadow-lg" :class="`${current.weather ? current.weather.class : 'sunny'}-${currentSpan}-card`">
      <div class="flex-vertical -mb-0.5 pr-1">
        <h2 class="title-small flex flex-col opacity-100">
          <div class="flex justify-start items-center opacity-60 mb-2">
            <div class="flex-center">
              <mdi-umbrella class="text-size-xs mr-1.5 mb-0.3" v-if="isRainning"/>
              <mdi-umbrella-closed-variant class="text-size-xs mr-1.5 mb-0.3" v-else/>
            </div>
            {{ $t('rain') }}
          </div>
          <span>{{ isRainning ? (Math.min(...remainArray) > 0 ? $t('rain will not end') : $t('rain will end', [nextMinute], nextMinute)) : (maxPrecipitation === 0 ? $t('no rain') : $t('will rain', [nextMinute], nextMinute)) }}</span>
        </h2>

        <div class="w-full h-6 rounded-md mt-2.7 grid grid-cols-5 overflow-hidden relative" :style="{ 'grid-template-columns': `repeat(${remainArray.length}, minmax(0, 1fr))` }">
          <div class="w-full h-full bg-gray-300" :style="{ opacity: `${(item * 100) * 0.8 + 20}%` }" v-for="(item, i) in remainArray" :key="`rain-${i}`">
            <div :style="{ opacity: `${item * 100}%` }" class="w-full h-full bg-light-blue-600"/>
          </div>
        </div>
      </div>
    </section>

    <section v-if="inited" class="w-full rounded-lg pt-4 pb-3.5 shadow-lg" :class="`${current.weather && inited ? current.weather.class : 'sunny'}-${currentSpan}-card${inited && (isRainning || maxPrecipitation > 0) ? ' mt-3' : ' mt-4'}`">
      <div class="w-full" @mousedown.left="onMouseDown">
        <div class="w-full horizontal overflow-x-auto overflow-y-hidden pb-8 -mb-8" ref="horizontal" @scroll="onScroll">
          <div class="w-477.5 flex-shrink-0 overflow-hidden">
            <div class="w-500 grid grid-cols-38 -ml-11.5">
              <div/>
              <div v-for="(hour, index) in hourly" :key="`two-day-${index}`" class="text-center flex flex-col">
                <span class="text-size-sm">{{ parseFloat(convertTempTo(currentUnit, hour.temp).toFixed(1)) }}°</span>
                <WeatherIcon :icon="hour.weather.icon" :span="daySpan(new Date(hour.dt * 1000))" class="text-size-md mt-0.5"/>
                <span v-if="hour.pop !== 0" class="text-size-xs mt-0.5" :class="current.weather && inited && ((current.weather.class === 'sunny' || current.weather.class === 'cloud') && currentSpan === 'noon') ? 'text-light-blue-500' : 'text-light-blue-400'">{{ parseInt((hour.pop * 100).toFixed(0)) }}%</span>
              </div>
              <div/>
            </div>
            <div class="w-490 h-20 relative -ml-5">
              <line-chart class="!w-490 !h-20 absolute inset-0 z-10" :min="Math.min(...Object.values(twoDayTemp)) - 3" :max="Math.max(...Object.values(twoDayTemp)) + 2" :data="twoDayTemp" :dataset="{ borderColor: '#0ea5e9' }" :library="chartConfig"/>
              <line-chart class="!w-490 !h-20 absolute inset-0 z-5 opacity-20" :min="Math.min(...Object.values(twoDayTemp)) - 3" :max="Math.max(...Object.values(twoDayTemp)) + 2" :data="twoDayTemp" :dataset="{ borderColor: 'rgba(0, 0, 0, 0)', backgroundColor: '#0ea5e9', fill: true }" :library="chartConfig"/>
              <div class="w-490 h-20 absolute inset-0 z-7" :style="`background: linear-gradient(180deg, rgba(${getBgColor((current.weather && inited) ? current.weather.class : 'sunny', currentSpan)}, 0) 60%, rgba(${getBgColor((current.weather && inited) ? current.weather.class : 'sunny', currentSpan)}, 1) 100%)`"/>
            </div>
            <div class="w-500 grid grid-cols-38 -ml-11.5 mt-0.5">
              <div/>
              <div v-for="(hour, index) in hourly" :key="`two-day-${index}-bottom`" class="text-center flex flex-col">
                <span class="text-size-sm opacity-60">{{ formatTime(transformDateTime(new Date(hour.dt * 1000))) }}</span>
              </div>
              <div/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="inited" class="mt-3 w-full grid grid-cols-4 gap-x-4 gap-y-2 rounded-lg p-4 pb-3 shadow-lg" :class="`${current.weather && inited ? current.weather.class : 'sunny'}-${currentSpan}-card`">
      <div class="flex-vertical col-span-3 xs:col-span-2 -mb-0.5 pr-1">
        <h2 class="title-small flex justify-between opacity-100">
          <div class="flex justify-start items-center opacity-60">
            <div class="flex-center">
              <mdi-leaf class="text-size-xs mr-1.5 mb-0.3"/>
            </div>
            {{ $t('aqi') }}
          </div>
          <span>{{ $t(`aqi${aqi.aqi}`) }}</span>
        </h2>

        <div class="w-full h-2 rounded-full mt-2.7 grid grid-cols-5 overflow-hidden relative">
          <div class="w-full h-full bg-green-500"/>
          <div class="w-full h-full bg-yellow-400"/>
          <div class="w-full h-full bg-orange-400"/>
          <div class="w-full h-full bg-red-500"/>
          <div class="w-full h-full bg-purple-500"/>
          <div class="w-3.5 h-3.5 rounded-full absolute -top-0.75 transform -translate-x-1.75 flex justify-center items-center" :class="`${current.weather && inited ? current.weather.class : 'sunny'}-${currentSpan}-card`" :style="{ left: `${ (aqi.aqi * 2 - 1) * 10 }%` }">
            <div class="bg-current w-2 h-2 rounded-full" :class="current.weather && inited && ((current.weather.class === 'sunny' || current.weather.class === 'cloud') && currentSpan === 'noon') ? 'opacity-60' : 'opacity-90'"/>
          </div>
        </div>
      </div>

      <div class="flex-vertical -mb-0.5 xs:col-span-2">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-grain class="text-size-xs mr-1 -ml-0.5 mb-0.3"/>
          </div>
          PM<sub class="-bottom-3.5">2.5</sub>
        </h2>
        <span class="text-size-lg">{{ parseFloat(aqi.pm25.toFixed(2)) }}<span class="hidden xs:inline"> μg/m<sup>3</sup></span></span>
      </div>

      <div class="w-full h-0 border-t-2 opacity-40 border-true-gray-400 col-span-4"/>

      <div class="flex-vertical">
        <h2 class="title-small">PM<sub class="-bottom-3.5">10</sub></h2>
        <span class="text-size-lg">{{ parseFloat(aqi.pm10.toFixed(2)) }}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">CO</h2>
        <span class="text-size-lg">{{ parseFloat(aqi.co.toFixed(2)) }}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">O<sub class="-bottom-3.5">3</sub></h2>
        <span class="text-size-lg">{{ parseFloat(aqi.o3.toFixed(2)) }}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">SO<sub class="-bottom-3.5">2</sub></h2>
        <span class="text-size-lg">{{ parseFloat(aqi.so2.toFixed(2)) }}</span>
      </div>

      <div class="w-full text-size-xs col-span-4 opacity-40 -mt-0.5">
        <span>μg/m<sup>3</sup></span>&nbsp;&nbsp;•&nbsp;&nbsp;<span>{{ $t('updated', [formatTime(new Date(aqi.dt * 1000))]) }}</span>
      </div>
    </section>

    <section v-if="inited" class="mt-3 w-full grid grid-cols-2 xs:grid-cols-3 gap-2 rounded-lg p-4 pb-3 shadow-lg" :class="`${current.weather ? current.weather.class : 'sunny'}-${currentSpan}-card`">
      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-speedometer-slow class="text-size-xs mr-1.5 mb-0.3"/>
          </div>
          {{ $t('pressure') }}
        </h2>
        <span class="text-size-lg">{{ misc.pressure }} hPa</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-water-percent class="mr-1.2 -ml-0.5 mb-0.3"/>
          </div>
          {{ $t('humidity') }}
        </h2>
        <span class="text-size-lg">{{ misc.humidity }}%</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-white-balance-sunny class="text-size-xs mr-1.5 mb-0.3"/>
          </div>
          {{ $t('uvi') }}
        </h2>
        <span class="text-size-lg">{{ misc.uvi }}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-eye class="text-size-xs mr-1.5 mb-0.3"/>
          </div>
          {{ $t('visibility') }}
        </h2>
        <span class="text-size-lg">{{ parseFloat(convertDistanceTo(currentUnit, misc.visibility / 1000).toFixed(1)) }} {{ currentUnit === 'c' ? 'km' : 'mi'}}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-cloud class="text-size-xs mr-1.5 mb-0.3"/>
          </div>
          {{ $t('clouds') }}
        </h2>
        <span class="text-size-lg">{{ misc.clouds }}%</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-water class="mr-1.2 -ml-0.5 mb-0.3"/>
          </div>
          {{ $t('dew point') }}
        </h2>
        <span class="text-size-lg">{{ parseFloat(convertTempTo(currentUnit, misc.dewPoint).toFixed(1)) }} {{ currentUnit === 'c' ? '℃' : '℉'}}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-weather-windy class="text-size-xs mr-1.5 mb-0.3"/>
          </div>
          {{ $t('wind speed') }}
        </h2>
        <span class="text-size-lg">{{ parseFloat(convertSpeedTo(currentUnit, misc.windSpeed).toFixed(2)) }} {{ currentUnit === 'c' ? 'm/s' : 'mph'}}</span>
      </div>

      <div class="flex-vertical">
        <h2 class="title-small">
          <div class="flex-center">
            <mdi-windsock class="text-size-xs mr-1.5 mb-0.3"/>
          </div>
          {{ $t('wind direction') }}
        </h2>
        <span class="text-size-lg flex item-center">
          <div class="inline-flex justify-center items-center mr-0.5 -ml-0.5">
            <mdi-arrow-up :style="{ transform: `rotate(${misc.windDeg - 180}deg)` }"/>
          </div>
          {{ misc.windDeg }}°
        </span>
      </div>
    </section>

    <section v-if="inited" class="mt-3 w-full rounded-lg p-4 shadow-lg" :class="`${current.weather ? current.weather.class : 'sunny'}-${currentSpan}-card`">
      <div class="w-full overflow-y-hidden">
        <div class="w-5/6 max-w-72 px-17px mx-auto pt-2.5">
          <div class="w-full pt-half relative overflow-x-visible">
            <div class="w-full pt-full absolute inset-0 border-2 rounded-full opacity-80 border-dotted border-true-gray-400"/>
            <div class="w-full h-0 absolute top-full left-0" :style="{ transform: `rotate(${rotateDeg}deg)` }">
              <mdi-white-balance-sunny class="absolute -top-2.9 -left-2.6 text-size-xl text-yellow-400" :style="{ transform: `rotate(-${rotateDeg}deg)` }"/>
              <div class="absolute inset-0 w-0 h-0" :style="{ boxShadow: `0 0 22px 18px rgba(251, 191, 36, ${brightness})` }"/>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mx-auto border-t-2 opacity-40 border-true-gray-400"/>
      <div class="flex justify-between items-center w-5/6 max-w-72 mx-auto">
        <div class="flex flex-col items-center -mb-1">
          <mdi-weather-sunset-up class="text-size-lg mb-0.5 mt-1.5"/>
          <span class="text-size-sm opacity-70">{{ formatTime(transformDateTime(new Date(sun.sunrise * 1000))) }}</span>
        </div>
        <div class="flex flex-col items-center -mb-1">
          <mdi-weather-sunset-down class="text-size-lg mb-0.5 mt-1.5"/>
          <span class="text-size-sm opacity-70">{{ formatTime(transformDateTime(new Date(sun.sunset * 1000))) }}</span>
        </div>
      </div>
    </section>

    <section v-if="inited" class="mt-3 w-full rounded-lg p-4 shadow-lg" :class="`${current.weather ? current.weather.class : 'sunny'}-${currentSpan}-card`">
      <div class="flex justify-between items-center">
        <h2 class="flex-grow cursor-pointer" @click="uomaEnabled = !uomaEnabled">
          {{ $t('uoma') }}
        </h2>
        <Switch
          v-model="uomaEnabled"
          :class="uomaEnabled ? 'bg-green-500' : 'bg-true-gray-400 bg-opacity-50'"
          class="relative inline-flex flex-shrink-0 h-28px w-56px border-3 ml-3 border-transparent rounded-full cursor-pointer transition-all ease-in-out duration-200 outline-none focus:outline-none focus:(ring-4 ring-gray-500 ring-opacity-60)"
        >
          <span class="sr-only">{{ $t('uoma') }}</span>
          <span
            aria-hidden="true"
            :class="uomaEnabled ? 'translate-x-7' : 'translate-x-0'"
            class="pointer-events-none inline-block h-22px w-22px rounded-full bg-gray-50 shadow-md transform ring-0 transition ease-in-out duration-200"
          />
        </Switch>
      </div>
      <p class="text-size-sm opacity-50 mt-2.5">{{ $t('integration info') }}</p>
    </section>

    <footer class="w-full mt-6 mb-2 text-center text-sm opacity-50" v-if="inited">
      {{ $t('updated', [formatTime(new Date(current.dt * 1000))]) }}<br>
      <i18n-t keypath="powered" tag="span">
        <a href="https://openweathermap.org/" target="_blank" class="underline">OpenWeather</a>
      </i18n-t>&nbsp;&nbsp;•&nbsp;&nbsp;{{ $t('made by') }}
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Popover, PopoverButton, PopoverPanel, Switch } from '@headlessui/vue'
import loadData from './parts/loadData'
import weather from './parts/weather'
import time from './parts/time'
import chart from './parts/chart'
import rain from './parts/rain'

import localeTimeFormat from './locales/datetimeFormats'

const { loading, inited, sun, misc, current, hourly, precipitation, alerts, aqi, load } = loadData()
const { convertTempTo, convertSpeedTo, convertDistanceTo, currentUnit } = weather()
const { currentTime, transformDateTime, formatDate, formatTime, formatDateTime, currentTimeInMan, currentSpan, daySpan, rotateDeg, brightness } = time(sun)
const { chartConfig, twoDayTemp, onScroll, onMouseDown, onMouseUp, onMouseMove, horizontal, getBgColor } = chart(hourly, convertTempTo, currentUnit)
const { remain, remainArray, isRainning, maxPrecipitation, nextMinute } = rain(precipitation, currentTime)

const uomaEnabled = ref(false)
</script>
