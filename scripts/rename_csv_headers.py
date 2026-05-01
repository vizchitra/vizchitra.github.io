import csv, os

BASE = 'content/2026/data'

CFE_HEADERS = [
    'id', 'respondent_id', 'submitted_at', 'first_name', 'last_name',
    'job_title', 'organisation', 'bio',
    'submission_type', 'team_name', 'team_bio', 'previous_projects',
    'social_links', 'twitter', 'linkedin',
    'project_title', 'project_description',
    'data_source', 'visualization_method', 'sketches',
    'technical_requirements', 'timeline',
    'consent_note', 'consent', 'extra', 'exclude', 'status'
]

CFP_HEADERS = [
    'id', 'respondent_id', 'submitted_at', 'first_name', 'last_name',
    'job_title', 'organisation', 'bio',
    'social_links', 'twitter', 'linkedin',
    'proposal_type',
    'consent_note', 'consent',
    'talk_theme', 'talk_title', 'talk_description',
    'talk_links', 'talk_link_1', 'talk_link_2', 'talk_experience',
    'dialogue_theme', 'dialogue_title', 'dialogue_experience',
    'dialogue_description', 'dialogue_links', 'dialogue_link_1', 'dialogue_link_2',
    'dialogue_materials', 'dialogue_room',
    'workshop_theme', 'workshop_title', 'workshop_experience',
    'workshop_description', 'workshop_links', 'workshop_link_1', 'workshop_link_2',
    'workshop_materials', 'workshop_room',
    'exclude', 'status'
]


def rename_headers(path, new_headers):
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        old_headers = next(reader)
        rows = list(reader)

    print(f'{os.path.basename(path)}: {len(old_headers)} cols -> {len(new_headers)} new')
    if len(old_headers) != len(new_headers):
        print('  ERROR: column count mismatch!')
        for i, h in enumerate(old_headers):
            print(f'  {i}: {repr(h)}')
        return False

    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(new_headers)
        writer.writerows(rows)
    print('  OK')
    return True


rename_headers(f'{BASE}/cfe.csv', CFE_HEADERS)
rename_headers(f'{BASE}/cfp.csv', CFP_HEADERS)
