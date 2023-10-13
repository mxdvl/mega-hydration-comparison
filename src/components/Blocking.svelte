<script>
  import RelativeTime from "./RelativeTime.svelte";

  /** @type {number} */
  export let count;
  /** @type {number} */
  export let now;
</script>

<ul>
  {#each Array.from({ length: Number(count) }, (_, i) => now - 1000 * (i + 1)) as then}
    <li>
      <RelativeTime {then} {now} />
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 100px;
    list-style-type: none;
    gap: 1rem;
    padding: 0;
  }

  li {
    background-color: #eee;
    overflow: hidden;
  }
</style>
