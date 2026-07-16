import type { MeetingNotes } from '../models/MeetingNotes';

export function formatMeetingNotes(notes: MeetingNotes): string {
    return `

${notes.summary}

${notes.keyDecisions.map((d) => `- ${d}`).join('\n')}

${notes.actionItems.map((a) => `- ${a}`).join('\n')}

${notes.openQuestions.map((q) => `- ${q}`).join('\n')}
`;
}
