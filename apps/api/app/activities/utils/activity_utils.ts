import * as fs from 'node:fs'

export async function createFileFromBase64(base64: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Extract the Base64 data (if it includes a data URI prefix)
    const base64Data = base64.replace(/^data:.*;base64,/, '');

    // Decode the Base64 string
    const fileBuffer = Buffer.from(base64Data, 'base64');

    // Write the file to the specified path
    fs.writeFile(filePath, fileBuffer, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
