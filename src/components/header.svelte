<script>
  import { VERSION } from "../consts";
  import IconButton from "./icon_button.svelte";
</script>

<header>
  <div class="header-text">
    <h1>DNS Sandbox</h1>
    <span class="version-number">v{VERSION}</span>
  </div>
  <IconButton href="https://github.com/donkere-vader/dns-sandbox" target="_blank" icon="github-mark-white.svg" src="static" />
</header>
<hr />

<style lang="scss">
  @import "../scss/colors";

  header {
    color: $snow;
    background-color: $rock;
    padding: 0.5rem 2rem;
    font-size: 16px;
    display: flex;
    justify-content: space-between;

    .header-text {
        display: flex;
        align-items: end;
        gap: 5px;

        span.version-number {
        font-size: 14px;
        color: $rock-lightest;
        font-style: italic;
        margin-bottom: 3px;
        }
    }
  }

  hr {
    border: none;
    border-bottom: 1px solid $rock-lighter;
    margin: 0 1rem;
  }
</style>
