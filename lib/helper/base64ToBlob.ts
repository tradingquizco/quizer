import { FileType } from "@/components/upload";
import getBase64 from "./getBase64";

export default async function base64ToBlob(file: FileType) {
    const base64 = await getBase64(file);
    const match = base64.match(/^data:(.*);base64,/);
    const mime = match ? match[1] : '';

    const byteString = atob(base64.split(',')[1]); // Decode base64 string
    const ab = new ArrayBuffer(byteString.length); // Create a buffer
    const ia = new Uint8Array(ab); // Create a view for the buffer

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i); // Assign the bytes to the buffer
    }

    return new Blob([ab], { type: mime }); // Return the Blob object
}
