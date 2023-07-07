<script lang="ts">
import { createEventDispatcher } from "svelte";

export let href: string | undefined = undefined;
export let target: string | undefined = undefined;
export let icon: string;
export let src: string = "material";

const dispatch = createEventDispatcher();

</script>

{#if href === undefined}
<button on:click={ () => dispatch('click') }>
    {#if src === "material"}
    <span class="material-icons-round">{ icon }</span>
    {:else if src === "static"}
    <img src="{ icon }" alt="icon">
    {/if}
</button>
{:else}
<a href={href} target={target}>
    {#if src === "material"}
    <span class="material-icons-round">{ icon }</span>
    {:else if src === "static"}
    <img src="{ icon }" alt="icon">
    {/if}
</a>
{/if}

<style lang="scss">
@import "../scss/colors";

button, a {
    border: none;
    background: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    &:hover {
        background-color: rgba($snow, .1);
    }

    img {
        height: 24px;
        width: 24px;
    }
}
</style>
