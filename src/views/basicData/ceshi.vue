<template>
  <div id="mapDemo" style="height: 600px;">
    <el-amap ref='map' vid="amapDemo" :amap-manager="amapManager" :events="mapEvents" :zoom="zoom" :center="centerPosition" class="amap-demo">
      <el-amap-marker class="selectedMarker"
        v-for="(item, index) in datas"
        :key="index"
        :position="item.lnglat"
        topWhenClick="true"
        :extData="item"
        :content="getMarkerContent(item, 30, 30)"
        :events="markerEvents">
      </el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
  import { AMapManager } from 'vue-amap'
  let amapManager = new AMapManager()
  export default {
    data() {
      let self = this
      return {
        amapManager,
        zoom: 18, //地图缩放级别
        centerPosition: [121.5273285, 31.21515044], // 用户当前位置经纬度
        datas: [
          {
            id: 1,
            title: '1',
            level: 'A',
            lnglat: [121.5273285, 31.21515044],
          },
          {
            id: 2,
            title: '2',
            level: 'A',
            lnglat: [121.5253184, 31.21515044],
          },
          {
            id: 3,
            title: '3',
            level: 'A',
            lnglat: [121.5253184, 31.21315044],
          },
          {
            id: 4,
            title: '4',
            level: 'A',
            lnglat: [121.5253184, 31.21715044],
          },
          {
            id: 5,
            title: '5',
            level: 'A',
            lnglat: [121.5233184, 31.21515044],
          },
          {
            id: 6,
            title: '6',
            level: 'A',
            lnglat: [121.5233184, 31.21715044],
          },
          {
            id: 7,
            title: '1',
            level: 'B',
            lnglat: [121.5283285, 31.21815044],
          },
          {
            id: 8,
            title: '2',
            level: 'B',
            lnglat: [121.5293184, 31.21915044],
          },
          {
            id: 9,
            title: '3',
            level: 'B',
            lnglat: [121.5263184, 31.21615044],
          },
          {
            id: 10,
            title: '4',
            level: 'B',
            lnglat: [121.5223184, 31.21915044],
          },
          {
            id: 11,
            title: '5',
            level: 'B',
            lnglat: [121.5203184, 31.21515044],
          },
          {
            id: 12,
            title: '6',
            level: 'B',
            lnglat: [121.5233184, 31.21015044],
          },
          {
            id: 13,
            title: '1',
            level: 'C',
            lnglat: [121.5203285, 31.21815044],
          },
          {
            id: 14,
            title: '2',
            level: 'C',
            lnglat: [121.5293184, 31.21015044],
          },
          {
            id: 15,
            title: '3',
            level: 'C',
            lnglat: [121.5263184, 31.21315044],
          },
          {
            id: 16,
            title: '4',
            level: 'C',
            lnglat: [121.5223184, 31.21415044],
          },
          {
            id: 17,
            title: '5',
            level: 'C',
            lnglat: [121.5243184, 31.21915044],
          },
          {
            id: 18,
            title: '6',
            level: 'C',
            lnglat: [121.5203184, 31.20995044],
          },
          {
            id: 19,
            title: '7',
            level: 'C',
            lnglat: [121.5103184, 31.20995044],
          }
        ],
        clickedMarker: null, // 保存当前点击的Marker
        mapEvents: {
          init(o) {
            // o 为地图组件实例
          },
          complete () {
            const map = self.amapManager.getMap() // 获取地图组件实例
            // setFitView(overlayList:Array)
            // 根据地图上添加的覆盖物分布情况，
            // 自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层
            map.setFitView()
          }
        },
        markerEvents: {
          click(e) {
            if (self.clickedMarker === e.target) return // 点击的是同一个Marker
            const data = e.target.getExtData()
            if (self.clickedMarker) { // 先恢复上次点击的Marker的样式
              self.clickedMarker.setOffset(new AMap.Pixel(-10, -30))
              self.clickedMarker.setContent(self.getMarkerContent(self.clickedMarker.getExtData(), 30, 30))
            }
            e.target.setContent(self.getMarkerContent(data, 40, 40, true))
            e.target.setOffset(new AMap.Pixel(-18, -50))
            self.clickedMarker = e.target
          }
        }
      }
    },
    mounted() {
      AMap.plugin('AMap.CircleEditor', function () {//回调函数
      })
    },
    methods: {
      getMarkerContent (item, width, height, isRotate = false) {
        const bgRoate = isRotate ? 'transform: rotate(45deg);' : ''
        const txRotate = isRotate ? 'transform: rotate(-45deg);' : ''
        let backgroundColor = item.level === 'A' ? '#FF8100' : (item.level === 'B' ? '#8D3ECD' : '#2DCD72')
        if ( isRotate ) {
          backgroundColor = '#0893FF'
        }
        const content = `<div style="display: flex;
                                      justify-content: center;
                                      align-items: center;
                                      height: ${width}px;
                                      width: ${height}px;
                                      border-radius: 5rem;
                                      ${bgRoate}
                                      font-family: Arial-BoldMT;
                                      font-size: 16px;
                                      color: #FFFFFF;
                                      box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.30);
                                      background-color: ${backgroundColor};">
                                         <div style="${txRotate}"> ${item.title} </div>
                           </div>`
        return content
      }
    },
  }
</script>