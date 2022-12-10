<template>
    <Transition name="modal">
    <div class="modal">
        <div class="modal__block" >
            <h2 class="modal__title">
                Leave feedback
            </h2>
            <div class="modal__inputs">
                <label>
                    <span>Full Name</span>
                    <input type="text" v-model="name">
                </label>
                <label>
                    <span>Feedback</span>
                    <input type="text" v-model="feedback">
                </label>
                <label>
                    <span>Rating</span>
                    <input type="number" v-model="rating" min="1" max="5">
                </label>
            </div>
            <div class="modal__btns">
                <button 
                class="modal__btn cancel" 
                @click="closeModal"
                >
                    Cancel
                </button>
                <button 
                class="modal__btn add" 
                @click="addFeedback"
                v-if="this.$store.state.data.edit == false"
                >
                    Add feedback
                </button>
                <button 
                class="modal__btn add" 
                @click="changeFeedback"
                v-if="this.$store.state.data.edit == true"
                >
                    Change feedback
                </button>
            </div>
        </div>
    </div>
    </Transition>
</template>

<script>
import { doc, addDoc, deleteDoc, updateDoc, collection, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { throws } from "assert";
import { db } from "../firebase/firebase";
export default{
    data(){
        return {
            name: '',
            feedback: '',
            rating: 0
        }
    },
    methods: {
        closeModal(){
            this.$store.commit('data/closeModal')
            this.name = '';
            this.feedback = '',
            this.rating = 0
        },
        addFeedback(){
            // console.log(this.feedback);
            const item = {
                name: this.name,
                 feedback: this.feedback,
                 rating: this.rating
            }
            this.$store.commit('data/addFeedback', item )
            this.closeModal()
        },
        changeFeedback(){
            const editedFeedback = {
              name: this.name,
              feedback: this.feedback, 
              rating: this.rating
            }
            this.$store.commit('data/editedFeedback', editedFeedback)
            this.$store.commit('data/closeModal')
        }
        
    }
}
</script>

<style>
.modal{
    background: rgb(0, 0, 0, 0.35);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;

}

.modal__block{
    background: var(--modal-bg);
    border-radius: 30px;
    max-width: 312px;
    width: 100%;
    padding: 25px;
}

.modal__block h2{
   margin-bottom: 15px;
}

.modal__inputs{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.modal__inputs label{
    position: relative;
}

.modal__inputs span{
    position: absolute;
    left: 16px;
    top: 8px;
    font-size: 14px;
    line-height: 18px;
    color: var(--gray-text);
}

.modal__inputs input, 
.modal__inputs textarea{
    background: #e7e0ec;
    border-radius: 5px;
    width: 100%;
    border: none;
    outline: none;
    padding: 23px 0 9px 16px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: var(--gray-text);
    border-bottom: 1px solid var(--nav-bg);
    resize: none;
}

.modal__btns{
    display: flex;
     justify-content: flex-end;
     gap: 20px;
     margin-top: 25px;
}

.modal__btn{
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    padding: 10px 12px;
    text-transform: uppercase;
    transition: background 500ms;
}

.cancel{
    color: var(--red);
}
.cancel:hover{
    background: #ffe1e1;
}

.add{
    color: var(--blue);
}
.add:hover{
    background: #e6ddff;
}

.modal-enter-active,
.modal-leave-active{
    transition: 0.5s linear;
}
   
.modal-enter-from,
.modal-leave-to{
    opacity: 0;
    transform: scale(1.5);
}
</style>