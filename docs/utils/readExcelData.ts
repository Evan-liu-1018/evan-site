import {read, utils} from "xlsx";

/**
 * 将文件File转为html
 * @param file
 * @param index
 * @constructor
 */
export async function excelToHtml(file: File, index = 0) {
    const data = await file.arrayBuffer();
    const wb = read(data);
    if (index >= wb.SheetNames.length) {
        throw new Error()
    }
    const ws = wb.Sheets[wb.SheetNames[index]];
    return utils.sheet_to_html(ws);
}