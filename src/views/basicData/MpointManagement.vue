<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input v-model="listQuery.code" placeholder="编码" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
			<el-input v-model="listQuery.name" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
			<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
				查询
			</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
				创建监测点
			</el-button>
		</div>

		<el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
			<el-table-column label="序号" prop="id" align="center" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column label="编码" width="200px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.code}}</span>
				</template>
			</el-table-column>
			<el-table-column label="名称" width="200px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="类别" width="400px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.categoryId }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
				<template slot-scope="{row}">
					<el-button type="primary" size="mini" @click="handleUpdate(row)">
						编辑
					</el-button>
					<el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handledelete(row)">
						删除
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="">
				<template slot-scope="{row}">
					<span class="link-type"></span>
				</template>
			</el-table-column>
		</el-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

		<!--弹出框-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="0" width="65%">
			<div class="dialogBox" style="display: flex;">
				<!--表单-->
				<div style="width: 45%;height: 500px;overflow:auto;border: 1px solid gainsboro;padding:20px 10px;">
					<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
						<div id="" style="padding: 0 10px;">
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="监测点编码:" label-width="85px" prop="code">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="监测点名称:" prop="name" label-width="85px">
										<el-input v-model="temp.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="9" :xs="18" :sm="18" :md="18" :lg="18" :xl="9">
									<el-form-item label="地图等级：" label-width="85px">
										<el-input v-model="temp.level" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
									<el-button type="primary" @click="getLevel()" style="width: 100%;padding: 10px 10px;">{{btnclevel}}</el-button>
								</el-col>

								<el-col :span="9" :xs="18" :sm="18" :md="18" :lg="18" :xl="9">
									<el-form-item label="地图定位：" prop="location" label-width="85px">
										<el-input v-model="temp.location" @click="getPoint()" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
									<el-button type="primary" @click="getPoint()" style="width: 100%;padding: 10px 10px;">{{btnpoint}}</el-button>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="24">
									<el-form-item label="类别：" prop="categoryId" label-width="85px">
										<el-select v-model="temp.categoryId" placeholder="选择监测点类型" class="filter-item" style="width: 100%">
											<el-option v-for="item in mpointType" :key="item.key" :label="item.display_name" :value="item.key" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="地址：" label-width="85px">
										<el-input v-model="temp.address"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="位置描述：" label-width="85px">
										<el-input v-model="temp.description"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="省网代码：" label-width="85px">
										<el-input v-model="temp.networkCode"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
						<div id="" style="border: 1px solid gainsboro;padding: 0 10px;">
							<el-row>
								<el-col :span="24">
									<el-form-item label="主管部门：" label-width="85px">
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="部门名称：" label-width="85px">
										<el-select v-model="temp.manageDeptId" placeholder="选择部门" @change="manageChange" class="filter-item" style="width: 100%">
											<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="负责人:" label-width="85px">
										<el-input v-model="manageDpat.person"></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="职务：" label-width="85px">
										<el-input v-model="manageDpat.job"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="联系电话：" label-width="85px">
										<el-input v-model="manageDpat.tel"></el-input>
									</el-form-item>
								</el-col>
							</el-row>

						</div>
						<div id="" style="border: 1px solid gainsboro;padding: 0 10px;margin: 10px 0;">
							<el-row>
								<el-col :span="24">
									<el-form-item label="权属部门：" label-width="85px">
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="部门名称：" label-width="85px">
										<el-select v-model="temp.owershipId" placeholder="选择部门" @change="owerChange" class="filter-item" style="width: 100%">
											<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="负责人:" label-width="85px">
										<el-input v-model="owerDpat.person"></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="职务：" label-width="85px">
										<el-input v-model="owerDpat.job"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="联系电话：" label-width="85px">
										<el-input v-model="owerDpat.tel"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
						<div id="" style="border: 1px solid gainsboro;padding: 0 10px;margin: 10px 0;">
							<el-row>
								<el-col :span="24">
									<el-form-item label="上传附件：" label-width="85px">
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<!--<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
									<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
								</el-upload>-->

							</el-row>

						</div>

					</el-form>

				</div>
				<!--地图-->
				<div style="width: 55%;height: 500px;">
					<el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo" :events="events">
						</el-amap-marker>
						<el-amap-marker :position="newpoint"></el-amap-marker>
						<el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :ref="`polygon_${index}`" :path="polygon.path" :draggable="polygon.draggable" :events="polygon.events"></el-amap-polygon>
					</el-amap>

				</div>
			</div>

			<div slot="footer" class="dialog-footer" style="text-align: left;">
				<el-button @click="dialogFormVisible = false">
					取消
				</el-button>
				<el-button type="primary" @click="dialogStatus==='create'?createData():updateDatas()">
					保存
				</el-button>
			</div>
		</el-dialog>

		<el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
			<el-table :data="pvData" border fit highlight-current-row style="width: 100%">
				<el-table-column prop="key" label="Channel" />
				<el-table-column prop="pv" label="Pv" />
			</el-table>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
		</el-dialog>
	</div>
