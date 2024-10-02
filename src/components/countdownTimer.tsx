'use client';

import { Fragment, useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
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
                <Fragment key={label}>
                    <div className="time-unit flex flex-col items-center w-8 h-8 justify-center rounded-full bg-white p-1 lg:h-16 lg:w-16">
                        <span className="time-value text-xs font-semibold sm:text-xl">
                            {Object.values(timeRemaining)[idx]}
                        </span>
                        <span className="time-label text-[5px] lg:text-xs">{label}</span>
                    </div>
                </Fragment>
            ))}
        </div>
    );
};