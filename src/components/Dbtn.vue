<template>
  <div class="hello">
    <button @click="plus">+++{{num}}</button>
  </div>
</template>

<script>
export default {
  name: 'btn',
  props: ['num'],
  data () {
    return {
    }
  },
  methods: {
    plus () {
      this.$emit('plusup')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
