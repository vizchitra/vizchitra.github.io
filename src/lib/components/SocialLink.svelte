<script lang="ts">
    import instagram from '$lib/assets/images/socials/instagram.svg';
    import twitter from '$lib/assets/images/socials/twitter.svg';
    import linkedIn from '$lib/assets/images/socials/linkedin.svg';

    const socials = [
        {
            icon: instagram,
            alt: 'VizChitra instagram link',
            link: 'https://www.instagram.com/vizchitra/'
        },
        {
            icon: twitter,
            alt: 'VizChitra twitter link',
            link: 'https://www.x.com/vizchitra/'
        },
        {
            icon: linkedIn,
            alt: 'VizChitra linkedin link',
            link: 'https://www.linkedin.com/company/vizchitra/'
        }
    ];
</script>

<div class="flex items-center justify-center mt-14 gap-6">
    <span class="text-left text-lg font-semibold">Follow Us</span>
    <div class="flex gap-6">
        {#each socials as social}
            <span>
                <a href="{social.link}" target="_blank">
                    <img width="30px" height="30px" src={social.icon} alt={social.alt}/>
                </a>
            </span>
        {/each}
    </div>
</div>
