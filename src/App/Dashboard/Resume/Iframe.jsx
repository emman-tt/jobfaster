import { Download, Save, Send, Undo2 } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Iframe({ resume }) {
  const { previewType } = useSelector((state) => state.preview);
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();
  const pdfUrl = resume?.content;
  const { appearance } = useSelector((state) => state.preferences);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!pdfUrl) {
    return <div className="text-gray-500">No PDF available</div>;
  }

  return (
    <section className="w-full h-screen relative ">
      <section
        className={` ${appearance.theme == "dark" ? "text-white" : "text-black"} absolute top-[10%] z-10 font-IBM text-sm flex gap-4 flex-col left-10`}
      >
        <div
          onClick={() => {
            navigate(-1);
          }}
          className=" flex gap-2 border-b-2  border-white hover:border-black cursor-pointer "
        >
          <Undo2 className="w-4 h-4" />
          <p>Back</p>
        </div>
        <div className=" flex gap-2 border-b-2  border-white hover:border-black cursor-pointer">
          <Download className="w-4 h-4" />
          <p>Download</p>
        </div>
      </section>
      <section className="w-full flex justify-center overflow-y-auto pb-30 h-screen my-10 mb-50 p-8 ">
        <div className="flex flex-col w-[70%] h-max  gap-5 items-center origin-top">
          <div
            className={`font-satoshi ${appearance.theme == "dark" ? "text-white" : "text-black"}`}
          >
            {resume.name}
            <span className="text-sm"></span>
          </div>
          <Document
            key={pdfUrl}
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-gray-500">Loading PDF...</div>}
            className=" w-full   flex flex-col "
          >
            {numPages !== null &&
              Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={800}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg  flex justify-center mb-4"
                />
              ))}
          </Document>
        </div>
      </section>
    </section>
  );
}
