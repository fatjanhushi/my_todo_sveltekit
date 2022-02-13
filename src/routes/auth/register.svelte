<script>
    //export let error
    export let name, email, password

    async function register(){
        await fetch('register',{
            method: 'POST',
            headers:{
                'accept':'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
    }
</script>

<h1>Register</h1>
<form action="">
    <input type="text" bind:value={name} placeholder="Name"/>
    <input type="email" bind:value={email} placeholder="Email"/>
    <input type="password" bind:value={password} placeholder="Password"/>
    <button on:click|preventDefault={register}>Register</button>
</form>
