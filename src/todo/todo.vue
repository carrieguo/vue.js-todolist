<template>
    <section class="real-app">
        <input 
            type="text" 
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来做什么"
            @keyup.enter="addTodo"
        >
        <Item  
            v-for="todo in todos"
            :todo="todo"
            :key="todo.id"
            @del="deleteTodo"
        />
        <Tabs :filter="filter"></Tabs>
    </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

let id = 0;

export default {
    data() {
        return {
            todos: [],
            filter: 'all'
        }
    },
    components: {
        Item,
        Tabs
    },
    methods: {
        addTodo(e) {
            this.todos.unshift({
                id: id++,
                content: e.target.value,
                completed: false
            });

            e.target.value = '';
        },
        deleteTodo(id) {
            this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1);
        }
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


