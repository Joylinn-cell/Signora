import { useEffect, useRef } from "react";

export default function CameraCard() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
      />
    </div>
  );
}