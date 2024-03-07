import { useEffect } from "react";
import "./Popup.css";

export default function () {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div>
      <h1>smartr.network</h1>
      <p>
        a smarter <code>wallet</code>
      </p>
    </div>
  );
}
