// FileReader 方式
// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript


export function img2Base64(file: File): Promise<string> {
    return new Promise((resolve) => {
        const fileR = new FileReader()
        fileR.readAsDataURL(file);
        fileR.onload = () => {
            resolve(fileR.result as string)
        }
    })
}