<template>
  <div>
    <div class="wrapper">
      <navbarShop></navbarShop>
      <goods></goods>
      <viewImg></viewImg>
    </div>
    <print></print>
  </div>
  
</template>

<script>
import navbarShop from '../components/navbarShop.vue';
import goods from '../components/goods.vue';
import viewImg from '../components/viewImg.vue';
import print from '../components/print.vue';

export default {
  name: 'IndexPage',
  components: {
    navbarShop,
    goods,
    viewImg,
    print
  },
   
}
</script>

<!-- <style>
@import '../components/css/fonts.css';
@import '../components/css/style.css';
</style> -->
