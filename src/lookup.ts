import { get } from "svelte/store";
import { dns_entries_store } from "./stores";

const lookupRecord = (domain: string, type: DnsType): string => {
  const entries = get(dns_entries_store);

  let result: string | undefined;

  for(const entry of entries) {
    if(entry.type !== type) continue;
    let domain_to_match = domain;
    let entry_to_match = entry.domain;
    if (entry.domain.startsWith("*.")) {
      domain_to_match = domain.substring(domain.indexOf(".") + 1);
      entry_to_match = entry.domain.substring(entry.domain.indexOf(".") + 1);
    }

    console.log(entry_to_match, domain_to_match);
    if(entry_to_match === domain_to_match) {
      result = entry.value;
      break;
    }
  };

  return result || "No DNS record could be found";
};

export { lookupRecord };
