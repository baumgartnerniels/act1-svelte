<script>
  import { styleBgColor } from "./colors.js";
  import { countryStore } from "./stores.js";
  export let data;
</script>

{#if data.level != "economies"}
  <table>
    <tr>
      <th />
      {#each $countryStore as country}
        <th>{country.key}</th>
      {/each}
    </tr>
    <tr>
      <td>{data.label}</td>
      {#each $countryStore as country}
        {@const val = country.findNodeByKey(data.key).value}
        <td style={styleBgColor(val)}>{val}</td>
      {/each}
    </tr>
  </table>
{/if}

<style>
</style>
