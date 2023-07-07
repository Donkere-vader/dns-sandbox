<script lang="ts">
  import { get } from "svelte/store";
  import { dns_entries_store } from "../stores";
  import DnsEntryForm from "./dns_entry_form.svelte";
  import IconButton from "./icon_button.svelte";
  import ViewTitle from "./view_title.svelte";

  let id_counter = 0;

  const get_id = () => {
    id_counter += 1;
    return id_counter - 1;
  };

  const default_entry: DnsEntry = {
    domain: "*",
    type: "A",
    value: "127.0.0.1",
  };

  let dns_entries: DnsEntry[] = get(dns_entries_store);
  $: dns_entries, updateStore();

  const updateStore = () => {
    dns_entries_store.set(dns_entries);
  };

  const addEntry = () => {
    dns_entries = [...dns_entries, { id: get_id(), ...default_entry }];
  };

  const deleteEntry = (event: Event) => {
    // @ts-ignore
    const entry_id: number = event.detail.id;

    let new_dns_entries: DnsEntry[] = [];
    dns_entries.forEach((entry) => {
      if (entry.id !== entry_id) {
        new_dns_entries.push(entry);
      }
    });

    dns_entries = new_dns_entries;
  };
</script>

<div class="editor">
  <ViewTitle>
    <h2>Editor</h2>
  </ViewTitle>

  <div class="form-container">
    <div class="column-names">
      <h4>Domain</h4>
      <h4>Type</h4>
      <h4>Value</h4>
      <IconButton icon="add" on:click={addEntry} />
    </div>
    <div class="entries" class:empty={dns_entries.length === 0}>
      {#each dns_entries as entry}
        <DnsEntryForm bind:dns_entry={entry} on:delete={deleteEntry} />
      {/each}
      {#if dns_entries.length === 0}
        <span>No entries</span>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../scss/includes";
  @import "../scss/colors";

  .editor {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .form-container {
      @include floating-card;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .column-names {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr 2rem;
        gap: 10px;
      }

      .entries {
        display: flex;
        flex-direction: column;
        gap: 10px;

        &.empty {
          align-items: center;
          justify-content: center;

          span {
            font-style: italic;
            color: $rock-lightest;
          }
        }
      }
    }
  }
</style>
