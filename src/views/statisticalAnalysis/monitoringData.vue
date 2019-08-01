<template>
	<div class="app-container">
		<div class="filter-container">
			<el-row style="display: flex;">
			<el-select v-model="listQuery.name" placeholder="监测点" clearable style="width: 150px" class="filter-item">
				<el-option v-for="item in pointsList" :key="item.id" :label="item.name" :value="item.name" />
			</el-select>
			<!--<el-select v-model="listQuery.quota" placeholder="指标" clearable style="width: 150px" class="filter-item">
				<el-option v-for="item in targetTypes" :key="item.key" :label="item.name" :value="item.name" />
			</el-select>-->
			<el-date-picker v-model="listQuery.start_time" type="datetime" placeholder="监测起始时间" style="width: 150px;margin: 0 10px;"/>
			<el-date-picker v-model="listQuery.end_time" type="datetime" placeholder="监测结束时间"  style="width: 150px;margin-right: 10px;"/>
			<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
				查询
			</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
				创建监测点
			</el-button>
			</el-row>
		</div>
		<div style="width: 100%;height: 400px;">
		<el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
			<el-table-column label="序号" prop="id" align="center" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column label="监测点" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.pointInfo.name}}</span>
				</template>
			</el-table-column>
			<el-table-column label="监测时间" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
				</template>
			</el-table-column>
			<el-table-column label="指标" width="150px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.quota }}</span>
				</template>
			</el-table-column>
			<el-table-column label="检测值" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.monitor_value }}</span>
				</template>
			</el-table-column>
			<el-table-column label="标准值" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.standard_value }}</span>
				</template>
			</el-table-column>
			<el-table-column label="单位" width="100px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.unit }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否达标" class-name="status-col" width="100px">
				<template slot-scope="{row}">
					<el-tag :type="row.is_qualified=='是'?'success':'danger'">
						{{ row.is_qualified}}
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
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.limit" @pagination="getList" />

		<!--弹出框-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="0" width="50%">
			<div class="dialogBox" style="display: flex;">
				<!--表单-->
				<div style="width: 100%;height: 300px;overflow:auto;border: 1px solid gainsboro;padding:20px 10px;">
					<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
						<div id="" style="padding: 0 10px;">
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="监测点：" prop="pointId" label-width="85px">
										<el-select v-model="temp.pointId" placeholder="选择监测点" class="filter-item" style="width: 100%">
											<el-option v-for="item in pointsList" :key="item.id" :label="item.name" :value="item.id" />
  									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="指标：" prop="quota" label-width="85px">
										<el-select v-model="temp.quota" placeholder="选择指标" class="filter-item" style="width: 100%">
											<el-option v-for="item in targetTypes" :key="item.key" :label="item.name" :value="item.name" />
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
									<el-form-item label="检测值:" prop="monitor_value" label-width="85px">
										<el-input v-model="temp.monitor_value"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="标准值:" prop="standard_value" label-width="85px">
										<el-input v-model="temp.standard_value"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="单位：" prop="unit" label-width="85px">
										<el-select v-model="temp.unit" placeholder="选择单位" class="filter-item" style="width: 100%">
											<el-option v-for="item in companyType" :key="item.key" :label="item.company" :value="item.company" />
  									</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="是否达标：" prop="is_qualified" label-width="85px">
										<el-select v-model="temp.is_qualified" placeholder="选择是否达标" class="filter-item" style="width: 100%">
											<el-option v-for="item in statusType" :key="item.status" :label="item.status" :value="item.status" />
  									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="超标倍数:" prop="multiple" label-width="85px">
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
	import { fetchList, createdata, updateDatas, deleteBasidata, getPointsData } from '@/api/monitoring-data'
	import waves from '@/directive/waves' 
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination'

	const targetTypes = [
		{key: 1,name: '指标1'},
		{key: 2,name: '指标2'},
		{key: 3,name: '指标3'}
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
		data() {
			let self = this;
			return {
				pointsList:null,
				targetTypes,
				companyType,
				statusType,
				parentName: "无",
				tableKey: 0,
				list: null,
				total: 0,
				listLoading: false,
				listQuery: {
					pageIndex: 1,
					name: undefined,
					start_time:undefined,
					end_time:undefined,
					quota: undefined
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
					is_qualified:undefined,
					monitor_value:undefined,
					standard_value:undefined,
					multiple:undefined,
					quota:undefined,
					time:undefined,
					unit:undefined,
					pointInfo:[
						
					]
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
					pointId: [{
						required: true,
						message: '监测点名称不能为空',
						trigger: 'change'
					}],
					quota: [{
						required: true,
						message: '指标不能为空',
						trigger: 'change'
					}],
					time: [{
						required: true,
						message: '监测时间不能为空',
						trigger: 'blur'
					}],
					monitor_value: [{
						required: true,
						message: '监测值不能为空',
						trigger: 'blur'
					}],
					standard_value: [{
						required: true,
						message: '标准值不能为空',
						trigger: 'blur'
					}],
					unit: [{
						required: true,
						message: '单位不能为空',
						trigger: 'blur'
					}],
					is_qualified: [{
						required: true,
						message: '状态不能为空',
						trigger: 'blur'
					}]
				},
				downloadLoading: false
			}
		},
		created() {
			this.getList(),
			this.getPoints()
		},
		methods: {
			//获取列表数据
			getList() {
				this.listLoading = true
				fetchList(this.listQuery).then(response => {
					console.log(response)
					this.list = response.data.list
					this.total = response.data.totalRecords
					this.listLoading = false
				})
			},
			//获取监测点数据
			getPoints(){
				getPointsData().then(response => {
					console.log(response)
					this.pointsList = response.data
				})
			},
			//查询
			handleFilter() {
				this.listQuery.pageIndex = 1
				if(this.listQuery.name==""){
					this.listQuery.name = undefined
				}
				if(this.listQuery.end_time==""){
					this.listQuery.end_time = undefined
				}
				if(this.listQuery.start_time==""){
					this.listQuery.start_time = undefined
				}
				
				console.log(this.listQuery)
				this.getList()
			},
			resetTemp() {
				this.temp = {
					id: undefined,
					is_qualified:undefined,
					monitor_value:undefined,
					standard_value:undefined,
					multiple:undefined,
					quota:undefined,
					time:undefined,
					unit:undefined,
					pointInfo:{}
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
						const points = this.pointsList;
						for (var i=0;i<points.length;i++) {
							if(points[i].id == this.temp.pointId){
								this.temp.pointInfo = points[i]
							}
						}
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
						this.refreshData();
					}
				})
			},
			handleUpdate(row) {
				this.temp = Object.assign({}, row) // copy obj
				console.log(this.temp)
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
						const points = this.pointsList;
						for (var i=0;i<points.length;i++) {
							if(points[i].id == tempData.pointId){
								tempData.pointInfo = points[i]
							}
						}
						updateDatas(tempData).then(() => {
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
				var statusvalue = "你确定要删除" + row.pointInfo.name + "数据？";
				this.$confirm(statusvalue, '删除', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(async() => {
						console.log(row.id)
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
        		return setTimeout(()=>{
						this.getList();
        		},1000)
      		},
			
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
	.el-input--medium .el-input__icon{
		height: 36px;
	}
</style>