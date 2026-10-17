<script lang="ts">
    // Seção de peso: item, quantidade e peso de cada unidade.
    // A última linha mostra o peso total, com limite de carga opcional.
    import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper";
    import { fmt, rowTotal, weightStatus } from "../helpers";

    export let section;

    $: editable = $currentPlayerId === $viewingPlayerId;
    $: unit = (section.unit ?? "").trim();
    $: unitText = unit ? " " + unit : "";
    $: status = weightStatus(section.stats, section.limit);
    $: newStatId = section.stats.length > 0 ? Math.max(...section.stats.map(t => t.id)) + 1 : 1;

    function addStat() {
        section.stats = [...section.stats, { id: newStatId, name: "New Item", value: "", qty: "1" }];
    }
    function removeStat(stat) {
        section.stats = section.stats.filter(t => t.id !== stat.id);
    }
    function subtotal(stat) {
        const s = rowTotal(stat);
        return s ? fmt(s) + unitText : "";
    }
</script>

{#if editable}
<div class="meta">
    <label>Limit <input inputmode="decimal" placeholder="none" bind:value={section.limit} /></label>
    <label>Unit <input placeholder="kg" bind:value={section.unit} /></label>
</div>
{/if}

<table>
    <thead>
        <tr>
            <th>Item</th>
            <th class="num">Qty</th>
            <th class="num">Weight</th>
            <th class="num">Sub</th>
            {#if editable}<th></th>{/if}
        </tr>
    </thead>
    <tbody>
        {#each section.stats as stat (stat.id)}
        <tr>
            {#if editable}
            <td contenteditable="true" bind:innerText={stat.name}></td>
            <td class="num"><input inputmode="decimal" aria-label="Quantity" bind:value={stat.qty} /></td>
            <td class="num"><input inputmode="decimal" aria-label="Weight of each" bind:value={stat.value} /></td>
            {:else}
            <td>{stat.name}</td>
            <td class="num">{stat.qty ?? "1"}</td>
            <td class="num">{stat.value}</td>
            {/if}
            <td class="num sub">{subtotal(stat)}</td>
            {#if editable}
            <td class="x"><button class="rm" aria-label="Remove item" on:click={() => removeStat(stat)}>&times;</button></td>
            {/if}
        </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th colspan="3">Total weight</th>
            <td class="num total" colspan={editable ? 2 : 1}>{fmt(status.total)}{unitText}</td>
        </tr>
    </tfoot>
</table>

{#if status.limit > 0}
<p class="status" class:over={status.over}>
    {#if status.over}
    Over the limit by {fmt(status.diff)}{unitText} (limit: {fmt(status.limit)}{unitText})
    {:else}
    Within the limit. {fmt(-status.diff)}{unitText} to spare (limit: {fmt(status.limit)}{unitText})
    {/if}
</p>
{/if}

{#if editable}
<button class="add" on:click={addStat}>Add Item</button>
{/if}

<style lang="scss">
    table {
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
    }
    th {
        text-align: left;
        font-weight: 300;
        font-size: 0.8rem;
        color: rgba(var(--primary), 0.6);
        padding: 0 0.5rem;
    }
    th.num {
        text-align: right;
    }
    th:nth-child(2) { width: 3rem; }
    th:nth-child(3) { width: 4rem; }
    th:nth-child(4) { width: 4.5rem; }
    th:nth-child(5) { width: 1rem; }
    tbody tr:nth-last-child(2n+1) {
        background: rgba(var(--accent), 0.05);
    }
    td {
        white-space: pre-wrap;
        text-shadow: var(--shadow);
        padding: 0 0.5rem;
        color: rgba(var(--primary), 0.85);
        vertical-align: top;
        &.num {
            text-align: right;
        }
        &.sub {
            color: rgba(var(--primary), 0.6);
            white-space: nowrap;
        }
        &.x {
            padding: 0;
        }
        &:hover {
            color: rgba(var(--primary), 1);
        }
    }
    td input {
        box-sizing: border-box;
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid rgba(var(--accent), 0.3);
        color: inherit;
        font-size: 1rem;
        padding: 0;
        text-align: right;
        &:focus {
            outline: none;
            border-bottom-color: rgb(var(--accent));
        }
    }
    tfoot th, tfoot td {
        border-top: 0.15rem solid rgb(var(--accent));
        padding-top: 0.4rem;
        font-size: 1.05rem;
        font-weight: 400;
        color: rgb(var(--accent));
    }
    tfoot th {
        text-align: left;
    }
    tfoot td {
        text-align: right;
        white-space: nowrap;
    }
    .status {
        margin: 0.5rem 0 0;
        padding: 0 0.5rem;
        font-size: 0.85rem;
        color: rgba(var(--primary), 0.7);
        &.over {
            color: rgb(255, 120, 105);
            font-weight: 400;
        }
    }
    .meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
        label {
            font-size: 0.8rem;
            font-weight: 300;
            color: rgba(var(--primary), 0.6);
        }
        input {
            display: block;
            box-sizing: border-box;
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(var(--accent), 0.3);
            color: rgb(var(--primary));
            font-size: 1rem;
            padding: 0;
        }
        label:first-child { width: 6rem; }
        label:last-child { width: 4rem; }
    }
    .rm {
        box-sizing: border-box;
        color: rgba(var(--accent), 0.25);
        background: transparent;
        border: none;
        height: 1rem;
        width: 1rem;
        padding: 0;
        font-size: 1.2rem;
        vertical-align: top;
        line-height: 1rem;
        cursor: pointer;
        transition: color ease-in-out 150ms;
        &:hover {
            color: rgba(var(--accent), 1);
        }
    }
    .add {
        width: 100%;
        margin-top: 0.5rem;
        background: rgba(var(--accent), 0);
        border: 1px solid rgb(var(--accent));
        border-radius: 0.15rem;
        color: rgb(var(--accent));
        font-size: 1rem;
        font-weight: 300;
        text-transform: uppercase;
        cursor: pointer;
        transition: background ease-in-out 150ms;
        transition: color ease-in-out 150ms;
        &:hover {
            background: rgba(var(--accent), 1);
            color: rgb(var(--secondary));
        }
    }
</style>
