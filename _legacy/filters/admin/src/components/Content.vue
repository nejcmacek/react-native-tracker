<template>
  <div class="content-container">
    <div class="list">
  
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.content-container {
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  align-content: stretch;
}

.list {
  min-width: 200px;
}

.list > div {
  
}
</style>
