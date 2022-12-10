<template>
    <div class="print" ref="print">
        <div class="print__header">
            <!-- <img src="images/logo.png" alt=""> -->
            My Store
        </div>
        <div class="print__body">
            <div class="print__body-item" v-for="(product, index) in this.$store.state.data.productData">
                <p class="print__body-item_name">
                    <span class="name">{{ product.title }}</span>
                    <span class="count">Ordered amount: {{ product.amount }}</span>
                </p>
                <p class="print__body-item_summ">Cost of ordered good: {{ product.totalSum }}</p>
            </div>
        </div>
        <div class="print__footer">
            Total Sum: {{ this.$store.state.data.totalSum }}
        </div>
    </div>

</template>

<script>
export default {
    mounted() {
        this.$store.commit('data/printPrepare', this.$refs.print)
    }
}
</script>

<style>
.print {
    display: none;
    width: 300px;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.print__body {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    margin: 20px 0;
}

.print__body-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
}

.print__body-item_name {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.print__header img {
    filter: invert();
}

.print__footed {
    text-align: center;
}
</style>