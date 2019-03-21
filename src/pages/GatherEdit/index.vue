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
    <el-form-item label="URL后缀" prop="full_url">
      <el-input v-model="ruleForm.full_url" placeholder="请填入采集的完整URL"></el-input>
    </el-form-item>
    <el-form-item label="是否编码" prop="type">
      <el-radio v-model="ruleForm.encoding" label="1">需要</el-radio>
      <el-radio v-model="ruleForm.encoding" label="0">不需</el-radio>
    </el-form-item>
    <el-form-item label="是否编码" prop="type">
      <el-radio v-model="ruleForm.c_encoding" label="1">需要</el-radio>
      <el-radio v-model="ruleForm.c_encoding" label="0">不需</el-radio>
    </el-form-item>
    <el-form-item label="所属元素:" prop="defaultType">
      <el-select v-model="ruleForm.defaultType.id" placeholder="请选择对应分类" @change="obtainValue">
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
let types_value = '';
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
        handle: "",
        name: "",
        rule: "",
        range: "",
        url: "",
        author: "",
        full_url:'',
        type: "",
        encoding: "",
        c_encoding: "",
        contentRule: "",
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
        defaultType: [{ required: true, message: "请选择分类", trigger: "change" }],
        url: [
          { required: true, message: "请输入采集列表URL", trigger: "blur" }
        ],
        handle: [{ required: true, message: "请输入简称", trigger: "change" }]
      }
    };
  },

  mounted() {
    const id = this.$route.query.id; //尝试获取id，如果存在，则走提交编辑
    this.getTypes()
    if (id) {
      this.editFrom(id)
    }

  },
 methods: {
    obtainValue(value) {
       types_value = value;
    },
    getTypes() {
      this.$request({
        url:'gatherType',
        data: {
          handle: 'list',
          simple: true,
        },
      }).then(res => (this.ruleForm.defaultType = res.data));
    },
    tryForm() {
      //  通过ajax提交到后台
      this.ruleForm.ruleList = JSON.parse(this.ruleForm.rule);
      this.ruleForm.ruleContentList = JSON.parse(this.ruleForm.contentRule);
      this.listTry = {
        range: this.ruleForm.range,
        rule: this.ruleForm.ruleList,
        encoding: this.ruleForm.encoding,
        c_encoding: this.ruleForm.c_encoding,
        url: this.ruleForm.url,
        full_url:this.ruleForm.full_url,
        author: this.ruleForm.author,
        type: 1,
        gather_types:types_value,
      };
      this.$request({
        url: "/gatherList?_token="+this.$token,
        data: this.listTry
      }).then(res => (this.testData = res.data),console.log(this.testData.code));
    },

    tryContentForm() {
      this.ruleForm.ruleList = JSON.parse(this.ruleForm.rule);
      this.ruleForm.ruleContentList = JSON.parse(this.ruleForm.contentRule);
      this.ruleForm.type = "2";
       this.ruleForm.gather_types = types_value;
      this.$request({
        url: '/gatherContent?_token='+this.$token,
        data:this.ruleForm
      }).then(res => this.testData = res.data,console.log(this.testData));
    },

    submitForm() {
      this.ruleForm.ruleList = JSON.parse(this.ruleForm.rule);
      this.ruleForm.ruleContentList = JSON.parse(this.ruleForm.contentRule);
      this.ruleForm.type = "3";
      this.ruleForm.gather_types = types_value;
      this.$request({
        url: '/gatherContent?_token='+this.$token,
        data:this.ruleForm
      }).then(() => {
            this.$message.success('编辑规则成功'),
            setTimeout(() => { this.$router.push({ path: '/GatherList' }) }, 1000)
          })
    },
    editFrom(id) {
      this.$request({
        url: "/editRule?_token="+this.$token,
        data: { id }
      }).then(res => {
        const ruleData = res.data;
        // console.log(ruleData[0].defaultType);
        this.ruleForm = {
          id,
          handle: ruleData[0].handle,
          name: ruleData[0].name,
          rule: ruleData[0].rule_list,
          range: ruleData[0].range_list,
          url: ruleData[0].url,
          full_url:ruleData[0].full_url,
          author: ruleData[0].author,
          type: '',
          encoding: JSON.stringify(ruleData[0].encoding),
          c_encoding: JSON.stringify(ruleData[0].c_encoding),
          contentRule: ruleData[0].rule_content,
          contentRange: ruleData[0].range_content,
          ruleContentList: "",
          ruleList: "",
          defaultType: this.getTypes(),
          gather_types:''
        };
        console.log(this.ruleForm);
      });
    }
  }
};
</script>

<style scoped>
</style>
