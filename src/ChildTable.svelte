<script>
  import { countryStore } from "./stores.js";
  import { styleBgColor } from "./colors.js";
  export let data = {};
  function getDataNode(country, node) {
    if (node.level == "economies") {
      return node;
    }
    return country.findNodeByKey(node.key);
  }
</script>

{#if data.children.length > 1}
  <table>
    <tr>
      <th />
      {#each $countryStore as country}
        <th>{country.key}</th>
      {/each}
    </tr>
    {#each data.children as row}
      <tr>
        <td>
          <button>
            {row.label}
          </button>
        </td>
        {#each $countryStore as country}
          {@const node = getDataNode(country, row)}
          <td style={styleBgColor(node.value)}
            ><button>{node.value}</button
            ></td
          >
        {/each}
      </tr>
    {/each}
  </table>
{/if}

<style>
  td button {
    max-height: 1.5em;
    height: 1.5em;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    overflow: hidden;
  }
  td:first-child {
    overflow: hidden;
  }
  tr {
    height: 1.5em;
  }
  td {
    height: 1.5em;
  }
</style>
