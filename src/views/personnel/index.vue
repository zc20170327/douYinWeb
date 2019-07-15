<style scoped>
.amap-page-container{
  float: right;
  width: 50%;
}
.amap-page-container_left{
    float: left;
    width: 50%;
}
.map_top{
    width: 100%;
    height: 100px;
    float: left;
    margin-top: 50px;
    border: 1px wheat solid;
    margin-bottom: 100px
}
.container_left{
    float: left;
    width: 100%;
}
</style>
<template>
    
    <div class="amap-page-container">
      <map_right></map_right>
    </div>
   
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
  import map_right from "./components/map"
    export default {
      data() {
        let self = this;
        return {
          
        };
      },
      methods:{
        
      },
      created(){
        
      },
      components:{
          map_right
      }
    };
</script>