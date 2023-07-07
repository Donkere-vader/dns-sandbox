<script lang="ts">
  export let code: string;

  let line_numbers: string[] = [];
  for (let i = 1; i <= code.split("\n").length; i++) {
    line_numbers.push(i.toString());
  }
</script>

<div class="code-block">
    <div class="line-numbers">
        <code><pre>{ line_numbers.join("\n") }</pre></code>
    </div>
    <code><pre>{ code }</pre></code>
</div>

<style lang="scss">
@import "../scss/colors";

.code-block {
    background-color: $rock;
    display: flex;
    gap: 5px;
    border-radius: 10px;

    .line-numbers {
        border-radius: 10px 0px 0px 10px;
        background-color: $rock-light;
    }

    code, .line-numbers code {
        display: flex;
        padding: 10px;
    }
}
</style>
