/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午11:14
*
*/
<template>
  <div>
    <PageTitle :title="'积分设置'"/>
    <el-form ref="creditSettingForm" :model="creditSettingForm" label-width="120px" :rules="rules">
      <el-form-item label="获取积分比例:">
        <el-row>
          <el-col :span="1">1 ： </el-col>
          <el-col :span="3"><el-input v-model.number="creditSettingForm.get" :readonly="!isEdit"></el-input></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="支出积分比例:">
        <el-row>
          <el-col :span="3"><el-input v-model.number="creditSettingForm.pay" :readonly="!isEdit"></el-input></el-col>
          <el-col :span="1"> ：1 </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="首次签到:">
        <el-row>
          <el-col :span="3"><el-input v-model.number="creditSettingForm.firstCheck" :readonly="!isEdit"></el-input></el-col>
          <el-col :span="1"> 分 </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="每次叠加:">
        <el-row>
          <el-col :span="3"><el-input v-model.number="creditSettingForm.everyCheck" :readonly="!isEdit"></el-input></el-col>
          <el-col :span="1"> 分 </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="邀请好友:">
        <el-row>
          <el-col :span="3"><el-input v-model.number="creditSettingForm.invite" :readonly="!isEdit"></el-input></el-col>
          <el-col :span="1"> 分 </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="邀请好友封面:">
        <UploadImg/>
      </el-form-item>
      <el-form-item v-if="!isEdit">
        <el-button type="primary" @click="onEdit">编辑</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="onSubmit('creditSettingForm')">保存</el-button>
        <el-button @click="onReset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import UploadImg from '@/components/UploadImg/index'
  export default {
    name: 'CreditSetting',
    components: { UploadImg, PageTitle },
    data() {
      return {
        isEdit: false,
        creditSettingForm: {
          get: '',
          pay: '',
          firstCheck: '',
          everyCheck: '',
          invite: '',
          img: ''
        },
        rules: {
          get: [
            { required: true, message: '不能为空'},
            { type: 'number', message: '必须为数字值'}
          ],
          pay: [
            { required: true, message: '不能为空'},
            { type: 'number', message: '必须为数字值'}
          ],
          firstCheck: [
            { required: true, message: '不能为空'},
            { type: 'number', message: '必须为数字值'}
          ],
          everyCheck: [
            { required: true, message: '不能为空'},
            { type: 'number', message: '必须为数字值'}
          ],
          invite: [
            { required: true, message: '不能为空'},
            { type: 'number', message: '必须为数字值'}
          ],
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.creditSettingForm)
          } else {
            return false;
          }
        });
      },
      onEdit() {
        this.isEdit = true
      },
      onReset() {
        this.isEdit = false
      }
    }
  }
</script>

<style scoped>

</style>
