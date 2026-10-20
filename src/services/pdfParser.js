/**
 * Client-Side PDF Text Extractor using pdfjs-dist
 * Runs 100% in-browser with zero external server dependencies.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for browser environment
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
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
      throw new Error('No selectable text found. The document may be a scanned image or empty.');
    }

    return fullText.trim();
  } catch (err) {
    console.error('PDF extraction error:', err);
    throw new Error(err.message || 'Failed to extract text from PDF file.');
  }
}
