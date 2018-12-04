/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午1:30
*
*/
<template>
  <div>
    <PageTitle :title="'文章列表'"/>
    <el-table
      :data="articleDatas"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="封面"
        width="100">
        <template slot-scope="scope">
         <img :src="baseUrl + scope.row.cover" width="100%"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="dates"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="kind_name"
        label="所属分类">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleChangeStatus(scope.row.id)">{{ scope.row.status === '0' ? '禁用' : '启用' }}</el-button>
          <el-button type="text" size="small" @click="pageChange(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="page-station">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="page"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next, jumper"-->
        <!--:total="articleDatas.length">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import config from '@/utils/config'
  export default {
    name: 'ArticleList',
    components: { PageTitle },
    data () {
      return {
        baseUrl: config.baseUrl,
        page: 1,
        articleDatas: []
      }
    },
    methods: {
      getArticleList () {
        this.$request({
          url: '/apis/addons/article/article/index',
          data: {
            page: this.page
          }
        }).then(res => this.articleDatas = res.data)
      },
      handleChangeStatus(id) {
        this.$request({
          url:'/apis/addons/article/article/able',
          data: {
            id,
            uid: 12446
          }
        }).then(res => {
          this.$message.success(res.message)
          this.getArticleList()
        })
      },
      handleCurrentChange(){

      },
      pageChange(data) {
        this.$router.push({ name: 'AddArticle', params: { ...data } })
      }
    },
    mounted () {
      this.getArticleList()
    }
  }
</script>

<style scoped>

</style>
