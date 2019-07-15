<template>
	<div>
		<div id="gaugeContainer" style="width:500px; height:500px"></div>
	</div>
</template>

<script>
	const echarts = require('echarts');
	export const option = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		series: [{
			//类型
        type: "gauge",
        min: 0,
        max: 1000,
        //半径
        radius: 150,
        //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        //结束角度。
        endAngle: 0,
        center: ["50%", "90%"],
        //仪表盘轴线相关配置。
        axisLine: {
          show: true,
          // 属性lineStyle控制线条样式
          lineStyle: {
            width: 20,
            color: [[1, "#63869e"]]
          }
        },
        //分隔线样式。
        splitLine: {
          show: false
        },
        //刻度样式。
        axisTick: {
          show: false
        },
        //刻度标签。
        axisLabel: {
          show: false
        },
        //仪表盘指针。
        pointer: {
          //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
          show: false,
          //指针长度
          length: "90%",
          width: 0
        },
        //仪表盘标题。
        title: {
          show: true,
          offsetCenter: [0, "-40%"], // x, y，单位px
          textStyle: {
            color: "#hhh",
            fontSize: 30
          }
        },
        //仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: [0, "-10%"],
          formatter: "风险水平",
          textStyle: {
            fontSize: 30
          }
        },
        data: [
          {
            value: 0,
            name: "低"
          }
        ]
		}]
	}
	export default {
		name: '',
		data() {
			return {

			}
		},
		mounted() {
			let myChart = echarts.init(document.getElementById('gaugeContainer'))
			myChart.setOption(option);
		}
	}
</script>

<style scoped>

</style>