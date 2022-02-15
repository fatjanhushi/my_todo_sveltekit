<script>
    import { goto } from '$app/navigation'
    import { validEmail, validPassword, validAll } from '$lib/validationUtils';

    let email, password, error

    async function login(){
        if(validAll(email, password)){
            const res = await fetch('/auth/login',{
                method: 'POST',
                headers: {
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                        email,
                        password
                    }
                )
            })
            const jsonRes = await res.json()
            jsonRes.error ? error=jsonRes.error : goto('/todos')
        }else{
            error = 'Form not valid'
        }
    }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={login}>
    <input class:valid={validEmail(email)} type="email" bind:value={email} placeholder="Email"/>
    <input class:valid={validPassword(password)} type="password" bind:value={password} placeholder="Password"/>
    <button type="submit">Login</button>
</form>
{#if (error)}
    <p>{error}</p>
{/if}

<style>
    p{
        color: red;
    }
    .valid{
        background-color: rgb(158, 240, 125);
    }
</style>