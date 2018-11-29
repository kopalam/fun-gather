/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:16
*
*/
<template>
  <div>
    <PageTitle :title="'用户列表'" />
    <el-table
      :data="userListDatas"
      border
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="uid"
        width="180">
      </el-table-column>
      <el-table-column
        label="头像／名称"
        prop="nickName"
        width="180">
        <!--<template slot-scope="scope">-->
          <!--<AvatarUserName :childrenData="scope.row"/>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        prop="course"
        label="课程">
      </el-table-column>
      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--width="150">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">积分明细</el-button>-->
          <!--<el-button type="text" size="small">禁用</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--<div class="page-station">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="page"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next, jumper"-->
        <!--:total="userListDatas.length">-->
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
    name: 'UserList',
    components: { AvatarUserName, PageTitle, Model },
    data() {
      return {
        modelDate: {
            type: 'create',
            item: {},
        },
        showModel: false,
        page: 1,
        userListDatas: []
      }
    },
    methods: {
      getUserList () {
          this.$request({
              url: 'apis/admin/admin/userlist',
              data: {
                  handle: 'student'
              }
          }).then(res => {
              this.userListDatas = res.data
          })
      },
    },
      mounted () {
        this.getUserList()
    }
  }
</script>

<style scoped>

</style>
