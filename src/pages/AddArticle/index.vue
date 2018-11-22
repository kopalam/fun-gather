/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:00
*
*/
<template>
  <div>
    <PageTitle :title="'新增文章'"/>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类:" prop="kind_id">
        <el-select v-model="ruleForm.kind_id" placeholder="请选择分类">
          <el-option v-for="kidList in kidLists" :label="kidList.kinds" :value="kidList.kid" :key="kidList.kid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请填写标题"></el-input>
      </el-form-item>
      <el-form-item label="封面:" prop="cover">
        <UploadImg @child-event="getImgDate" :imgUrl="ruleForm.cover"/>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <UE v-model="ruleForm.content" @child-event="getContentData" :content="ruleForm.content"/>
      </el-form-item>
      <el-form-item label="是否发布:" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">发布</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import UE from '@/components/UE/index'
  import UploadImg from '@/components/UploadImg/index'
  export default {
    name: 'AddArticle',
    components: { UE, UploadImg, PageTitle },
    data() {
      return {
        kidLists: [], // 分类列表
        handle: 'create',
        ruleForm: {
          title: '',
          kind_id: '',
          status: true,
          content: '',
          cover: ''
        },
        rules: {
          kind_id: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '请上传封面图片', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      getImgDate(data) {
        this.ruleForm.cover = data
      },
      getContentData(data) {
        this.ruleForm.content = data
      },
      submitForm() {
        this.$refs.ruleForm.validate(valid => {
          if (!valid) { return false }
          const data = {
            ...this.ruleForm,
            status: this.ruleForm.status ? 0 : 1,
            classify: this.classify
          }
          this.$request({
            url: this.handle === 'create' ? '/apis/addons/article/article/insert' : '/apis/addons/article/article/update',
            data: {
              ...data,
              uid: 12446
            }
          }).then(res => {
            this.$message.success(res.message)
            setTimeout(() => { this.$router.push({ path: '/' }) }, 1000)
          })
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
    },
    mounted () {
      const { params } = this.$route
      if (params.id) {
        params.kind_id = parseInt(params.kind_id)
        params.status = params.status === "0" ? true : false
        this.ruleForm = params
        this.handle = 'update'
      }

      this.$request({
        url: '/apis/addons/kinds/kinds/getkinds',
        data: {}
      }).then(res => {
        const data = res.data
        data.forEach(val => {
          if (val.parent_id) {
            data.forEach(valInner => {
              if (valInner.kid == val.parent_id) {
                const newArray = valInner.kids || []
                newArray.push(val)
                valInner.kids = newArray
              }
            })
          }
        })
        const bNav = data.filter(val => !val.kids && val.parent === 0)
        this.kidLists = bNav
      })
    }
  }
</script>

<style scoped>

</style>
