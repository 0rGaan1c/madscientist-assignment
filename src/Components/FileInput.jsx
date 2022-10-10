import React, { useState } from "react";

const FileInput = ({ setPdf, setViewType }) => {
  const [pdfFileError, setPdfFileError] = useState("");

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdf(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdf(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  return (
    <>
      <form className="flex gap-2">
        <input
          type="file"
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          required
          onChange={handlePdfFileChange}
        />
        <select
          onChange={(e) => {
            setViewType(e.target.value);
          }}
        >
          <option value="Horizontal">Horizontal</option>
          <option value="Vertical">Vertical</option>
        </select>
      </form>
      {pdfFileError && (
        <div className="text-red-500 ml-2 text-sm">{pdfFileError}.</div>
      )}
    </>
  );
};
export default FileInput;
