<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import js from './js.json'
import cz from './cz.json'
import dark from './assets/5.png'
import light from './assets/6.png'
import mark from './assets/1.png'
import container from './assets/4.png'

const czData = [
  {
    name: '中天钢铁',
    datas: 6830,
    value: [120.090687, 31.708498],
    img: `image://${mark}`,
  },
  {
    name: '梅特勒托利多',
    datas: 6340,
    value: [119.94007, 31.833081],
    img: `image://${mark}`,
  },
  {
    name: '森萨塔',
    datas: 6340,
    value: [119.998346, 31.872191],
    img: `image://${mark}`,
  },
  {
    name: '博世常州',
    datas: 5230,
    value: [119.921002, 31.661418],
    img: `image://${mark}`,
  },
  {
    name: '力强水泥',
    datas: 3450,
    value: [119.267095, 31.429276],
    img: `image://${mark}`,
  },
  {
    name: '金峰水泥',
    datas: 3200,
    value: [119.32035, 31.390245],
    img: `image://${mark}`,
  },
  {
    name: '戚墅堰机车厂',
    datas: 2800,
    value: [120.063434, 31.744933],
    img: `image://${mark}`,
  },
  {
    name: '国能发电',
    datas: 2710,
    value: [120.000567, 31.960892],
    img: `image://${mark}`,
  },
  {
    name: '润鑫水泥',
    datas: 2540,
    value: [120.029372, 31.520694],
    img: `image://${mark}`,
  },
  {
    name: '华狮化工',
    datas: 2290,
    value: [119.973042, 31.843728],
    img: `image://${mark}`,
  },
  {
    name: '新东化工',
    datas: 2100,
    value: [119.990272, 31.964624],
    img: `image://${mark}`,
  },
  {
    name: '第四药厂',
    datas: 1900,
    value: [120.039684, 31.732265],
    img: `image://${mark}`,
  },
  {
    name: '巨邦制药',
    datas: 1820,
    value: [119.467831, 31.468768],
    img: `image://${mark}`,
  },
]
const originalData = [
  {
    name: '南京市',
    value: [118.796624, 32.059344],
    datas: 1354,
    img: `image://${mark}`,
  },
  {
    name: '常州市',
    value: [119.974092, 31.811313],
    datas: 1402,
    img: `image://${mark}`,
  },
  {
    name: '无锡市',
    value: [120.311889, 31.491064],
    datas: 2468,
    img: `image://${mark}`,
  },
  {
    name: '徐州市',
    value: [117.283752, 34.204224],
    datas: 768,
    img: `image://${mark}`,
  },
  {
    name: '泰州市',
    value: [119.980546, 32.528857],
    datas: 589,
    img: `image://${mark}`,
  },
  {
    name: '苏州市',
    value: [120.585294, 31.299758],
    datas: 1500,
    img: `image://${mark}`,
  },
]

let myChart = null
let option = ref({})
let map_name = ref('js')
let mapData = ref(originalData)
let visible = ref(false)
let show_back_btn = ref(false)
onMounted(() => {
  myChart = echarts.init(document.getElementById('chart'), 'dark')
  myChart.showLoading('default', {
    text: '统计中，请稍候...',
    maskColor: '#2957A2',
    textColor: '#fff',
  })
  myChart.on('click', handleClick)
  setTimeout(initMap(js), 250)
})

function back() {
  show_back_btn.value = false
  map_name.value = 'js'
  mapData.value = originalData
  initMap(js)
}

function handleClick(params) {
  if (params.seriesType === 'scatter') {
    visible.value = true
    
    console.log(params)
  } else {
    show_back_btn.value = true
    map_name.value = 'cz'
    mapData.value = czData
    initMap(cz)
  }
}

