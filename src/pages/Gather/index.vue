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
    <PageTitle :title="'采集列表测试'"/>
    <el-form-item label="列表规则:" prop="rule">
      <el-input type="textarea" :rows="4" v-model="ruleForm.rule" placeholder="请填入对应采集规则"></el-input>
    </el-form-item>
    <el-form-item label="列表元素:" prop="range">
      <el-input v-model="ruleForm.range" placeholder="请填入所属父类元素 如 .articleList"></el-input>
    </el-form-item>
    <el-form-item label="内容规则:" prop="contentRule">
      <el-input type="textarea" :rows="4" v-model="ruleForm.contentRule" placeholder="请填入内容对应采集规则"></el-input>
    </el-form-item>
    <el-form-item label="内容元素:" prop="contentRange">
      <el-input v-model="ruleForm.contentRange" placeholder="请填入内容所属父类元素 如 .articleList"></el-input>
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
    <el-form-item label="完整URL" prop="full_url">
      <el-input v-model="ruleForm.full_url" placeholder="如果需要，请填入后缀"></el-input>
    </el-form-item>
    <el-form-item label="是否编码" prop="type">
      <el-radio v-model="ruleForm.encoding" label="1">需要</el-radio>
      <el-radio v-model="ruleForm.encoding" label="0">不需</el-radio>
    </el-form-item>
       <el-form-item label="所属元素:" prop="defaultType">
    <el-select v-model="ruleForm.defaultType" placeholder="请选择对应分类">
    <el-option v-for="getType in ruleForm.defaultType" :key="getType.id" :label="getType.name" :value="getType.id"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提 交</el-button>
      <el-button type="primary" @click="tryForm">列 表 测 试</el-button>
      <el-button type="primary" @click="tryContentForm">内 容 测 试</el-button>
      <!--<el-button @click="resetForm">重置</el-button>-->
    </el-form-item>

    
    <el-table :data="testData" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="280"></el-table-column>
      <el-table-column prop="link" label="链接" width="580"></el-table-column>
      <el-table-column prop="content" label="内容" width="580"></el-table-column>
    </el-table>
  </el-form>
</template>

<script type="text/ecmascript-6">
import PageTitle from "@/components/PageTitle/index";
import moment from "moment";

let ruleObj = {
  title: [".item-text>h3", "text"],
  link: [".item-tit>a", "href"]
  // dates: [".time", "text"]
};
let contentRuleObj = {
  title: ["h1", "text"],
  link: ["#chan_newsDetail", "html"]
};
let ruleArr = JSON.stringify(ruleObj); //列表采集规则转换成字符
let contentRuleArr = JSON.stringify(contentRuleObj); //内容采集规则转换成字符
let inputLimit = function(e) {
  let num = e.target.value || "";
  let code = e.which || e.keyCode;
  let getData = [];
  let str =
    e.key && e.key != "Unidentified" ? e.key : num.substr(num.length - 1);

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
function toArr(vueArray) {
  var array = [];

  for (var index in vueArray) {
    var item = restore(vueArray[index]);
    array.push(item);
  }

  return array;
}

export default {
  name: "Gather",
  components: { PageTitle },
  data() {
    return {
      testData: [],
      contentData: [],
      listTry: "",
      ruleForm: {
        handle: "chinaGame",
        name: "中华游戏网",
        rule: ruleArr,
        full_url:'',
        range: ".item-phototext",
        url: "https://game.china.com/news/jx/",
        author: "中华游戏网",
        type: "",
        encoding: "",
        contentRule: contentRuleArr,
        contentRange: "",
        ruleContentList: "",
        ruleList: "",
        defaultType: [],
        gather_types:''
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

  mounted () {
   this.getTypes()
  },
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

    getTypes() {
      this.$request({
        url:'gatherType',
        data: {
          handle: 'list',
          simple: true,
        },
      }).then(res => (this.ruleForm.defaultType = res.data),console.log(this.ruleForm.defaultType));
    },
    tryForm() {
      //  通过ajax提交到后台
      this.ruleForm.ruleList = JSON.parse(this.ruleForm.rule);
      this.ruleForm.ruleContentList = JSON.parse(this.ruleForm.contentRule);
      this.listTry = {
        range: this.ruleForm.range,
        rule: this.ruleForm.ruleList,
        encoding: this.ruleForm.encoding,
        url: this.ruleForm.url,
        full_url:this.ruleForm.full_url,
        author: this.ruleForm.author,
        gather_types:this.ruleForm.defaultType,
        type: 1
      };
      this.$request({
        url: "/gatherList?_token="+this.$token,
        data: this.listTry
      }).then(res => (this.testData = res.data));
    },

    tryContentForm() {
      this.ruleForm.ruleList = JSON.parse(this.ruleForm.rule);
      this.ruleForm.ruleContentList = JSON.parse(this.ruleForm.contentRule);
      this.ruleForm.type = "2";
      this.$request({
        url: '/gatherContent?_token='+this.$token,
        data:this.ruleForm
      }).then(
        res => this.testData = res.data
        )
    },

    submitForm() {
      this.ruleForm.ruleList = JSON.parse(this.ruleForm.rule);
      this.ruleForm.ruleContentList = JSON.parse(this.ruleForm.contentRule);
      this.ruleForm.type = "3";
      this.$request({
        url: '/gatherContent?_token='+this.$token,
        data:this.ruleForm
      }).then(() => {
            this.$message.success('新增规则成功'),
            setTimeout(() => { this.$router.push({ path: '/GatherList' }) }, 1000)
          })
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
