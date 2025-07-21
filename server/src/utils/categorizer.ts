// server/src/utils/categorizer.ts
export function categorizeEvent(title: string, notes?: string): 'Work' | 'Personal' | 'Other' {
    const text = `${title} ${notes || ''}`.toLowerCase();

    const workKeywords = ['meeting', 'project', 'client', 'deadline', 'report', 'presentation', 'sprint', 'scrum', 'business'];
    const personalKeywords = ['birthday', 'family', 'friends', 'anniversary', 'party', 'vacation', 'holiday', 'dinner', 'lunch'];

    for (const keyword of workKeywords) {
        if (text.includes(keyword)) {
            return 'Work';
        }
    }

    for (const keyword of personalKeywords) {
        if (text.includes(keyword)) {
            return 'Personal';
        }
    }

    return 'Other';
}