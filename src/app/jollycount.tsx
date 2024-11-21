"use client";

import { useEffect, useState } from "react";

const norwegianUnits = {
  days: {
    singular: "dag",
    plural: "dager",
  },
  hours: {
    singular: "time",
    plural: "timer",
  },
  minutes: {
    singular: "minutt",
    plural: "minutter",
  },
  seconds: {
    singular: "sekund",
    plural: "sekunder",
  },
};

const getUnitLabel = (unit: keyof typeof norwegianUnits, value: number) => {
  const unitInfo = norwegianUnits[unit];
  return value === 1 ? unitInfo.singular : unitInfo.plural;
};

export default function Jollycount() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25); // Month is 0-based
      if (new Date() > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }

      const difference = christmas.getTime() - new Date().getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    // Calculate initial time
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className="h-[100dvh] grid grid-cols-1 place-items-center place-content-center text-white"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #db0b46 0%, #490418 100%)",
      }}
    >
      <p className="font-bold text-3xl">
        Jollycount 🎄 {new Date().getFullYear()}
      </p>
      <div className="grid grid-flowrow md:grid-flow-col gap-8 p-4 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="text-[4rem] leading-[4rem] font-bold ">
              {value.toString().padStart(2, "0")}
            </span>
            <span className="text-md font-bold capitalize">
              {getUnitLabel(unit as keyof typeof norwegianUnits, value)}
            </span>
          </div>
        ))}
      </div>
      <p className="font-bold text-2xl animate-pulse">Vi gleder oss til jul!</p>
    </div>
  );
}
