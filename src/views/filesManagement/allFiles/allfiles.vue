<template>
  <div class="tab-container">
    <el-col style="font-size: 12px;color: #0a76a4;margin-top: 10px" aria-label="查询条件">查询条件</el-col>
    <div class="search-info">
      <el-col :span="4" style="margin-left: 2px">
        <el-input v-model="input" placeholder="请输入案卷编号" style="width: 12rem;margin-left:2px;"></el-input>
      </el-col>
      <el-col :span="4" style="margin: 0 10px">
        <el-select v-model="value4" clearable placeholder="请选择问题来源" style="width:12rem;margin: 0 12px">
        </el-select>
      </el-col>
      <el-col :span="4" style="margin: 0 10px">
        <el-input v-model="input" placeholder="请输入问题类型" style="width: 12rem;margin:0 12px;"></el-input>
      </el-col>
      <el-col :span="4" style="margin: 0 10px">
        <el-input v-model="input" placeholder="请输入所属辖区" style="width: 12rem;margin:0 12px;"></el-input>
      </el-col>
      <el-col :span="4" style="margin: 0 10px">
        <el-select v-model="value4" clearable placeholder="请选择处置部门" style="width: 12rem;margin-left:12px;">
        </el-select>
      </el-col>
      <el-col :span="2" style="margin-left:5px">
        <el-button type="primary" style="margin-left: 12px;float: right">查询</el-button>
      </el-col>
    </div>
    <el-table
      :data="tableData4"
      style="width: 100%;margin-top: 20px;"
      max-height="750">
      <el-table-column
        fixed
        prop="number"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="docket_number"
        label="案卷编号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="source"
        label="问题涞源"
        width="160">
      </el-table-column>
      <el-table-column
        prop="type"
        label="问题类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="所属辖区"
        width="280">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="上报时间"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <el-button
        @click="checkFilesDetails"
        type="text"
        size="small"
        style="margin-right: 4px;">
        详细
      </el-button>
<!--        <router-link to='/components/allfilesDetailsInfo'>跳转</router-link>-->
      </el-table-column>
    </el-table>

    <el-tag style="margin-top: 40px;">第1页 共7条</el-tag>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000"
      style="float: right;margin-top: 40px;line-height: 24px;">
    </el-pagination>
  </div>




</template>

<script>

  import tabPane from './components/TabPane'

  export default {
    name: 'Tab',
    components: { tabPane },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default  selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
    },
    methods: {
      showCreatedTimes() {
        this.createdTimes = this.createdTimes + 1
      }
    }
  }
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }


</script>
<script>

  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);


      },

      checkFilesDetails(){

        this.$router.push({name: '/allfilesDetailsInfo'})


      }
    },
    data() {
      return {
        tableData4: [{
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
        }]
      }
    }
  }
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
  .search-info{

    border: solid 1px #999999;
    width: 100%;
    height: 90px;
    display: block;
    margin-top: 10px;
    text-align: center;
  }
  .el-col el-col-24{
    text-align: center;
    font-size: 10px;
    color: #0000ff;
    width: 100px;
  }
</style>
