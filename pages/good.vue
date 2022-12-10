<template>
    <div class="container">
        <NuxtLink to="/">
            <img src="../assets/arrow-back.svg" alt="" class="icon-back">
        </NuxtLink>
        <div class="good-info" v-for="good in this.$store.state.data.goodInfo">
            <h1>{{ good.name }}</h1>
            <div class="content">
                <img :src="good.img" alt="" class="image-good">
                <div class="good-sidebar">
                    <h2>{{ good.price }}</h2>
                    <p class="good-desc">{{ good.description }}</p>
                </div>
            </div>
        </div>
        <reviews id=""></reviews>
    </div>

</template>

<script>
import reviews from "../components/reviews.vue";
import { doc, collection, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { db } from "../firebase/firebase";

export default {
    components: {
        reviews
    },
    data() {
        return {
            id: 0
        }
    },
    created() {
        onSnapshot(collection(db, 'goodInfo'), (QuerySnapshot) => {
            const goodInfo = [];
            QuerySnapshot.forEach((doc) => {
                const good = {
                    name: doc.data().name,
                    img: doc.data().img,
                    description: doc.data().description,
                    id: doc.data().id,
                    price: doc.data().price
                }
                goodInfo.push(good)
            })
            this.$store.commit('data/createdGood', goodInfo)
        })
    },
}
</script>

<style>
.icon-back {
    width: 50px;
    height: 50px;
    margin: 30px auto;
}

.good-info h1 {
    text-align: center;
    color: black;
    margin-top: 0;
}

.content {
    display: flex;
    justify-content: center;
    gap: 75px;
    padding-bottom: 20px;
}

.image-good {
    width: 30%;
    height: 30%;
}

.good-desc {
    max-width: 500px;
    font-size: 20px;
    line-height: 28px;
}

@media (max-width: 992px) {
    .content {
        gap: 40px;
    }
}

@media (max-width: 740px) {
    .content {
        flex-direction: column;
        justify-content: center !important;
        text-align: center;
    }

    .image-good {
        margin: 5px auto;
        width: 40% !important;
        height: 40% !important;
    }

    .good-sidebar {
        text-align: center;
    }

    .good-desc {
        max-width: unset;
    }

    
}

@media (max-width: 600px) {
    .image-good{
        width: 60% !important;
        height: 60% !important;
    }

    .content{
        gap: 20px !important;
    }
}
</style>