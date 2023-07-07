
type DnsType = 
    | "A"
    | "AAAA"
    | "AFSDB"
    | "APL"
    | "CAA"
    | "CDNSKEY"
    | "CDS"
    | "CERT"
    | "CNAME"
    | "CSYNC"
    | "DHCID"
    | "DLV"
    | "DNAME"
    | "DNSKEY"
    | "DS"
    | "EUI48"
    | "EUI64"
    | "HINFO"
    | "HIP"
    | "HTTPS"
    | "IPSECKEY"
    | "KEY"
    | "KX"
    | "LOC"
    | "MX"
    | "NAPTR"
    | "NS"
    | "NSEC"
    | "NSEC3"
    | "NSEC3PARAM"
    | "OPENPGPKEY"
    | "PTR"
    | "RRSIG"
    | "RP"
    | "SIG"
    | "SMIMEA"
    | "SOA"
    | "SRV"
    | "SSHFP"
    | "SVCB"
    | "TA"
    | "TKEY"
    | "TLSA"
    | "TSIG"
    | "TXT"
    | "URI"
    | "ZONEMD";

interface TestRun {
  expected: string | null,
  actual: string | null,
}
    
interface DnsTest {
  id?: number;
  name?: string,
  last_run?: TestRun,
  domain: string;
  type: DnsType;
  expected: string;
}

interface DnsEntry {
  id?: number,
  domain: string;
  type: DnsType,
  value: string;
}
