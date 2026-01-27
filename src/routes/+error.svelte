<script lang="ts">
	import { page } from '$app/state';
	import { Stack, Cluster, Header, Button, Heading, Text } from '$lib/components';
</script>

<Header title="Missing & Error" banner="curve" />

<Stack space="lg" class="py-lg text-center">
	<Heading type="display" align="center">
		{page.status}: {page.error?.message || 'Page not found'}
	</Heading>
	<Text type="lead">The page you're looking for doesn't exist or has been moved.</Text>
	<Cluster align="center" justify="center">
		<Button href="/" color="blue">Go Home</Button>
	</Cluster>
</Stack>
