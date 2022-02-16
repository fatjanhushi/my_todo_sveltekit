<script context="module">
    export async function load({fetch, session}){
        console.log("inside load function")
        console.log(session)

        if(!session.user){
            return {
		        status: 303,
		        headers: {
			        location: '/auth/login',
		        },
	        }
        }else{
            const res = await fetch('/todos/todo_endpoint',{
                'accept': 'application/json'
            })
        
            if(res.ok){
                const jsonRes = await res.json()
                return{
                    props:{
                        todos: jsonRes.todos,
                    }
                }
            }
        }
       
    }

</script>

<script>
    import TodoList from '../../components/TodoList.svelte';
    export let todos
    let inputText

    async function addTodo(){
        if(inputText){
            const todo = {
                name: inputText,
                completed: false
            }
            inputText=''
            try{
                const res = await fetch('/todos/todo_endpoint', {
                method: 'POST',
                body: JSON.stringify(todo)
            })
                if(res.ok) todos = [...todos, todo]
            }catch{
                alert("There was an error adding Todo")
            }            

        }else{
            alert("Input text is empty")
        }
    }

    function deleteTodo(event){
        const _id = event.detail._id
        todos = todos.filter(todo=>todo._id!==_id)
    }

</script>

<svelte:head>
    <title>My ToDos</title>
</svelte:head>

<section>
    <input on:keypress={e => e.code === 'Enter' ? addTodo() : ''} type="text" bind:value={inputText} placeholder="What Do I have to do?">
    <button on:click={addTodo} type="submit">Add TODO</button>
</section>

{#if (todos)}
    <TodoList {todos} on:successDelete={deleteTodo}/>
{:else}
    <h1>No Todos</h1>
{/if}
