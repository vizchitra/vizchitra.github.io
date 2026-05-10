<script lang="ts">
	/**
	 * SessionPanel — Studio side-panel for session detail pages.
	 *
	 * Uses PanelShell for collapse/expand, edit state, save/publish flow.
	 * Fields: sessionType, date, time, venue, title, subtitle, speakerName,
	 *         designation, organisation.
	 * Long-form fields (descriptions, speakerAbout) are edited inline on the page
	 * via EditableField components, not in this panel.
	 */
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import PanelShell from './PanelShell.svelte';
	import { sessionColorMap } from '$lib/utils/sessions';

	const SESSION_TYPES = ['Talks', 'Dialogues', 'Workshop', 'Exhibition'] as const;

	interface Props {
		/** Slug identifies which session in the JSON array to update */
		slug: string;
		sessionType: string;
		date: string;
		time: string;
		venue: string;
		title: string;
		subtitle: string;
		speakerName: string;
		designation: string;
		organisation: string;
		isEditing: boolean;
		onStartEdit: () => void;
		onStopEdit: () => void;
		onCancel: () => void;
		/** Callbacks so parent can mirror field changes for WYSIWYG */
		onFieldChange: (field: string, value: string) => void;
	}

	let {
		slug,
		sessionType,
		date,
		time,
		venue,
		title,
		subtitle,
		speakerName,
		designation,
		organisation,
		isEditing,
		onStartEdit,
		onStopEdit,
		onCancel,
		onFieldChange
	}: Props = $props();

	// ── Local mutable copies for the form ────────────────────────────────────
	let localType = $state(sessionType);
	let localDate = $state(date);
	let localTime = $state(time);
	let localVenue = $state(venue);
	let localTitle = $state(title);
	let localSubtitle = $state(subtitle);
	let localSpeaker = $state(speakerName);
	let localDesignation = $state(designation);
	let localOrganisation = $state(organisation);

	// Reset local copies whenever we enter a new editing session
	$effect(() => {
		if (isEditing) {
			localType = sessionType;
			localDate = date;
			localTime = time;
			localVenue = venue;
			localTitle = title;
			localSubtitle = subtitle;
			localSpeaker = speakerName;
			localDesignation = designation;
			localOrganisation = organisation;
		}
	});

	function update(field: string, value: string) {
		onFieldChange(field, value);
	}

	// ── Save / stage ─────────────────────────────────────────────────────────
	let saving = $state(false);
	let saveStatus = $state<'idle' | 'saved' | 'staged' | 'error'>('idle');
	let errorMessage = $state<string | null>(null);
	let stagedCount = $state(0);

	onMount(() => {
		if (!dev) {
			fetch('/api/studio/staged')
				.then((r) => r.json())
				.then((d: { files?: string[] }) => {
					stagedCount = d.files?.length ?? 0;
				})
				.catch(() => {});
		}
	});

	function startEdit() {
		onStartEdit();
		saveStatus = 'idle';
	}

	async function save() {
		saving = true;
		saveStatus = 'idle';
		errorMessage = null;
		try {
			const res = await fetch('/api/studio/data', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					filePath: 'content/2026/sessions.json',
					key: slug,
					data: {
						sessionType: localType,
						date: localDate,
						time: localTime,
						venue: localVenue,
						title: localTitle,
						subtitle: localSubtitle,
						speakerName: localSpeaker,
						designation: localDesignation,
						organisation: localOrganisation
					}
				})
			});
			if (!res.ok) throw new Error('Save failed');
			const result = (await res.json()) as { stagedCount?: number };
			if (dev) {
				saveStatus = 'saved';
			} else {
				stagedCount = result.stagedCount ?? stagedCount + 1;
				saveStatus = 'staged';
			}
			onStopEdit();
		} catch {
			saveStatus = 'error';
			errorMessage = 'Save failed — try again';
		} finally {
			saving = false;
		}
	}

	function cancel() {
		onCancel();
		saveStatus = 'idle';
		errorMessage = null;
	}

	// ── Preview helpers ───────────────────────────────────────────────────────
	const colorKey = $derived(sessionColorMap[localType] ?? 'blue');
	const colorMap: Record<string, string> = {
		blue: 'bg-[var(--color-viz-blue-subtle)] text-[var(--color-viz-blue-dark)]',
		teal: 'bg-[var(--color-viz-teal-subtle)] text-[var(--color-viz-teal-dark)]',
		pink: 'bg-[var(--color-viz-pink-subtle)] text-[var(--color-viz-pink-dark)]',
		orange: 'bg-[var(--color-viz-orange-subtle)] text-[var(--color-viz-orange-dark)]'
	};
	const typeBadgeStyle = $derived(colorMap[colorKey] ?? colorMap['blue']);
