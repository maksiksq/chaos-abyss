export const timestamptzToHumanDate = (timestamptz: string) => {
    const date = new Date(timestamptz);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });
}