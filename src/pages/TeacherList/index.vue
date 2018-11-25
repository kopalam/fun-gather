/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:22
*
*/
<template>
  <div>
    <PageTitle :title="'教师列表'"/>
    <el-table
      :data="teacherListDatas"
      border
      style="width: 100%">
      <el-table-column
        label="头像／名称"
        width="180">
        <template slot-scope="scope">
          <AvatarUserName :childrenData="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="登录时间"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">课程安排</el-button>
          <el-button type="text" size="small">提现申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="page-station">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="page"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next, jumper"-->
        <!--:total="teacherListDatas.length">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import AvatarUserName from '@/components/AvatarUserName/index'
  export default {
    name: 'TeacherList',
    components: { AvatarUserName, PageTitle },
    data() {
      return {
        page: 1,
        teacherListDatas: [{
          date: '2016-05-03',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          img: 'http://img2.kuwo.cn/star/starheads/300/48/40/663552438.jpg',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      handleCurrentChange () {

      }
    }
  }
</script>

<style scoped>

</style>
