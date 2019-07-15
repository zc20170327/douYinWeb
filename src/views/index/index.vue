<template>
	<div style="height: 700px;">
		<el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo" :events="events">
		</el-amap-marker>
			<el-amap-marker :position="[lng, lat]"></el-amap-marker>
			<el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :ref="`polygon_${index}`" :path="polygon.path" :draggable="polygon.draggable" :events="polygon.events"></el-amap-polygon>
		</el-amap>
	</div>
</template>
<script>
	export default {

		data() {
			let self = this;
			return {
				zoom: 12,
				center: [105.935681, 29.35842],
				address: '',
				lng: 105.935681,
				lat: 29.35842,
				polygons: [{
					draggable: false,
					strokeColor: '409EFF',
					strokeOpacity: 0.4,
					path: [
						//							[105.948472, 29.371798],
						//							[105.89972, 29.34367],
						//							[105.939546, 29.315535],
						//							[105.948472, 29.371798]
					],
					events: {
						click: (e) => {
							alert('click polygon');
							console.log(e)
							console.log(self.$refs.polygon_0[0].$$getPath())
						}
					}
				}],
				events: {
					click(e) {
						let {
							lng,
							lat
						} = e.lnglat;
//						self.lng = lng;
//						self.lat = lat;

//						var points = [self.lng, self.lat]
//						self.polygons[0].path.push(points)
//						console.log(self.polygons[0].path)

						// 这里通过高德 SDK 完成。
						//						var geocoder = new AMap.Geocoder({
						//							radius: 1000,
						//							extensions: "all"
						//						});
						//						geocoder.getAddress([lng, lat], function(status, result) {
						//							if(status === 'complete' && result.info === 'OK') {
						//								if(result && result.regeocode) {
						//									self.address = result.regeocode.formattedAddress;
						//									self.$nextTick();
						//								}
						//							}
						//						});
					},
					zoomchange(e) {
						console.log(self.zoom)
						console.log("zoomchange")
					}
				},
				// 插件
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
			};
		},
		created() {
			this.getHeight()
			
		},
			
		methods: {
			getHeight() {
				var h = window.innerHeight;
				alert(h)
			}
		}

	}
</script>