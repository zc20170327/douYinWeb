<template>
	<div class="app-container" style="display: flex;">
		<div class="ba_left">
			<div class="vertical_left">
				<div>
					<el-tree :data="treelist" node-key="id" ref="tree" highlight-current @current-change="getCheckedNodes" :props="defaultProps">
					</el-tree>
				</div>
			</div>
		</div>
		<div class="boards" :style="contentStyleObj"></div>
		<div class="ba_right">
			<div class="filter-container">
				<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
					新建流域
				</el-button>
			</div>
			<el-table :data="list" border style="width: 100%;" @sort-change="sortChange">
				<el-table-column label="序号" prop="id" sortable="custom" align="center" width="100">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="流域编码" width="150px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.code}}</span>
					</template>
				</el-table-column>
				<el-table-column label="流域名称" width="250px" align="center">
					<template slot-scope="scope">
						<span class="link-type">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="流域类型" width="250px" align="center">
					<template slot-scope="scope">
						<span class="link-type">{{ scope.row.type }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="230" class-name="small-padding fixed-width">
					<template slot-scope="{row}">
						<el-button v-if="row.status!='deleted'" size="mini" type="defalt" @click="getDetailData(row)">
							查看
						</el-button>
						<el-button type="primary" size="mini" @click="handleUpdate(row)">
							编辑
						</el-button>
						<el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handledelete(row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" @pagination="getList" />
			<!--弹出框-->
			<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisibles" top="0" width="60%">
				<div class="dialogBox" style="display: flex;">
					<!--表单-->
					<div style="width: 50%;height: 500px;overflow:auto;border: 1px solid gainsboro;padding:20px 20px;">
						<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
							
							
							<el-row>
								<el-col :span="24">
									<el-form-item label="上级流域">
										<el-input v-model="parentName" disabled="disabled"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
								<el-form-item label="流域编码" prop="code">
									<el-input v-model="temp.code"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="流域类型" prop="type">
  									<el-select v-model="temp.type" placeholder="选择流域类型" class="filter-item" style="width: 100%">
										<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
  									</el-select>
								</el-form-item>
							</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="流域名称" prop="name">
										<el-input v-model="temp.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="流域描述" prop="description">
										<el-input type="textarea" v-model="temp.description"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="工作职责" prop="duty">
										<el-input type="textarea" v-model="temp.duty"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item label="协调部门" prop="dept">
										<el-input type="textarea" v-model="temp.dept"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
								<el-form-item label="第一河长" prop="firstManager">
									<el-input v-model="temp.firstManager"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="第二河长">
									<el-input v-model="temp.SecondManager"></el-input>
								</el-form-item>
							</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
								<el-form-item label="河长职务" prop="firstPost">
									<el-input v-model="temp.firstPost"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="河长职务">
									<el-input v-model="temp.secondPost"></el-input>
								</el-form-item>
							</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
								<el-form-item label="河长电话" prop="firstTel">
									<el-input v-model="temp.firstTel"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="河长电话">
									<el-input v-model="temp.secondTel"></el-input>
								</el-form-item>
							</el-col>
							</el-row>
							<el-row>
								<el-col :span="20">
									<el-form-item label="地图等级" prop="mapLevel">
										<el-input v-model="temp.mapLevel"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="getLevel()">获取</el-button>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="20">
									<el-form-item label="中心点">
										<el-input v-model="temp.point"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="getPoint()">{{btnpoint}}</el-button>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="20">
									<el-form-item label="描边" prop="outline">
										<el-input v-model="temp.outline"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" @click="getOutline()">{{btnline}}</el-button>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="20">
									<el-form-item label="颜色">
										<el-input v-model="temp.color"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-color-picker v-model="temp.color" style="width: 100%;"></el-color-picker>
								</el-col>
							</el-row>
							
						</el-form>

					</div>
					<!--地图-->
					<div style="width: 50%;height: 500px;">
						<el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo" :events="events">
							</el-amap-marker>
			<el-amap-marker :position="newpoint"></el-amap-marker>
			<el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :ref="`polygon_${index}`" :path="polygon.path" :draggable="polygon.draggable" :events="polygon.events"></el-amap-polygon>
		</el-amap>
						
					</div>
				</div>

				<div slot="footer" class="dialog-footer" style="text-align: left;">
					<el-button @click="dialogFormVisibles = false">
						取消
					</el-button>
					<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
						保存
					</el-button>
				</div>
			</el-dialog>

		</div>
	</div>
</template>
<script>
	import { fetchList,createdata, deleteBasidata, createBasicdata, getTreeDatas, getIdlist, updateData } from '@/api/river-domain-data'
	import Pagination from '@/components/Pagination'
//	import mapView from "./components/map"

const calendarTypeOptions = [
  { key: 1, display_name: '市级' },
  { key: 2, display_name: '县级' },
  { key: 3, display_name: '镇级' }
]

	export default {
		components: {
			Pagination
		},
		props: {
			value: {
				type: Boolean,
				default: true
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					1: 'success',
					0: 'danger'
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
				calendarTypeOptions,
				color1: '#409EFF',
				contentStyleObj: {
					height: ''
				},
				tableKey: 0,
				list: null,
				treelist: null,
				createstatus: 1,
				total: 0,
				parentName: "无",
				listLoading: true,
				nodeData:null,
				listQuery: {
					pageIndex: 1

				},
				treeId: 0,
				sortOptions: [{
					label: 'ID Ascending',
					key: '+id'
				}, {
					label: 'ID Descending',
					key: '-id'
				}],
				showReviewer: false,
				temp: {
					id: 0,
					parentId:0,
					name: '',
					code: '',
					type:'',
					duty:'',
					dept:'',
					description:'',
					firstManager:'',
					firstPost:'',
					firstTel:'',
					SecondManager:'',
					secondPost:'',
					secondTel:'',
					mapLevel:'',
					point:'',
					outline:'',
					color:'#409EFF'
				},
				dialogFormVisibles: false,
				dialogStatus: '',
				textMap: {
					update: '编辑流域信息',
					create: '新建流域信息',
					getdetail: '查看流域信息'
				},
				dialogPvVisible: false,
				pvData: [],
				rules: {
					name: [{required: true,message: '名称不能为空',trigger: 'blur'}],
					code: [{required: true,message: '编码不能为空',trigger: 'blur'}],
					type: [{required: true,message: '类型不能为空',trigger: 'blur'}],
					duty: [{required: true,message: '工作职责不能为空',trigger: 'blur'}],
					dept: [{required: true,message: '协调部门不能为空',trigger: 'blur'}],
					firstManager: [{required: true,message: '河长名字不能为空',trigger: 'blur'}],
					firstPost: [{required: true,message: '河长职务不能为空',trigger: 'blur'}],
					firstTel: [{required: true,message: '河长电话不能为空',trigger: 'blur'}],
					mapLevel: [{required: true,message: '等级不能为空',trigger: 'blur'}],
//					point: [{required: true,message: '中心点不能为空',trigger: 'blur'}],
					outline: [{required: true,message: '描边不能为空',trigger: 'blur'}],
					description: [{required: true,message: '流域描述不能为空',trigger: 'blur'}]
				},
				downloadLoading: false,
				outerVisible: false,
				innerVisible: false,

				defaultProps: {
					children: 'children',
					label: 'label'
				},
				
				
				//地图参数
				btnpoint:"定位",
				btnline:"描边",
				getpoint:false,
				getline:false,
				zoom: 12,
				center: [105.935681, 29.35842],
				address: '',
				newpoint:[0,0],
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
						if(self.getpoint){
							self.newpoint=[lng,lat];
						}
						if(self.getline){
							var points = [lng,lat]
							self.polygons[0].path.push(points)
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
				]
			}
		},
		created() {
			this.getList(),
			this.getHeight(),
			this.getTreeData()
		},
		methods: {
			//	//读取表格数据
			getList() {
				this.listLoading = false
				fetchList(this.listQuery).then(response => {
					console.log(response.data.list)
					this.list = response.data.list;

					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			resetTemp() {
				this.temp = {
					id: 0,
					parentId:0,
					name: '',
					code: '',
					type:'',
					duty:'',
					dept:'',
					description:'',
					firstManager:'',
					firstPost:'',
					firstTel:'',
					SecondManager:'',
					secondPost:'',
					secondTel:'',
					mapLevel:'',
					point:'',
					outline:'',
					color:'#409EFF',
					parentName:this.parentName
				}
			},

			//查看
			getDetailData(row) {
				this.temp = Object.assign({}, row) // copy obj
				//    console.log(this.temp);
				this.dialogStatus = 'getdetail'
				this.dialogFormVisibles = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			//创建
			handleCreate() {
				this.resetTemp()
				this.dialogStatus = 'create'
				this.dialogFormVisibles = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate();
				})
			},
			createData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						const tempData = Object.assign({}, this.temp)
						console.log(tempData)
//						createdata(tempData).then(() => {
//							this.dialogFormVisibles = false
//							this.$notify({
//								title: 'Success',
//								message: 'Created Successfully',
//								type: 'success',
//								duration: 2000
//							})
//						})
					}
				})
				this.refreshData();
			},
			//  编辑
			handleUpdate(row) {
				this.temp = Object.assign({}, row) // copy obj
				this.dialogStatus = 'update'
				this.dialogFormVisibles = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			updateData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						const tempData = Object.assign({}, this.temp)
						updateData(tempData).then(() => {
							this.dialogFormVisibles = false
							this.$notify({
								title: 'Success',
								message: 'Update Successfully',
								type: 'success',
								duration: 2000
							})
						})
						this.refreshData();
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
			//刷新数据
			refreshData() {
				var data = this.nodeData;
        		return setTimeout(()=>{
          			this.getTreeData();
          			if(this.treeId == 0) {
						this.getList();
					} else {
//						this.getCheckedNodes(data);
					}
        		},1000)
      		},
			//获取分割线高度
			getHeight() {
				this.contentStyleObj.height = window.innerHeight + 'px';
			},
			//选择状态
			getstatus(event) {
				console.log(event)
				if(event) {
					this.createstatus = 1;
				} else {
					this.createstatus = 0;
				}
				console.log(this.createstatus)
			},

			//获取树
			getTreeData() {
				console.log("获取树数据");
				this.listLoading = false
				getTreeDatas().then(response => {
 				var treeData = this.convertToTreeData(response.data, 0)
 				var trees = [{
						id:0,
						label:'流域信息',
						children:treeData
					}];
					console.log(trees)
					this.treelist = trees;
 				this.total=response.data.length;
 				
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			//递归构建树的数据
			convertToTreeData(data, pid) {
				var result = []
				var temp = []
				for(var i = 0; i < data.length; i++) {
					if(data[i].parentId == pid) {
						var obj = {
							'label': data[i].name,
							'id': data[i].id,
							'parentId':data[i].parentId
						}
						temp = this.convertToTreeData(data, data[i].id)
						if(temp.length > 0) {
							obj.children = temp
						}
						result.push(obj)
					}
				}
				return result
			},

			//点击获取树节点
			getCheckedNodes(data) {
				this.nodeData = data;
				this.parentName = data.label;
				this.treeId = data.id;
				this.getCheckNodesData(data)
				
			},
			getCheckNodesData(data){
				
				this.listLoading = false
				var id = data.id;
				if(id!=0){
					var allListA = [];
					this.listQuery = {
						parentId: id
					}
					fetchList(this.listQuery).then(response => {
						console.log(response.data)
						if(response.data != null) {
							allListA = response.data.list;
						}
						setTimeout(() => {
							this.listLoading = false
						}, 1.5 * 1000)
						this.total = allListA.length;
						this.list = allListA
					})
				}
				

			},
			handleFilter() {
				this.listQuery.page = 1
				this.getList()
			},
			handleModifyStatus(row, status) {
				this.$message({
					message: '操作Success',
					type: 'success'
				})
				row.status = status
			},
			sortChange(data) {
				const {
					prop,
					order
				} = data
				if(prop === 'id') {
					this.sortByID(order)
				}
			},
			
			//获取地图
			getPoint(){
				this.getline = false;
				this.getpoint = true;
				if(this.btnpoint == "定位"){
					this.btnpoint = "确定";
				}else{
					this.btnpoint = "定位"
					this.temp.point=this.newpoint;
					this.getpoint = false;
				}	
			},
			getOutline(){
				this.getline = true;
				this.getpoint = false;
				if(this.btnline == "确定"){
					this.btnline = "描边";
					this.temp.outline=this.polygons[0].path;
					this.getline = false;
				}else{
					this.btnline = "确定"
					this.temp.outline='';
					this.polygons[0].path=[];
				}
			},
			getLevel(){
				console.log("zoom")
				this.temp.mapLevel = this.zoom;
			}

		},
		mounted () {
    		let that = this
    		
    		return setTimeout(()=>{
          			this.getTreeData();
          			if(this.treeId == 0) {
						this.getList();
					} else {
					}
        		},1000)
  		}
  		
	}
</script>

<style>
	.ba_right {
		float: right;
		width: 85%;
		height: 100%;
		padding-left: 10px;
	}
	
	.ba_left {
		float: left;
		width: 15%;
		height: 100%;
		display: flex;
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
	.el-dialog__body{
		padding: 20px;
	}
	.el-form-item__label{
		padding: 0;
	}
	.el-color-picker--medium .el-color-picker__trigger {
		width: 70px;
	}
	.el-dialog__wrapper{
		display: flex;
		align-items: center;
	}
	.el-dialog__header{
		padding: 20px;
		background: #1890ff;
		
	}
	.el-dialog__title{
		color: white;
	}
	.el-dialog__body{
		padding: 20px;
	}
	.el-dialog__headerbtn .el-dialog__close{
		color: white;
	}
	.el-dialog__headerbtn .el-dialog__close:hover{
		color: #909399;
	}

</style>