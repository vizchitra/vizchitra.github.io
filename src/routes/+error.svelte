<script lang="ts">
  import { page } from "$app/state";
  import { Stack, Cluster, Header, Button } from "$lib/components";
  import Heading from "$lib/components/typography/Heading.svelte";
</script>

<Header banner="curve" interactive={false} title="Missing & Error" />

<Stack space="lg" class="py-lg text-center">
  <Heading tag="h1" size="display" align="center">
    {page.status}: {page.error?.message || "Page not found"}
  </Heading>
  <p class="text-grey text-lg">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <Cluster align="center" justify="center">
    <Button href="/" color="blue">Go Home</Button>
  </Cluster>
</Stack>
