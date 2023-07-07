<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import IconButton from "./icon_button.svelte";
  import { DNS_ENTRY_TYPES } from "../consts";

  export let dns_entry: DnsEntry;

  const dispatch = createEventDispatcher();

  const dispatchDelete = () => {
    if (dns_entry.id !== undefined) {
      dispatch("delete", {
        id: dns_entry.id,
      });
    }
  };
</script>

<div class="form">
  <input type="text" bind:value={dns_entry.domain} size="1" />
  <select
    bind:value={dns_entry.type}
    name="dns_entry_type"
    id="dns_entry_type_select"
  >
    {#each DNS_ENTRY_TYPES as dns_entry_type}
      <option value={dns_entry_type}>{dns_entry_type}</option>
    {/each}
  </select>
  <input type="text" bind:value={dns_entry.value} size="1" />

  <IconButton icon="delete" on:click={dispatchDelete} />
</div>

<style lang="scss">
  @import "../scss/colors";

  .form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2rem;
    gap: 10px;

    input, select {
      max-width: 100%;
      background-color: rgba($snow, 0.8);
      color: $rock-light;
      font-size: 16px;
      padding: 4px;
      border-radius: 5px;
      border: 2px solid rgba(0, 0, 0, 0);

      &:focus {
        outline: none;
        border: 2px solid $rock-light;
      }
    }

    select {
        font-weight: bold;
        cursor: pointer;
    }
  }
</style>
