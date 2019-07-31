<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input v-model="listQuery.code" placeholder="案卷编号" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
			<el-select v-model="listQuery.importance" placeholder="问题来源" clearable style="width: 180px" class="filter-item">
				<el-option v-for="item in problemSource" :key="item.name" :label="item.name" :value="item.name" />
			</el-select>
			<el-select v-model="listQuery.importance" placeholder="问题类型" clearable style="width: 180px" class="filter-item">
				<el-option v-for="item in problemType" :key="item.type" :label="item.type" :value="item.type" />
			</el-select>
			<el-input v-model="listQuery.code" placeholder="所属辖区" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
			<el-select v-model="listQuery.importance" placeholder="处置部门" clearable style="width: 180px" class="filter-item">
				<el-option v-for="item in department" :key="item.target" :label="item.name" :value="item.name" />
			</el-select>
			<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
				查询
			</el-button>
		</div>
		<el-table :key="tableKey" v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%;">
			<el-table-column label="序号" prop="id" align="center" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.number }}</span>
				</template>
			</el-table-column>
			<el-table-column label="案卷编号" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.docket_number}}</span>
				</template>
			</el-table-column>
			<el-table-column label="问题涞源" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.source}}</span>
				</template>
			</el-table-column>
			<el-table-column label="问题类型" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.type}}</span>
				</template>
			</el-table-column>
			<el-table-column label="所属辖区" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.address}}</span>
				</template>
			</el-table-column>
			<el-table-column label="状态" width="80px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.state}}</span>
				</template>
			</el-table-column>
			<el-table-column label="上报时间" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="操作" align="center" width="180" >
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
			</el-table-column>
		</el-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

		

	</div>
</template>

<script>
	import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/mpoint-management'
	import waves from '@/directive/waves' // waves directive
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination' // secondary package based on el-pagination

	const problemSource = [
		{key: 1,name: '监督员采集上报'},
		{key: 2,name: '公众举报'}
	]
	const problemType = [
		{key: 1,type: '乱采砂'},
		{key: 2,type: '乱占乱建'},
		{key: 3,type: '垃圾成山'}
	]
	const department = [
		{key: 1,name: '部门1'},
		{key: 2,name: '部门1'},
		{key: 3,name: '部门1'}
	]
	
	const tableData = [
				{
          number:'1',
          docket_number: '2017083100003',
          source: '监督员采集上报',
          type: '有人溺水',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
        }, {
          number:'2',
          docket_number: '2017083100003',
          source: '公众举报',
          type: '发现尸体（男性）',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
        }, {
          number:'3',
          docket_number: '201708310003',
          source: '公众举报',
          type: '垃圾成山',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
        }, {
          number:'4',
          docket_number: '201708310003',
          source: '公众举报',
          type: '水位到达警戒线',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
        }, {
          number:'5',
          docket_number: '201708310003',
          source: '公众举报',
          type: '私自捕鱼',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
        }, {
          number:'6',
          docket_number: '201708310003',
          source: '公众举报',
          type: '乱采砂',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
        }, {
          number:'7',
          docket_number: '201708310003',
          source: '公众举报',
          type: '乱占乱建',
          address: '上海市长江出海口',
          state: '上报',
          date: '2016-05-06',
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
				tableData,
				problemSource,
				problemType,
				department,
				
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