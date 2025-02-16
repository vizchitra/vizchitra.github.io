<script lang="ts">
	import communityBanner from '$lib/assets/images/call-to-action/community-banner.png';
	import conferenceBanner from '$lib/assets/images/call-to-action/conference-banner.png';
	import launchPartyBanner from '$lib/assets/images/call-to-action/launch-party-banner.png';
</script>

<div class="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-6">
	<div class="rounded px-3 py-2 shadow-md">
		<img src={communityBanner} alt="Join the community banner" class="pt-3 w-full h-auto m-auto"/>
        <div class="py-4">
            <h3 class="font-bold">Join the community</h3>
            <p>The good side of data viz is here</p>
            <button class="my-3 pt-2 rounded-lg text-white font-bold"> <a href="https://chat.whatsapp.com/CbIu7z6ITmGFvwfw0BjDdL" target="_blank">Connect &#8599;</a></button>
        </div>
	</div>
    <div class="rounded px-3 py-2 shadow-md">
		<img src={conferenceBanner} alt="Call for conference proposals banner" class="pt-3 w-full h-auto m-auto"/>
        <div class="py-4">
            <h3 class="font-bold">VizChitra 2025</h3>
            <p>A space to connect and create with data</p>
            <button class="my-3 pt-2 rounded-lg text-white font-bold"> <a href="https://hasgeek.com/VizChitra/2025/" target="_blank">Call for proposals &#8599;</a></button>
        </div>
	</div>
    <div class="rounded px-3 py-2 shadow-md animated-border">
		<img src={launchPartyBanner} alt="launch party banner" class="pt-3 w-full h-auto m-auto"/>
        <div class="py-4">
            <h3 class="font-bold">Launch Party</h3>
            <p>Connect with the data viz community in India</p>
            <button class="my-3 pt-2 rounded-lg text-white font-bold"> <a href="https://hasgeek.com/VizChitra/launch-party/" target="_blank">Registrations open &#8599;</a></button>
        </div>
	</div>
</div>

<style>
  .animated-border {
    background: linear-gradient(90deg, 
      #FFD485, #97E4DD, #A8BDF0, #F89F72, #EE88B3);
    background-size: 300% 300%;
    animation: borderAnimation 10s linear infinite;
  }


  @keyframes borderAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>
