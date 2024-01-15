import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [speed, setSpeed] = useState(76);
  const [gear, setGear] = useState(0);
  const [fuel, setFuel] = useState(57);
  const [prevFuel, setPrevFuel] = useState(0);
  const [rpm, setRpm] = useState(76);
  const [prevRpm, setPrevRpm] = useState(0);

  const onMessage = (event) => {
    const { data } = event;

    switch (data.type) {
      case "speed":
        setSpeed(data.value);
        break;
      case "gear":
        setGear(data.value);
        break;
      case "fuel":
        setPrevFuel(fuel);
        setFuel(data.value);
        break;
      case "rpm":
        setPrevRpm(fuel);
        setRpm(data.value);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  setTimeout(() => {
    setFuel(30);
    setRpm(30);
  }, 3000);

  return (
    <div className="relative flex h-full gap-20">
      {/* Dashed border circle */}
      <div className="flex justify-center items-center h-fit">
        <div className="dashed-circle w-[275px] h-[275px] rounded-full">
          <div
            className="w-[275px] h-fit"
            role="progressbar"
            style={{
              "--value": rpm,
              "--prev-value": prevRpm,
            }}
          ></div>
        </div>
        <div className="fuel-progress w-[240px] h-[240px] rounded-full absolute">
          <div
            className="w-[240px] h-fit"
            role="fuelprogress"
            style={{
              "--value": fuel,
              "--prev-value": prevFuel,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
