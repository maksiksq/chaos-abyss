<script lang="ts">
    // WARNING: EASTER EGG SPOILERS
    // WARNING: EASTER EGG SPOILERS
    // WARNING: EASTER EGG SPOILERS

    let {confidential = $bindable()} = $props();

    const itemsCommon = [
        {
            rarity: "COMMON",
            item: "Void",
            category: "Unique / Infinite",
            desc: "Intangible substance, nothing quantified"
        },
        {
            rarity: "COMMON",
            item: "Dust of Forgotten Tabs",
            category: "Browser Cache / Artifact",
            desc: "They once held meaning. Now they hold dust."
        },
        {
            rarity: "COMMON",
            item: "Dark Essence",
            category: "Material / Flowy",
            desc: "Consistency: slugcat."
        },
        {
            rarity: "COMMON",
            item: "Crystallized Shout",
            category: "Material / Still Reverberating",
            desc: "Cold to touch. Ice... Iscream?"
        },
        {
            rarity: "COMMON",
            item: "Unlit Match",
            category: "Tool / Useless",
            desc: "Terminally scared of the lantern."
        },
        {
            rarity: "COMMON",
            item: "A Lump of Coal",
            category: "Material / Fuel",
            desc: "Santa, are you here?"
        },
        {
            rarity: "COMMON",
            item: "Glowing Paperclip",
            category: "Companion / Office-born",
            desc: "It briefly considered helping, then vanished."
        },
        {
            rarity: "COMMON",
            item: "Scribbles",
            category: "Note / Incomprehensible",
            desc: "The letters twitch slightly. Portable dyslexia."
        },
        {
            rarity: "COMMON",
            item: "Mismatched Sock",
            category: "Clothing / Temporal Echo",
            desc: "The match vanished during the Laundry Collapse."
        },
        {
            rarity: "COMMON",
            item: "Tiny Door (Locked)",
            category: "Object / Untouchable",
            desc: "You hear laughter on the other side."
        },
        {
            rarity: "COMMON",
            item: "Suspicious Sticker",
            category: "Decoration / Vaguely Sentient",
            desc: "It's peeling itself off, very slowly."
        }]
    const itemsRare = [
        {
            rarity: "RARE",
            item: "Cosmic Moth in a Jar",
            category: "Pet / Definitely Alive",
            desc: "It flutters in Morse code. You don't speak Moth."
        },
        {
            rarity: "RARE",
            item: "404 Star Not Found",
            category: "Celestial Body / Corrupted",
            desc: "it exists. Can't see it tho."
        },
        {
            rarity: "RARE",
            item: "Portable Black Hole (Child-Safe Edition)",
            category: "Tool / Cursed",
            desc: "Sucks up only things you didn’t want gone."
        },
        {
            rarity: "RARE",
            item: "Folded Reality",
            category: "Furniture / Unsafe",
            desc: "Don't sit. It sits back."
        },
        {
            rarity: "RARE",
            item: "Miniature Lantern",
            category: "Decor / Nonfunctional",
            desc: "It longs to be lit. You're not the one."
        },
        {
            rarity: "RARE",
            item: "Postcard from Nowhere",
            category: "Mail / Unsent",
            desc: "Wish you were here. Here does not exist."
        }
    ]
    const itemsLegendary = [
        {
            rarity: "LEGENDARY",
            item: "Debug Lantern",
            category: "Tool / Glitched",
            desc: "Light output: [undefined]."
        },
        {
            rarity: "LEGENDARY",
            item: "Moth of the Abyssal Watchers",
            category: "Deity / Friendly",
            desc: "It chirps like a dial-up. You feel safe,"
        },
        {
            rarity: "LEGENDARY",
            item: "The Final Crumb",
            category: "Relic / Sealed",
            desc: "Eating it would complete the Snack Prophecy."
        },
        {
            rarity: "LEGENDARY",
            item: "The First ✦",
            category: "Relic / Divine",
            desc: "Some say it shaped the abyss. Others say it tripped and fell in."
        }
    ]

    let rarity = $state('COMMON');
    let color = $state('#c3c3c3');
    let item = $state('Void');
    let category = $state('Unique / Infinite');
    let desc = $state('Intangible substance, nothing quantified');

    const totallyRollSounds = new Audio('/audio/sans-voice.mp3');
    const totallyMario = new Audio('/audio/morio.mp3');

    let isDisabled = $state(false);
    let pointer = $state(true);

    let legendary = $state(false);

    $effect(() => {
        if (!isDisabled && legendary) {
            totallyMario.play();
        }
    })

    const roll = () => {
        if (isDisabled) return;
        isDisabled = true;
        pointer = false

        totallyRollSounds.currentTime = 0;
        totallyRollSounds.play();

        // most jank slot machine since 1999
        const interval = setInterval(() => {
            const random = Math.floor(Math.random() * 100);
            let drop;

            if (random < 6) {
                legendary = true;
                const rarityRandom = Math.floor(Math.random() * itemsLegendary.length);
                drop = itemsLegendary[rarityRandom];
            } else if (random < 30) {
                legendary = false;
                const rarityRandom = Math.floor(Math.random() * itemsRare.length);
                drop = itemsRare[rarityRandom];
            } else {
                legendary = false;
                const rarityRandom = Math.floor(Math.random() * itemsCommon.length);
                drop = itemsCommon[rarityRandom];
            }

            if (!drop) return;

            rarity = drop.rarity;
            color = rarity === 'LEGENDARY' ? '#ffa600'
                : rarity === 'RARE' ? '#506cff'
                    : '#c3c3c3';

            item = drop.item;
            category = drop.category;
            desc = drop.desc;
        }, 15);

        setTimeout(() => {
            clearInterval(interval);
            isDisabled = false;
            pointer = true;
        }, 4500);
    };
