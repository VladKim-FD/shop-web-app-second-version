<template>
    <div class="container goods-content">
        <div class="categories-content">
            <h2>Categories</h2>
            <div class="categories" ref="categories">
                <button class="category" v-for="(category, index) in this.$store.state.data.categories" :key="index"
                    @click="selectCategory(index)">
                    {{ category }}
                </button>
            </div>
        </div>
        <div class="goods-categories" ref="goodsCategories">
            <div class="goods-category active">
                <div class="good" v-for="good in this.$store.state.data.mensClothes" :id="good.id">
                    <div class="good-img" @click.prevent="showImg(good)">
                        <!-- <NuxtLink to="/good"  > -->
                        <img :src="good.image" alt="">
                        <!-- </NuxtLink> -->
                        <!-- <p class="description">{{good.description}}</p> -->
                    </div>
                    <div class="good-description">
                        <p>{{ good.title }}</p>
                        <h5>{{ good.price }}</h5>
                        <div class="good-btns">
                            <!-- <button class="look-btn">View product</button> -->
                            <button class="order-btn" @click="addToCart">Add to cart</button>
                            <button class="order-btn" @click="addToCart">Remove from cart</button>
                        </div>
                    </div>
                    <p class="amount">{{ getGoodAmount }}</p>
                </div>
            </div>
            <div class="goods-category ">
                <div class="good" v-for="good in this.$store.state.data.jeweleries" 
                :id="good.id">
                    <div class="good-img" @click.prevent="showImg(good)">
                        <img :src="good.image" alt="">
                    </div>
                    <div class="good-description">
                        <p>{{ good.title }}</p>
                        <h5>{{ good.price }}</h5>
                        <div class="good-btns">
                            <!-- <button class="look-btn">View product</button> -->
                            <button class="order-btn" @click="addToCart">Add to cart</button>
                            <button class="order-btn" @click="addToCart">Remove from cart</button>
                        </div>
                    </div>
                    <p class="amount">{{ getGoodAmount }}</p>
                </div>
            </div>
            <div class="goods-category ">
                <div class="good" v-for="good in this.$store.state.data.electronics" :id="good.id">
                    <div class="good-img" @click.prevent="showImg(good)">
                        <img :src="good.image" alt="">
                    </div>
                    <div class="good-description">
                        <p>{{ good.title }}</p>
                        <h5>{{ good.price }}</h5>
                        <div class="good-btns">
                            <!-- <button class="look-btn">View product</button> -->
                            <button class="order-btn" @click="addToCart">Add to cart</button>
                            <button class="order-btn" @click="addToCart">Remove from cart</button>
                        </div>
                    </div>
                    <p class="amount">{{ getGoodAmount }}</p>
                </div>
            </div>
            <div class="goods-category ">
                <div class="good" v-for="good in this.$store.state.data.womensClothes" :id="good.id">
                    <div class="good-img" @click.prevent="showImg(good)">
                        <img :src="good.image" alt="">
                    </div>
                    <div class="good-description">
                        <p>{{ good.title }}</p>
                        <h5>{{ good.price }}</h5>
                        <div class="good-btns">
                            <!-- <button class="look-btn">View product</button> -->
                            <button class="order-btn" @click="addToCart">Add to cart</button>
                            <button class="order-btn" @click="addToCart">Remove from cart</button>
                        </div>
                    </div>
                    <p class="amount">{{ getGoodAmount }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script >

export default {
    data() {
        return {
            goods: [],
            allGoods: {},
            amount: 0,
            viewGood: false,
            route: '/good'
        }
    },
    computed: {
        // getAmount() {
        //     return this.$store.getters.getAmount
        // }
    },
    created() {
        this.$store.dispatch('data/getData')
        this.$store.commit('data/allGoods')
    },
    computed: {
        getGoodAmount() {
            return this.$store.getters.getGoodAmount
        }
    },
    methods: {
        selectCategory(index) {
            const goodsCategories = document.querySelectorAll('.goods-category');
            for (let j = 0; j < goodsCategories.length; j++) {
                if (j == index) {
                    goodsCategories[j].classList.add('active')
                } else {
                    goodsCategories[j].classList.remove('active')
                }
            }
        },
        addToCart(event) {
            this.$store.dispatch('data/plusOrMinus', event.target)
        },
        showImg(good) {
            this.viewGood = true
            console.log(good);
            let img = good.image;
            let desc = good.description;
            console.log(img);
            console.log(desc);
            // let imgSrc = event.currentTarget.firstChild.src
            // let id = event.currentTarget.closest('.good').id;
            // console.log(id);
            this.$store.commit('data/showImage', good)
        },
        showGood(good) {
            this.$store.commit('data/showGood', good)
            this.$store.commit('data/updateFirebaseId')
            this.$router.push('/good')
        }
    },

}

</script>

<style>
@import './css/style.css';

.goods-content{
    padding-top: 60px !important;
}

.description {
    visibility: hidden;
}

.categories-content {
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    padding: 25px 25px 70px;
    margin-top: 35px;
    height: max-content;
    width: 25%;
    text-align: center;
}

.categories-content h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: var(--gray-text);
    margin-bottom: 25px;
}

