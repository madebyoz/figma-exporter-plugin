import JSZip from 'jszip';

function toBuffer(ary) {
  return ary.buffer.slice(ary.byteOffset, ary.byteLength + ary.byteOffset);
}

export async function compressExport(exportableBytes, filename): Promise<any> {
  return new Promise(res => {
    let zip = new JSZip();

    for (let data of exportableBytes) {
      const { name, setting, bytes, blobType, extension } = data;
      const buffer = toBuffer(bytes);

      let blob = new Blob([buffer], { type: blobType })
      zip.file(`${name}${setting.suffix}${extension}`, blob, { base64: true });
    }

    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        const blobURL = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.className = 'button button-primary';
        link.href = blobURL;
        link.download = `${filename}.zip`
        link.click()
        link.setAttribute('download', `${name}.zip`);
        res();
      })
  })
}