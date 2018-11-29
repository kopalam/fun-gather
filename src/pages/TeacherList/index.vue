/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:22
*
*/
<template>
  <div>
    <PageTitle :title="'教师列表'">
      <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click="handleCreate"
      >新建</el-button>
    </PageTitle>
    <el-table
      :data="teacherListDatas"
      border
      style="width: 100%">
      <el-table-column
        prop="teacher_id"
        label="ID"
        width="100"
      />
      <el-table-column
        label="头像／名称"
        width="180">
        <template slot-scope="scope">
          <AvatarUserName :childrenData="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="电话"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">课程安排</el-button>-->
          <!--<el-button type="text" size="small">提现申请</el-button>-->
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
    <Model :visible="showModel" :modelDate="modelDate" @closeModel="closeModel" @submit="submit"></Model>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import AvatarUserName from '@/components/AvatarUserName/index'
  import Model from './Model'
  export default {
    name: 'TeacherList',
    components: { AvatarUserName, PageTitle, Model },
    data() {
      return {
        page: 1,
        teacherListDatas: [],
        modelDate: {
            type: 'create',
            item: {},
        },
        showModel: false,
      }
    },
    methods: {
        getTeacherList () {
            this.$request({
                url: 'apis/admin/admin/teacher',
                data: {}
            }).then(res => {
                this.teacherListDatas = res.data
            })
        },
        handleCreate () {
            this.showModel = true
            this.modelDate.type = 'create'
            this.modelDate.item = {
                name: '',
                passwd: '',
                telephone: '',
            }
        },
        handleEdit (v) {
            this.showModel = true
            this.modelDate.type = 'edit'
            this.modelDate.item = v
        },
        closeModel () {
            this.showModel = false
        },
        submit (data) {
            this.$request({
                url: 'apis/admin/admin/handle',
                data,
            }).then(() => {
                let message = ''
                if (data.handle === 'create') {
                    message = '新增教师信息成功'
                } else {
                    message = '修改教师信息成功'
                }
                this.$message({ message, type: 'success'})
                this.showModel = false
            })
        },
    },
    mounted () {
      this.getTeacherList()
    }
  }
</script>

<style scoped>

</style>
