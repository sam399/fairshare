/**
 * Client-Side PDF Text Extractor using pdfjs-dist
 * Runs 100% in-browser with local Vite worker (0 CDN dependency, 100% offline).
 */

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export async function extractTextFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;

    let fullText = '';

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageStrings = textContent.items.map(item => item.str);
      const pageText = pageStrings.join(' ');
      
      fullText += pageText + '\n\n';
    }

    if (!fullText.trim()) {
      throw new Error('No selectable text found in this PDF. It may be a scanned image or empty. Try pasting the text directly into the "Paste Contract Text" tab.');
    }

    return fullText.trim();
  } catch (err) {
    console.error('PDF extraction error:', err);
    throw new Error(err.message || 'Failed to extract text from PDF file.');
  }
}
