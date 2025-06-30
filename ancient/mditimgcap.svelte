<script>
	// yes, the hack club thumbnail wasn't even using the plugin because lazy
</script>

<div class="temp_blob">
	<figure>
		<img src="https://media.tenor.com/3s9rEbpRr5wAAAAM/niko-oneshot.gif" alt="test">
		<figcaption>Yes</figcaption>
	</figure>
	<figure>
		<img src="https://media.tenor.com/Bkn69q8NJG8AAAAM/crusader-darkest-dungeon.gif" alt="test">
		<figcaption>These</figcaption>
	</figure>

	<figure>
		<img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUycWViMXVpeDViYmwzb243YWFieHdnY2dlcWhxdG04eG40dTJlYmdhMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mblLfjGT41ytq/source.gif"
				 alt="test">
		<figcaption>Are</figcaption>
	</figure>

	<figure>
		<img src="https://media.tenor.com/_WZy7E7hoTcAAAAM/cat-smile.gif" alt="test">
		<figcaption>Markdown</figcaption>
	</figure>

	<figure>
		<img src="https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUycGRjdzY2ZmRiNjJxaGc2c3NuNWFibmxpa2gza2t3ZnVsODV5a3F4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ynx1sj5Wz2atO/giphy-downsized.gif"
				 alt="test">
		<figcaption>Captions</figcaption>
	</figure>

	<figure>
		<img src="https://gifdb.com/images/thumbnail/hollow-knight-498-x-410-gif-ljy79e8lx9r3mn03.gif"
				 alt="test">
		<figcaption>Pal</figcaption>
	</figure>
</div>

<style>
    .temp_blob {
        margin-top: 10vw;
        margin-bottom: 10vw;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
        gap: 10px;

        & figure {

            & img {
                width: 324px;
                height: 324px;
            }

            & figcaption {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-style: normal;
            }
        }
    }
</style>