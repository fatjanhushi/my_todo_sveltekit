<script context="module">
    export function load({session}){
        return session.user
        ?   {
                status: 301,
                redirect: '/todos'
            }
        :   {}
    }
</script>

<h1>Welcome to the Todo App</h1>
<h3>Please <a href="/auth/login">Log In</a> or <a href="/auth/register">Register an account</a> to use this app with your custom Todo's</h3>
