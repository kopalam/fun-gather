/**
* User: vickyzhe@outlook.com
* Date: 2018/10/9
* Time: 下午6:20
*
*/
<template>
    <div class="wrap">
        {{title}}
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'PageTitle',
        props: ['title'],
        data() {
            return {}
        }
    }
</script>

<style scoped>
  .wrap {
    font-size: 20px;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #ebebeb solid;
    margin-bottom: 50px;
  }
  .wrap button {
      vertical-align: text-bottom;
  }
</style>
