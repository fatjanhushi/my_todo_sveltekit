<script>
    import { goto } from '$app/navigation';

    let name, email, password, error
    async function register(){
       
        if(isFormValid()) {
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
            console.error('Form is not valid')       
            error = 'Form not valid' 
        }
    }

    function isFormValid(){
        return false
    }

</script>

<h1>Login</h1>
<form on:submit|preventDefault={register}>
    <input type="text" bind:value={name} placeholder="Name"/>
    <input type="email" bind:value={email} placeholder="Email"/>
    <input type="password" bind:value={password} placeholder="Password"/>
    <button type="submit">Register</button>
</form>
{#if (error)}
    <p>{error}</p>
{/if}

<style>
    p{
        color: red;
    }
</style>