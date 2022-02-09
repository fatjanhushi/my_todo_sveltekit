<script>
    import {page} from '$app/stores';
    //console.log($page.url.search)
</script>

<main>    
    <nav>
        <ul>
            <li class:selected={$page.url.search==''}><a href="/">My Todos</a></li>
            <li class:selected={$page.url.search=='?completed=true'}><a href="/?completed=true">Completed</a></li>
            <li class:selected={$page.url.pathname=='/account'}><a href="/account">Account</a></li>
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
</style>