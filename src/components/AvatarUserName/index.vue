/**
* User: vickyzhe@outlook.com
* Date: 2018/10/9
* Time: 上午2:08
*
*/
<template>
  <div class="wrap">
    <div class="avatar">
      <img :src="childrenData.avatar"/>
    </div>
    <div>{{childrenData.name}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'AvatarUserName',
    props: ['childrenData'],
  }
</script>

<style scoped>
  .wrap {
    display: flex;
    line-height: 30px;
  }
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .avatar img {
    width: 100%;
    border-radius: 50%;
  }
</style>
