/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 下午1:27
*
*/
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  .quill-editor .ql-container {
    height: 350px;
  }
</style>
