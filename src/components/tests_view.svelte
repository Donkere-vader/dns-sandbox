<script lang="ts">
  import { get } from "svelte/store";
  import { lookupRecord } from "../lookup";
  import { tests_store } from "../stores";
  import Button from "./button.svelte";
  import IconButton from "./icon_button.svelte";
  import Test from "./test.svelte";
  import ViewTitle from "./view_title.svelte";

  let id_counter = 0;

  const get_id = () => {
    id_counter += 1;
    return id_counter - 1;
  };

  const default_test: DnsTest = {
    domain: "*",
    type: "A",
    expected: "127.0.0.1",
  };

  let tests: DnsTest[] = get(tests_store);
  $: tests, updateStore();

  const updateStore = () => {
    tests_store.set(tests);
  };

  const addTest = () => {
    tests = [...tests, { id: get_id(), ...default_test }];
  };

  const runAllTests = () => {
    tests.forEach((t) => {
      t.last_run = {
        actual: lookupRecord(t.domain, t.type),
        expected: t.expected,
      };
    });
    tests = tests;
  };

  const deleteTest = (event: Event) => {
    // @ts-ignore
    const test_id: number = event.detail.id;

    let new_tests: DnsTest[] = [];
    tests.forEach((test) => {
      if (test.id !== test_id) {
        new_tests.push(test);
      }
    });

    tests = new_tests;
  }
</script>

<div class="tests-view">
  <ViewTitle>
    <h2>Tests</h2>
    <IconButton icon="add" on:click={addTest} />
  </ViewTitle>

  <div class="actions">
    <span>{tests.length} Test{tests.length === 1 ? "" : "s"}</span>
    <Button icon="play_arrow" on:click={runAllTests}>Run all</Button>
  </div>

  <div class="tests">
    {#each tests as test}
      <Test {test} on:delete={deleteTest} />
    {/each}
  </div>
</div>

<style lang="scss">
  .tests-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.5rem;
    }

    .tests {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: scroll;
    }
  }
</style>
