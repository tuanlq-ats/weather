<template>
  <div id="app">
    <div class="container">
      <div class="search-bar">
        <font-awesome-icon icon="search" class="search-icon" />
        <input
          type="text"
          v-model="city"
          class="search-input"
          placeholder="Tìm kiếm"
          @change="getAPI"
        />
      </div>

      <div>
        <div class="time">
          <span>{{ time }}</span>
        </div>
        <div class="hour">
          <span>{{ time1 }}</span>
        </div>
        <div v-if="data.name" class="address">{{ data.name }}</div>
        <div v-else class="address">- -</div>
      </div>

      <div>
        <img class="image" :src="srcImage" />
        <p class="temperature">{{ temperature }}</p>
        <span class="current-day">{{ time2 }}</span>
        <p class="line"></p>
      </div>

      <div class="footer">
        <div class="footer-left">
          <p class="font-bold">
            MT Mọc: <span class="font-nomal">{{ sunrise }}</span>
          </p>
          <p class="font-bold">
            Độ ẩm: <span class="font-nomal">{{ humidity }}%</span>
          </p>
        </div>
        <div class="footer-right">
          <p class="font-bold">
            MT Lặn: <span class="font-nomal">{{ sundown }}</span>
          </p>
          <p class="font-bold">
            Gió: <span class="font-nomal">{{ wind }} m/s</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { ref, computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const city = ref('');
    const data = ref({});
    
    const getAPI = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city.value,
            appid: '24c2d68cdad8b966d3d70fd77cf629ce',
            units: 'metric',
            lang: 'vi',
          },
        });
        data.value = response.data;
      } catch (e) {
        console.error(e);
        data.value = {};
      }
    };

    const srcImage = computed(() => {
      if (data.value.weather && data.value.weather[0]) {
        return `http://openweathermap.org/img/wn/${data.value.weather[0].icon}@2x.png`;
      }
      return 'http://openweathermap.org/img/wn/10d@2x.png';
    });

    const sunrise = computed(() => {
      if (data.value.sys && data.value.sys.sunrise) {
        return moment.unix(data.value.sys.sunrise).format('H:mm');
      }
      return '6:16';
    });

    const sundown = computed(() => {
      if (data.value.sys && data.value.sys.sunset) {
        return moment.unix(data.value.sys.sunset).format('H:mm');
      }
      return '6:00';
    });

    const humidity = computed(() => {
      if (data.value.main && data.value.main.humidity) {
        return data.value.main.humidity;
      }
      return '80';
    });

    const wind = computed(() => {
      if (data.value.wind && data.value.wind.speed) {
        return ((data.value.wind.speed) * 3.6).toFixed(2);
      }
      return '19.54';
    });

    const time = computed(() => {
      return moment().locale('vi').format('dddd, Do MMMM');
    });

    const time1 = computed(() => {
      return moment().locale('vi').format('hh:mm');
    });

    const time2 = computed(() => {
      return moment().locale('vi').format('dddd');
    });

    const temperature = computed(() => {
      if (data.value.main && data.value.main.temp) {
        return Math.round(data.value.main.temp);
      }
      return 23;
    });

    return {
      city,
      data,
      getAPI,
      srcImage,
      sunrise,
      sundown,
      humidity,
      wind,
      time,
      time1,
      time2,
      temperature,
    };
  },
};
</script>

<style>
/* CSS styles as before */
</style>