</script>

<svelte:window onkeydown={(e) => {if (e.key==="Escape") confidential = false}}/>

<div class="minigame lightbox">
    <button onclick={() => {confidential=false}} class="close" title="Close">X</button>
    <p class="heading">Gacha of the void.</p>
    <p>unscolicited loud sound warning</p>
    <button onclick={roll}
            style={pointer ? 'cursor: pointer' : ''}>{pointer ? "Click to receive an item" : "Rolling..."}</button>
    <p class="cur-item">Current item:</p>
    <p class="item">{item}</p>
    <p class="rarity" style={`color: ${color}`}>{rarity}</p>
    <p class="category">{category}</p>
    <p class="desc">
        {desc}
    </p>
    <p class="goal">
        There are 3 legendaries in total. All of them are technically edible.
    </p>
</div>
<style>
    .lightbox {
        position: absolute;
        color: white;
        top: 0;
        left: 0;

        width: 100vw;
        height: 120vh;
        background-color: rgba(0, 0, 0, 0.8);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .close {
            all: unset;
            position: absolute;
            right: 20px;
            top: 10px;
            cursor: pointer;
        }

        & .heading {
            font-size: 5rem;
        }

        & button {
            all: unset;
            display: flex;
            justify-content: center;

            height: 1rem;
            width: 14vw;

            background-color: black;
            padding: 0.4rem 1.6rem;
            margin-top: 2rem;
        }

        & .cur-item {
            padding-top: 1rem;
        }

        & .item {
            padding-top: 1rem;
            font-size: 2rem;
        }

        & .rarity {
            padding-top: 0.3rem;
        }

        & .category {
            padding-top: 0.8rem;
        }

        & .desc {
            padding-top: 1rem;
            font-size: 1.1rem;
        }

        & .goal {
            padding-top: 8rem;
            color: #666666;
        }
    }

    .imagine {
        position: absolute;
        top: 150vh;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        color: black;
        z-index: 9999;
    }
</style>