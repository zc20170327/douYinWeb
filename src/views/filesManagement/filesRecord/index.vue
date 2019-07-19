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
              <el-input v-model="ruleForm.issuetype" />
            </el-col>
          </el-form-item>
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
            <el-form-item label="地图等级" prop="mapgrade" size="mini">
              <el-col :span="13">
                <el-input v-model="ruleForm.mapgrade" />
              </el-col>
              <el-col :span="10" class="getgrade">
                <el-button type="primary" @click="onSubmit">获取</el-button>
              </el-col>
            </el-form-item>
            <!--        <el-form-item class="getgrade">-->
            <!--          <el-button type="primary" @click="onSubmit">获取</el-button>-->
            <!--        </el-form-item>-->
          </div>
          <div class="mapgraderight">
            <el-form-item label="地图定位" prop="mapposition" size="mini">
              <el-col :span="13">
                <el-input v-model="ruleForm.mapposition" />
              </el-col>
              <el-col :span="10" class="getpos">
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
            <el-input v-model="ruleForm.desc" type="flowarea" />
          </el-form-item>
        </div>
        <div class="filesSecondNumb">

          <el-form-item label="河段长工号:" prop="rivernum" size="mini">
            <el-col :span="9">
              <el-input v-model="ruleForm.rivernum" />
            </el-col>

            <el-col :span="15">
              <el-form-item class="issuefrom" label="呼入号码:" prop="callnum" size="mini">
                <el-input v-model="ruleForm.callnum" />
              </el-form-item>

            </el-col>
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
            <el-col>
              <el-input v-model="ruleForm.infodesc" type="text" />
            </el-col>

          </el-form-item>

        </div>
        <el-form-item class="addsub" label="上传附件" prop="infodesc" size="mini" />
        <div class="filesSixAddition">
          <div id="upload" class="selectFileSubmit">
            <el-form-item label="选择文件:" prop="infodesc" size="mini">

              <Upload
                ref="upload"
                :before-upload="handleUpload"
                :on-success="uploadSuccess"
                :show-upload-list="false"
                action="http://172.2.15.111:8088/ecer/ecer/file/upFile1"
                multiple
                style="float: left;width: 100px"
              >
                <!--             <el-button style="float: left" type="ghost">选择文件</el-button>-->
              </Upload>
              <el-button style="float: right" type="primary" @click="upload">上传</el-button>

              <!--           <el-button style="float: left" type="primary" @click="onSubmit">选择文件</el-button>-->

            </el-form-item>

          </div>
          <el-table
            :data="tableData"
            height="100"
            style="width: 100%"
          >
            <el-table-column
              fixed
              label="日期"
              prop="date"
              width="50"
            />
            <el-table-column
              label="状态"
              prop="name"
              width="50"
            />
            <el-table-column
              label="名称"
              prop="province"
              width="120"
            />
            <el-table-column
              label="大小"
              prop="city"
              width="50"
            />
            <el-table-column
              label="操作"
              prop="address"
              width="60"
            />

          </el-table>

        </div>
        <div class="submitclass">
          <el-button type="primary" @click="dialogStatus==='create'?createData():onSaveFormSubmit()">保存</el-button>
        </div>
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

export default {
  el: '#upload',
  data() {
    return {
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

      file: [{
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
  mounted() {
    // var RESREQUESTPREFIX='172.2.15.111:8080/ecer/ecer/file/upFile1';
    // this.upDataUrl = RESREQUESTPREFIX
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {

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
    }

  }

}

</script>

<style>
  .app-container {
    width: 100%;
    height: 100%;
    left: 5px;
    top: 2px;
  }

  .ba_right {
    float: right;
    width: 60%;
    height: 100%;
    padding-left: 10px;
  }

  .ba_left {

    float: left;
    width: 40%;
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

  .filesFirstNum {
    width: 100%;
    display: inline-block;
    height: 30px;
  }

  .issuetype {
    width: 100%;
    display: block;
    height: 30px;

  }

  .happenposition {
    width: 100%;
    height: 30px;
    margin: 5px;
  }

  .mapgrade {
    width: 100%;
    display: inline-block;
    height: 30px;
  }

  .mapgradeleft {
    width: 50%;
    height: 30px;
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
    margin-left: 4px;
  }

  .flowarea {
    width: 100%;
    margin: 5px 0;
    display: block;
    height: 30px;
    padding: 0 2px 0 3px;
  }

  .filesSecondNumb {
    width: 100%;
    display: inline-block;
    margin: 2px 0;
    height: 30px;

  }

  .filesFiveDesc {
    width: 100%;
    display: block;
    margin: 2px 0;
    display: block;
    height: 50px;
  }

  .infodesc {
    display: inline-block;
    width: 100%;
    height: 100px;
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
    margin: 2px 0;
    height: 30px;
  }

  .filesFourthTel {
    width: 100%;
    display: inline-block;
    margin: 2px 0;
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
    width: 98%;
    display: inline-block;
  }

  .submitclass {
    width: 100%;
    text-align: center;
    display: inline-block;

  }

</style>
