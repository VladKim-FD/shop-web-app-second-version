<template>
<div>
    <NavbarShop></NavbarShop>
    <Reviews></Reviews>
</div>
</template>

<script>
import NavbarShop from '../components/navbarShop.vue';
import Reviews from '../components/reviews.vue'

export default{ 
    components: {
        NavbarShop,
        Reviews
    }
}
</script>