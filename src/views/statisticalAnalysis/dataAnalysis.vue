<template>
	<div class="app-container" style="display: flex;padding-bottom: 0;">
		<div class="ba_left" style="width: 30%;">
			<div class="filter-container">
			</div>
			<el-table :data="listdata" border style="width: 100%;">
				<el-table-column label="序号" prop="id" align="center" width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="监测点" width="150px" align="center">
					<template slot-scope="scope">
						<span class="link-type">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="图表" min-width="80" align="center">
					<template slot-scope="{row}">
						<el-button type="primary" size="mini" @click="showEcharts(row)">
							<svg-icon icon-class="eye-open" />
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" @pagination="getList" />
		</div>
		<div class="boards" :style="contentStyleObj"></div>
		<div class="ba_right">
			<div :class="[dialogFormVisible?'showCharts':'hiddenCharts']">
				<div id="gaugeContainer" style="width:500px; height:500px"></div>
			</div>

		</div>
	</div>
</template>
<script>
	import { fetchList, deleteBasidata, createBasicdata, getTreeDatas, getIdlist, updateData } from '@/api/basic-data'
	import Pagination from './components/pagination'
	const echarts = require('echarts');
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				options: {
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
								show: false
							},
							saveAsImage: {
								show: true
							}
						}
					},
					series: [{
						name: "指标",
						type: "gauge",
						min:0,
						max:10,
						detail: {
							formatter: "{value}"
						},
						data: [{
							value: 5,
							name: "工作比"
						}]
					}]
				},
				listdata: [{
						id: 1,
						name: "晋江监测点",
						time: "2019-07-15",
						target: "石油类",
						mvalue: "1",
						svalue: "1",
						company: "mg/L",
						status: 1,
						multiple: "2"
					},
					{
						id: 1,
						name: "晋江监测点",
						time: "2019-07-15",
						target: "石油类",
						mvalue: "1",
						svalue: "1",
						company: "mg/L",
						status: 1,
						multiple: "2"
					},
					{
						id: 1,
						name: "晋江监测点",
						time: "2019-07-15",
						target: "石油类",
						mvalue: "1",
						svalue: "1",
						company: "mg/L",
						status: 1,
						multiple: "2"
					},
					{
						id: 1,
						name: "晋江监测点",
						time: "2019-07-15",
						target: "石油类",
						mvalue: "1",
						svalue: "1",
						company: "mg/L",
						status: 1,
						multiple: "2"
					}
				],
				contentStyleObj: {
					height: ''
				},
				tableKey: 0,
				list: null,
				total: 0,
				listLoading: true,
				nodeData: null,
				listQuery: {
					pageIndex: 1

				},
				dialogFormVisible: false,
				dialogStatus: '',
				dialogPvVisible: false,
				downloadLoading: false,

				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		created() {
			this.getList(),
			this.getHeight(),
			window.onresize = function() {
					var h = window.innerHeight;
					console.log(h)
					that.contentStyleObj.height = (h - 84) + 'px';
				}
		},
		methods: {
			//	//读取表格数据
			getList() {
				this.listLoading = false
				fetchList(this.listQuery).then(response => {
					console.log(response.data.list)
					this.list = response.data.list;
					this.total = response.data.list.length;
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},

			//查看图表
			showEcharts(row) {
				this.dialogFormVisible = true
				console.log(this.options.series)
				console.log(row)
			},

			//获取分割线高度
			getHeight() {
				var h = window.innerHeight;
				this.contentStyleObj.height = (h - 84) + 'px';
			},

		},
		mounted() {
			let myChart = echarts.init(document.getElementById('gaugeContainer'))
			myChart.setOption(this.options);
		}
	}
</script>

<style>
	.ba_right {
		float: right;
		width: 70%;
		height: 100%;
		padding-left: 10px;
	}
	
	.ba_left {
		float: left;
		height: 100%;
		padding-right: 20px;
		display: block;
	}
	
	.vertical_left {
		width: 99%;
		float: left;
	}
	
	.boards {
		width: 2px;
		height: 100%;
		float: left;
		background: #304156;
		margin-top: -20px;
	}
	
	.el-dialog__wrapper {
		display: flex;
		align-items: center;
	}
	
	.el-dialog__header {
		padding: 20px;
		background: #1890ff;
	}
	
	.el-dialog__title {
		color: white;
	}
	
	.el-dialog__body {
		padding: 10px 20px;
	}
	
	.el-dialog__headerbtn .el-dialog__close {
		color: white;
	}
	
	.el-dialog__headerbtn .el-dialog__close:hover {
		color: #909399;
	}
	.showCharts{
		display: block;
	}
	.hiddenCharts{
		display: none;
	}
</style>