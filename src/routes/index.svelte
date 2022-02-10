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
    import Todo from '../components/Todo.svelte';
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
                alert("There was an error adding Todu")
            }            

        }else{
            alert("Input text is empty")
        }
    }


</script>

<svelte:head>
    <title>Index page</title>
</svelte:head>

<section>
    <input on:keypress={e => e.code === 'Enter' ? addTodo() : ''} type="text" bind:value={inputText} placeholder="What Do I have to do?">
    <button on:click={addTodo} type="submit">Add TODO</button>
</section>

<h1>My Todos</h1>
<ol>
    {#each todos as {name, completed}}
        <li>
             <Todo {name} {completed}/>
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