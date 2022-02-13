<script>
    export let email, password

    function login(){
    }
</script>

<h1>Login</h1>
<form action="/auth/login" method="post">
    <input bind:value={email} type="email" name="email" placeholder="Email"/>
    <input bind:value={password} type="password" name="password" placeholder="Password"/>
    <button on:submit|preventDefault type="submit">Log In</button>
</form>