export const timestamptzToISOtz = (timestamptz: string) => {
    // original values must be in UTC

    const date = new Date(timestamptz);
    const isoString = date.toISOString();

    const base = isoString.slice(0, 19);
    return `${base}+00:00`;
}