<script lang="ts">
    import OBR from "@owlbear-rodeo/sdk";
    import type { Image } from "@owlbear-rodeo/sdk";
    import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper";
    import { isHttpUrl } from "../helpers";

    // Endereço da imagem do personagem (vem de sheet.image)
    export let image: string | undefined = undefined;

    let open = false;
    let message = "";
    let broken = false;

    $: editable = $currentPlayerId === $viewingPlayerId;
    $: if (image) broken = false;
    $: hasImage = !!image && !broken;

    function togglePanel() {
        open = !open;
        message = "";
    }

    function onUrl(e: Event) {
        const value = (e.target as HTMLInputElement).value.trim();
        if (value === "") {
            image = undefined;
            message = "";
        } else if (isHttpUrl(value)) {
            image = value;
            message = "";
        } else {
            message = "Use an address that starts with http:// or https://.";
        }
    }

    function clearImage() {
        image = undefined;
        message = "";
    }

    async function useSelectedToken() {
        try {
            const ids = await OBR.player.getSelection();
            if (!ids || ids.length === 0) {
                message = "Select a token on the map first.";
                return;
            }
            const items = await OBR.scene.items.getItems(ids);
            const token = items.find((i) => i.type === "IMAGE") as Image | undefined;
            const url = token ? token.image.url : "";
            if (!isHttpUrl(url)) {
                message = "The selected token has no image that can be used.";
                return;
            }
            image = url;
            message = "";
            open = false;
        } catch (err) {
            message = "Could not read the token. Open a scene and try again.";
        }
    }
</script>

{#if hasImage || editable}
<div class="portrait">
    {#if hasImage}
    <img src={image} alt="" referrerpolicy="no-referrer" on:error={() => (broken = true)} />
    {:else}
    <div class="placeholder">{broken ? "Image unavailable" : "No image"}</div>
    {/if}
    {#if editable}
    <button on:click={togglePanel}>{hasImage ? "Change image" : "Add image"}</button>
    {#if open}
    <div class="panel">
        <input type="url" placeholder="https://..." value={image ?? ""} on:change={onUrl} />
        {#if OBR.isAvailable}
        <button on:click={useSelectedToken}>Use selected token</button>
        {/if}
        <button on:click={clearImage}>Remove</button>
        {#if message}<p>{message}</p>{/if}
    </div>
    {/if}
    {/if}
</div>
{/if}

<style lang="scss">
    .portrait {
        width: 8rem;
        flex-shrink: 0;
    }
    img, .placeholder {
        display: block;
        box-sizing: border-box;
        width: 8rem;
        height: 8rem;
        border: 0.15rem solid rgb(var(--accent));
        border-radius: 0.15rem;
    }
    img {
        object-fit: cover;
    }
    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 0.85rem;
        font-weight: 300;
        color: rgba(var(--primary), 0.5);
    }
    button {
        width: 100%;
        margin-top: 0.4rem;
        background: rgba(var(--accent), 0);
        border: 1px solid rgb(var(--accent));
        border-radius: 0.15rem;
        color: rgb(var(--accent));
        font-size: 0.8rem;
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
    .panel {
        margin-top: 0.4rem;
        width: 14rem;
    }
    input {
        box-sizing: border-box;
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid rgb(var(--accent));
        color: rgb(var(--primary));
        font-size: 0.9rem;
        padding: 0.2rem 0;
    }
    p {
        margin: 0.4rem 0 0;
        font-size: 0.8rem;
        color: rgba(var(--primary), 0.7);
    }
</style>
