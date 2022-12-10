<template>
    <div>
        <div class="container">
            <div class="reviews">
                <h2>{{ this.$store.state.data.reviews.length === 0 ? 'No Reviews' : 'Reviews' }}</h2>
                <div class="reviews__list">
                    <div v-for="(review, index) in this.$store.state.data.reviews" :key="review.id" class="review">
                        <p class="name-user">{{ review.name }}</p>
                        <p class="feedback">{{ review.feedback }}</p>
                        <p>{{ review.id }}</p>
                        <ul class="stars">
                            <li v-for="star in review.starsCount">
                                <img src="../assets/star.png" alt="">
                            </li>
                        </ul>
                        <div class="review__btns">
                            <button class="review-btn change" @click="changeFeedback(review.firebaseId)">
                                <img src="../assets/change.png" alt="">
                                <span>Change feedback</span>
                            </button>
                            <button class="review-btn delete" @click="deleteFeedback(review.firebaseId)">
                                <img src="../assets/delete.png" alt="">
                                <span>Delete feedback</span>
                            </button>
                        </div>
                    </div>
                </div>
                <button @click="openModal">leave feedback</button>
            </div>
        </div>
        <modal v-if="this.$store.state.data.modalOpen" :currentId="this.$store.state.data.currentId"></modal>
    </div>
</template>


<script>
import modal from './modal.vue'
import { doc, addDoc, deleteDoc, updateDoc, collection, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { db } from "../firebase/firebase";
export default {
    data() {
        return {
            id: this.$store.state.data.goodFirebaseId
        }
    },
    created() {
        // setTimeout(() => {
        //     onSnapshot(collection(db, 'firebaseId'), (QuerySnapshot) => {
        //         let firebaseId = '';
        //         QuerySnapshot.forEach((doc) => {
        //             firebaseId = doc.data().firebaseId
        //         })
        //         this.$store.commit('data/getFirebaseId', firebaseId)
        //         this.id = this.$store.state.data.goodFirebaseId
        //     })
        // }, 1000);
        setTimeout(() => {
            onSnapshot(collection(db, 'reviews'), (QuerySnapshot) => {
                const feedbacks = [];
                QuerySnapshot.forEach((doc) => {
                    const feedback = {
                        name: doc.data().name,
                        feedback: doc.data().feedback,
                        rating: doc.data().rating,
                        // id: doc.data().id,
                        firebaseId: doc.id
                    }
                    feedbacks.push(feedback)
                })
                this.$store.commit('data/createdFeedbacks', feedbacks)
            })
        }, 3000);
    },
    components: {
        modal
    },
    methods: {
        openModal() {
            this.$store.commit('data/openModal')
        },
        deleteFeedback(id) {
            this.$store.commit('data/deleteFeedback', id)
        },
        changeFeedback(id) {
            this.$store.commit('data/openModal')
            this.$store.commit('data/changeFeedback', id)
        }
    }
}
</script>

<style>
@import './css/style.css';

.reviews {
    /* margin-top: 30px; */
    border-radius: 30px;
    border: 1px solid var(--border-colour);
    padding: 15px 35px;
    margin-bottom: 30px;
    padding-top: 100px !important;
}

h2 {
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    color: var(--gray-text);
    margin-bottom: 15px;
}

.reviews__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.reviews button {
    border-radius: 8px;
    padding: 15px;
    background: var(--blue-bg);
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #FFFFFF;
    /* width: max-content; */
    display: flex;
    margin: 25px auto 0;
}

button:hover {
    cursor: pointer;
}

.review {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.name-user {
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    color: var(--gray-text);
}

.feedback {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: var(--gray-text);
}

.stars {
    display: flex;
}

.review__btns {
    display: flex;
    /* justify-content: flex-end; */
    gap: 15px;
    width: max-content;
}

.review-btn {
    width: max-content;
    display: flex;
    align-items: center;
    margin: 0 !important;
    background: transparent !important;
    gap: 10px;
    padding: 12px;
}

.change span {
    color: #6750a4;
}

.delete span {
    color: #cf1b1b;
}

@media (max-width: 740px) {
    .reviews{
        margin-top: 15px;
    }
}

@media (max-width: 500px) {
    .reviews{
        text-align: center;
    }

    .stars{
        justify-content: center;
    }
    
    .reviews__list{
        gap: 30px;
    }

    .review__btns{
        flex-direction: column;
        margin: 0 auto;
        gap: 0 !important;
    }
}
</style>
