<template>
    <section class="real-app">
        <input 
            type="text" 
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来做什么"
            @keyup="addTodo" 
            name="" id=""
        >
        <Item :todo="todo"></Item>
        <Tabs :filter="filter"></Tabs>
    </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue'

export default {
    data() {
        return {
            todo: {
                id: 0,
                content: 'this is to do',
                completed: false
            },
            filter: 'all'
        }
    },
    components: {
        Item,
        Tabs
    },
    methods: {
        addTodo() {}
    }
}
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit 
    line-height 1.4em
    border none
    outline none 
    color inherit 
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>


