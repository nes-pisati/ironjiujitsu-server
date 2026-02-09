export const normalizeItalianPhone = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('0039')) {
        return cleaned.substring(2);
    }

    if (cleaned.startsWith('39')) {
        return cleaned;
    }

    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }

    return `39${cleaned}`;
};
