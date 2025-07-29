<script lang="ts">
    import {applyAction, enhance} from '$app/forms';

    let {form=null} = $props();

    let errMsg = $state('')

    $effect(() => {
        errMsg = form?.threat;
    })
</script>

<form method="POST" class="waitlist" action="/contact?/waitlist" use:enhance={({formData, cancel}) => {
    const email = formData.get('email');
    if (!email) {errMsg = 'No email provided here.'; cancel()}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // @ts-ignore it is a string
    if (!emailRegex.test(email)) {
        errMsg = 'Invalid email. You sure you entered the correct thing?';
        cancel();
    }

    return async ({ result }) => {
        await applyAction(result);
    }
    }}>
    <label class="d-none">
        <input type="text" name="nickname" id="nickname">
    </label>
    <label class="sr-only" for="email">Email</label>
    <input type="text" name="email" id="email" placeholder="Your email">
    <p aria-label="error message" class="error-message">{errMsg}</p>
    <button type="submit">Submit</button>
</form>