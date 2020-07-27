<template>
  <div>
    <h3>Hello {{ fname }} {{ lname }} {{ num + 20 }}</h3>
    <input type="text" v-model="text" @input="$emit('input', text)">
    <q-btn @click="magbawas">Emit</q-btn>
  </div>
</template>

<script>
export default {
  props: ['fname', 'lname', 'num', 'value'],
  mounted () {
    this.text = this.value
  },
  data: () => ({
    text: ''
  }),
  methods: {
    magbawas () {
      this.$emit('poop', '💩')
      this.$emit('input', '💩')
    }
  }
}
</script>