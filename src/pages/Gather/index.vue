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
    <PageTitle :title="'一 键 采 集'"/>

    <el-form-item>
      <el-button v-for=" item in ruleForm.defaultType " :key="item.id" :label="item.name" :value="item.id" type="primary" @click="gatherForm(item.id)">{{item.name}}</el-button>
      <!--<el-button @click="resetForm">重置</el-button>-->
    </el-form-item>
    <p>采集耗时:{{this.contentData.time ? contentData.time : ' '+0+' 秒'}}</p>
    <el-table :data='contentData' border style="width: 84%">
      <el-table-column prop= "article_title" label= "标题" width="380"></el-table-column>
      <el-table-column prop= "article_author" label= "作者" width="280"></el-table-column>
      <el-table-column prop= "article_come" label= "来源" width="180"></el-table-column>
      <el-table-column prop= "article_create_time" label= "创建时间" width="180"></el-table-column>
      <el-table-column prop= "md5" label= "密钥" width="196"></el-table-column>
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
let types_value = '';
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
      }).then(res => (this.ruleForm.defaultType = res.data),console.log(this.ruleForm.defaultType));
    },
    gatherForm(id) {
      this.$request({
        url: 'getContents',
        data: {
            id:id,
        },
      }).then(res => (this.contentData = res.data),console.log(this.contentData));
    },
  }
};
</script>

<style scoped>
</style>
