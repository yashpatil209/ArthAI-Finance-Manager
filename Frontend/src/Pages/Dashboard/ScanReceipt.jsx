import React, { useState, useRef } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button, Modal } from "flowbite-react";
import Webcam from "react-webcam";
import { postDataWithFile } from "@/api/api";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

export default function ScanReceipt() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const webcamRef = useRef(null);
  const { token, currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = await fetch(imageSrc)
      .then((res) => res.blob())
      .catch((err) => console.error("Error fetching image blob:", err));
    setSelectedImage(imageBlob);
    setCameraOn(false); // Close camera after taking the photo
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await postDataWithFile(
        `/transaction/scanreceipt/${currentUser.userId}`,
        selectedImage,
        token
      );
      setLoading(false);
      setOpenModal(false);
      toast.success("Transaction added successfully!");
    } catch (e) {
      setLoading(false);
      setOpenModal(false);
      toast.error("Transaction failed. Please try again.");
    }
  };

  return (
    <>
      <Button
        color="bg-pink-500"
        className="w-full bg-pink-500 hover:bg-pink-400 text-white rounded-lg"
        onClick={() => setOpenModal(true)}
      >
        <Camera className="w-5 h-5 mr-3" />
        <span>Scan Receipt with AI</span>
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
              Upload or Capture Image
            </h1>

            {!selectedImage && !cameraOn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <button
                  onClick={() => document.getElementById("file-input").click()}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed border-blue-300 rounded-lg sm:rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                >
                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-3 sm:mb-4" />
                  <span className="text-base sm:text-lg font-medium text-gray-700">
                    Upload Image
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                    Click to browse files
                  </span>
                </button>

                <button
                  onClick={() => setCameraOn(true)}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed border-indigo-300 rounded-lg sm:rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                >
                  <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 mb-3 sm:mb-4" />
                  <span className="text-base sm:text-lg font-medium text-gray-700">
                    Take Photo
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                    Use your camera
                  </span>
                </button>
              </div>
            )}

            <input
              type="file"
              id="file-input"
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {cameraOn && (
              <div className="flex flex-col items-center">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="w-72 h-56 rounded-lg shadow-md"
                />
                <button
                  onClick={capturePhoto}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-600"
                >
                  Capture Photo
                </button>
              </div>
            )}

            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto rounded-lg object-cover"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFileSubmit}>
            {loading ? (
              <>
                <Spinner size="sm" />
                {/* <span className="pl-3">Logging in...</span> */}
              </>
            ) : (
              "Add Transaction"
            )}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
