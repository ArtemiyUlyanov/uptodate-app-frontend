export const urlsToFiles = async (urls: string[]): Promise<File[]> => {
    return Promise.all(
        urls.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], `file_${index + 1}.${blob.type.split("/")[1]}`, { type: blob.type });
        })
    );
};