<script>
    import TodoItem from "./TodoItem.svelte"
    import { slide } from 'svelte/transition';
    export let todos
</script>

<h1>My Todos</h1>

<ol>
    {#each todos as todo}
        <li transition:slide|local>
            <TodoItem {todo} on:successDelete/>
        </li>
    {/each}
</ol>

<style>
   li{
        background-color: rgb(214, 214, 186);
        margin-block: .15rem;
        padding: .3rem;
    }
</style>