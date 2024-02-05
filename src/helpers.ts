export const getFileName = (filePath: string): string => {
    return filePath.split('/').pop()
}