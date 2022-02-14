<script>
    import { goto } from '$app/navigation'
    import { validEmail, validName, validPassword, validAll } from '$lib/validationUtils';

    let name, email, password, error

    async function register(){
        if(validAll(email, password, name)) {
            const res = await fetch('/auth/register',{
                method: 'POST',
                headers: {
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                        name,
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

<h1>Register</h1>
<form on:submit|preventDefault={register}>
    <input class:valid={validName(name)} type="text" bind:value={name} placeholder="Name"/>
    <input class:valid={validEmail(email)} type="email" bind:value={email} placeholder="Email"/>
    <input class:valid={validPassword(password)} type="password" bind:value={password} placeholder="Password"/>
    <button type="submit">Register</button>
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