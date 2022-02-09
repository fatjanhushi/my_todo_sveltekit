<script context="module">
    export async function load({status, error}){
        const message = error.message
        return {
            props: {
                title: `Status: ${status}, ${error.message}`
            }
        }
    }
</script>

<script>
    export let title
</script>

<h3>{title}</h3>
