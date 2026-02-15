<script>
	import {
		Grid,
		Flex,
		FullBleed,
		Card,
		FormatCard,
		Button,
		Deadline,
		DividerCurves,
		Slanted,
		Notice,
		Heading,
		SubHeading,
		Text,
		Header,
		Container,
		Stack,
		Cluster,
		Prose
	} from '$lib/components';
</script>

<Header banner="curve" />

<Container>
	<Stack>
		<Prose color="pink">
			<h1>Call for Proposals</h1>
			<p>
				For the second edition of the flagship event – <strong>VizChitra 2026</strong>, we are
				excited to open up the call for proposals.
			</p>
			<p>
				There will be
				<strong>talks</strong> and <strong>dialogues</strong> on the conference day (4th July,
				2026), and
				<strong>workshops</strong> on the workshop day (3rd July, 2026).
				<i>We invite you to share how you think, play, and build through data visualization.</i>
			</p>
		</Prose>

		<Text type="caption">Proposal Deadline: <strong>15 Feb 2025, 23:59 IST</strong></Text>
		<Cluster justify="start">
			<Button href="https://forms.vizchitra.com/proposals" color="pink" external={true}
				>Submit your Proposal</Button
			>

			<Button href="/2026/submissions" color="blue">View all Submissions</Button>
		</Cluster>

		<DividerCurves />

		<Prose>
			<h2>PROPOSAL FORMATS</h2>
			<p>
				You can propose one or more of the following formats. If you are unsure which one fits best,
				choose the closest option and explain your thinking in the proposal.
			</p>
		</Prose>

		<FullBleed paddingY="xl" paddingX="md">
			<Cluster>
				<div class="mt-2 mb-6 flex flex-row items-end gap-1">
					<span class="block pb-px text-lg text-[#666] md:text-[18px]">
						Click on the cards to go to our guides</span
					>
					<svg
						width="23"
						height="21"
						viewBox="0 0 23 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.5299 20.6648C15.6209 20.9255 15.906 21.0631 16.1668 20.9721L20.4155 19.4895C20.6762 19.3985 20.8138 19.1134 20.7228 18.8526C20.6319 18.5919 20.3467 18.4543 20.086 18.5453L16.3094 19.8632L14.9914 16.0866C14.9005 15.8258 14.6154 15.6882 14.3546 15.7792C14.0939 15.8702 13.9563 16.1553 14.0473 16.416L15.5299 20.6648ZM3.9998 5.99999L4.22341 6.4472C8.11498 4.5014 12.6393 4.55262 15.3118 6.70208C17.9167 8.79707 19.0096 13.1178 15.5517 20.2827L16.002 20.5L16.4523 20.7174C19.9924 13.3822 19.0843 8.45288 15.9386 5.92284C12.8605 3.44726 7.88477 3.49847 3.77619 5.55278L3.9998 5.99999Z"
							fill="#666666"
						/>
					</svg>
				</div>
			</Cluster>

			<Cluster align="stretch">
				<FormatCard
					format="talks"
					title="Talks"
					duration="10–20 mins"
					bestFor="Deep dives into projects, case studies, or bodies of work."
					points={[
						"Share your own or your team's unique experience doing DataViz",
						'Reflect on your process, choices, trade-offs, and learnings',
						'Offer ideas, frameworks, or tools that others can reuse or adapt'
					]}
				/>

				<FormatCard
					format="dialogues"
					title="Dialogues"
					duration="45 mins"
					bestFor="Shared questions, challenges, or themes to understand together."
					points={[
						'Facilitate peer learning and exchange',
						'Frame around a theme, domain, challenge, or provocation',
						'Design simple structures or prompts so people can participate'
					]}
				/>

				<FormatCard
					format="workshops"
					title="Workshops"
					duration="3 hours"
					bestFor="Practice-oriented, hands-on, skill-building sessions."
					points={[
						'Teach a specific skill, approach, or tool',
						'Guide participants through exercises or mini-projects',
						'Ensure people leave with something they can apply'
					]}
				/>
			</Cluster>
		</FullBleed>

		<DividerCurves />

		<Prose>
			<h2>THEMES for 2026</h2>
			<p>
				This year's conference focuses on <strong>four key themes</strong>. The examples under each
				are prompts, not limits – feel free to stretch and reinterpret them.
			</p>
		</Prose>

		<Grid minWidth="30ch" maxColumns={2} gap={6}>
			<Card variant="bordered" color="pink" title="Visualizations for Community">
				<p>
					How can data visualization support communities, public interest work, and social change?
				</p>
				<ul>
					<li>
						Make socio-economic data more accessible in public conversations, or engage marginalized
						groups through participatory approaches
					</li>
					<li>
						Support nonprofits, NGOs, civic-tech groups, advocacy organizations, environmental
						justice initiatives, or public interest journalism
					</li>
					<li>
						Practice ethical and inclusive data visualization, including accessibility,
						representation and cultural sensitivity
					</li>
				</ul>
			</Card>

			<Card variant="bordered" color="blue" title="Visualizations as Craft">
				<p>
					How do you design, refine, and craft a visualization from first sketch to final story?
				</p>
				<ul>
					<li>
						Explore visual design principles: color, layout, typography, annotation, interaction in
						data visualization
					</li>
					<li>Shape storytelling and narrative design for data-informed stories</li>
					<li>Design interactions for dashboards, exploratory tools, and interactive stories</li>
					<li>
						Share critiques, reflections, and case studies on what makes visualizations effective,
						confusing, or misleading
					</li>
				</ul>
			</Card>

			<Card variant="bordered" color="teal" title="Visualizations at Work">
				<p>
					How does visualization work inside your domains to inform real-world decisions and
					practice?
				</p>
				<ul>
					<li>
						Showcase usecases and applications where visualization played a central role in
						decision-making workflows
					</li>
					<li>
						Explain how you worked with data visualisation within your organisation, from start up
						companies to sensitive data under regulatory constraints
					</li>
					<li>
						Share case studies where data was communicated with domain experts, stakeholders, or
						business leaders through visualizations
					</li>
				</ul>
			</Card>

			<Card variant="bordered" color="yellow" title="Visualizations and Tools">
				<p>What tools, systems, and workflows power the visualizations we create and use?</p>
				<ul>
					<li>
						Author tools, libraries, frameworks, and platforms for creating data visualizations
					</li>
					<li>Build systems for scalable data exploration, analysis, and interaction</li>
					<li>
						Design pipelines, workflows &amp; integrations tp bring vis into existing data, design,
						or product processes
					</li>
					<li>
						Create collaborative and conversational interfaces for working with data (e.g.
						AI-augmented tools)
					</li>
				</ul>
			</Card>
		</Grid>

		<DividerCurves />

		<Prose>
			<h2>Who should submit?</h2>
			<p>
				Analysts, artists, designers, researchers, scientists, practitioners, journalists,
				educators, students, and anyone working with data visualization across disciplines.
				<strong>Anyone using data to tell stories, ask questions, or serve communities.</strong>
			</p>
		</Prose>

		<DividerCurves />
		<Prose>
			<h2>How to shape your proposal</h2>
			<p>Use these prompts as a mini-outline while drafting your submission.</p>
			<ol>
				<li>
					<strong>Who is the audience for your session?</strong> - Think about their backgrounds, roles,
					and questions. Are they students, early-career practitioners, domain experts, or cross-disciplinary
					collaborators?
				</li>
				<li>
					<strong>What problem or question are you centering?</strong> - Describe the pain point, curiosity,
					or gap you want to address. This helps participants understand why your session matters.
				</li>
				<li>
					<strong>What is the scope of your session?</strong> - Outline the main ideas, themes, or steps
					you plan to cover. It is okay if your work is still evolving – give us a clear sense of direction.
				</li>
				<li>
					<strong>What will participants take away?</strong> - Share the practical outcomes: skills, mental
					models, checklists, workflows, or new ways of seeing a familiar problem.
				</li>
				<li>
					<strong>Which format best supports your aims?</strong> - Consider whether your idea works best
					as a talk, group discussion, or hands-on workshop.
				</li>
			</ol>
		</Prose>

		<Prose color="pink">
			<div class="notice">
				<p>
					<strong>What makes a strong VizChitra session?</strong>
				</p>
				<p>The most successful sessions tend to:</p>
				<ul>
					<li>Start from real, lived challenges or questions.</li>
					<li>Make the process visible, not just the polished final chart.</li>
					<li>Offer concrete, reusable insights or tools.</li>
					<li>Create room for reflection, conversation, or play.</li>
				</ul>
			</div>
		</Prose>

		<Text type="caption">Proposal Deadline: <strong>15 Feb, 2026</strong></Text>

		<Cluster justify="start">
			<Button href="https://forms.vizchitra.com/proposals" color="pink" external={true}
				>Submit your Proposal</Button
			>
		</Cluster>
	</Stack>
</Container>
