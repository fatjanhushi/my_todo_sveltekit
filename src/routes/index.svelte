<script context="module">
    export async function load({fetch}){
        const res = await fetch('/todos')
        const json = await res.json()

        return{
            props: {
                todos: json.todos
            }
        }
    }
</script>

<script>
    import TodoList from '../components/TodoList.svelte';
    export let todos
    let inputText

    async function addTodo(){
        if(inputText){
            const todo = {
                name: inputText,
                completed: false
            }
            todos = [...todos, todo]
            //console.log(todos.indexOf(todo))
            inputText=''
            try{
                await fetch('/todos', {
                method: 'POST',
                body: JSON.stringify(todo)
            })
            } catch{
                alert("There was an error adding Todo")
            }            

        }else{
            alert("Input text is empty")
        }
    }

    async function updateTodo(event){
        const _id = event.detail._id
        const todo = todos.find(todo=>todo._id===_id)
        const index = todos.indexOf(todo)
        console.log(index)
        alert('Updated index' + index)
        try{
            await fetch('/todos', {
            method: 'PUT',
            body: JSON.stringify(todo)
        })
        }catch{
            alert("There was an error updating Todo")
        }
        
    }

    async function deleteTodo(event){
        const _id = event.detail._id
        todos = todos.filter(todo=>todo._id!==_id)
        try{
            await fetch('/todos', {
            method: 'DELETE',
            body: JSON.stringify(_id)
        })
        }catch{
            alert("There was an error deleting Todo")
        }
    }

</script>

<svelte:head>
    <title>My ToDo App</title>
</svelte:head>

<section>
    <input on:keypress={e => e.code === 'Enter' ? addTodo() : ''} type="text" bind:value={inputText} placeholder="What Do I have to do?">
    <button on:click={addTodo} type="submit">Add TODO</button>
</section>

{#if (todos.length > 0)}
    <TodoList {todos} on:handleDelete={deleteTodo} on:handleUpdate={updateTodo}/>
{:else}
    <h1>No Todos</h1>
{/if}
