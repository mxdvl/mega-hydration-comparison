<script>
  import { onMount } from "svelte";
  import { timeAgo, duration } from "../lib/timeAgo.ts";

  /** @type {number} */
  export let then;
  /** @type {number} */
  export let now;

  $: data = duration({ then, now });

  onMount(() => {
    console.log("Mounted");
    setInterval(() => {
      // console.log({ then, now });

      now = Date.now();
    }, 1_000);
  });
</script>

{timeAgo({ ...data, date: new Date(then) })}
