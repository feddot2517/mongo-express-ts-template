const crypto = require('crypto')

export function passwordToHash(target: string): string {
    return crypto.createHash('md5').update(target).digest('hex');
}