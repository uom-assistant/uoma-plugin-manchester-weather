<template>
  <div class="flex-center">
    <mdi-weather-lightning-rainy v-if="icon === 'weather-lightning-rainy'"/>
    <mdi-weather-lightning v-if="icon === 'weather-lightning'"/>
    <mdi-weather-rainy v-if="icon === 'weather-rainy'"/>
    <mdi-weather-pouring v-if="icon === 'weather-pouring'"/>
    <mdi-weather-snowy-rainy v-if="icon === 'weather-snowy-rainy'"/>
    <mdi-weather-snowy v-if="icon === 'weather-snowy'"/>
    <mdi-weather-snowy-heavy v-if="icon === 'weather-snowy-heavy'"/>
    <mdi-weather-hazy v-if="icon === 'weather-hazy'"/>
    <mdi-weather-fog v-if="icon === 'weather-fog'"/>
    <mdi-weather-windy v-if="icon === 'weather-windy'"/>
    <mdi-weather-tornado v-if="icon === 'weather-tornado'"/>
    <mdi-white-balance-sunny v-if="icon[0] === 'white-balance-sunny' && (span === 'morning' || span === 'noon' || span === 'evening')"/>
    <mdi-weather-night v-if="icon[1] === 'weather-night' && span === 'night'"/>
    <mdi-weather-partly-cloudy v-if="icon[0] === 'weather-partly-cloudy' && (span === 'morning' || span === 'noon' || span === 'evening')"/>
    <mdi-weather-night-partly-cloudy v-if="icon[1] === 'weather-night-partly-cloudy' && span === 'night'"/>
    <mdi-cloud-outline v-if="icon === 'cloud-outline'"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherIcon',
  props: {
    icon: {
      type: [String, Array],
      required: true
    },
    span: {
      type: String,
      required: true
    }
  }
})
</script>
