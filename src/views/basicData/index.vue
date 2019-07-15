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
					新建基础数据
				</el-button>
			</div>
			<el-table :data="list" border style="width: 100%;" @sort-change="sortChange">
				<el-table-column label="序号" prop="id" sortable="custom" align="center" width="100">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="编码" width="150px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.code}}</span>
					</template>
				</el-table-column>
				<el-table-column label="名称" width="250px" align="center">
					<template slot-scope="scope">
						<span class="link-type">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" class-name="status-col" width="200">
					<template slot-scope="{row}">
						<el-tag :type="row.status | statusFilter" @click="changestatus(row)" style="cursor: pointer;">
							{{ row.status ==1?"启用":"未启用"}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="230" class-name="small-padding fixed-width">
					<template slot-scope="{row}">
						<el-button size="mini" type="defalt" @click="getDetailData(row)">
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
			<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="0">
				<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
					<el-form-item label="上级" prop="parentId">
						<el-input v-model="parentName" disabled="disabled" />
					</el-form-item>
					<el-form-item label="名称" prop="name">
						<el-input v-model="temp.name" />
					</el-form-item>
					<el-form-item label="编码" prop="code">
						<el-input v-model="temp.code" />
					</el-form-item>
					<el-form-item label="备注">
						<el-input v-model="temp.description" :autosize="{ minRows: 4, maxRows: 4}" type="textarea" placeholder="备注" />
					</el-form-item>

					<el-form-item label="" style="margin-top: -20px;">
						
						<el-checkbox label="是否启用" name="" @change="getstatus"  v-model="temp.status"></el-checkbox>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">
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
	import { fetchList, deleteBasidata, createBasicdata, getTreeDatas, getIdlist, updateData } from '@/api/basic-data'
	import Pagination from '@/components/Pagination'
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
			return {
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
					name: '',
					code: 0,
					status: '',
					description: ''
				},
				dialogFormVisible: false,
				dialogStatus: '',
				textMap: {
					update: '编辑基础数据',
					create: '新建基础数据',
					getdetail: '查看基础数据'
				},
				dialogPvVisible: false,
				pvData: [],
				rules: {
					name: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '编码不能为空',
						trigger: 'blur'
					}]
				},
				downloadLoading: false,
				outerVisible: false,
				innerVisible: false,

				defaultProps: {
					children: 'children',
					label: 'label'
				}
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
					console.log(response.data)
					this.list = response.data.list;

					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			resetTemp() {
				this.temp = {
					id: undefined,
					name: '',
					code: undefined,
					status: 1,
					description: '',
					parentId: this.treeId,
					parentName: this.parentName
				}
			},
			//改变状态
			changestatus(row) {
				console.log(row)
				var statusvalue = '';
				if(row.status == 0) {
					statusvalue = "你确定要启用" + row.name + "？";
				} else if(row.status == 1) {
					statusvalue = "你确定不启用" + row.name + "？";
				}
				this.$confirm(statusvalue, '状态', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(async() => {
						console.log(row.status)
						if(row.status==1){
							row.status=0
						}else if(row.status==0){
							row.status=1;
						}
						updateData(row).then(() => {
							this.dialogFormVisible = false
							this.$notify({
								title: 'Success',
								message: '修改成功',
								type: 'success',
								duration: 2000
							})
						})
					})
					.catch(err => {
						console.error(err)
					})
			},

			//查看
			getDetailData(row) {
				this.temp = Object.assign({}, row) // copy obj
				//    console.log(this.temp);
				this.dialogStatus = 'getdetail'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			//创建
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
						const tempData = Object.assign({}, this.temp)
						tempData.status = this.createstatus;
						console.log(tempData)
						createBasicdata(tempData).then(() => {
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
				this.refreshData();
			},
			//  编辑
			handleUpdate(row) {
				console.log(row)
				if(row.status==1){
					row.status = true;
				}else{
					row.status = false;
				}
				this.temp = Object.assign({}, row) // copy obj
				this.dialogStatus = 'update'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			updateData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						const tempData = Object.assign({}, this.temp)
						console.log(tempData)
						if(tempData.status){
							tempData.status = 1;
						}else{
							tempData.status = 0;
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
						label:'基础数据',
						children:treeData
					}];
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
				var allListA = [];
//				var allListB = null;
				this.listQuery = {
					parentId: id
				}
//				getIdlist(id).then(response => {
//					allListB = response.data;
//				})
				fetchList(this.listQuery).then(response => {
					console.log(response.data)
					if(response.data != null) {
						allListA = response.data.list;
					}
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
//					allListA.unshift(allListB)
					this.total = allListA.length;
					this.list = allListA
				})
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
			}

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
		padding: 10px 20px;
	}
	.el-dialog__headerbtn .el-dialog__close{
		color: white;
	}
	.el-dialog__headerbtn .el-dialog__close:hover{
		color: #909399;
	}
</style>