</script>

<PanelShell
	breadcrumb="content/2026/"
	fileName="sessions.json"
	editLabel="Edit session"
	{isEditing}
	{saving}
	{saveStatus}
	{errorMessage}
	{stagedCount}
	onStartEdit={startEdit}
	onSave={save}
	onCancel={cancel}
>
	{#snippet preview()}
		<!-- Session card mini-preview -->
		<div class="border-grey-800 mt-1 space-y-1.5 rounded border px-3 py-2.5">
			<span class="inline-block rounded px-2 py-0.5 text-[10px] font-semibold {typeBadgeStyle}">
				{localType}
			</span>
			<p class="text-viz-grey-light line-clamp-2 text-xs leading-snug font-medium">
				{localTitle || '(untitled)'}
			</p>
			{#if localSpeaker}
				<p class="text-viz-grey-muted text-[10px]">
					{localSpeaker}{#if localOrganisation}
						· {localOrganisation}{/if}
				</p>
			{/if}
			{#if localTime}
				<p class="text-viz-grey-muted font-mono text-[10px]">{localTime}</p>
			{/if}
		</div>
	{/snippet}

	{#snippet children()}
		<div class="border-grey-800 border-b px-4 py-4">
			<h3 class="text-viz-grey-muted mb-3 text-[10px] tracking-widest uppercase">Session</h3>

			<!-- slug (always read-only) -->
			<div class="mb-3 opacity-50">
				<span class="text-viz-grey-muted mb-1 block text-xs font-medium">slug</span>
				<p
					class="border-grey-700 bg-grey-800 text-viz-grey-muted w-full rounded border px-2.5 py-1.5 font-mono text-xs"
				>
					{slug}
				</p>
			</div>

			<!-- Session type -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="session-type">
					type
				</label>
				{#if isEditing}
					<select
						id="session-type"
						bind:value={localType}
						onchange={() => update('sessionType', localType)}
						class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none"
					>
						{#each SESSION_TYPES as t}
							<option value={t}>{t}</option>
						{/each}
					</select>
				{:else}
					<p
						class="border-grey-700 bg-grey-800 text-viz-grey-muted w-full rounded border px-2.5 py-1.5 text-xs"
					>
						{sessionType}
					</p>
				{/if}
			</div>

			<!-- Date -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="session-date">
					date
				</label>
				<input
					id="session-date"
					type="text"
					bind:value={localDate}
					disabled={!isEditing}
					oninput={() => update('date', localDate)}
					placeholder="2026-07-04T15:45"
					class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
				/>
			</div>

			<!-- Time -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="session-time">
					time
				</label>
				<input
					id="session-time"
					type="text"
					bind:value={localTime}
					disabled={!isEditing}
					oninput={() => update('time', localTime)}
					placeholder="15:45 - 16:00"
					class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
				/>
			</div>

			<!-- Venue -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="session-venue">
					venue
				</label>
				<input
					id="session-venue"
					type="text"
					bind:value={localVenue}
					disabled={!isEditing}
					oninput={() => update('venue', localVenue)}
					class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
				/>
			</div>
		</div>

		<div class="px-4 py-4">
			<h3 class="text-viz-grey-muted mb-3 text-[10px] tracking-widest uppercase">Speaker</h3>

			<!-- Speaker name -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="session-speaker">
					name
				</label>
				<input
					id="session-speaker"
					type="text"
					bind:value={localSpeaker}
					disabled={!isEditing}
					oninput={() => update('speakerName', localSpeaker)}
					class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
				/>
			</div>

			<!-- Designation -->
			<div class="mb-3">
				<label class="text-viz-grey-muted mb-1 block text-xs font-medium" for="session-designation">
					designation
				</label>
				<input
					id="session-designation"
					type="text"
					bind:value={localDesignation}
					disabled={!isEditing}
					oninput={() => update('designation', localDesignation)}
					class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
				/>
			</div>

			<!-- Organisation -->
			<div class="mb-3">
				<label
					class="text-viz-grey-muted mb-1 block text-xs font-medium"
					for="session-organisation"
				>
					organisation
				</label>
				<input
					id="session-organisation"
					type="text"
					bind:value={localOrganisation}
					disabled={!isEditing}
					oninput={() => update('organisation', localOrganisation)}
					class="border-grey-700 bg-grey-800 text-viz-grey-light focus:border-viz-yellow w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none disabled:opacity-50"
				/>
			</div>

			{#if isEditing}
				<p class="text-viz-grey-muted text-[10px]">
					Edit title, description and speaker bio directly on the page below.
				</p>
			{/if}
		</div>
	{/snippet}
</PanelShell>
