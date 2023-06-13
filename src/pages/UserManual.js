import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import useWindowSize from '../hooks/useWindowSize';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UserManual = () => {
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line
  const [width, height] = useWindowSize();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex items-center justify-center">
      <Document file="/UserManual.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            width={width < 768 ? width : width > 1200 ? 1000 : width - 256}
          />
        ))}
      </Document>
    </div>
  );
};

export default UserManual;
