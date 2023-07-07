<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { DNS_ENTRY_TYPES } from "../consts";
  import { lookupRecord } from "../lookup";
  import Button from "./button.svelte";
  import CodeBlock from "./code_block.svelte";
  import IconButton from "./icon_button.svelte";

  export let test: DnsTest;

  let expanded = true;
  let title_edit = false;

  const dispatch = createEventDispatcher();

  const getTestResult = (): "error" | "success" | "unsure" => {
    if (test.last_run === undefined) {
      return "unsure";
    } else if (test.last_run?.actual === test.last_run?.expected) {
      return "success";
    }

    return "error";
  };

  const toggleExpanded = () => {
    expanded = !expanded;
  };

  const toggleTitleEdit = () => {
    title_edit = !title_edit;
  }

  const runTest = () => {
    test.last_run = {
      actual: lookupRecord(test.domain, test.type),
      expected: test.expected,
    };
  };

  const deleteTest = () => {
    dispatch('delete', {
      id: test.id,
    });
  };
</script>

<div class="container">
  <div class="test-title">
    {#key test}
      <span
        class="material-icons-round"
        class:success={getTestResult() === "success"}
        class:error={getTestResult() === "error"}
        >{getTestResult() === "unsure"
          ? "help"
          : getTestResult() === "success"
          ? "check_circle"
          : "error"}</span
      >
    {/key}
    <div class="test-title">
      {#if title_edit}
      <input bind:value={test.name} />
      <IconButton icon="save" on:click={ toggleTitleEdit } />
      {:else}
      <h3 on:click={ toggleTitleEdit } on:keypress={ toggleTitleEdit }>{test.name || "New test"}</h3>
      {/if}
    </div>
    <div class="expand-button">
      <IconButton
        icon={expanded ? "expand_more" : "chevron_left"}
        on:click={toggleExpanded}
      />
    </div>
  </div>
  {#if expanded}
    <div class="column-names">
      <h4>Domain</h4>
      <h4>Type</h4>
      <h4>Expected</h4>
    </div>
    <div class="inputs">
      <input type="text" bind:value={test.domain} size="1" />
      <select
        bind:value={test.type}
        name="dns_entry_type"
        id="dns_entry_type_select"
      >
        {#each DNS_ENTRY_TYPES as dns_entry_type}
          <option value={dns_entry_type}>{dns_entry_type}</option>
        {/each}
      </select>
      <input type="text" bind:value={test.expected} size="1" />
    </div>
    {#key test}
      {#if getTestResult() === "error"}
        <div class="test-result">
          <h4>Test failed</h4>
          <span>Expected: </span>
          <CodeBlock code={test.last_run?.expected || ""} />
          <span>Got: </span>
          <CodeBlock code={test.last_run?.actual || ""} />
        </div>
      {/if}
    {/key}
    <div class="buttons">
      <IconButton icon="delete" on:click={deleteTest} />
      <Button icon="play_arrow" on:click={runTest}>run</Button>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../scss/includes.scss";
  @import "../scss/colors";

  .container {
    @include floating-card;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .test-title {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      span.material-icons-round {
        color: $rock-lightest;

        &.success {
          color: $grass;
        }

        &.error {
          color: $fire;
        }
      }

      .expand-button {
        flex: 1 0 auto;

        display: flex;
        justify-content: end;
      }
    }

    .column-names {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }

    .inputs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;

    }

    .test-result {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .buttons {
      display: flex;
      justify-content: end;
      gap: 10px;
    }
  }

  input,
  select {
    width: 100%;
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
</style>
