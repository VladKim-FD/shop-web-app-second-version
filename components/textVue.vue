<template>

    <div class="container text-content">
                <h1>Payment and Delivery</h1>
                <div class="info">
                    <p v-for="info in this.$store.state.data.info">{{info}}</p>
                </div>
            </div>
    </template>
    
    <style>
    @import './css/style.css';
    
    .text-content{
        padding-left: 100px;
        padding-right: 30px;
        padding-top: 60px;
    }
    
    h1{
        margin-top: 45px;
        font-weight: 800;
        font-size: 24px;
        line-height: 29px;
        color: var(--gray-text);
        margin-bottom: 15px;
       
    }
    
    .info{
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        margin-bottom: 30px;
    }

    .info p{
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: var(--gray-text);
        max-height: 900px;
    }

    @media (max-width: 992px) {
        .text-content{
            padding-left: 60px;
        }
    }

    @media (max-width: 570px) {
        .text-content{
           padding: 0 15px;
        }
    }

    @media (max-width: 570px) {
        .text-content{
            text-align: center;
        }
    }
    </style>