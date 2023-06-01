import React, { useCallback, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageCropper({ setBlob }) {
  const [src, setFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");
  const handleFileChange = (event) => {
    const blob = URL.createObjectURL(event.target.files[0]);

    setFile(blob);
    const fr = new FileReader();

    fr.onload = () => {
      console.log(fr.result);
      setDataUrl(fr.result);
    };

    fr.readAsDataURL(event.target.files[0]); // The readAsDataURL method is used to read the contents of the specified Blob or File .
  };

  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [result, setResult] = useState(null);

  const getCroppedImg = useCallback(() => {
    console.log("in useCallBAck");
    const mainImage = document.getElementById("main-image");

    const canvas = document.createElement("canvas");
    const scaleX = mainImage?.naturalWidth / mainImage?.width;
    const scaleY = mainImage?.naturalHeight / mainImage?.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx &&
      ctx.drawImage(
        mainImage,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

    const base64Image = canvas.toDataURL("images/jpeg");
    setResult(base64Image);
    canvas.toBlob((blobOfCropImg) => {
      console.log(blobOfCropImg);
      setBlob(blobOfCropImg);
    });
  }, [crop, dataUrl]);

  return (
    <div>
      <div className="Container border">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {src && (
        <div className="border mt-3">
          {
            <ReactCrop
              crop={crop} // You must ensure the crop is in bounds and correct to the aspect ratio if manually setting.
              onComplete={(e) => {
                //A callback which happens after a resize, drag, or nudge. Passes the current crop state object.
                console.log(e); // we get in this event : height unit width x y
                setCrop(e);
                getCroppedImg();
              }}
              onChange={(c) => {
                //A callback which happens for every change of the crop (i.e. many times as you are dragging/resizing). Passes the current crop state object
                setCrop(c);
              }}
            >
              <img
                src={src}
                id="main-image"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </ReactCrop>
          }
        </div>
      )}

      {result && (
        <div className="d-flex justify-content-center">
          <img
            className="border border-dark p-1"
            src={result}
            alt="cropeed img"
          />
        </div>
      )}
    </div>
  );
}
