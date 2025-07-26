export const timestamptzToHumanDate = (timestamptz: string | null) => {
    if (timestamptz === null) {
        return null;
    }
    const date = new Date(timestamptz);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });
}