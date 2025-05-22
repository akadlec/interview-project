export const formattedText = (text: string) : string => {
    const newText = text
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()

    return newText || ''
}

export const releaseYear = (release_date: string) : string => {
    return release_date.split('-')[0] || ''
}
