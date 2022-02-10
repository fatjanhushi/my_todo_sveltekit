<script>
    export let todo

     function updateTodo(_id){
        alert(_id)
    }

    function deleteTodo(_id){
        alert(_id)
    }
</script>

<div class="todo-item">
    <input type="checkbox" bind:checked={todo.completed} on:change={updateTodo(todo._id)}/>
    <span>{todo.name}</span>
    <div class="todo-item-controls">
        <button type="button">Edit</button> | <button type="button" on:click={deleteTodo(todo._id)}>Delete</button>
    </div>
</div>

<style>
    .todo-item{
        display: flex;
    }
    input:checked + span{
        text-decoration: line-through;
    }
    .todo-item-controls{
        display: inline-block;
        max-width: max-content;
        margin-left: auto;
    }
</style>