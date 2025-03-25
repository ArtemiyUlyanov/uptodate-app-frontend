export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
}

export const formatDateExtended = (dateString: string): string => {
    const date = new Date(dateString);

    const optionsDate: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleDateString('en-GB', optionsTime);

    return `${formattedTime}`;
}

export const formatDateToISO = (day: number, month: number, year: number): string => {
    const date = new Date(year, month - 1, day, 12, 0, 0);
  
    const formattedDate = date.toISOString().slice(0, 19); 
    return formattedDate;
}

export const retrieveDateFromISO = (dateString: string): string[] => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return [day, month, year];
}