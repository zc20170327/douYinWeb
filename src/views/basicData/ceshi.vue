

<template>
  <div id="mapDemo" :style="contentStyleObj">
  	
    <el-amap ref='map' vid="amapDemo" :amap-manager="amapManager" :events="mapEvents" :zoom="zoom" :plugin="plugin" :center="centerPosition" class="amap-demo">
        <el-amap-info-window
          :position="currentWindow.position"
          :content="currentWindow.content"
          :visible="currentWindow.visible"
          :autoMove="false"
          :events="currentWindow.events">
        </el-amap-info-window>
     
     <el-amap-marker class="selectedMarker"
        v-for="(item, index) in datas"
        :key="index"
        :position="item.position"
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
      	contentStyleObj: {
					height: ''
				},
        amapManager,
        zoom: 12, 
        tip:3,
        centerPosition: [105.935681, 29.35842], 
        currentWindow: {
            position: [0, 0],
            content: '',
            events: {},
            visible: false
        },
        datas: [
          {
            id: 1,
            title: '1',
            level: 'A',
            position: [105.935681, 29.35842],
            content: 'Hi! I am here!',
            visible: true
          },
          {
            id: 2,
            title: '1',
            level: 'B',
            position: [105.945681, 29.37842],
            content: 'Hi! I am here!',
            visible: true
          },
          {
            id: 3,
            title: '2',
            level: 'C',
            position: [105.955681, 29.39842],
            content: 'Hi! I am here!',
            visible: true
          }
        ],
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
        	mouseover(e){
        		const datas = e.target.getExtData();
        		self.currentWindow.visible = false;
          	self.$nextTick(() => {
            	self.currentWindow = datas;
            	self.currentWindow.visible = true;
          	});
        	}
        },
        plugin: [{
						pName: 'Geolocation',
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {
									if(result && result.position) {
										self.lng = result.position.lng;
										self.lat = result.position.lat;
										self.center = [self.lng, self.lat];
										self.loaded = true;
									}
								});
							}
						}
					},
					{
						pName: 'MapType',
						defaultType: 0,
						events: {
							init(instance) {
								console.log(instance);
							}
						}
					},
					{
						pName: 'ToolBar',
						events: {
							init(instance) {
								console.log(instance);
							}
						}
					}
				]
      }
    },
    created() {
			let that = this
			this.getHeight(),
				window.onresize = function() {
					var h = window.innerHeight;
					console.log(h)
					that.contentStyleObj.height = (h - 84) + 'px';
				}

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
//    		interval = setInterval(() => {
//    			if(this.tip == 3){
//    				this.tip = 4;
//    			}else if(this.tip == 4){
//    				this.tip = 3
//    			}
//    			clearInterval(interval)
//					}, 500)
      	}
        let backgroundColor = item.level === 'A' ? color1 : (item.level === 'B' ? color2 : (this.tip==3  ? color3 : color4))
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
                           </div>`
        return content
    	},
    	getHeight() {
				var h = window.innerHeight;
				console.log(h)
				this.contentStyleObj.height = (h - 84) + 'px';
			}
    	
    },
  }
</script>