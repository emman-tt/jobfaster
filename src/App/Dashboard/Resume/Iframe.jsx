import { Download, Undo2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Iframe({ resume }) {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(800);
  const navigate = useNavigate();
  const pdfUrl = resume?.content;
  const { appearance } = useSelector((state) => state.preferences);
  const viewerRef = useRef(null);

  useEffect(() => {
    function updateWidth() {
      if (viewerRef.current) {
        setPageWidth(Math.min(viewerRef.current.clientWidth, 900));
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 font-satoshi text-sm">
        No PDF available
      </div>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col sm:flex-row font-satoshi">
      <section
        className={`flex sm:flex-col items-center gap-3 sm:gap-4 px-4 sm:px-0 sm:pl-8 xl:pl-12 sm:pt-[10vh] py-3 sm:py-0 z-10 ${
          appearance.theme == "dark" ? "text-white" : "text-black"
        }`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border-b-2 border-transparent hover:border-current cursor-pointer transition-colors text-sm font-medium"
        >
          <Undo2 className="w-4 h-4" />
          <p>Back</p>
        </div>
        <div className="flex items-center gap-2 border-b-2 border-transparent hover:border-current cursor-pointer transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          <p>Download</p>
        </div>
      </section>

      <section
        ref={viewerRef}
        className="flex-1 flex justify-center overflow-y-auto pb-8 sm:pb-12 px-3 sm:px-6 xl:px-10 2xl:px-16"
      >
        <div className="flex flex-col w-full sm:w-4/5 xl:w-3/5 2xl:w-[55%] gap-4 items-center pt-4 sm:pt-8 xl:pt-12">
          <div
            className={`text-sm sm:text-base font-semibold truncate max-w-full text-center ${
              appearance.theme == "dark" ? "text-white" : "text-black"
            }`}
          >
            {resume.name}
          </div>
          <Document
            key={pdfUrl}
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="text-gray-500 text-sm py-20">
                Loading PDF...
              </div>
            }
            className="w-full flex flex-col items-center"
          >
            {numPages !== null &&
              Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg mb-4 sm:mb-6 rounded-sm"
                />
              ))}
          </Document>
        </div>
      </section>
    </section>
  );
}
