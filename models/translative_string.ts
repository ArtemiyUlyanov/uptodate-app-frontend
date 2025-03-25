export type TranslativeString = {
    english: string
    russian: string
}

export const select_value_by_language = (translativeString: TranslativeString, lang: string): string => {
    return lang === 'en' ? translativeString.english : translativeString.russian;
}