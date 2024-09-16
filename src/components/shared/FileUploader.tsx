import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>There is a file</div>
      ) : (
        <div className="file_uploader-box">There is no file</div>
      )}
    </div>
  );
};

export default FileUploader;
