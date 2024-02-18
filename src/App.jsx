import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [speed, setSpeed] = useState(76);
  const [gear, setGear] = useState(0);
  const [fuel, setFuel] = useState(73);
  const [prevFuel, setPrevFuel] = useState(0);
  const [rpm, setRpm] = useState(65);
  const [prevRpm, setPrevRpm] = useState(0);

  const updateRpm = (newRpm) => {
    setRpm(newRpm);
    const progressBar = document.querySelector('[role="progressbar"]');
    const progressBarMask1 = document.querySelector(
      '[role="progressbar-orange-mask"]'
    );
    const progressBarMask2 = document.querySelector(
      '[role="progressbar-red-mask"]'
    );
    const currentPercentage =
      progressBar.style.getPropertyValue("--percentage") || newRpm || 0;

    progressBar.style.setProperty("--prev-value", currentPercentage);
    progressBarMask1.style.setProperty("--prev-value", currentPercentage);
    progressBarMask2.style.setProperty("--prev-value", currentPercentage);

    progressBar.style.setProperty("--value", newRpm);
    progressBarMask1.style.setProperty("--value", newRpm);
    progressBarMask2.style.setProperty("--value", newRpm);

    progressBar.style.setProperty("--percentage", newRpm);
    progressBarMask1.style.setProperty("--percentage", newRpm);
    progressBarMask2.style.setProperty("--percentage", newRpm);

    progressBar.offsetHeight;
    progressBarMask1.offsetHeight;
    progressBarMask2.offsetHeight;

    progressBar.style.animation = "none";
    progressBarMask1.style.animation = "none";
    progressBarMask2.style.animation = "none";

    progressBar.classList.remove("animate-progress-white");
    progressBarMask1.classList.remove("animate-progress-white");
    progressBarMask2.classList.remove("animate-progress-white");

    progressBar.classList.add("animate-progress");
    progressBarMask1.classList.add("animate-progress");
    progressBarMask2.classList.add("animate-progress");

    setTimeout(() => {
      progressBar.style.animation = "progress 2.5s 0s forwards";
      progressBar.classList.toggle("animate-progress-white");
      progressBar.style.animation = "progress 2.5s 0s forwards";
      progressBar.classList.toggle("animate-progress-white");
      progressBarMask1.style.animation = "progress 2.5s 0s forwards";
      progressBarMask1.classList.toggle("animate-progress-white");
      progressBarMask2.style.animation = "progress 2.5s 0s forwards";
      progressBarMask2.classList.toggle("animate-progress-white");
    }, 0);
  };

  const updateFuel = (newFuel) => {
    const progressBar = document.querySelector('[role="fuelprogress"]');
    const currentPercentage =
      progressBar.style.getPropertyValue("--percentage") || newFuel || 0;

    progressBar.style.setProperty("--prev-value", currentPercentage);
    progressBar.style.setProperty("--value", newFuel);
    progressBar.style.setProperty("--percentage", newFuel);

    progressBar.offsetHeight;

    progressBar.style.animation = "none";
    progressBar.classList.remove("animate-progress-white");
    progressBar.classList.add("animate-progress");

    setTimeout(() => {
      progressBar.style.animation = "progress 0.1s 0s forwards";
      progressBar.classList.toggle("animate-progress-white");
    }, 0);
  };

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
        setPrevRpm(rpm);
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

  return (
    <div className="relative flex h-full gap-20">
      {/* Dashed border circle */}
      <div className="flex justify-center items-center h-fit relative">
        <div className="dashed-circle w-[275px] h-[275px] rounded-full z-10">
          <div
            className="w-[275px] h-fit"
            role="progressbar"
            style={{
              "--value": rpm,
              "--prev-value": prevRpm,
            }}
          ></div>
          <div className="absolute top-0 dashed-circle-orange-mask w-[275px] h-[275px] rounded-full z-50">
            <div
              className="w-[275px] h-fit"
              role="progressbar-orange-mask"
              style={{
                "--value": rpm,
                "--prev-value": prevRpm,
              }}
            ></div>
          </div>
          <div className="absolute top-0 dashed-circle-red-mask w-[275px] h-[275px] rounded-full">
            <div
              className="w-[275px] h-fit"
              role="progressbar-red-mask"
              style={{
                "--value": rpm,
                "--prev-value": prevRpm,
              }}
            ></div>
          </div>
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
      <div className="flex gap-5 text-white h-fit">
        {[7, 30, 50, 60, 65, 70, 90, 100].map((item, i) => (
          <button
            key={i}
            onClick={() => {
              updateRpm(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
