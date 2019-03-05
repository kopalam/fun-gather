/**
* User: whoAmI
* Date: 2019/02/13
*
*/
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <PageTitle :title="'采集测试'"/>
    <el-form-item label="采集规则:" prop="rules">
      <el-input type="textarea" :rows="4" v-model="ruleForm.rule" placeholder="请填入对应采集规则"></el-input>
    </el-form-item>
    <el-form-item label="所属元素:" prop="range">
      <el-input v-model="ruleForm.range" placeholder="请填入所属父类元素 如 .articleList"></el-input>
    </el-form-item>
    <el-form-item label="作者:" prop="author">
      <el-input v-model="ruleForm.author" placeholder="请填入作者"></el-input>
    </el-form-item>
    <el-form-item label="网站名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请填入采集网站名称"></el-input>
    </el-form-item>
    <el-form-item label="简称" prop="handle">
      <el-input v-model="ruleForm.handle" placeholder="请填入采集简称 如 qqEnt"></el-input>
    </el-form-item>
    <el-form-item label="采集URL" prop="url">
      <el-input v-model="ruleForm.url" placeholder="请填入采集列表的URL"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提 交</el-button>
      <el-button type="primary" @click="tryForm">测 试</el-button>
      <!--<el-button @click="resetForm">重置</el-button>-->
    </el-form-item>
    <!--<el-form-item label="所属元素:" prop="teacher_id">-->
    <!--<el-select v-model="ruleForm.teacher_id" placeholder="请选择所属老师">-->
    <!--<el-option v-for="teacherList in teacherLists" :key="teacherList.teacher_id" :label="teacherList.name" :value="teacherList.teacher_id"></el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="上课时间:" prop="time">-->
    <!--<el-date-picker-->
    <!--v-model="ruleForm.time"-->
    <!--type="datetimerange"-->
    <!--range-separator="至"-->
    <!--start-placeholder="开始日期"-->
    <!--end-placeholder="结束日期">-->
    <!--</el-date-picker>-->
    <!--</el-form-item>-->
  </el-form>
</template>

<script type="text/ecmascript-6">
  import PageTitle from "@/components/PageTitle/index";
  import moment from "moment";
  let ruleObj = {
          title: ["h2", "text"],
          link: ["a", "href"],
          dates: [".time", "text"]
        };
  let ruleArr = JSON.stringify(ruleObj);

  let inputLimit = function(e) {
  let num = e.target.value || "";
  let code = e.which || e.keyCode;
  let str = e.key && e.key != "Unidentified" ? e.key : num.substr(num.length - 1);

  //无论任何情况，皆可执行
  if (code == "8") {
    return true;
  }
  //没有满足任何一种情况，中断执行
  if (!(/[\d.]/.test(str) || code == "190")) {
    e.returnValue = false;
    return false;
  }
  if (
    num.length > 12 ||
    (num.indexOf(".") >= 0 && code == "190") ||
    (num.indexOf(".") == num.length - 3 && num.length > 3) ||
    (num.length == 0 && code == "190")
  ) {
    e.returnValue = false;
    return false;
  }
  return true;
};

export default {
  name: "Gather",
  components: { PageTitle },
  data() {
    return {
      kidLists: [], // 分类列表
      teacherLists: [],
      ruleForm: {
        handle: "",
        name: "",
        rule:ruleArr,
        range: "",
        url: "",
        author: ""
      },
      rules: {
        rule: [{ required: true, message: "请填写规则", trigger: "change" }],
        range: [{ required: true, message: "请输入父类元素", trigger: "blur" }],
        name: [{ required: true, message: "请输入网站名称", trigger: "blur" }], 
        author: [{ required: true, message: "请输入作者", trigger: "change" }],
        url: [
          { required: true, message: "请输入采集列表URL", trigger: "blur" }
        ],
        handle: [{ required: true, message: "请输入简称", trigger: "change" }]
      }
    };
  },

  // mounted () {
  //   const { course_id } = this.$route.query //尝试获取id，如果存在，则走提交编辑
  //   if (course_id) {
  //     this.$request({
  //       url: '/apis/addons/course/course/detail',
  //       data: { course_id }
  //     }).then(res => {
  //       const { course, teacher, course_set } = res.data
  //       const class_time = JSON.parse(course.class_time)
  //       this.ruleForm = {
  //         course_id,
  //         handle: 'edit',
  //         kid: parseInt([course.kid]),
  //         teacher_id: teacher.teacher_id + '',
  //         name: course.name,
  //         time: [moment(course_set.stime), moment(course_set.etime)],
  //         address: course_set.address,
  //         remark: course_set.remark,
  //         content: course.content,
  //         cover: course.cover,
  //         start: course_set.status === 0 ? true : false,
  //         class_time1: class_time[0][1],
  //         class_time2: class_time[1][1],
  //         class_time3: class_time[2][1],
  //         class_time4: class_time[3][1],
  //       }
  //     })
  //    }
  //   this.getTeacher()
  //   this.getClassify()
  // },
  methods: {
    submitForm() {
      //  通过ajax提交到后台
      this.ruleForm.rule = JSON.parse(this.ruleForm.rule); //字符串转为数组
      this.$request({
        url: "/gather",
        data: this.ruleForm
      });
    },
    tryForm() {
      console.log("ok");
    }
  }
  // methods: {
  //   inputLimit: inputLimit,
  //   getTeacher () {
  //       this.$request({
  //           url: '/apis/admin/admin/teacher',
  //           data: {}
  //       }).then(res => this.teacherLists = res.data)
  //   },
  //   getClassify () {
  //       this.$request({
  //           url: '/apis/addons/kinds/kinds/getkinds',
  //           data: {},
  //       }).then(res => {
  //           const data = res.data
  //           const sNav = data.filter(val => val.parent_id)
  //           this.kidLists = sNav
  //       })
  //   },
  //   getImgData (data) {
  //     this.ruleForm.cover = data
  //   } ,
  //   getContentData (data) {
  //     this.ruleForm.content = data
  //   } ,
  //   submitForm() {
  //     this.$refs.ruleForm.validate(valid => {
  //       if (!valid) { return false }
  //
  //       const data = this.ruleForm
  //
  //       if(data.time) {
  //           data.stime = Math.round(data.time[0] / 1000)
  //           data.etime = Math.round(data.time[1] / 1000)
  //       }
  //       delete data.time
  //
  //       data.start = data.start ? 0 : 1
  //
  //       for (let k in data) {
  //         if (data[k] === "") {
  //           delete data[k]
  //         }
  //       }
  //
  //       let newArr = []
  //       for (let i = 1; i <= 4; i ++) {
  //           if (data['class_time'+i] == null) {
  //               this.$message.success('【课时／价格】填写不完全')
  //               return false
  //           }
  //           if (data['class_time'+i] != null) {
  //               newArr.push([i*20,data['class_time'+i]])
  //           }
  //           delete data['class_time'+i]
  //       }
  //       newArr = `[${newArr.map(t=>`[${t.map(i => i).join(',')}]`).join(',')}]`
  //       data.class_time = newArr
  //
  //       this.$request({
  //         url: '/apis/addons/course/course/coursehandle',
  //         data,
  //       }).then(() => {
  //         this.$message.success('新增课程成功')
  //         setTimeout(() => { this.$router.push({ path: '/ClassList' }) }, 1000)
  //       })
  //     })
  //   },
  //   resetForm() {
  //     this.$refs.ruleForm.resetFields()
  //   }
  // }
};

</script>

<style scoped>
</style>