.categories {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.category {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: var(--gray-text);
    text-transform: capitalize;
}

.category:hover {
    font-weight: 700;
}


.goods-content {
    display: flex;
    gap: 22px;

}

.goods-categories {
    margin-top: 35px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    /* gap: 30px; */
}

.goods-category {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
    display: none;
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    padding: 25px;
}

.goods-category.active {
    display: flex;
    transition: 0.5s;
}

.good {
    position: relative;
    width: 45%;
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    /* padding: 15px; */
}



.good .amount {
    display: none;
}

.good .amount.active {
    display: flex;
    position: absolute;
    top: -5px;
    left: -10px;
    padding: 5px 10px;
    background: var(--blue-bg);
    color: #FFFFFF;
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;
    border-radius: 50%;
}

.good-img {
    padding: 15px;
    position: relative;
    /* background: linear-gradient(to top, rgba(0, 0, 0, 0.637), transparent); */

    /* max-height: 340px; */
}

/* .good-img:hover{
    background: transparent;
    transition: .5s;
} */

.good img {
    width: 100%;
    height: 340px;
    object-fit: contain;
    /* margin: 15px; */
}



.good-description {
    border-radius: 0 0 20px 20px;
    /* border: 1px solid var(--border-colour); */
    border-top: 1px solid var(--border-colour);
    padding: 15px 15px 30px;
}

.good-description p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: var(--gray-text);
    margin-bottom: 5px;
}

.good-description h5 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: var(--gray-text);
}

.good-btns {
    margin-top: 30px;
    display: flex;
    gap: 10px;
}

.look-btn {
    color: var(--gray-btn);
    padding: 10px 15px;
    border-radius: 8px;
    border: 1.5px solid var(--border-colour);
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
}

.order-btn {
    border-radius: 8px;
    padding: 10px 15px;
    background: var(--blue-bg);
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
}

.good-img:hover {
    cursor: pointer;
}

@media (max-width: 870px) {
    .categories-content {
        padding-bottom: 35px;
    }

    .goods-category {
        justify-content: center;
    }

    .good-btns {
        margin: 30px auto 0;
        width: max-content;
    }

    .good {
        width: 90%;
    }
}

@media (max-width: 760px) {
    .categories-content {
        width: 30%;
    }

    .categories-content h2 {
        font-size: 20px;
    }

    .order-btn {
        padding: 10px;
    }
}

@media (max-width: 760px) {
    .goods-content {
        flex-direction: column;
        justify-content: center;
    }

    .categories-content {
        width: max-content;
        margin: 30px auto 0;
    }

    .goods-categories {
        margin-top: 15px;
        padding-bottom: 50px;
    }

    .good-description p {
        font-size: 17px;
        line-height: 35px;
        
    }
}

@media (max-width: 420px) {
    .nav-content {
        flex-direction: column;
        gap: 20px;
    }

    .good-btns {
        flex-direction: column;
    }

    .basket {
        width: 90% !important;
        top: 130px !important;
        /* right: 60px !important; */
    }

    .basket::before{
        display: none;
    }
}
</style>