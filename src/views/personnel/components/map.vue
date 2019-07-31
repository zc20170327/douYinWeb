<template>
    <div style="height: 500px;">
        <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        :plugin="plugin"
        class="amap-demo"
        :events="events">
      </el-amap>
    </div>
</template>
<script>
export default {
    data(){
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          address: '',
          lng: 0,
          lat: 0,
          // 插件
            plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
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
          ],
          events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
              // 这里通过高德 SDK 完成。
              var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });
              console.log(geocoder)
              geocoder.getAddress([lng,lat],function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.$nextTick();
                    self.$store.commit("updateaddr",{addr:result.regeocode.formattedAddress,coordinates:[lng,lat]})
                  }
                }
              });        
            }
            
          }
        }
    }
}
</script>

