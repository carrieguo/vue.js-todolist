//.vue文件是vue的开发方式，位于根目录src文件夹下
//vue要显示出来的模板
<template>
  <div id="test">{{text}}</div>
</template>

//控制显示内容如何变化
<script>
  export default {
    data() {
      return {
        text: 'hello'
      }
    }
  }
</script>

<style>
  #test {
    color: red;
  }
</style>