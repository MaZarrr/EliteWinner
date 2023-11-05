export function generateImageSrc(src: string) {
    const regex = /\\/g;
    const newFilePath = src.replace(regex, '/');
    return newFilePath.replace('public', 'http://127.0.0.1:2023');
}