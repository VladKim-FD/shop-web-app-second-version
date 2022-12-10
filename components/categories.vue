<template>
 
</template>

<style>
@import './css/style.css';

.categories-content{
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    padding: 25px 25px 0;
    margin-top: 35px;
}

.categories-content h2{
    font-weight: 700;
font-size: 24px;
line-height: 29px;
color: var(--gray-text);
margin-bottom: 25px;
}

.categories{
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

.category:hover{
   font-weight: 700;
}

</style>