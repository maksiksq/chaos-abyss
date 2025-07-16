export const toTimestampTZ = (date = new Date()) => {
    const iso = date.toISOString();
    const [datePart, timePart] = iso.split('T');
    const [time, milliZ] = timePart.split('.');
    const milliseconds = milliZ.slice(0, -1); // remove 'Z'
    const microseconds = milliseconds.padEnd(6, '0');

    return `${datePart} ${time}.${microseconds}+00`;
}