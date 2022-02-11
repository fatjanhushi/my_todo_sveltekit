<script>
    import TodoItem from "./TodoItem.svelte"    
    export let todos
</script>

<h1>My Todos</h1>

<ol>
    {#each todos as todo}
        <li>
            <TodoItem {todo} on:handleUpdate on:handleDelete/>
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