function initMap(geojson) {
  echarts.registerMap(map_name.value, geojson)
  myChart.hideLoading()

  option.value = {
    backgroundColor: '#2957A2',
    title: {
      top: 20,
      text: '江苏省',
      subtext: '',
      x: 'center',
      textStyle: {
        color: '#fff',
        fontWeight: 100,
        fontSize: 14,
      },
    },
    geo: {
      map: map_name.value,
      aspectScale: 0.7,
      layoutCenter: ['49%', '51%'],
      layoutSize: '90%',
      silent: true,
      roam: false,
      z: 0,
      itemStyle: {
        areaColor: 'rgba(0, 15, 40, 0.5)',
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 5,
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 0.5,
      },
      emphasis: {
        itemStyle: {
          areaColor: '#2AB8FF',
          borderWidth: 1,
          color: 'green',
          label: {
            show: false,
          },
        },
      },
    },
    series: [
      {
        type: 'map',
        roam: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
            },
          },
          emphasis: {
            textStyle: {
              color: '#fff',
            },
          },
        },
        itemStyle: {
          borderColor: '#2ab8ff',
          borderWidth: 1,
          areaColor: {
            image: dark,
            repeat: 'repeat',
          },
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: {
              image: light,
              repeat: 'repeat',
            },
            borderColor: '#2ab8ff',
            borderWidth: 1,
            shadowColor: 'rgba(0, 255, 255, 0.7)',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 1,
            label: {
              show: false,
            },
          },
        },
        select: {
          label: {
            show: true,
            color: '#fff',
          },
          itemStyle: {
            areaColor: '#d64f44',
          },
        },
        zoom: 1.1,
        roam: false,
        map: map_name.value,
      },
      {
        tooltip: {
          show: false,
        },
        type: 'effectScatter',
        coordinateSystem: 'geo',
        rippleEffect: {
          scale: 10,
          brushType: 'stroke',
        },
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            shadowColor: '#0ff',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            color: function (params) {
              let index = params.dataIndex > 5 ? 5 : params.dataIndex
              var colorList = [
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#64fbc5',
                  },
                  {
                    offset: 1,
                    color: '#018ace',
                  },
                ]),
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#64fbc5',
                  },
                  {
                    offset: 1,
                    color: '#018ace',
                  },
                ]),
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#168e6d',
                  },
                  {
                    offset: 1,
                    color: '#c78d7b',
                  },
                ]),
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#61c0f1',
                  },
                  {
                    offset: 1,
                    color: '#6f2eb6',
                  },
                ]),
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#168e6d',
                  },
                  {
                    offset: 1,
                    color: '#c78d7b',
                  },
                ]),
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#61c0f1',
                  },
                  {
                    offset: 1,
                    color: '#6f2eb6',
                  },
                ]),
              ]
              return colorList[index]
            },
          },
        },
        label: {
          normal: {
            color: '#fff',
          },
        },
        symbol: 'circle',
        symbolSize: [10, 5],
        data: mapData.value,
        zlevel: 1,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        itemStyle: {
          color: '#f00',
        },
        symbol: function (value, params) {
          return params.data.img
        },
        symbolSize: [32, 41],
        symbolOffset: [0, -20],
        z: 9999,
        data: mapData.value,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              var name = params.name
              var value = params.data.datas
              var text = `{fline|${name}}\n{tline|${value}}`
              return text
            },
            color: '#fff',
            rich: {
              fline: {
                padding: [0, 25],
                color: '#fff',
                textShadowColor: '#030615',
                textShadowBlur: '0',
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                fontSize: 14,
                fontWeight: 400,
              },
              tline: {
                padding: [0, 27],
                color: '#ABF8FF',
                fontSize: 12,
              },
            },
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          color: '#00FFF6',
        },
        symbol:`image://${container}`,
        symbolSize: [100, 50],
        symbolOffset: [0, -60],
        z: 999,
        data: mapData,
      },
    ],
  }
  myChart.setOption(option.value, true)
}
// onMounted(() => {
//   initMap()
// })
</script>

<template>
  <div id="chart" style="height: 100vh; width: 100wh"></div>
  <a-button
    v-if="show_back_btn"
    type="primary"
    style="position: absolute; top: 10px; left: 10px"
    @click="back"
    >返回</a-button
  >
</template>
<style>
  
</style>