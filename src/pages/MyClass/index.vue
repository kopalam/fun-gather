/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:22
*
*/
<template>
  <div>
    <PageTitle :title="'我的课程'"/>
    <el-table
      :data="myClassDatas"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="上课时间"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="报名学员"
        width="180">
      </el-table-column>
      <el-table-column
        label="金额总数"
        width="180">
        <template slot-scope="scope">
          <span>¥ {{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">提现</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="page-station">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="page"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next, jumper"-->
        <!--:total="myClassDatas.length">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  export default {
    name: 'myClass',
    components: { PageTitle },
    data() {
      return {
        page: 1,
        myClassDatas: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      handleClick(data) {
        console.log(data)
      },
      handleCurrentChange(){

      }
    }
  }
</script>

<style scoped>

</style>
