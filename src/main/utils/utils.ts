import * as crypto from 'crypto';

// Function to hash the key
export const hashKey = (input: string): string => {
    return crypto.createHash('sha256').update(input).digest('hex');
};
