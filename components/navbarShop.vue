<template>
    <nav>
        <div class="container nav-content">
            <NuxtLink class="nav-link" to="/payDeliver">Payment and Delivery</NuxtLink>
            <NuxtLink class="nav-link" to="/comments">Reviews</NuxtLink>
            <NuxtLink class="nav-link" to="/">
                Main Page
            </NuxtLink>

            <div class="basket-wrapper">
                <button class="basket-btn" @click="openBasket">
                    <img src="../assets/trolley.svg" alt="">
                    <p class="total-amount">{{ this.$store.state.data.totalAmount }}</p>
                </button>
                <div class="basket" :class="{ active: this.$store.state.data.basketOpen == true }">
                    <div class="basket-top">
                        <p>Basket</p>
                        <button class="basket-close" @click="closeBasket">
                        </button>
                    </div>
                    <div class="basket-checklist" ref="checkList">
                        <div class="wrapper__navbar-product"
                            v-for="(product, index) in this.$store.state.data.productData">
                            <div class="wrapper__navbar-info">
                                <img class="wrapper__navbar-productImage" :src="product.image" alt="">
                                <div class="wrapper__navbar-infoSub">
                                    <p class="wrapper__navbar-infoName">{{ product.title }}</p>
                                    <p class="wrapper__navbar-infoPrice">
                                        <!-- <span>Price: {{String(product.price).toLocaleString()}}</span> -->
                                        <span class="product-amount">Ordered amount: {{ product.amount }}</span>
                                        <span class="product-amount">Сost of the ordered goods:
                                            {{ product.totalSum }}</span>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="basket-bottom">
                        <button @click="printOrder">Order</button>
                        <p class="total-sum">Total Sum: {{ this.$store.state.data.totalSum }}</p>
                    </div>
                </div>
            </div>


           
    
            
        </div>
    </nav>

</template>

<script>

export default {

    mounted() {
        this.$store.commit('data/getChecklist', this.$refs.checkList);
    },
    methods: {
        openBasket() {
            this.$store.commit('data/openBasket')
        },
        closeBasket() {
            this.$store.commit('data/closeBasket')
        },
        printOrder(){
            this.$store.commit('data/printOrder', window)
        }
    }
}
</script>
    
<style>
@import './css/style.css';

nav {
    background: var(--nav-bg);
    padding: 13px 0;
    position: fixed;
    width: 100%;
    z-index: 11;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo img {
    width: 65px;
    height: 65px;
}

.nav-link {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF
}

button {
    background: transparent;
    border: none;
    outline: none;
}

.basket-btn {
    position: relative;
    margin-right: 10px;
}

.basket-btn p {
    position: absolute;
    padding: 5px 7px;
    background: var(--white);
    border-radius: 50%;
    color: var(--blue-bg);
    top: -5px;
    right: -5px;
    font-size: 12px;
    line-height: 14px;
    font-weight: 700;
}

button .total-amount.active {
    position: absolute;
    display: flex;
    position: absolute;
    top: -5px;
    padding: 5px 10px;
    left: -10px;
    background: var(--blue-bg);
    color: #FFFFFF;
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;
    border-radius: 50%;
}

.basket {
    width: 357px;
    position: absolute;
    top: 85px;
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: 0.5s;
    /* z-index: 5; */
    transform: translateY(-150%);
    opacity: 0;
    /* overflow-y: scroll; */
}

.basket.active {
    transform: translateY(0);
    opacity: 1;
}

.basket::before{
    content: url(../assets/triangle.png);
    position: absolute;
    top: -10px;
    right: 15px;
}

.basket-top {
    padding: 13px 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px 10px 0 0;
    background: var(--blue-bg);
    position: relative;
}

.basket-top .triangle {
    content: '';
    position: absolute;
    top: -14px;
    right: 80px;
}

.basket-top p,
.basket-bottom p,
.basket-bottom button {
    color: var(--white);
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
}


.basket-checklist {
    background: var(--white);
    padding: 16px;
    height: 100%;
}

.ordered-product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.basket-bottom {
    padding: 13px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0 0 10px 10px;
    background: var(--nav-bg);
}

.wrapper__navbar-product {
    margin-bottom: 15px;
    /* display: flex; */
    gap: 15px;
}

.wrapper__navbar-info {
    display: flex;
    /* gap: 15px; */
}

.wrapper__navbar-infoSub {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.wrapper__navbar-productImage {
    width: 70px;
    height: 54px;
    margin-right: 10px;
}

.wrapper__navbar-infoName {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: black;
}

.wrapper__navbar-option {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #BBBBBB;
    overflow: hidden;
    width: max-content;
    margin-top: 15px;
}

.wrapper__navbar-symbol {
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: 300ms;
}

.wrapper__navbar-count {
    width: 40px;
    height: 25px;
    background: #EEEEEE;
    text-align: center;
    border: 0.5px solid #BBBBBB;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-align: center; */
}

.wrapper__navbar-infoPrice {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: black;
    display: flex;
    flex-direction: column;
}


.basket-close {
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
}

.basket-close::before {
    content: "";
    width: 100%;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    position: absolute;
    top: 50%;
    left: 0;
}

.basket-close::after {
    content: "";
    width: 100%;
    height: 2px;
    background: white;
    transform: rotate(-45deg);
    position: absolute;
    top: 50%;
    right: 0;
}

@media (max-width: 480px) {
    .nav-content{
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
}
</style>