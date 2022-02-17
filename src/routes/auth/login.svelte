<script context="module">
    export async function load({fetch, session}){
        if(session.user){
            return {
		        status: 301,
		        redirect: '/todos',
	        }
        }
        return{}
    }
</script>

<script>
    import { validEmail, validPassword, validAll } from '$lib/validationUtils'

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
            jsonRes.error ? error=jsonRes.error : location.reload()
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
    <p class="error">{error}</p>
{/if}

<p>No account? - <a href="/auth/register">Register new account</a></p>

<style>
    .error{
        color: red;
    }
    .valid{
        background-color: rgb(158, 240, 125);
    }
</style>