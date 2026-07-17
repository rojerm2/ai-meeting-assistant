import type { MeetingNotes } from '../models/MeetingNotes';

export function formatMeetingNotes(notes: MeetingNotes): string {
    const formatList = (items?: string[]) =>
        items && items.length > 0 ? items.map((i) => `- ${i}`).join('\n') : '';

    const summary = notes?.summary ?? '';
    const decisions = formatList(notes?.decisions);
    const actionItems = formatList(notes?.actionItems);
    const openQuestions = formatList(notes?.openQuestions);

    const sections: string[] = [];

    if (summary) sections.push(summary);
    if (decisions) sections.push('Key Decisions:\n' + decisions);
    if (actionItems) sections.push('Action Items:\n' + actionItems);
    if (openQuestions) sections.push('Open Questions:\n' + openQuestions);

    return sections.join('\n\n');
}
