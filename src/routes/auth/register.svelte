<script>
    //export let error
</script>

<h1>Register</h1>
<form method="post">
    <input type="text" name="name" placeholder="Name"/>
    <input type="email" name="email" placeholder="Email"/>
    <input type="password" name="password" placeholder="Password"/>
    <button on:submit|preventDefault type="submit">Register</button>
</form>
