<script>
    import {goto} from '$app/navigation';
    export let name, completed

    function handleCheck() {
        //completed ? goto('/?completed=false') : goto('/?completed=true')
    }
</script>

<div>
    <input type="checkbox" bind:checked={completed} on:change={handleCheck}/>
    <span>{name}</span>
</div>

<style>
    input:checked + span{
        text-decoration: line-through;
    }
</style>