import { doc, addDoc, deleteDoc, updateDoc, collection, onSnapshot, QuerySnapshot } from "@firebase/firestore";
// import axios from "axios";
import { db } from "../firebase/firebase";
// import  axios  from "axios";
const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

export const state = () => ({
  goods: [],
  myGoods: [],
  categories: [],
  mensClothes: [],
  electronics: [],
  womensClothes: [],
  jeweleries: [],
  firebaseIds1: ['first', 'second', 'third', 'fourth'],
  firebaseIds2: ['fifth', 'sixth', 'seventh', 'eighth',
  ],
  firebaseIds3: ['nineth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth',],
  firebaseIds4: ['fifteenth',
    'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth'],
  allGoods: {},
  btn: {},
  modalOpen: false,
  basketOpen: false,
  viewImg: false,
  goodImg: '',
  goodName: '',
  goodDesc: '',
  goodId: 0,
  goodPrice: 0,
  goodFirebaseId: '',
  imgSrc: '',
  descText: '',
  goodInfo: [],
  text: '',
  info: [
    'Choose the product you like, carefully read its characteristics and then add it to your cart using the "Add to Cart" button.',
    'The shopping cart is available from any page of the site, so you can start placing an order at any time.',
    'You can place an order for the delivery of the selected product:',
    'By filling out a special order form on our website at any time of the day.',
    `In our online store, you can pay for goods in two ways: `,
    'Cash to the courier upon receipt of the order ',
    'By bank transfer via bank card (online)',
    'After choosing a payment method, proceed to the next step to confirm your details and complete the order.'
  ],
  reviews: [],
  edit: false,
  editedFeedback: {},
  editedFeedbackId: '',
  goodId: '',
  parent: {},
  orderedGood: {},
  orderedGoodAmount: 0,
  totalAmount: 0,
  totalSum: 0,
  checklist: {},
  productData: [],
  printContent: {}
})

