<script>
    let email, password
    export let error = 'test'

    async function login(){
        isFormValid() ?
        await fetch('/auth/login',{
            method: 'POST',
            headers: {
                'accept': 'application/json'
            },
            body: JSON.stringify({
                    email,
                    password
                }
            )
        }):
        console.error('Form is not valid')

        console.log(error)
    }

    function isFormValid(){
        return true
    }

</script>

<h1>Login</h1>
<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} placeholder="Email"/>
    <input type="password" bind:value={password} placeholder="Password"/>
    <button type="submit">Register</button>
</form>
