/**
* User: vickyzhe@outlook.com
* Date: 2018/10/12
* Time: 下午8:36
*
*/
<template>
    <div>
      <PageTitle :title="'课程列表'"/>
      <el-table
        :data="classDatas"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="course_id"
          label="课程ID"
          width="70">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          label="封面"
          width="100">
          <template slot-scope="scope">
            <img :src="baseUrl + scope.row.cover" width="100%"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="class_time"
          label="课时/价格"
          width="150">
          <template slot-scope="scope">
            <div v-for="item in JSON.parse(scope.row.class_time)">
              {{`${item[0]}课时／${item[1]}元`}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="教师"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleChangeStatus(scope.row.course_id)">{{scope.row.status === '1' ? '启用' : '禁用'}}</el-button>
            <el-button type="text" size="small" @click="pageChange(scope.row.course_id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="page-station">-->
        <!--<el-pagination-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page.sync="page"-->
          <!--:page-size="10"-->
          <!--layout="total, prev, pager, next, jumper"-->
          <!--:total="classDatas.length">-->
        <!--</el-pagination>-->
      <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import config from '@/utils/config'
  export default {
    name: 'ClassList',
    components: { PageTitle },
    data() {
      return {
        baseUrl: config.baseUrl,
        page: 1,
        classDatas: []
      }
    },
    methods: {
      getData () {
          this.$request({
              url: '/apis/addons/course/course/courselist',
              data: {
                  page: this.page
              }
          }).then(res => {
              this.classDatas = res.data
          })
      },
      handleChangeStatus(course_id) {
        this.$request({
          url:'/apis/addons/course/course/coursehandle',
          data: {
            course_id,
            handle: 'disable'
          }
        }).then(() => {
            this.$message.success('操作成功')
            this.getData()
        })
      },
      handleCurrentChange(){

      },
      pageChange(course_id) {
        this.$router.push({ path: '/AddClass', query: { course_id } })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style scoped>

</style>
