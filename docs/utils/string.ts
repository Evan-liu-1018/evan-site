/**
 * 在指定文本中查找指定字符串出现的次数
 * @param text
 * @param searchStr
 */
export function countOccurrences(text: string, searchStr: string): number {
    if (!text || !searchStr) return 0
    const regex = new RegExp(searchStr, 'g');
    const matches = text.match(regex);
    if (matches) {
        return matches.length;
    } else {
        return 0;
    }
}