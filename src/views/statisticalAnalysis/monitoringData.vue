<template>
	<div class="app-container">
		<div class="filter-container">
			<el-select v-model="listQuery.importance" placeholder="监测点" clearable style="width: 150px" class="filter-item">
				<el-option v-for="item in mpointType" :key="item.name" :label="item.name" :value="item.name" />
			</el-select>
			<el-select v-model="listQuery.importance" placeholder="指标" clearable style="width: 150px" class="filter-item">
				<el-option v-for="item in targetType" :key="item.target" :label="item.target" :value="item.target" />
			</el-select>
			<!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="监测起始时间" align="top"/>
			<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="监测结束时间" />-->
			<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
				查询
			</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
				创建监测点
			</el-button>
		</div>
		<el-table :key="tableKey" v-loading="listLoading" :data="listdata" border fit highlight-current-row style="width: 100%;">
			<el-table-column label="序号" prop="id" align="center" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column label="监测点" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.name}}</span>
				</template>
			</el-table-column>
			<el-table-column label="监测时间" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
				</template>
			</el-table-column>
			<el-table-column label="指标" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.target }}</span>
				</template>
			</el-table-column>
			<el-table-column label="检测值" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.mvalue }}</span>
				</template>
			</el-table-column>
			<el-table-column label="标准值" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.svalue }}</span>
				</template>
			</el-table-column>
			<el-table-column label="单位" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.company }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否达标" class-name="status-col" width="100px">
				<template slot-scope="{row}">
					<el-tag :type="row.status | statusFilter" style="cursor: pointer;">
						{{ row.status ==1?"是":"否"}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="超标倍数" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.multiple }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="200" >
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
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="0" width="50%">
			<div class="dialogBox" style="display: flex;">
				<!--表单-->
				<div style="width: 100%;height: 300px;overflow:auto;border: 1px solid gainsboro;padding:20px 10px;">
					<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
						<div id="" style="padding: 0 10px;">
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="监测点：" prop="name" label-width="85px">
										<el-select v-model="temp.name" placeholder="选择监测点" class="filter-item" style="width: 100%">
											<el-option v-for="item in mpointType" :key="item.key" :label="item.name" :value="item.key" />
  									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="指标：" prop="target" label-width="85px">
										<el-select v-model="temp.target" placeholder="选择指标" class="filter-item" style="width: 100%">
											<el-option v-for="item in targetType" :key="item.key" :label="item.target" :value="item.key" />
  									</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="监测时间:" prop="time" label-width="85px">
										<el-date-picker v-model="temp.time" type="datetime" align="top"/>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="检测值:" prop="mvalue" label-width="85px">
										<el-input v-model="temp.mvalue"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="标准值:" prop="svalue" label-width="85px">
										<el-input v-model="temp.svalue"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="单位：" prop="company" label-width="85px">
										<el-select v-model="temp.company" placeholder="选择单位" class="filter-item" style="width: 100%">
											<el-option v-for="item in companyType" :key="item.key" :label="item.company" :value="item.key" />
  									</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="是否达标：" prop="status" label-width="85px">
										<el-select v-model="temp.status" placeholder="选择是否达标" class="filter-item" style="width: 100%">
											<el-option v-for="item in statusType" :key="item.key" :label="item.status" :value="item.key" />
  									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="超标倍数:" prop="name" label-width="85px">
										<el-input v-model="temp.multiple"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-form>

				</div>
			</div>

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
</template>

<script>
	import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/mpoint-management'
	import waves from '@/directive/waves' // waves directive
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination' // secondary package based on el-pagination

	const mpointType = [
		{key: 1,name: '环保监测点'},
		{key: 2,name: '水文监测点'},
		{key: 3,name: '污染源监测点'}
	]
	const targetType = [
		{key: 1,target: '石油类'},
		{key: 2,target: '石油类'},
		{key: 3,target: '石油类'}
	]
	const companyType = [
		{key: 1,company: 'mg/L'},
		{key: 2,company: 'mg/L'},
		{key: 3,company: 'mg/L'}
	]
	const statusType = [
		{key: 10,status: '是'},
		{key: 11,status: '否'}
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
				targetType,
				companyType,
				statusType,
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
				parentName: "无",
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
					name: '',
					time: '',
					target: '',
					mvalue: undefined,
					svalue: undefined,
					company: '',
					status: '',
					multiple:undefined
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
					name: [{
						required: true,
						message: '监测点名称不能为空',
						trigger: 'change'
					}],
					target: [{
						type: 'date',
						required: true,
						message: '指标不能为空',
						trigger: 'change'
					}],
					time: [{
						required: true,
						message: '监测时间不能为空',
						trigger: 'blur'
					}],
					mvalue: [{
						required: true,
						message: '监测值不能为空',
						trigger: 'blur'
					}],
					svalue: [{
						required: true,
						message: '标准值不能为空',
						trigger: 'blur'
					}],
					company: [{
						required: true,
						message: '单位不能为空',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '状态不能为空',
						trigger: 'blur'
					}]
				},
				downloadLoading: false
			}
		},
		created() {
			//			  this.getList()
		},
		methods: {
			getList() {
				this.listLoading = true
				fetchList(this.listQuery).then(response => {
					this.list = response.data.items
					this.total = response.data.total
					//					 Just to simulate the time of the request
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			//查询
			handleFilter() {
				this.listQuery.page = 1
				this.getList()
			},
			resetTemp() {
				this.temp = {
					id: undefined,
					name: '',
					time: '',
					target: '',
					mvalue: undefined,
					svalue: undefined,
					company: '',
					status: '',
					multiple:undefined
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
						this.temp.time = +new Date(this.temp.time)
						console.log(this.temp)
//						createArticle(this.temp).then(() => {
//							this.list.unshift(this.temp)
//							this.dialogFormVisible = false
//							this.$notify({
//								title: 'Success',
//								message: 'Created Successfully',
//								type: 'success',
//								duration: 2000
//							})
//						})
					}
				})
			},
			handleUpdate(row) {
				this.temp = Object.assign({}, row) // copy obj
				this.temp.timestamp = new Date(this.temp.timestamp)
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
						tempData.time = +new Date(tempData.time)
						console.log(tempData)
//						updateArticle(tempData).then(() => {
//							for(const v of this.list) {
//								if(v.id === this.temp.id) {
//									const index = this.list.indexOf(v)
//									this.list.splice(index, 1, this.temp)
//									break
//								}
//							}
//							this.dialogFormVisible = false
//							this.$notify({
//								title: 'Success',
//								message: 'Update Successfully',
//								type: 'success',
//								duration: 2000
//							})
//						})
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
						console.log(row.id)
//						await deleteBasidata(row.id)
//						this.$message({
//							type: 'success',
//							message: '删除成功'
//						})
//						this.treeId = row.parentId;
//						this.refreshData();
					})
					.catch(err => {
						console.error(err)
					})
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
	.el-date-editor.el-input{
		width: 100%;
	}
</style>