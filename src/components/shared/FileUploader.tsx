import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-bright-3 dark:bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file"
            width={90}
            height={90}
          />
          <h3 className="base-medium text-dusk-2 dark:text-light-2 mb-2 mt-4">
            Drag and drop a photo here
          </h3>
          <p className="text-dark-4 dark:text-light-4 small-regular mb-6">
            SVG, PNG, JPG
          </p>
          <Button className="shad-button_dark_4 hover:shadow-lg hover:shadow-bright-4 hover:dark:shadow-light-3 ">
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
