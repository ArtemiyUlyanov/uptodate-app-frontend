const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export enum PasswordInvalidCause {
    AT_LEAST_8_DIGITS, LACK_OF_UPPERCASE_LETTERS, LACK_OF_LOWERCASE_LETTERS, LACK_OF_NUMBERS, LACK_OF_SPECIAL_SYMBOLS, INAPPROPRIATE_PASSWORD
}

export const checkEmailValid = (email: string) => {
    return emailRegex.test(email);
}

export const checkPasswordValid = (password: string): PasswordInvalidCause[] => {
    const causes: PasswordInvalidCause[] = [];

    if (password.length < 8) {
        causes.push(PasswordInvalidCause.AT_LEAST_8_DIGITS);
    }
    
    if (!/[A-Z]/.test(password)) {
        causes.push(PasswordInvalidCause.LACK_OF_UPPERCASE_LETTERS);
    }
    
    if (!/[a-z]/.test(password)) {
        causes.push(PasswordInvalidCause.LACK_OF_LOWERCASE_LETTERS);
    }
    
    if (!/[0-9]/.test(password)) {
        causes.push(PasswordInvalidCause.LACK_OF_NUMBERS);
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        causes.push(PasswordInvalidCause.LACK_OF_SPECIAL_SYMBOLS);
    }

    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password) || /\s/.test(password)) {
        causes.push(PasswordInvalidCause.INAPPROPRIATE_PASSWORD);
    }

    return causes;
}