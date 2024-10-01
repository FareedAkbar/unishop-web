import React, { useEffect, useState } from "react";
import Image from "next/image";
import graduationImage from "../../../public/images/home/graduation.png"; 

const GraduationBanner: React.FC = () => {
  const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const [timeRemaining, setTimeRemaining] = useState(
      calculateTimeRemaining(targetDate),
    );

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(targetDate));
      }, 1000); // Update every second

      return () => clearInterval(timer); // Cleanup on unmount
    }, [targetDate]);

    function calculateTimeRemaining(targetDate: Date) {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      }
    }

    return (
      <div className="countdown-timer gap-1 flex sm:gap-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
          <React.Fragment key={label}>
            <div className="time-unit flex flex-col items-center w-8 h-8 justify-center rounded-full bg-white p-1 lg:h-16 lg:w-16">
              <span className="time-value text-xs font-semibold sm:text-xl">
                {Object.values(timeRemaining)[idx]}
              </span>
              <span className="time-label text-[5px] lg:text-xs">{label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };
  return (
    <div className="flex flex-row items-center justify-between bg-gradient-to-r from-red-900 to-red-400 p-4 sm:p-8 lg:mx-4">
      <div className="flex max-w-xl flex-col justify-center text-left">
        <h3 className="text-xs font-semibold text-red-500 sm:text-sm">
          Categories
        </h3>
        <h1 className="font-sem my-2 text-md text-white sm:text-3xl lg:text-4xl">
          Celebrate Success with Memorable Graduation Gifts
        </h1>
        <CountdownTimer targetDate={new Date("2024-10-25T10:00:00")} />
        <button className="mt-4 lg:w-28 w-16 lg:text-base text-[10px] inline-block rounded bg-red-600 lg:px-4 py-2 text-white hover:bg-red-500">
          Buy Now
        </button>
      </div>

      <div className="mt-8 lg:mt-0 flex w-1/2 lg:justify-end">
        <Image
          src={graduationImage}
          alt="Graduation"
          width={1000} 
          height={1000} 
          className="object-cover h-28 w-full sm:h-72 lg:h-[400px]"
        />
      </div>
    </div>
  );
};

export default GraduationBanner;
