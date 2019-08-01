<template>
	<div class="app-container">

		<div class="dialogBox" style="display: flex;" :style="contentStyleObj">
			<!--表单-->
			<div style="width: 45%;overflow:auto;border: 1px solid gainsboro;padding:20px 10px;">
				<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
					<div id="" style="border: 1px solid gainsboro;padding: 0 10px 10px 10px;margin: 10px 0;">
						<el-row>
							<el-col :span="24">
								<el-form-item label="操作处理：" class="el-margin-bottom">
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="3">
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
								<el-input v-model="temp.code" placeholder="时限"></el-input>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
									<el-select v-model="temp.resource" placeholder="请选择" class="filter-item" style="width: 100%">
										<el-option v-for="item in mpointType" :key="item.key" :label="item.display_name" :value="item.key" />
									</el-select>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
									<el-select v-model="temp.resource" placeholder="部门" class="filter-item" style="width: 100%">
										<el-option v-for="item in mpointType" :key="item.key" :label="item.display_name" :value="item.key" />
									</el-select>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
								<el-button type="default" size="medium" class="btnWidth">派遣</el-button>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
								<el-button type="default" size="medium" class="btnWidth">不派遣</el-button>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
								<el-button type="default" size="medium" class="btnWidth">申请核实</el-button>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
								<el-button type="default" size="medium" class="btnWidth">不立案</el-button>
							</el-col>
							<el-col :span="3" :xs="6" :sm="6" :md="6" :lg="4" :xl="3">
								<el-button type="default" size="medium" class="btnWidth">案卷编辑</el-button>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;">
							<el-input v-model="temp.description" type="textarea" placeholder="处理意见" />
						</el-row>
					</div>
					<div id="" style="padding: 0 10px;">
						<el-row :gutter="10">
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="案卷编号:" label-width="85px" prop="code">
									<el-input v-model="temp.code" disabled placeholder="自动生成"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="问题来源：" prop="categoryId" label-width="85px">
									<el-select v-model="temp.resource" placeholder="选择问题来源" class="filter-item" style="width: 100%">
										<el-option v-for="item in mpointType" :key="item.key" :label="item.display_name" :value="item.key" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="问题类型：" label-width="85px">
									<el-select v-model="temp.categoryId" placeholder="选择问题类型" class="filter-item" style="width: 100%">
										<el-option v-for="item in mpointType" :key="item.key" :label="item.display_name" :value="item.key" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="事发位置：" label-width="85px">
									<el-input v-model="temp.address"></el-input>
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
								<el-form-item label="所属流域：" label-width="85px">
									<el-select v-model="temp.categoryId" placeholder="选择所属流域" class="filter-item" style="width: 100%">
										<el-option v-for="item in mpointType" :key="item.key" :label="item.display_name" :value="item.key" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="河段长工号：" label-width="85px" class="el-margin-bottom">
									<el-select v-model="temp.owershipId" placeholder="选择部门" @change="owerChange" class="filter-item" style="width: 100%">
										<el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="呼入号码:" label-width="85px" class="el-margin-bottom">
									<el-input v-model="owerDpat.person"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="河段长姓名：" label-width="85px" class="el-margin-bottom">
									<el-input v-model="owerDpat.person"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="举报人姓名:" label-width="85px" class="el-margin-bottom">
									<el-input v-model="owerDpat.person"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="河段长电话：" label-width="85px">
									<el-input v-model="owerDpat.person"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
								<el-form-item label="举报人电话:" label-width="85px">
									<el-input v-model="owerDpat.person"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="备注" class="el-margin-bottom">
									<el-input v-model="temp.description" :autosize="{ minRows: 4, maxRows: 4}" type="textarea" placeholder="备注" />
								</el-form-item>
							</el-col>
						</el-row>

					</div>
					<div id="" style="border: 1px solid gainsboro;padding: 0 10px;margin: 10px 0;">
						<el-row>
							<el-col :span="24">
								<el-form-item label="上传附件：" label-width="85px" class="el-margin-bottom">
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<div class="grid-content">
								<div class="upload_title" id="upload">
									<el-col :span="6">
										<Upload ref="upload" :before-upload="handleUpload" :on-success="uploadSuccess" :show-upload-list="true" action="http://172.2.15.111:8088/v1/fileUpload?tempId=1569840" multiple style="float: left;width:auto">
											<el-button type="primary" size="mini" id="ive-upload-input">选择文件<i class="el-icon-search el-icon--right" style="color: #fff;"></i>
											</el-button>
										</Upload>

									</el-col>
									<el-col :span="12">
										<p>未选择文件</p>
									</el-col>

									<el-col :span="6">
										<el-button type="primary" size="mini" style="float: right;" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
									</el-col>
								</div>

								<el-table :data="tableData" style="width: 100%">

									<el-table-column prop="number" label="序号" width="50" align="center">
									</el-table-column>

									<el-table-column prop="state" label="状态" width="80" align="center">
									</el-table-column>

									<el-table-column prop="name" label="名称" width="160" :show-overflow-tooltip="true" align="center">
									</el-table-column>

									<el-table-column prop="rom" label="大小" width="90" align="center">
									</el-table-column>

									<el-table-column align="center" label="操作" width="90">
										<el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small" style="margin-right: 4px;">
											编辑
										</el-button>|
										<el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small" style="margin-left:0 ;">
											移除
										</el-button>
									</el-table-column>

								</el-table>

							</div>

						</el-row>

					</div>
					<div align="right">
						<el-button @click="closeWindow('/basicData/ceshi')">
							取消
						</el-button>
						<el-button type="primary" @click="dialogStatus==='create'?createData():updateDatas()">
							保存
						</el-button>
					</div>

				</el-form>

			</div>
			<!--地图-->
			<div style="width: 55%;">
				<el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo" :events="events">
					</el-amap-marker>
					<el-amap-marker :position="newpoint"></el-amap-marker>
					<el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :ref="`polygon_${index}`" :path="polygon.path" :draggable="polygon.draggable" :events="polygon.events"></el-amap-polygon>
				</el-amap>

			</div>
		</div>
		<div id="" style="border: 1px solid gainsboro;padding: 0 10px;margin: 10px 0;">
			<div class="labelTip">历史处理记录</div>
			<el-table :key="tableKey" v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%;">
			<el-table-column label="序号" prop="id" align="center" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.number }}</span>
				</template>
			</el-table-column>
			<el-table-column label="状态" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.docket_number}}</span>
				</template>
			</el-table-column>
			<el-table-column label="处理意见" width="300px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.source}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.type}}</span>
				</template>
			</el-table-column>
			<el-table-column label="负责人" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.address}}</span>
				</template>
			</el-table-column>
			<el-table-column label="处理时间" width="200px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
				</template>
			</el-table-column>
			<el-table-column label="">
			</el-table-column>
		</el-table>
		</div>

	</div>
