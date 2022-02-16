<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher()

    export let todo
    let editMode = false

    async function updateTodo(){
        try{
            await fetch('/todos/todo_endpoint', {
            method: 'PUT',
            body: JSON.stringify(todo)
        })
        }catch{
            alert("There was an error updating Todo")
        }
        editMode = false
    }

    async function deleteTodo(_id){
        try{
            const res = await fetch('/todos/todo_endpoint', {
            method: 'DELETE',
            body: JSON.stringify(_id)
        })
            res.ok && dispatch('successDelete', { _id })
        }catch{
            alert("There was an error deleting Todo")
        }        
    }
</script>

<div class="todo-item">
    <input type="checkbox" bind:checked={todo.completed} on:change={updateTodo(todo)}/>
    {#if (editMode)}
    <input type="text" bind:value={todo.name} on:change={updateTodo(todo)} on:focus={()=> editMode=true} on:blur={()=>editMode=false} autofocus />
    {:else}
    <span>{todo.name}</span>
    {/if}
    <div class="todo-item-controls">
        <button type="button" on:click={()=>editMode=true}>Edit</button> | <button type="button" on:click={deleteTodo(todo._id)}>Delete</button>
    </div>
</div>

<style>
    .todo-item{
        display: flex;
    }
    input[type=text]:focus{
        width: 100%;
    }
    input[type=text]:focus + .todo-item-controls{
        display: none;
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