<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="app-container" style="display: flex;">

    <div class="ba_left">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
        <div class="filesFirstNum">

          <el-form-item label="案卷编号:" prop="filesnum" size="mini">
            <el-col :span="9">
              <el-input v-model="ruleForm.filesnum" />
            </el-col>

            <el-col :span="15">
              <el-form-item class="issuefrom" label="问题来源:" prop="issueorig" size="mini">
                <el-select v-model="ruleForm.issueorig" placeholder="请选择">
                  <el-option label="公众发现问题举报" value="shanghai" />
                  <el-option label="市领导下达任务" value="beijing" />
                  <el-option label="视频监控发现" value="beijing" />
                  <el-option label="监督员采集上报" value="beijing" />
                </el-select>
                <!--          <el-input class="issuefrom" v-model="ruleForm.name"></el-input>-->
              </el-form-item>

            </el-col>
          </el-form-item>

        </div>
        <div class="issuetype">
          <el-form-item label="问题类型:" prop="issuetype" size="mini">
            <el-col>
              <el-input aria-placeholder="issueinput" style="width:100%;display: inline-block" v-model="ruleForm.issuetype"/>
              <svg-icon style="position:absolute;width:4%;margin-left: 2px;display: inline-block;height: 38px;" icon-class="search" @click="dialogVisible = true;getTreeData()"/>

              <el-col>

            </el-col>
            </el-col>
          </el-form-item>

          <el-dialog
            title="选择问题类型"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-tree
              :props="props"
              :load="loadNode"
              lazy
              show-checkbox
              @check-change="handleCheckChange"
              >
            </el-tree>


<!--            <span>这是一段信息</span>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--  </span>-->
          </el-dialog>

        </div>

        <div class="happenposition">
          <el-form-item label="事发位置:" prop="happenposition" size="mini">
            <el-col>
              <el-input v-model="ruleForm.happenposition" />
            </el-col>

          </el-form-item>
        </div>
        <div class="mapgrade">
          <div class="mapgradeleft">
            <el-form-item label="地图等级:" prop="mapgrade" size="mini">
              <el-col :span="14">
                <el-input v-model="ruleForm.mapgrade" />
              </el-col>
              <el-col :span="9" class="getgrade">
                <el-button type="primary" @click="onSubmit" style="margin-bottom: 0;">获取</el-button>
              </el-col>
            </el-form-item>
            <!--        <el-form-item class="getgrade">-->
            <!--          <el-button type="primary" @click="onSubmit">获取</el-button>-->
            <!--        </el-form-item>-->
          </div>
          <div class="mapgraderight">
            <el-form-item label="地图定位:" prop="mapposition" size="mini">
              <el-col :span="14">
                <el-input v-model="ruleForm.mapposition" />
              </el-col>
              <el-col :span="9" class="getpos">
                <el-button type="primary" @click="onSubmit">定位</el-button>
              </el-col>
            </el-form-item>
            <!--          <el-form-item class="getpos">-->
            <!--            <el-button type="primary" @click="onSubmit">定位</el-button>-->
            <!--          </el-form-item>-->
          </div>
        </div>
        <div class="flowarea">
          <el-form-item label="所属流域:" prop="desc" size="mini">
            <el-col>
            <el-input style="width: 100%;display: inline-block" v-model="ruleForm.desc" type="flowarea"/>
            <svg-icon style="position:absolute;width:4%;margin-left: 2px;display: inline-block;height: 38px;" icon-class="search" @click="dialogVisible = true;getTreeData()"/>

            </el-col>
            <el-col>

            </el-col>
          </el-form-item>
        </div>
        <div class="filesSecondNumb">

          <el-form-item label="河段长工号:" prop="rivernum" size="mini">
            <el-col :span="9">
              <el-input v-model="ruleForm.rivernum"/>
              <svg-icon style="position:absolute;width:4%;margin-left: 2px;display: inline-block;height: 38px;" icon-class="search" @click="dialogVisible = true;getTreeData()"/>

            </el-col>


            <el-col :span="15">
              <el-form-item class="issuefrom" label="呼入号码:" prop="callnum" size="mini">
                <el-input v-model="ruleForm.callnum"/>

              </el-form-item>

            </el-col>
            <svg-icon style="position:absolute;width:4%;margin-left: 2px;display: inline-block;height: 38px;" icon-class="search" @click="dialogVisible = true;getTreeData()"/>
          </el-form-item>

        </div>
        <div class="filesThridName">

          <el-form-item label="河段长姓名:" prop="rivername" size="mini">
            <el-col :span="9">
              <el-input v-model="ruleForm.rivername" />
            </el-col>

            <el-col :span="15">
              <el-form-item class="issuefrom" label="举报人姓名:" prop="respname" size="mini">
                <el-input v-model="ruleForm.respname" />
              </el-form-item>

            </el-col>
          </el-form-item>

        </div>
        <div class="filesFourthTel">

          <el-form-item label="河段长电话:" prop="rivertel" size="mini">
            <el-col :span="9">
              <el-input v-model="ruleForm.rivertel" />
            </el-col>

            <el-col :span="15">
              <el-form-item class="issuefrom" label="举报人电话:" prop="resptel" size="mini">
                <el-input v-model="ruleForm.resptel" />
              </el-form-item>

            </el-col>
          </el-form-item>

        </div>
        <div class="filesFiveDesc">

          <el-form-item label="情况描述:" prop="infodesc" size="large">

            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea3">
            </el-input>

          </el-form-item>

        </div>
       <el-row>
       	<div class="grid-content">
       		<div class="upload_title" id="upload">
       			<el-col :span="6">
                <Upload
                  ref="upload"
                  :before-upload="handleUpload"
                  :on-success="uploadSuccess"
                  :show-upload-list="true"
                  action="http://172.2.15.111:8088/v1/fileUpload?tempId=1569840"
                  multiple
                  style="float: left;width:auto"
                >
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

       		   <el-table
       			  :data="tableData"
       			  style="width: 100%">

       				  <el-table-column
       					prop="number"
       					label="序号"
       					width="50"
       					align="center">
       				  </el-table-column>

       				  <el-table-column
       					prop="state"
       					label="状态"
       					width="80"
       					align="center">
       				  </el-table-column>

       				  <el-table-column
       					prop="name"
       					label="名称"
       					width="160"
       					:show-overflow-tooltip="true"
       					align="center">
       				  </el-table-column>

       				  <el-table-column
       					prop="rom"
       					label="大小"
       					width="90"
       					align="center">
       				  </el-table-column>

       				   <el-table-column
                   align="center"
       				     label="操作"
       				     width="90">
       				       <el-button
       				         @click.native.prevent="deleteRow(scope.$index, tableData4)"
       				         type="text"
       				         size="small"
       				   				style="margin-right: 4px;">
       				         编辑
       				       </el-button>|
       				   			<el-button
       				   			  @click.native.prevent="deleteRow(scope.$index, tableData4)"
       				   			  type="text"
       				   			  size="small"
       				   				style="margin-left:0 ;">
       				   			  移除
       				   			</el-button>
       				   </el-table-column>

       			</el-table>
       			<el-col :span="24">
       				<el-button type="primary" size="mini" style="width: 100%;margin-top: 20px;font-size: 14px;height: 36px;" @click="dialogStatus==='create'?createData():onSaveFormSubmit()">保存</el-button>
       			</el-col>

       	</div>

       </el-row>
      </el-form>

    </div>

    <div class="ba_right">

      <div class="filter-container">
        <!--        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
        <!--         案卷登记地图-->
        <!--        </el-button>-->

      </div>

    </div>
  </div>