export const mutations = {
  getData(state, goods) {
    state.goods = goods;
    for (let i = 0; i < state.goods.length; i++) {
      state.categories.push(state.goods[i].category)
      switch (state.goods[i].category) {
        case "men's clothing":
          // this.$store.state.data.mensClothes.push(this.goods[i])
          state.mensClothes.push(state.goods[i])
          break;
        case "jewelery":
          // this.$store.state.data.jeweleries.push(this.goods[i])
          state.jeweleries.push(state.goods[i])
          break;
        case "electronics":
          state.electronics.push(state.goods[i])
          // this.$store.state.data.electronics.push(this.goods[i])
          break;
        default:
          state.womensClothes.push(state.goods[i])
        // this.$store.state.data.womensClothes.push(this.goods[i])
      }
      state.mensClothes.forEach((mensCloth, index) => {
        mensCloth.amount = 0
        mensCloth.idForFirebase = state.firebaseIds1[index]
        if (!mensCloth.hasOwnProperty("totalSum")) {
          Object.defineProperty(mensCloth, 'totalSum', {
            get() {
              return this.price * this.amount;
            }
          })
        }
      }
      )
      state.jeweleries.forEach((jewelery, index) => {
        jewelery.amount = 0
        jewelery.idForFirebase = state.firebaseIds2[index]
        if (!jewelery.hasOwnProperty("totalSum")) {
          Object.defineProperty(jewelery, 'totalSum', {
            get() {
              return this.price * this.amount;
            }
          })
        }
      })
      state.electronics.forEach((electronic, index) => {
        electronic.amount = 0
        electronic.idForFirebase = state.firebaseIds3[index]
        if (!electronic.hasOwnProperty("totalSum")) {
          Object.defineProperty(electronic, 'totalSum', {
            get() {
              return this.price * this.amount;
            }
          })
        }
      })
      state.womensClothes.forEach((womensCloth, index) => {
        womensCloth.amount = 0
        womensCloth.idForFirebase = state.firebaseIds4[index]
        if (!womensCloth.hasOwnProperty("totalSum")) {
          Object.defineProperty(womensCloth, 'totalSum', {
            get() {
              return this.price * this.amount;
            }
          })
        }
      })
    }
    state.categories = Array.from(new Set(state.categories));

  },
  openModal(state) {
    state.modalOpen = true
  },
  closeModal(state) {
    state.modalOpen = false
    state.edit = false
  },
  createdFeedbacks(state, feedbacks) {
    state.reviews = feedbacks
    for (let i = 0; i < state.reviews.length; i++) {
      state.reviews[i].starsCount = [];
      for (let x = 0; x < state.reviews[i].rating; x++) {
        state.reviews[i].starsCount.push('')
      }
    }
  },
  async addFeedback(state, item) {
    item.starsCount = []
    for (let i = 0; i < item.rating; i++) {
      item.starsCount.push('')
    }
    state.reviews.push(item)
    await addDoc(collection(db, 'reviews'), {
      name: item.name,
      feedback: item.feedback,
      rating: item.rating,
    })
  },
  async deleteFeedback(state, id) {
    await deleteDoc(doc(collection(db, 'reviews'), String(id)))
  },
  changeFeedback(state, id) {
    state.edit = true
    state.editedFeedbackId = id
  },
  async editedFeedback(state, editedFeedback) {
    await updateDoc(doc(collection(db, 'reviews'), state.editedFeedbackId), {
      name: editedFeedback.name,
      feedback: editedFeedback.feedback,
      rating: editedFeedback.rating
    })
    state.reviews.forEach(feedback => {
      if (feedback.firebaseId == state.editedFeedbackId) {
        name: editedFeedback.name
        feedback: editedFeedback.feedback
        rating: editedFeedback.rating
      }
    });
  },
  createdGood(state, good) {
    state.goodInfo = good
  },
  allGoods(state, allGoods) {
    state.allGoods = allGoods;
  },
  plusOrMinus(state, btn) {
    state.allGoods = state.goods
    state.btn = btn
    let parent = state.btn.closest('.good'),
    parentId = parent.getAttribute('id') - 1;
    let text = parent.lastChild;
    if (state.btn.innerHTML == 'Add to cart') {
      state.allGoods[parentId].amount++;
    } else if (state.btn.innerHTML == 'Remove from cart' && state.allGoods[parentId].amount > 0) {
      state.allGoods[parentId].amount--;
    }
    text.classList.add('active')
    text.innerHTML = state.allGoods[parentId].amount;
    state.orderedGoodAmount = state.allGoods[parentId].amount
    state.orderedGood = state.allGoods[parentId]
    state.goodId = parentId;

    const productArray = [];
    for (let x = 0; x < state.allGoods.length; x++) {
      let totalCount = 0;
      if (x == parentId) {
        productArray.push(state.allGoods[x])
        totalCount += state.allGoods[x].amount
        state.totalAmount = totalCount
      }
    }
    for (let i = 0; i < productArray.length; i++) {
      state.productData.push(productArray[i])
    }
    state.productData = state.productData.filter(unique)

    if (state.totalAmount == 0) {
      state.checklist.style = 'display: none'
    } else {
      state.checklist.style = 'display: flex; flex-direction: column;'
    }
  },
  getChecklist(state, checklist) {
    state.checklist = checklist;
  }
  ,
  totalSumProduct(state) {
    state.totalSum = 0;
    for (const key in state.allGoods) {
      state.totalSum += state.allGoods[key].totalSum
      state.totalSum = Math.round(state.totalSum)
    }
  },
  totalAmountProduct(state) {
    state.totalAmount = 0;
    for (const key in state.allGoods) {
      state.totalAmount += state.allGoods[key].amount
    }
  },
  openBasket(state) {
    state.basketOpen = true
  },
  closeBasket(state) {
    state.basketOpen = false
  },
  showImage(state, good) {
    state.goodInfo.push(good)
    state.viewImg = true
  },
  closeView(state) {
    state.viewImg = false
    state.goodInfo = []
  },
  printOrder(state, window) {
    state.printContent = state.printContent
    window.print()
  },
  printPrepare(state, print) {
    state.printContent = print
  },
  async showGood(state, good) {
    state.goodFirebaseId = String(good.idForFirebase);
    await updateDoc(doc(collection(db, 'goodInfo'), 'GqjH2ZqEvAzVNrDBphfY'), {
      name: good.title,
      img: good.image,
      description: good.description,
      id: good.id,
      price: good.price,
    })
  },
  async updateFirebaseId(state) {
    await updateDoc(doc(collection(db, 'firebaseId'), 'S5PNQCoo1rSpmYrz4KeB'), {
      firebaseId: state.goodFirebaseId
    })
  },
  getFirebaseId(state, firebaseId) {
    state.goodFirebaseId = firebaseId
  }
}

export const actions = {
  plusOrMinus(context, state, btn, checklist, productData) {
    context.commit('plusOrMinus', state, btn)
    context.commit('totalSumProduct', state)
    context.commit('totalAmountProduct', state)
  },
  editedFeedback(context, state) {
    context.commit('editedFeedback', state, editedFeedback)
    context.commit('closeModal', state)
  },
  totalSum(context, state) {
    context.commit('totalSumProduct', state)
  },
  async getData({ commit }) {
    let goods = await fetch('https://fakestoreapi.com/products').then(response => response.json())
    commit('getData', goods)
  },
  createCategories({ commit }) {
    setTimeout(() => {
      commit('createCategories')
    }, 5000);
  }
}

