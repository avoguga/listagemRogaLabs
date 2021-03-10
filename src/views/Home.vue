<template>
  <div class="home">
    <Header/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
//import Form from '@/components/Form.vue'
export default {
  name: 'Home',
  components: {
    Header,
    //Form
  },
}
</script>