</template>
<script>
  import { fetchList, deleteBasidata, createBasicdata, getTreeDatas, getIdlist, updateData } from '@/api/basic-data'
  import Pagination from '@/components/Pagination'
  export default {
    el: '#upload',
    data() {
      return {
        dialogVisible: false,
        list: null,
        treelist: null,
        createstatus: 1,
        total: 0,
        parentName: "无",
        listLoading: true,
        nodeData:null,
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,


        ruleForm: {
          mapposition: '',
          mapgrade: '',
          happenposition: '',
          issuetype: '',
          issueorig: '',
          filesnum: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          mapposition: [
            {
              required: true, message: '请获取地图定位', trigger: 'blur'
            }
          ],
          mapgrade: [
            {
              required: true, message: '请获取地图等级', trigger: 'blur'
            }
          ],
          happenposition: [
            {
              required: true, message: '请输入事发位置', trigger: 'blur'
            }
          ],
          issuetype: [
            {
              required: true, message: '请输入问题类型', trigger: 'blur'
            }
          ],
          issueorig: [
            {
              required: true, message: '请选择问题来源', trigger: 'change'
            }
          ],
          filesnum: [
            {
              required: true, message: '请输入案卷编号', trigger: 'blur'
            }

          ],
          name: [
            { required: true, message: '请输入案卷编号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择问题来源', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写所属流域', trigger: 'blur' }
          ]
        },

        columns1: [
          {
            title: '文件名',
            key: 'name'
          },
          {
            title: '大小',
            key: 'sizes'
          },
          {
            title: '操作',
            key: '',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteAttBtn(params.index)
                  }
                }
              }, '删除')
            }
          }
        ],

        file: [], // 总文件List
        uploadFile: [] // 需要上传的文件List
      }
    },
    mounted() {
      // var RESREQUESTPREFIX='172.2.15.111:8080/ecer/ecer/file/upFile1';
      // this.upDataUrl = RESREQUESTPREFIX
      // this.uploadList = this.$refs.upload.fileList;
    },
    methods: {

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },

      handleUpload(file) { // 保存需要上传的文件
        const keyID = Math.random().toString().substr(2)
        file['keyID'] = keyID
        this.file.push(file)
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
        if (this.uploadFile.length === 0) {
          this.$Message.error('未选择上传文件')
          return false
        }
        for (let i = 0; i < this.uploadFile.length; i++) {
          const item = this.file[i]
          this.$refs.upload.post(item)
        }
      },
      uploadSuccess(response, file, fileList) { // 文件上传回调 上传成功后删除待上传文件
        // alert("response-----------"+response);
        if (response.success === true) {
          alert('上传成功')
        }
        console.log(response.status) // 后端返回数据
        console.log(file) // 当前上传文件
        console.log(fileList) // 整个input file 里的文件数组
      },

      createData() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.status = this.createstatus
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
        this.refreshData()
      },
      // submit files form
      onSaveFormSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            submitFilesManageForm(tempData).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
            // this.refreshData();
          }
        })
      },

      //获取树
      getTreeData() {
        console.log("获取树数据");
        this.listLoading = false
        getTreeDatas().then(response =>{
          var treeData = this.convertToTreeData(response.data, 0)
          var trees = [{
            id:0,
            label:'问题类型',
            children:treeData
          }];
          alert("treedata--------"+treeData);
          this.treelist = trees;
          this.total=response.data.length;

          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },

    }

  }

