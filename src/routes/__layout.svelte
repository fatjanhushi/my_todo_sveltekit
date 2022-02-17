<script>
    import {page, session} from '$app/stores'

    async function logout(){
        await fetch('/auth/logout',{ method: 'POST'})
        location.reload()
    }


</script>

<main>    
    <nav>
        <ul>
            <li class:selected={$page.url.search==''}><a href="/todos">My Todos</a></li>
            {#if ($session.user)}
                <li class:selected={$page.url.pathname=='/account'}>
                    {$session.user.email}
                    <span><a class="logout" href="/auth/login" on:click="{logout}">(Log Out)</a></span>
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