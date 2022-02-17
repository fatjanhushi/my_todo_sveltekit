<script context="module">
    export async function load({fetch, session}){
        if(!session.user){
            return {
		        status: 301,
		        redirect: '/auth/login',
	        }
        }

        const res = await fetch('/todos/todo_endpoint',{
            'accept': 'application/json'
        })
    
        if(res.ok){
            const jsonRes = await res.json()
            return{
                props:{
                    todos: jsonRes.todos,
                    email: session.user.email
                }
            }
        }
        
    }

</script>

<script>
    import TodoList from '../../components/TodoList.svelte'
    export let todos, email
    let inputText

    async function addTodo(){
        if(inputText){
            const todo = {
                name: inputText,
                completed: false,
                email
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

    function filterCompleted(){
        todos = todos.filter(todo => todo.completed===true)
    }
    function filterNotCompleted(){
        todos = todos.filter(todo => todo.completed===false)
    }

</script>

<svelte:head>
    <title>My ToDos</title>
</svelte:head>

<section>
    <div class="addTodo">
        <input on:keypress={e => e.code === 'Enter' ? addTodo() : ''} type="text" bind:value={inputText} placeholder="What Do I have to do?">
        <button on:click={addTodo} type="submit">Add TODO</button>
    </div>
    <div class="filters">
        Show only: (<span on:click={filterCompleted}>completed</span> | <span on:click={filterNotCompleted}>uncompleted</span>)
    </div>
</section>

{#if (todos.length>0)}
    <TodoList {todos} on:successDelete={deleteTodo}/>
{:else}
    <h1>No Todos</h1>
{/if}

<style>
    section{
        max-width: 70%;
        margin-inline: auto;
    }
    .addTodo{
        display: flex;
        min-width: 100%;
        margin-block: 2em;
    }
    input{
        flex-grow: 1;
    }
    span{
        text-decoration: underline;
        cursor: pointer;
    }
</style>
