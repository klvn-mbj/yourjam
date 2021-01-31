<template>
<div id="app" class="d-flex justify-content-center align-items-center">

  <div id="body" class="container">
    <section-player/>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>

/* iFrame - only audio */
#app {
  height: 100vh;
  width: 100vw;
  background-color: whitesmoke;
}
#body {
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>

<!--  [EXTRA]

  <section-input @update="addItems"/>
  <p v-for="(item, index) in items" :key="index">
    {{item.brands}}
  </p>


  export default {
    data () {
      return {
        items: [],
      }
    },

    methods: {
      addItems(id) {
        this.items.push({ brands: id })
      }
    }
  }

-->
