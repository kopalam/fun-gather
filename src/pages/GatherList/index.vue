/**
* User: KopaLam
* Date: 2019/3/14
* Time: 下午5:12
*
*/
<template>
    <div>
      <PageTitle :title="'规则列表'"/>
      <el-table
        :data="RuleData"
        border
        style="width: 90%">
        <el-table-column
          prop="id"
          label="编号"
          width="30">
        </el-table-column>
        <el-table-column
          prop="rule_list"
          label="列表规则"
          width="200">
        </el-table-column>
        <el-table-column
          prop="range_list"
          label="列表元素"
          width="90">
        </el-table-column>
        <el-table-column
          prop="rule_content"
          label="内容规则"
          width="200">
        </el-table-column>
        <el-table-column
          prop="range_content"
          label="内容元素"
          width="90">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gather_types_name"
          label="所属分类"
          width="100">
        </el-table-column>
        <el-table-column
          prop="handle"
          label="简称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL"
          width="250">
        </el-table-column>
         <!-- <el-table-column
          prop="full_url"
          label="完整url"
          width="250">
        </el-table-column> -->
        
        <el-table-column
          fixed="right"
          label="操作"
          width="140">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="pageChange(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleChangeStatus(scope.row.id)">{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button type="text" size="small" @click="deleteRule(scope.row.id)">删除</el-button>
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
    name: 'GatherList',
    components: { PageTitle },
    data() {
      return {
        baseUrl: config.baseUrl,
        page: 1,
        RuleData: [],
      }
    },
    methods: {
      getData () {
          this.$request({
              url: '/getRule?_token='+this.$token,
              data: {
                  page: this.page,
              }
          }).then(res => (this.RuleData = res.data));
      },
      handleChangeStatus(id) {
        this.$request({
          url:'/ruleSet?_token='+this.$token,
          data: {
            id:id,
            handler: 'disable'
          }
        }).then(() => {
            this.$message.success('操作成功')
            this.getData()
        })
      },
      deleteRule(id){
        this.$request({
          url:'/ruleSet?_token='+this.token,
          data:{
            id:id,
            handler:'delete'
          }
        }).then(()=>{
          this.$message.success('删除成功')
          this.getData()
        })
      },
      pageChange(id) {
        this.$router.push({ path: '/GatherEdit', query: { id } })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style scoped>

</style>
