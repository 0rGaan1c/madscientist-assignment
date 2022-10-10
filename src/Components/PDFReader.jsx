import React, { createRef, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Controls from "./Controls";
import FileInput from "./FileInput";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState(null);
  const [renderedScale, setRenderedScale] = useState(null);
  const [viewType, setViewType] = useState("Horizontal");
  const [pdf, setPdf] = useState(null);
  const handle = useFullScreenHandle();
  const [pagesRef, setPagesRef] = useState([]);

  useEffect(() => {
    const div = document.getElementsByClassName("fullscreen")[0];
    if (!div) return;
    if (handle.active) {
      div.style.overflow = "auto";
    } else {
      div.style.overflow = "";
    }
  }, [handle]);

  useEffect(() => {
    pagesRef[pageNumber - 1]?.current?.pageElement.current.scrollIntoView({});
  }, [pageNumber, pagesRef]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPagesRef((elRefs) =>
      Array(numPages)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }

  const isLoading =
    renderedPageNumber !== pageNumber || renderedScale !== scale;

  return (
    <div>
      <section id="pdf-section" className="my-4 w-full md:w-[612px] mx-auto ">
        {!pdf ? (
          <FileInput setPdf={setPdf} setViewType={setViewType} />
        ) : (
          <FullScreen handle={handle}>
            <Controls
              scale={scale}
              setScale={setScale}
              numPages={numPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              handle={handle}
            />
            <div className="flex flex-col items-center">
              <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                className="text-white"
              >
                {viewType === "Vertical" ? (
                  Array.from({ length: numPages }, (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      scale={scale}
                      className="my-2"
                      ref={pagesRef[index]}
                    />
                  ))
                ) : isLoading && renderedPageNumber && renderedScale ? (
                  <Page
                    key={renderedPageNumber + "@" + renderedScale}
                    className="prevPage"
                    pageNumber={renderedPageNumber}
                    scale={renderedScale}
                  />
                ) : null}
                <Page
                  key={pageNumber + "@" + scale}
                  pageNumber={pageNumber}
                  onRenderSuccess={() => {
                    setRenderedPageNumber(pageNumber);
                    setRenderedScale(scale);
                  }}
                  scale={scale}
                />
              </Document>
            </div>
          </FullScreen>
        )}
      </section>
    </div>
  );
};

export default PDFReader;
