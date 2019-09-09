<template>
  <div id="category">
    <cateHeader />
    <cateContent />
  </div>
</template>

<script>
import cateHeader from './components/Header'
import cateContent from './components/Content'
export default {
  name: 'Category',
  components: {
    cateHeader,
    cateContent
  }
}
</script>

<style lang='less' scoped>
#category {
  width: 100%;
  height: 100%;
  // background: skyblue;
}
</style>