import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import {addImagesPng} from '../components/images/addImagesPng.png'
// import addImagesPng from '../components/images/addImages.png'
import addImagesPng from "../components/images/addImages.png";

export default function DragDropComponent({ setDragFiles }) {

  const onDrop = useCallback((acceptedFiles) => {
    setDragFiles(acceptedFiles)
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { 
        "image/jpeg": [],
        "image/png": [],
      },
    });

  return (
    <div
      {...getRootProps()}
      className="d-flex flex-column justify-content-center align-items-center border border-secondary border-dash rounded p-4"
      style={{ background: "#8bb1b3" }}
    >
      <img className="w-25 h-25" src={addImagesPng} alt="addImagepng" />
      {/* <br> </br> */}
      <input {...getInputProps()} />
      {isDragReject ? (
        <p>Only .png & .jpeg files allowed here </p>
      ) : (
        <p>Drag your files here</p>
      )}
    </div>
  );
}
