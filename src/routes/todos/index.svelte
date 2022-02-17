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
    // save a copy of todos array to make filters work
    let todosCopy = [...todos]

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
                if(res.ok) {
                    todos = [...todosCopy, todo]
                    todosCopy = [...todos] //also update the copy of todoCopy
                }
            }catch{
                alert("There was an error adding Todo")
            }            

        }else{
            alert("Input text is empty")
        }
    }

    function deleteTodo(event){
        const _id = event.detail._id
        todos = todosCopy.filter(todo=>todo._id!==_id)
        todosCopy = [...todos] //also update the copy of todoCopy
    }

    
    function filterCompleted(){
        //using todosCopy to start with the full copy of the array
        todos = todosCopy.filter(todo => todo.completed===true)
    }
    function filterNotCompleted(){
        //using todosCopy to start with the full copy of the array
        todos = todosCopy.filter(todo => todo.completed===false)
    }
    
    function filterAll(){
        todos = [...todosCopy]
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
        Filter: <span on:click={filterAll}>All</span> | <span on:click={filterCompleted}>Completed</span> | <span on:click={filterNotCompleted}>Uncompleted</span>
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
        padding: .5rem;
        border-radius: .5rem;
        box-shadow: 2px 2px 8px #333;
        border: .2rem #333 solid;
    }
    input:focus{
        border: .2rem #333 double;
    }
    button{
        margin-left: .5em;
        padding: .5rem;
        border-radius: .5rem;
        background-color: rgb(107, 182, 144);
        font-weight: bold;
        box-shadow: 2px 2px 8px #333;
        text-transform: uppercase;
    }
    span{
        text-decoration: underline;
        cursor: pointer;
    }
</style>
