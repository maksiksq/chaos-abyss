<script lang="ts">
    const {text} = $props();
    let copy = $state('Click to copy');
    let hovering = $state(false);

    const handleTooltip = () => {
        hovering = true;
        copy = 'Click to copy';
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText("maksiks.touch@gmail.com");

        copy = 'Copied!';
    }

    const handleCopyKeyboard = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault;
            navigator.clipboard.writeText("maksiks.touch@gmail.com")
        }

        copy = 'Copied!';
    }

    const handleCopyOut = () => {
        copy = 'Click to copy';
        hovering = false;
    }

    let tooltip: HTMLElement | undefined = $state();

    const handleCopyMove = (e: MouseEvent) => {
        if (!tooltip) return;
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY - 20}px`;
    }
</script>
<div class="tooltip-text" onmouseenter={handleTooltip} onmousemove={handleCopyMove} onclick={handleCopyClick}
     onkeydown={handleCopyKeyboard} onmouseout={handleCopyOut}
     onblur={handleCopyOut} tabindex="0" role="button">
    {#if hovering}
        <div class="tooltip" bind:this={tooltip}>
            {copy}
        </div>
    {/if}
    {text}
</div>

<style>

    .tooltip-text {
        font-weight: bold;
        cursor: pointer;
        display: inline;
        color: #190025;

        & .tooltip {
            position: absolute;
            pointer-events: none;
            transition: none;
            background: #666666;
            color: white;
            padding: 1px 0.7rem;
            border-radius: 1px;
            font-family: "Anonymous Pro", sans-serif;
            border: 1px solid black;
            box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

        }
    }
</style>