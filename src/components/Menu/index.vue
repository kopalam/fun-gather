/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午1:25
*
*/
<template>
  <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    background-color="rgb(30, 33, 42)"
    text-color="#fff"
    active-text-color="rgb(40, 179, 120)"
    :style="{border: 'none', minHeight: minH}">
    <router-link to="/Classify">
      <el-menu-item index="6">
        <i class="el-icon-document"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>文章管理</span>
      </template>
      <router-link to="/"><el-menu-item index="1-1">文章列表</el-menu-item></router-link>
      <router-link to="/AddArticle"><el-menu-item index="1-2">新增文章</el-menu-item></router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-edit"></i>
        <span>课程管理</span>
      </template>
      <router-link to="/ClassList"><el-menu-item index="2-1">课程列表</el-menu-item></router-link>
      <router-link to="/AddClass"><el-menu-item index="2-2">新增课程</el-menu-item></router-link>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span>积分列表</span>
      </template>
      <router-link to="/CreditDetail"><el-menu-item index="3-1">积分明细</el-menu-item></router-link>
      <router-link to="/CreditSetting"><el-menu-item index="3-2">积分设置</el-menu-item></router-link>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>用户明细</span>
      </template>
      <router-link to="/UserList"><el-menu-item index="4-1">用户列表</el-menu-item></router-link>
      <router-link to="/TeacherList"><el-menu-item index="4-2">教师列表</el-menu-item></router-link>
    </el-submenu>
    <router-link to="/MyClass">
      <el-menu-item index="5">
        <i class="el-icon-document"></i>
        <span slot="title">我的课程</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  import menuData from './data'
  export default {
    name: 'Menu',
    props: ['minH'],
    data () {
        return {
            active: '1-1'
        }
    },
    mounted () {
        this.active = menuData[window.location.hash.slice(1)]
    }
  }
</script>

<style scoped>

</style>
