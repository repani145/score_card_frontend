import React, { useEffect, useState } from 'react';
import './NumberCard.css'; // Updated CSS for gradient background and styles

const NumberCard = ({ title, numbar, numberColor }) => {
    const [digits, setDigits] = useState([]);

    // Convert number to individual digits (keep decimal points as string)
    const getDigits = (number) => number.toFixed(1).split("");

    useEffect(() => {
        const duration = 1000; // Animation duration in ms
        const interval = 10; // Interval for updates
        const steps = Math.floor(duration / interval);

        let currentNumber = 0;
        const timer = setInterval(() => {
            currentNumber += Math.ceil(numbar / steps);

            if (currentNumber >= numbar) {
                currentNumber = numbar; // Ensure the final number is exact
                clearInterval(timer);
            }

            setDigits(getDigits(currentNumber));
        }, interval);

        return () => clearInterval(timer);
    }, [numbar]);

    const handleRefresh = () => {
        // Reset and restart the animation
        setDigits([]);
        setTimeout(() => setDigits(getDigits(numbar)), 100);
    };

    return (
        <div
            className="card text-center shadow-lg position-relative gradient-card"
            style={{ borderRadius: '10px', height: "200px" }}
        >
            {/* Refresh Button */}
            <button
                className="btn btn-light btn-sm position-absolute"
                style={{ top: '10px', right: '10px', zIndex: '1' }}
                onClick={handleRefresh}
            >
                🔄
            </button>
            <div className="card-body">
                <h5 className="card-title gradient-card-title">{title}</h5>
                <div className="reading-meter mt-4">
                    {digits.map((digit, index) => (
                        <div key={index} className="digit-container">
                            <div
                                className="digit"
                                style={{ color: numberColor, background: "transparent" }}
                            >
                                {digit}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NumberCard;
