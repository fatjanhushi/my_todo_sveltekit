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

    let inputText
    export let todos

    async function addTodo(){
        if(inputText){
            const todo = {
                name: inputText,
                completed: false
            }
            todos = [...todos, todo]
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

</script>

<svelte:head>
    <title>My ToDo App</title>
</svelte:head>

<section>
    <input on:keypress={e => e.code === 'Enter' ? addTodo() : ''} type="text" bind:value={inputText} placeholder="What Do I have to do?">
    <button on:click={addTodo} type="submit">Add TODO</button>
</section>

<TodoList {todos}/>