</script>

<style scoped>
  .app-container {
    width: 100%;
    height: 100%;
    left: 5px;
    top: 2px;
  }
  .el-icon-search{
    color: #666;
  }
  .el-row{
    margin-top: 28px;
  }

  .el-table__header{
    font-size: 12px;
  }

  .upload_title{
    margin-top: 10px;

  }
	.upload_title p{
		line-height: 28px;
		font-size: 12px;
		margin: 0 8px;
		float: left;
		color: #CCCCCC;
		text-align: center;

	}

  .ba_right {
    float: right;
    width: 57%;
    height: 100%;
    padding-left: 10px;
  }

  .ba_left {

    float: left;
    width: 43%;
    height: 100%;
    display: flex;
    background: #ffffff;

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

  .filesFormClass {
    top: 10px;
    left: 10px;
    position: absolute;
    float: left;
    width: 40%;
    height: 100%;
    display: block;
    background: #ff00ff;
    z-index: 200;
  }

  .files-form-class {
    top: 15px;
    left: 10px;
    position: absolute;

    float: left;
    width: 40%;
    height: 100%;
    display: flex;
    background: #ffffff;
    overflow: hidden;
    margin: 0 auto;

  }

  .files-form-class.el-form-item span {
    font-size: 12px;
    color: #000000;

  }

  .svg-container {
    top: 5px;
    left: 5px;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .filesnumber {

    width: 100%;
    top: 5px;
  }

  .issuefrom {
    width: 100%;
    float: right;

  }
.el-form-item__label{
  font-size: 12px;
}
  .filesFirstNum {
    width: 100%;
    display: inline-block;
    height: 30px;
    margin-bottom: 10px;
  }

  .issuetype {
    width: 100%;
    display:inline-block;
    height: 30px;

  }

  .happenposition {
    width: 100%;
    height: 30px;
    margin: 12px 0;
  }

  .mapgrade {
    width: 100%;
    display: inline-block;
    height: 30px;

  }

  .mapgradeleft {
    width: 50%;
    height: 28px;
    display: inline-block;
    float: left;
  }

  .mapgraderight {
    width: 50%;
    height: 30px;
    display: inline-block;
    float: right;
  }

  .getgrade {
    float: left;
    display: inline-block;
    height: 38px;
    margin-left: 4px;
  }

  .getpos {
    float: right;
    display: inline-block;
    height: 38px;
  }

  .flowarea {
    width: 100%;
    display:inline-block;
    height: 30px;
    margin-top: 12px;
  }

  .filesSecondNumb {
    width: 100%;
    display: inline-block;
    margin: 12px 0;
    height: 30px;

  }

  .filesFiveDesc {
    width: 100%;
    display: block;
    display: block;
    height: 50px;
  }

  .infodesc {
    display: inline-block;
    width: 100%;
    height: 100px;
  }
.el-form-item--mini.el-form-item{
    margin-bottom: 0;
}
.el-form-item .is-error .is-required .el-form-item--mini{
    margin-bottom: 0;
}
  .filesSixAddition {
    border: solid 1px #000000;
    width: 100%;
    height: 150px;
    display: block;
    float: left;
  }

  .filesThridName {
    width: 100%;
    display: inline-block;

    height: 30px;
  }

  .filesFourthTel {
    width: 100%;
    display: inline-block;
    margin: 12px 0;
    height: 30px;

  }

  .addsub {
    display: block;
    float: left;
    font-size: 12px;
    color: #0a76a4;

  }

  .selectFileSubmit {

    text-align: center;
    width: 100%;
    display: inline-block;
  }

  .submitclass {
    width: 100%;
    text-align: center;
    display: inline-block;

  }



</style>
