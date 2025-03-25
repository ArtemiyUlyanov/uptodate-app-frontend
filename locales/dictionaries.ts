const dictionaries: any = {
    en: import('./en/lang.json').then(module => module.default),
    fr: import('./fr/lang.json').then(module => module.default),
    ru: import('./ru/lang.json').then(module => module.default)
}

export const getDictionary = async (dictionary: string) => await dictionaries[dictionary];