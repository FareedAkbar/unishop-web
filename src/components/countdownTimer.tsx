import { Fragment, useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window == 'undefined') return;
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeRemaining(targetDate: Date) {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="countdown-timer flex gap-1 sm:gap-4">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
        <Fragment key={label}>
          <div className="time-unit flex h-8 w-8 flex-col items-center justify-center rounded-full bg-white p-1 text-black lg:h-16 lg:w-16">
            <span className="time-value text-xs font-semibold sm:text-lg">
              {Object.values(timeRemaining)[idx]}
            </span>
            <span className="time-label text-[5px] lg:text-[10px]">
              {label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
