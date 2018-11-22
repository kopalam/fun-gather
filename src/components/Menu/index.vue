/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午1:25
*
*/
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="rgb(30, 33, 42)"
    text-color="#fff"
    active-text-color="rgb(40, 179, 120)"
    style="border: none">
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
  export default {
    name: 'Menu',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped>

</style>
