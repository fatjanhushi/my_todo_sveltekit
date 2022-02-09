<script>
    import Todo from '../components/Todo.svelte';
    let inputText

    let todos = [
        {
            id: 1,
            name: "todo1",
            completed: false
        },
        {
            id: 2,
            name: "todo2",
            completed: true
        }
    ]

    function addTodo(){
        if(inputText){
            const todo = {
                id: todos.length+1,
                name: inputText,
                completed: false
            }
            todos = [...todos, todo]
            inputText=''
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