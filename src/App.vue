/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午1:27
*
*/
<template>
  <div id="app">
    <el-container :style="{height: screenHeight + 'px'}">
      <el-header class="flex">
        <div class="header-title b-green t-while">异域街舞后台</div>
        <div class="flex1 header-handle">
          <el-dropdown>
            <span class="header-username">userName</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px"><Menu/></el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <!--<img src="./assets/logo.png">-->
  </div>
</template>

<script>
import Menu from '@/components/Menu/index'
export default {
  name: 'App',
  components: { Menu },
  data () {
    return {
      screenHeight:  window.innerHeight
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.screenHeight = window.innerHeight
    }
  },
}
</script>

<style>
  html,body {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .el-header {
    background-color: rgb(30, 33, 42);
    color: #333;
    line-height: 60px;
    font-size: 12px;
    padding: 0;
  }
  .el-aside {
    background-color: rgb(30, 33, 42);
  }
  .header-title {
    font-family: "微软雅黑";
    font-size: 20px;
    width: 200px;
    text-align: center;
  }
  .header-handle {
    text-align: right;
    color: #ffffff;
    padding: 0 20px;
  }
  .header-username {
    color: #ffffff;
    cursor: pointer;
  }
  .flex {
    display: flex;
  }
  .flex1 {
    flex: 1;
  }
  .t-green {
    color: rgb(40, 179, 120);
  }
  .t-while {
    color: #ffffff;
  }
  .b-green {
    background-color: rgb(40, 179, 120);
  }
  .b-grey {
    background-color: rgb(219, 225, 230);
  }
  img {
    vertical-align: middle;
  }
  .page-station {
    text-align: center;
    margin: 30px auto;
  }
</style>
