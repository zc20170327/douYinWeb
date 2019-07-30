<template>
	<div class="app-container" style="display: flex;padding-bottom: 0;">
		<div class="ba_left">
			<div class="vertical_left">
				<div>
					<el-tree :data="data2" node-key="id" ref="tree" highlight-current @current-change="getCheckedNodes" :props="defaultProps">
					</el-tree>
				</div>
			</div>
		</div>
		<div class="boards" :style="contentStyleObj"></div>
		<div class="ba_right">
			<div class="filter-container">
				<el-input v-model="listQuery.code" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
				<el-input v-model="listQuery.title" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
				<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
					查询
				</el-button>
				<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
					创建人员
				</el-button>
			</div>
			<el-table :data="listData" border style="width: 100%;">
				<el-table-column label="序号" prop="id" align="center" width="50px">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="用户名" width="100px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.username}}</span>
					</template>
				</el-table-column>
				<el-table-column label="照片" width="100px" align="center">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<!--<img :src="scope.row.imgurl" style="width: 80px;height: 100px;"/>-->
							<img src="../../../public/logo.png" style="height: 100px;" />
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">查看照片</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="姓名" width="100px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="职务" width="120px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.post }}</span>
					</template>
				</el-table-column>
				<el-table-column label="部门" width="120px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.department }}</span>
					</template>
				</el-table-column>
				<el-table-column label="工号" width="150px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.num }}</span>
					</template>
				</el-table-column>
				<el-table-column label="电话" width="150px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.tel }}</span>
					</template>
				</el-table-column>
				<el-table-column label="邮箱" width="150px" align="center">
					<template slot-scope="scope">
						<span class="link-type">{{ scope.row.email }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" class-name="status-col" width="100">
					<template slot-scope="{row}">
						<el-tag :type="row.status | statusFilter" @click="changestatus(row)" style="cursor: pointer;">
							{{ row.status ==1?"启用":"未启用"}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150" align="center" fixed='right'>
					<template slot-scope="{row}">
						<el-button type="primary" size="mini" @click="handleUpdate(row)">
							编辑
						</el-button>
						<el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handledelete(row)">
							删除
						</el-button>
					</template>
				</el-table-column>
				<!--<el-table-column label="" min-width="0" class-name="small-padding fixed-width">
				
						
				</el-table-column>-->

			</el-table>

			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" @pagination="getList" />
			<!--弹出框-->
			<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="0" width="40%">
				<el-row :gutter="10" style="border: 1px solid gainsboro;padding: 10px;height: 500px;overflow: auto;">
  				<el-col :span="8" :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="text-align: center;">
  					<el-upload class="avatar-uploader" 
  						action="./upload" 
  						:show-file-list="false" 
  						:on-success="handleAvatarSuccess" 
  						:on-error = "handAvatarError"
  						:before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							
						</el-upload>
						<div class="el-upload__text">上传照片</em></div>
  				</el-col>
  				<el-col :span="16" :xs="24" :sm="24" :md="16" :lg="16" :xl="16" >
  					<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="">
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="用户名:">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="密码:">
										<el-input v-model="temp.type"></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="姓名：">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="职务：">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="部门：">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="工号：">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="电话：">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="邮箱：">
										<el-input v-model="temp.code"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="备注">
								<el-input v-model="temp.description" :autosize="{ minRows: 4, maxRows: 4}" type="textarea" placeholder="备注" />
							</el-form-item>

							<el-form-item label="" style="margin-top: -20px;">
								<el-checkbox label="是否启用" name="" @change="getstatus" v-model="temp.status"></el-checkbox>
							</el-form-item>

						</el-form>
  				</el-col>
				</el-row>
				
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
	import { fetchList, deleteBasidata, createBasicdata, getTreeDatas, getIdlist, updateData } from '@/api/organization'
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
				imageUrl: '',
				data2: [{
					id: 1,
					label: '重庆智绘点途科技有限公司',
					children: [{
							id: 2,
							label: '综合中心'
						},
						{
							id: 3,
							label: '技术中心'
						},
						{
							id: 4,
							label: '服务中心'
						},
						{
							id: 5,
							label: '综合中心'
						}
					]
				}],
				listData: [{
						id: 1,
						username: 'admin',
						imgurl: '../../../public/logo.png',
						name: '商君',
						post: '员工',
						department: '技术中心',
						num: 20180710,
						tel: 13032334181,
						email: '1663510202@qq.com',
						status: 1
					},
					{
						id: 1,
						username: 'admin',
						imgurl: '../../../public/logo.png',
						name: '商君',
						post: '员工',
						department: '技术中心',
						num: 20180710,
						tel: 13032334181,
						email: '1663510202@qq.com',
						status: 1
					},
					{
						id: 1,
						username: 'admin',
						imgurl: '../../../public/logo.png',
						name: '商君',
						post: '员工',
						department: '技术中心',
						num: 20180710,
						tel: 13032334181,
						email: '1663510202@qq.com',
						status: 1
					},
					{
						id: 1,
						username: 'admin',
						imgurl: '../../../public/logo.png',
						name: '商君',
						post: '员工',
						department: '技术中心',
						num: 20180710,
						tel: 13032334181,
						email: '1663510202@qq.com',
						status: 1
					},
				],
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
				nodeData: null,
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
			this.getTreeData(),
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
						if(row.status == 1) {
							row.status = 0
						} else if(row.status == 0) {
							row.status = 1;
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
				if(row.status == 1) {
					row.status = true;
				} else {
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
						this.refreshData();
					})
					.catch(err => {
						console.error(err)
					})
			},
			//刷新数据
			refreshData() {
				var data = this.nodeData;
				return setTimeout(() => {
					this.getTreeData();
					if(this.treeId == 0) {
						this.getList();
					} else {
						this.getCheckedNodes(data);
					}
				}, 1000)
			},
			//获取分割线高度
			getHeight() {
				var h = window.innerHeight;
				this.contentStyleObj.height = (h - 84) + 'px';
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
					this.treelist = treeData;
					this.total = response.data.length;

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
							'parentId': data[i].parentId
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
			getCheckNodesData(data) {

				this.listLoading = false
				var id = data.id;
				var allListA = [];
				var allListB = null;
				this.listQuery = {
					parentId: id
				}
				getIdlist(id).then(response => {
					allListB = response.data;
				})
				fetchList(this.listQuery).then(response => {
					console.log(response.data)
					if(response.data != null) {
						allListA = response.data.list;
					}
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
					allListA.unshift(allListB)
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

			//上传头像
			handleAvatarSuccess(res, file) {
				console.log(file);
				console.log("123");
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			handAvatarError(res){
				console.log(res);
			},
			beforeAvatarUpload(file) {
				console.log(file);
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				console.log(isLt2M)

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}

		}
	}
</script>

<style>
	.ba_right {
		float: right;
		width: 80%;
		height: 100%;
		padding-left: 10px;
	}
	
	.ba_left {
		float: left;
		width: 20%;
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
	
	.el-dialog__wrapper {
		display: flex;
		align-items: center;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 150px;
		height: 150px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 150px;
		height: 150px;
		display: block;
	}
</style>