</template>

<script>
	import { uploadFiles,fetchList, createdata, updateData } from '@/api/filesManagement/files-record'

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
			num: 123456,
			name: "部门0",
			person: "商君0",
			job: "职务",
			tel: "12345678910"
		},
		{
			id: 1,
			num: 456789,
			name: "部门1",
			person: "商君1",
			job: "职务",
			tel: "12345678910"
		}
	]

	export default {

		data() {
			let self = this;
			return {
				contentStyleObj: {
					height: ''
				},
				mpointType,
				department,
				btnclevel: '获取',
				btnpoint: '定位',

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

				listLoading: false,
				listQuery: {
					page: 1,
					name: undefined,
					code: undefined
				},
				statusOptions: ['published', 'draft', 'deleted'],
				showReviewer: false,
				temp: {
					mapposition: undefined,
					mapgrade: undefined,
					happenposition: undefined,
					issuetype: undefined,
					issueorig: undefined,
					filesnum: undefined,
					name: undefined,
					region: undefined,
					date1: undefined,
					date2: undefined,
					delivery: false,
					type: [],
					resource: undefined,
					desc: undefined

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
				dialogStatus: 'create',
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
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '监测点名称不能为空',
						trigger: 'blur'
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
				downloadLoading: false,
				file:[],
				tableData: [{
					name: 'aaa.jpg',
					type: 'image/jpeg',
					keyID: 123479
				}, {
					name: 'bbb.jpg',
					type: 'image/jpeg',
					keyID: 987654
				}], // 总文件List
				uploadFile: [] // 需要上传的文件List
			}
		},
		created() {
			let that = this
			this.getHeight(),
				window.onresize = function() {
					var h = window.innerHeight;
					console.log(h)
					that.contentStyleObj.height = (h - 254) + 'px';
				}
			var newsID = this.$route.query.id;
			console.log(newsID)
		},
		methods: {
			getHeight() {
				var h = window.innerHeight;
				console.log(h)
				this.contentStyleObj.height = (h - 254) + 'px';
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
			resetTemp() {
				this.temp = {
						mapposition: undefined,
						mapgrade: undefined,
						happenposition: undefined,
						issuetype: undefined,
						issueorig: undefined,
						filesnum: undefined,
						name: undefined,
						region: undefined,
						date1: undefined,
						date2: undefined,
						delivery: false,
						type: [],
						resource: undefined,
						desc: undefined
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
							this.closeWindow('/basicData/ceshi');
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
			},

			closeWindow(paths) {
				console.log(paths)
				const view = {
					fullPath: '/basicData/ceshi',
					path: paths,
					name: '创建',
					title: '创建'
				}
				this.$store.dispatch('tagsView/delCachedView', view).then(() => {
					const {
						fullPath
					} = view
					this.$nextTick(() => {
						this.$router.replace({
							path: '/redirect' + fullPath
						})
					})
				})
			},
			handleUpload(file) { // 保存需要上传的文件
				const keyID = Math.random().toString().substr(2)
				file['keyID'] = keyID
				this.file.push(file)
				console.log(this.file)
				this.uploadFile.push(file)
				return false
			},
			delectFile(keyID) { // 删除文件
				this.file = this.file.filter(item => {
					return item.keyID != keyID
				})
				this.uploadFile = this.uploadFile.filter(item => {
					return item.keyID != keyID
				})
			},
			upload() { // 上传文件
				if(this.uploadFile.length === 0) {
					this.$Message.error('未选择上传文件')
					return false
				}
				for(let i = 0; i < this.uploadFile.length; i++) {
					const item = this.file[i]
					this.$refs.upload.post(item)
				}
			},
			uploadSuccess(response, file, fileList) { // 文件上传回调 上传成功后删除待上传文件
				if(response.success === true) {
					alert('上传成功')
				}
				console.log(response.status) // 后端返回数据
				console.log(file) // 当前上传文件
				console.log(fileList) // 整个input file 里的文件数组
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
	
	.el-margin-bottom {
		margin-bottom: 5px;
	}
	.btnWidth{
		width: 100%;
		padding: 10px 0px;
	}
	.labelTip{
		font-size: 14px;
    	color: #606266;
    	font-weight: bold;
    	padding: 10px;
	}
</style>