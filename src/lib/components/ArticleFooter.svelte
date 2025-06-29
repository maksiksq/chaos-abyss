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
		'© 2025 Maksiks. Rights can be summoned.',
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
