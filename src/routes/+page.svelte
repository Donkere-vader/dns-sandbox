<script lang="ts">
    import Editor from "../components/editor.svelte";
    import TestsView from "../components/tests_view.svelte";
    import Header from "../components/header.svelte";
</script>

<Header />

<main>
    <div class="editor-container">
        <Editor />
    </div>
    <hr>
    <div class="tests-view-container">
        <TestsView />
    </div>
</main>

<style lang="scss">
@import "../scss/colors";

main {
    display: flex;
    height: 100%;
    margin: 2rem;
    gap: 2rem;

    hr {
        border: none;
        border-right: 1px solid $rock-lighter;
    }

    .editor-container, .tests-view-container {
        flex: 1 0 auto;
    }
}
</style>
