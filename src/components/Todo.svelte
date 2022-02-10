<script>
    import {goto} from '$app/navigation';
    export let name, completed

    function handleCheck() {
        //completed ? goto('/?completed=false') : goto('/?completed=true')
    }
</script>

<div class="todo-item">
    <input type="checkbox" bind:checked={completed} on:change={handleCheck}/>
    <span>{name}</span>
    <div class="todo-item-controls">
        <button type="button">Edit</button> | <button type="button">Delete</button>
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