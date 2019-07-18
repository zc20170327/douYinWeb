

<template>
  <div id="mapDemo" style="height: 500px;">
  	
    <el-amap ref='map' vid="amapDemo" :amap-manager="amapManager" :events="mapEvents" :zoom="zoom" :center="centerPosition" class="amap-demo">
      <el-amap-marker class="selectedMarker"
        v-for="(item, index) in datas"
        :key="index"
        :position="item.lnglat"
        topWhenClick="true"
        :extData="item"
        :content="getMarkerContent(item, 20, 20)"
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
        zoom: 12, //地图缩放级别
        tip:3,
        centerPosition: [121.5273285, 31.21515044], // 用户当前位置经纬度
        datas: [
          {
            id: 1,
            title: '1',
            level: 'A',
            lnglat: [121.5273285, 31.21515044],
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
            level: 'C',
            lnglat: [121.5293184, 31.21915044],
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
//          if (self.clickedMarker === e.target) return // 点击的是同一个Marker
//          const data = e.target.getExtData()
//          if (self.clickedMarker) { // 先恢复上次点击的Marker的样式
//            self.clickedMarker.setOffset(new AMap.Pixel(-10, -30))
//            self.clickedMarker.setContent(self.getMarkerContent(self.clickedMarker.getExtData(), 30, 30))
//          }
//          e.target.setContent(self.getMarkerContent(data, 40, 40, true))
//          e.target.setOffset(new AMap.Pixel(-18, -50))
//          self.clickedMarker = e.target
          }
        }
      }
    },
    mounted() {
//    AMap.plugin('AMap.CircleEditor', function () {//回调函数
//    })
    },
    methods: {
      getMarkerContent (item, width, height) {
      	let color1 = '#00FF00';
      	let color2 = '#FFCC00';
      	let color3 = '#FF3300';
      	let color4 = '#FFFFFF';
      	let interval = null;
      	clearInterval(interval)
      	if(item.level === 'C'){
      		interval = setInterval(() => {
      			if(this.tip == 3){
      				this.tip = 4;
      			}else if(this.tip == 4){
      				this.tip = 3
      			}
      			clearInterval(interval)
			}, 500)
      	}
      	
      	
      	
        let backgroundColor = item.level === 'A' ? color1 : (item.level === 'B' ? color2 : (this.tip==3  ? color3 : color4))
//      let backgroundColor = item.level === 'A' ? color1 : (item.level === 'B' ? color2 : color3)
        const content = `<div style="display: flex;
                                      justify-content: center;
                                      align-items: center;
                                      height: ${width}px;
                                      width: ${height}px;
                                      border-radius: 1rem;
                                      font-family: Arial-BoldMT;
                                      font-size: 16px;
                                      color: #FFFFFF;
                                      box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.30);
                                      background-color: ${backgroundColor};
                                      ">
                                      <img src="../../../public/danger.gif" style="width: 10px;height: 10px;"/>
                           </div>`
        return content
    }
    },
  }
</script>