<script lang="ts">

	// whatever legal meaning these even have this is All rights reserved just read the license lol
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const copyblurbs = [
		// evil
		'© 2025 Maksiks. You thought you could copy? How adorable.',
		'© 2025 Maksiks. This isn’t copyright. This is dominion.',
		'© 2025 Maksiks. You may view, but you will not *possess*.',
		'© 2025 Maksiks. What you call “content” is my empire.',
		'© 2025 Maksiks. You copied? Fool. Now I copy you.',

		// not evil
		'© 2025 Maksiks. All rights reserved.',
		'© 2025 Maksiks. All rights buffed. No nerfs today.',
		'© 2025 Maksiks. Rights procedurally forgotten.',
		'© 2025 Maksiks. All rights autosaved.',
		'© 2025 Maksiks. Some rights stewed, others sautéed.',
		"© 2025 Maksiks. All right neglected. It's a dangerous world out there.",
		'© 2025 Maksiks. My rights are in my reserve.',
		'© 2025 Maksiks. Rights acquired. Loot secured.',
		'© 2025 Maksiks. Reserved the rights to reserve rights.',
		'© 2025 Maksiks. Some rights chewed, others stored in a jar.',
		'© 2025 Maksiks. All rights corrupted. Please insert disk 2.',
		'© 2025 Maksiks. All rights reserved. Kept in a labeled jar.',
		'© 2025 Maksiks. Reserved a table for two.',
		'© 2025 Maksiks. Reserved with complimentary sarcasm.',
		'© 2025 Maksiks. All rights vacuum-packed for freshness.',
		'© 2025 Maksiks. All rights securely hoarded.',
		'© 2025 Maksiks. Rights reserved, pending final boss fight.',
		'© 2025 Maksiks. Reserved. Unauthorized duplication will be sarcastically judged',
		'© 2025 Maksiks. All rights tightly packed and gently stacked.',
		'© 2025 Maksiks. Rights not available in demo version.',
		'© 2025 Maksiks. All rights on lockdown. Key not included.',
		'© 2025 Maksiks. All rights reserved. They’re shy.',
		'© 2025 Maksiks. All rights reserved. Violation triggers mild disappointment.',
		'© 2025 Maksiks. Rights reserved. See Appendix D for moral justification.',
		'© 2025 Maksiks. All rights reserved. Resistance is futile.',
		'© 2025 Maksiks. All rights reserved. Terms subject to hallucination.',
		'© 2025 Maksiks. Rights reserved pursuant to our recent blood pact',
		'© 2025 Maksiks. All rights mine. You merely witnessed them.',
		'© 2025 Maksiks. I claimed the rights, and the world bent accordingly.',
		'© 2025 Maksiks. The rights are bound to me. Irrevocably.',
		'© 2025 Maksiks. All rights sealed within the last page of the grimoire.',
		'© 2025 Maksiks. My rights do not negotiate.',
		'© 2025 Maksiks. All rights branded with my true name.',
		'© 2025 Maksiks. Rights very caffeinated.',
		'© 2025 Maksiks. All rights reserved under the secret 28th Amendment: Thou Shalt Not Copy Maksiks.',
		'© 2025 Maksiks. To copy or not to copy? Nay, thou shalt not.',
		'© 2025 Maksiks. Rights reserved, ye scurvy knave!',
		'© 2025 Maksiks. None may claim the rights but the one foretold.',
		'© 2025 Maksiks. Rights sealed by Zonai magic. Do not disturb.',
		'© 2025 Maksiks. Rights protected by Alma\'s hacker skills.',
		'© 2025 Maksiks. You must complete all shrines before touching these rights.',
		'© 2025 Maksiks. Niko tried to copy. Niko felt bad.',
		'© 2025 Maksiks. Rights reserved. You feel like you’re going to have a bad time.',
		'© 2025 Maksiks. The rights are filled with DETERMINATION.',
		'© 2025 Maksiks. The rights got absorbed by a dog. Sorry.',
		'© 2025 Maksiks. You swing, but the rights parry.',
		'© 2025 Maksiks. All rights reserved. This blurb is modded.',
		'© 2025 Maksiks. Rights enchanted with Protection IV.',
		'© 2025 Maksiks. All rights claimed post-Moon Lord.',
		'© 2025 Maksiks. All rights locked behind the 9999G donut.',
		'© 2025 Maksiks. The rights are in another biome. And you forgot fuel.',
		'© 2025 Maksiks. You tried to copy. The spirits are mildly perturbed.',
		'© 2025 Maksiks. Pierre doesn’t sell these rights. But Joja might.',
		'© 2025 Maksiks. You Died. The rights remain.',
		'© 2025 Maksiks. One does not simply copy a Lord’s soul.',
		'© 2025 Maksiks. All rights guarded by Cerberus. Pet at your own risk.',
		'© 2025 Maksiks. Rights earned through death. And a lot of reruns.',

	];

	const rareCopyblurbs = [
		// rare
		'© 3:33 AM Maksiks. Rights sleep-deprived.',
		'© ??? Maksiks. Rights exist out of bounds.',
		'© 1993 Maksiks. Rights DOOMed.',
		'© 1991 Maksiks. Rights discombobulated.',
		'© 1720 Maksiks. Paper rights collapsed.',
		'© 666 Maksiks. Rights protected by demons.',
		'© 8-bit Maksiks. Rights chiptuned.',
		'© 1492 Maksiks. Rights discovered accidentally.',
		'© 1937 Maksiks. Rights entered Mordor.',
		'© -273.15°C Maksiks. Rights frozen solid.',
		'© 1889 Maksiks. All rights impressionistic.',
		'© 33 AD Maksiks. Rights resurrected.',
		'© 404 Maksiks. Rights not found.',
		'© 401 Maksiks. Rights not for you.',
		'© 144p Maksiks. Rights are a little blurry.',
		'© 3025 Maksiks. All rights orbiting.',
		'© 2072/2078 Maksiks. All rights glitched.',
		'© 2077 Maksiks. All rights teleported.',
		'© 199X Maksiks. Some rights pixelated.',
		'© 1683 Maksiks. All rights protected.',
		'© 48 BC Maksiks. All rights fireproofed.',
		'© 2025 BC Maksiks. All rights salted.',
		'© 2025 BC Maksiks. All rights preserved.'
	]

	let text: string = $state('');

	if (Math.floor(Math.random() * 4) < 3) {
		text = copyblurbs[Math.floor(Math.random() * copyblurbs.length)];
	} else {
		text = rareCopyblurbs[Math.floor(Math.random() * rareCopyblurbs.length)];
	}

</script>

<footer>
	<p>{text}</p>
</footer>
