const crypto = require('crypto');

export abstract class PasswordService {
    static generateSalt(): string {
        var rounds: number = 12;
        return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
    }

    static hasher(password: string, salt: string): string {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        let value = hash.digest('hex');
        return value;
    }

    static hash(password: string, salt: string): string {
        if (password == null || salt == null) {
            throw new Error('Must Provide Password and salt values');
        }
        if (typeof password !== 'string' || typeof salt !== 'string') {
            throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
        }
        return this.hasher(password, salt);
    }

    static isCorrectPassword(password: string, hashedPassword: string, salt: string): boolean {
        if (password === null || hashedPassword === null || salt === null) {
            throw new Error('password and hash is required to compare');
        }
        if (typeof password !== 'string' || typeof salt !== 'string' || typeof salt !== 'string') {
            throw new Error('password, salt and hashedPassword must be a String');
        }
        let inputHashedPassword = this.hasher(password, salt);
        if (inputHashedPassword === hashedPassword) {
            return true;
        }
        return false
    }
}