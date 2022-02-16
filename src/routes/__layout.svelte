<script>
    import {page, session} from '$app/stores'

    function logout(){
        //TODO - logout
        //delete $session.user
        console.log($session.user)
    }

</script>

<main>    
    <nav>
        <ul>
            <li class:selected={$page.url.search==''}><a href="/">My Todos</a></li>
            <li class:selected={$page.url.search=='?completed=true'}><a href="/?completed=true">Completed</a></li>
            {#if ($session.user)}
                <li class:selected={$page.url.pathname=='/account'}>
                    {$session.user.email}
                    <span><a class="logout" href="/#" on:click="{logout}">(Log Out)</a></span>
                </li>
            {:else}
                <li class:selected={$page.url.pathname=='/auth/login'}><a href="/auth/login">Log In</a></li>
            {/if}
        </ul>
    </nav>

    <slot></slot>
</main>

<style>
    main{
        max-width: 80rem;
        margin-inline: auto;
    }
    nav{
        background-color: coral;
    }
    ul{
        background-color: coral;
        list-style: none;
        padding-inline: 0;
        display: flex;
    }
    li{
        padding: .5rem 1rem;
    }
    li:last-child{
        margin-left: auto;
    }
    :any-link{
        text-decoration: none;
    }
    a{
        color: #333;
        text-transform: uppercase;
        font-weight: bold;
    }
    .selected{
        background-color: #999;
    }
    .logout{
        text-decoration: underline;
        text-transform: capitalize;
    }
</style>