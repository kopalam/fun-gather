/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:07
*
*/
<template>
  <div>
    <PageTitle :title="'积分详情'"/>
    <el-table
      :data="creditDetailDatas"
      border
      style="width: 100%">
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          {{scope.row.nickName || scope.row.user}}
        </template>
      </el-table-column>
      <el-table-column
        label="积分"
        width="180">
        <template slot-scope="scope">
          {{scope.row.score || scope.row.invite_score}}
        </template>
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          {{scope.row.types || '邀请好友'}}
        </template>
      </el-table-column>
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          {{scope.row.dates}}
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="page-station">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="page"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next, jumper"-->
        <!--:total="creditDetailDatas.length">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import moment from 'moment'
  export default {
    name: 'CreditDetail',
    components: { PageTitle },
    data () {
      return {
        page: 1,
        creditDetailDatas: []
      }
    },
    mounted () {
      this.$requestAll({
        url: '/apis/admin/admin/score',
        data: {
          handle: 'mark',
          page: this.page,
          name: ''
        }
      },{
        url: '/apis/admin/admin/score',
        data: {
          handle: 'invite',
          page: this.page,
          name: ''
        }
      }).then(res => {
        res.sort(function(a, b) {
          return moment(a.dates).format('x') - moment(b.dates).format('x')
        })
        this.creditDetailDatas = res
      })
    },
    methods: {
      handleCurrentChange () {

      }
    }
  }
</script>

<style scoped>

</style>