</template>

<script>
	import { fetchList, createdata, updateData } from '@/api/mpoint-management'
	import waves from '@/directive/waves' // waves directive
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination' // secondary package based on el-pagination

	const mpointType = [{
			key: 1,
			display_name: '环保监测点'
		},
		{
			key: 2,
			display_name: '水文监测点'
		},
		{
			key: 3,
			display_name: '污染源监测点'
		}
	]
	const department = [{
			id: 0,
			name: "部门0",
			person: "商君0",
			job: "职务",
			tel: "12345678910"
		},
		{
			id: 1,
			name: "部门1",
			person: "商君1",
			job: "职务",
			tel: "12345678910"
		},
		{
			id: 2,
			name: "部门2",
			person: "商君2",
			job: "职务",
			tel: "12345678910"
		},
		{
			id: 3,
			name: "部门3",
			person: "商君",
			job: "职务",
			tel: "12345678910"
		},
		{
			id: 4,
			name: "部门4",
			person: "商君",
			job: "职务",
			tel: "12345678910"
		}
	]

	export default {
		name: 'ComplexTable',
		components: {
			Pagination
		},
		directives: {
			waves
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				}
				return statusMap[status]
			},
			typeFilter(type) {
				return calendarTypeKeyValue[type]
			}
		},
		data() {
			let self = this;
			return {
				mpointType,
				department,
				btnclevel: '获取',
				btnpoint: '定位',
				listdata: [{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					},
					{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					},
					{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					},
					{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					},
					{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					},
					{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					},
					{
						id: 1,
						code: 100123,
						name: "晋江监测点",
						type: "环保监测点"
					}
				],
				parentName: "无",

				//地图参数
				btnpoint: "定位",
				btnline: "描边",
				getpoint: false,
				zoom: 12,
				center: [105.935681, 29.35842],
				address: '',
				newpoint: [105.935681, 29.35842],
				polygons: [{
					draggable: false,
					strokeColor: '409EFF',
					strokeOpacity: 0.4,
					path: [],
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
						self.lng = lng;
						self.lat = lat;
						console.log([lng, lat])
						if(self.getpoint) {
							self.newpoint = [lng, lat];
						}

					},
					zoomchange(e) {

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
				],

				tableKey: 0,
				list: null,
				total: 0,
				listLoading: false,
				listQuery: {
					page: 1,
					name: undefined,
					code: undefined
				},
				importanceOptions: [1, 2, 3],
				sortOptions: [{
					label: 'ID Ascending',
					key: '+id'
				}, {
					label: 'ID Descending',
					key: '-id'
				}],
				statusOptions: ['published', 'draft', 'deleted'],
				showReviewer: false,
				temp: {
					id: undefined,
					code: undefined,
					name: undefined,
					level: undefined,
					location: undefined,
					categoryId: undefined,
					address: undefined,
					description: undefined,
					networkCode: undefined,
					manageDeptId: undefined,
					owershipId: undefined,
					attachPath: undefined

				},
				manageDpat: {
					id: undefined,
					name: undefined,
					person: undefined,
					job: undefined,
					tel: ''
				},
				owerDpat: {
					id: undefined,
					name: undefined,
					person: undefined,
					job: undefined,
					tel: ''
				},
				dialogFormVisible: false,
				dialogStatus: '',
				textMap: {
					update: '编辑监测点信息',
					create: '创建监测点'
				},
				dialogPvVisible: false,
				pvData: [],
				rules: {
					code: [{
						required: true,
						message: '监测点编码不能为空',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '监测点名称不能为空',
						trigger: 'change'
					}],
					location: [{
						required: true,
						message: '地图定位不能为空',
						trigger: 'blur'
					}],
					categoryId: [{
						required: true,
						message: '类别不能为空',
						trigger: 'blur'
					}]
				},
				downloadLoading: false
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.listLoading = false
				fetchList(this.listQuery).then(response => {
					var datas = response.data.list;
					for(var i = 0; i < datas.length; i++) {
						for(var j = 0; j < this.mpointType.length; j++) {
							if(datas[i].categoryId == mpointType[j].key) {
								datas[i].categoryId = mpointType[j].display_name;
							}
						}
					}
					this.list = datas
					console.log(datas)
					this.total = response.data.totalRecords
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			manageChange(event) {
				for(var i = 0; i < department.length; i++) {
					if(department[i].id == event) {
						this.manageDpat = department[i]
					}
				}
			},
			owerChange(event) {
				for(var i = 0; i < department.length; i++) {
					if(department[i].id == event) {
						this.owerDpat = department[i]
					}
				}
			},

			//查询
			handleFilter() {
				this.listQuery.page = 1
				console.log(this.listQuery);
				//				this.getList()
			},
			resetTemp() {
				this.temp = {
						id: undefined,
						code: undefined,
						name: undefined,
						level: undefined,
						location: undefined,
						categoryId: undefined,
						address: undefined,
						description: undefined,
						networkCode: undefined,
						manageDeptId: undefined,
						owershipId: undefined,
						attachPath: undefined
					},
					this.manageDpat = {
						id: undefined,
						name: undefined,
						person: undefined,
						job: undefined,
						tel: ''
					},
					this.owerDpat = {
						id: undefined,
						name: undefined,
						person: undefined,
						job: undefined,
						tel: ''
					}
			},
			handleCreate() {
				this.resetTemp()
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			createData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						console.log(this.temp)
						createdata(this.temp).then(() => {
							this.list.unshift(this.temp)
							this.dialogFormVisible = false
							this.$notify({
								title: 'Success',
								message: 'Created Successfully',
								type: 'success',
								duration: 2000
							})
						})
					}
				})
			},
			handleUpdate(row) {
				console.log(row)
				this.temp = Object.assign({}, row)
				//获取主管部门数据
				var mid = row.manageDeptId
				for(var j = 0; j < department.length; j++) {
					if(department[j].id == mid) {
						this.manageDpat = department[j];
					}
				}
				//获取权属部门数据
				var oid = row.owershipId
				for(var i = 0; i < department.length; i++) {
					if(department[i].id == oid) {
						this.owerDpat = department[i];
					}
				}
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			updateDatas() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						const tempData = Object.assign({}, this.temp)
						console.log(tempData)
						for(var i = 0; i < mpointType.length; i++) {
							if(tempData.categoryId == mpointType[i].display_name) {
								tempData.categoryId = mpointType[i].key;
							}
						}

						updateData(tempData).then(() => {
							this.dialogFormVisible = false
							this.$notify({
								title: 'Success',
								message: 'Update Successfully',
								type: 'success',
								duration: 2000
							})
						})
					}
				})
			},
			//删除
			handledelete(row) {
				var statusvalue = "你确定要删除" + row.name + "数据？";
				this.$confirm(statusvalue, '删除', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(async() => {
						await deleteBasidata(row.id)
						this.$message({
							type: 'success',
							message: '删除成功'
						})
						this.treeId = row.parentId;
						this.refreshData();
					})
					.catch(err => {
						console.error(err)
					})
			},
			handleFetchPv(pv) {
				fetchPv(pv).then(response => {
					this.pvData = response.data.pvData
					this.dialogPvVisible = true
				})
			},
			handleDownload() {
				this.downloadLoading = true
				import('@/vendor/Export2Excel').then(excel => {
					const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
					const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
					const data = this.formatJson(filterVal, this.list)
					excel.export_json_to_excel({
						header: tHeader,
						data,
						filename: 'table-list'
					})
					this.downloadLoading = false
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if(j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
			},
			//获取地图信息
			getPoint() {
				this.getpoint = true;
				if(this.btnpoint == "定位") {
					this.btnpoint = "确定";
				} else {
					this.btnpoint = "定位"
					var arr = this.newpoint.join(",");
					this.temp.location = arr;
					this.getpoint = false;
				}
			},
			getLevel() {
				console.log("zoom")
				this.temp.level = this.zoom;
			}
		}
	}
</script>
<style type="text/css">
	.el-dialog__wrapper {
		display: flex;
		align-items: center;
	}
	
	.el-form-item__label {
		padding: 0;
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
</style>