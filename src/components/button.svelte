<script lang="ts">
  import { createEventDispatcher } from "svelte";

export let icon: null | string = "";

const dispatch = createEventDispatcher();
</script>

<button on:click={ () => dispatch('click') }>
    {#if icon !== null}
    <span class="material-icons-round">{ icon }</span>
    {/if}
    <slot />
</button>

<style lang="scss">
@import "../scss/colors";

button {
    display: flex;
    gap: 10px;
    padding: 10px 15px;
    align-items: center;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    background-color: $grass;
    max-width: fit-content;
    cursor: pointer;

    &, span.material-icons-round {
        font-size: 18px;
        color: $rock-light;
    }

    span.material-icons-round {
        margin: -5px;
        font-size: 26px;
    }
}
</style>
