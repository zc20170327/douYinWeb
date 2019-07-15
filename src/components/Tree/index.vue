<template>
  <div>
    <el-tree
          :data="data2"
          node-key="id"
          ref="tree"
          highlight-current
          @current-change= "getCheckedNodes"
          :props="defaultProps">
        </el-tree>
     
</div>
</template>
<script>
  export default {
    methods: {
      getCheckedNodes(data) {
        console.log(data.id,data.label)
      }
    },
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        data2: [{
          id: 1,
          label: '河流类型',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '视频厂家',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '部件状态',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>

