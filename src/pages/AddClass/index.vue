/**
* User: vickyzhe@outlook.com
* Date: 2018/10/10
* Time: 下午11:32
*
*/
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <PageTitle :title="'新增课程'"/>
    <el-form-item label="分类:" prop="kid">
      <el-select v-model="ruleForm.kid" placeholder="请选择分类">
        <el-option v-for="kidList in kidLists" :key="kidList.kid" :label="kidList.kinds" :value="kidList.kid"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程名称:" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请填写课程名称"></el-input>
    </el-form-item>
    <el-form-item label="所属老师:" prop="teacher_id">
      <el-select v-model="ruleForm.teacher_id" placeholder="请选择所属老师">
        <el-option v-for="teacherList in teacherLists" :key="teacherList.teacher_id" :label="teacherList.name" :value="teacherList.teacher_id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上课时间:" prop="time">
      <el-date-picker
        v-model="ruleForm.time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="上课地点:" prop="address">
      <el-input v-model="ruleForm.address" placeholder="请填写上课地点"></el-input>
    </el-form-item>
    <el-form-item label="课时／价格:">
      <el-input placeholder="请填写价格" v-model.number="ruleForm.class_time1" @keydown.native="inputLimit">
        <template slot="prepend">20课时</template>
      </el-input>
      <el-input placeholder="请填写价格" v-model.number="ruleForm.class_time2" @keydown.native="inputLimit">
        <template slot="prepend">40课时</template>
      </el-input>
      <el-input placeholder="请填写价格" v-model.number="ruleForm.class_time3" @keydown.native="inputLimit">
        <template slot="prepend">60课时</template>
      </el-input>
      <el-input placeholder="请填写价格" v-model.number="ruleForm.class_time4" @keydown.native="inputLimit">
        <template slot="prepend">80课时</template>
      </el-input>
    </el-form-item>
    <el-form-item label="是否可报名:" prop="start">
      <el-switch v-model="ruleForm.start"></el-switch>
    </el-form-item>
    <el-form-item label="备注:" prop="remark">
      <el-input type="textarea" v-model="ruleForm.remark"></el-input>
    </el-form-item>
    <el-form-item label="封面:" prop="cover">
      <UploadImg @child-event="getImgData" :imgUrl="ruleForm.cover"/>
    </el-form-item>
    <el-form-item label="内容:" prop="content">
      <UE v-model="ruleForm.content" @child-event="getContentData" :content="ruleForm.content"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">发布</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import PageTitle from '@/components/PageTitle/index'
  import UE from '@/components/UE/index'
  import UploadImg from '@/components/UploadImg/index'
  import moment from 'moment'

  let inputLimit = function(e) {
      let num = e.target.value || ''
      let code = e.which || e.keyCode
      let str = (e.key && e.key != 'Unidentified') ? e.key : num.substr(num.length - 1)
      console.log('|type:' + e.type + '|code:' + code + '|str:' + str + '|value:' + num)
      //无论任何情况，皆可执行
      if(code == '8') {
          return true
      }
      //没有满足任何一种情况，中断执行
      if(!(/[\d.]/.test(str) || code == '190')) {
          e.returnValue = false
          return false
      }
      if(num.length > 12 ||
          (num.indexOf('.') >= 0 && code == '190') ||
          ((num.indexOf('.') == num.length - 3) && num.length > 3) ||
          (num.length == 0 && code == '190')) {
          e.returnValue = false
          return false
      }
      return true

  }

  export default {
    name: 'AddClass',
    components: { PageTitle, UE, UploadImg },
    data() {
      return {
        kidLists: [], // 分类列表
        teacherLists: [],
        ruleForm: {
          handle: 'create',
          kid: [],
          teacher_id: null,
          name: '',
          address: '',
          remark: '',
          content: '',
          cover:'',
          start: true,
          class_time1: null,
          class_time2: null,
          class_time3: null,
          class_time4: null,
        },
        rules: {
          kid: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          teacher_id: [
            { required: true, message: '请选择所属老师', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入上课地址', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '请上传封面图片', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入上课时间', trigger: 'change' }
          ],
        }
      }
    },
    mounted () {
      const { course_id } = this.$route.query
      if (course_id) {
        this.$request({
          url: '/apis/addons/course/course/detail',
          data: { course_id }
        }).then(res => {
          const { course, teacher, course_set } = res.data
          const class_time = JSON.parse(course.class_time)
          this.ruleForm = {
            course_id,
            handle: 'edit',
            kid: parseInt([course.kid]),
            teacher_id: teacher.teacher_id + '',
            name: course.name,
            time: [moment(course_set.stime), moment(course_set.etime)],
            address: course_set.address,
            remark: course_set.remark,
            content: course.content,
            cover: course.cover,
            start: course_set.status === 0 ? true : false,
            class_time1: class_time[0][1],
            class_time2: class_time[1][1],
            class_time3: class_time[2][1],
            class_time4: class_time[3][1],
          }
        })
       }
      this.getTeacher()
      this.getClassify()
    },
    methods: {
      inputLimit: inputLimit,
      getTeacher () {
          this.$request({
              url: '/apis/admin/admin/teacher',
              data: {}
          }).then(res => this.teacherLists = res.data)
      },
      getClassify () {
          this.$request({
              url: '/apis/addons/kinds/kinds/getkinds',
              data: {},
          }).then(res => {
              const data = res.data
              const sNav = data.filter(val => val.parent_id)
              this.kidLists = sNav
          })
      },
      getImgData (data) {
        this.ruleForm.cover = data
      } ,
      getContentData (data) {
        this.ruleForm.content = data
      } ,
      submitForm() {
        this.$refs.ruleForm.validate(valid => {
          if (!valid) { return false }

          const data = this.ruleForm

          if(data.time) {
              data.stime = Math.round(data.time[0] / 1000)
              data.etime = Math.round(data.time[1] / 1000)
          }
          delete data.time

          data.start = data.start ? 0 : 1

          for (let k in data) {
            if (data[k] === "") {
              delete data[k]
            }
          }

          let newArr = []
          for (let i = 1; i <= 4; i ++) {
              if (data['class_time'+i] == null) {
                  this.$message.success('【课时／价格】填写不完全')
                  return false
              }
              if (data['class_time'+i] != null) {
                  newArr.push([i*20,data['class_time'+i]])
              }
              delete data['class_time'+i]
          }
          newArr = `[${newArr.map(t=>`[${t.map(i => i).join(',')}]`).join(',')}]`
          data.class_time = newArr

          this.$request({
            url: '/apis/addons/course/course/coursehandle',
            data,
          }).then(() => {
            this.$message.success('新增课程成功')
            setTimeout(() => { this.$router.push({ path: '/ClassList' }) }, 1000)
          })
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
