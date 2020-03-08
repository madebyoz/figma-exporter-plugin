import JSZip from 'jszip';

window.onload = (event) => {
  parent.postMessage({ pluginMessage: { type: 'load' } }, '*');
}

document.getElementById('export').onclick = (_event) => {
  const selector = document.getElementById('convention') as HTMLSelectElement;
  const convention = selector.options[selector.selectedIndex].value;
  parent.postMessage({ pluginMessage: { type: 'export', value: convention } }, '*');
}

onmessage = (event) => {
  const msg = event.data.pluginMessage;
  if (!msg) return;

  if (msg.type === 'load') {
    let selector = document.getElementById('convention');
    const conventions = msg.value;

    conventions.forEach(convention => {
      const option = document.createElement('option');
      option.text = convention;
      option.value = convention;
      selector.appendChild(option);
    });
  } else if (msg.type === 'exportResults') {
    compressExport(msg.value, msg.filename)
      .then(() => {
        parent.postMessage({ pluginMessage: { type: 'close' } }, '*');
      });
  }
}

function toBuffer(ary) {
  return ary.buffer.slice(ary.byteOffset, ary.byteLength + ary.byteOffset);
}

async function compressExport(exportableBytes, filename): Promise<any> {
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