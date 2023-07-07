import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

const dns_entries_store: Writable<DnsEntry[]> = writable([]);
const tests_store: Writable<DnsTest[]> = writable([]);

if (browser) {
  if(localStorage['entries'] !== undefined) {
    dns_entries_store.set(JSON.parse(localStorage["entries"]));
  }
  if(localStorage['tests'] !== undefined) {
    tests_store.set(JSON.parse(localStorage["tests"]));
  }
}

dns_entries_store.subscribe((entries) => {
  if (browser) {
    localStorage["entries"] = JSON.stringify(entries);
  }
});

tests_store.subscribe((tests) => {
  if (browser) {
    localStorage["tests"] = JSON.stringify(tests);
  }
});

export { dns_entries_store, tests_store };
