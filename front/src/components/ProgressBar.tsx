interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    const progressPercentage = (currentStep - 1) / (totalSteps - 1) * 100;

    return (
        <div className="px-6">
            <div className="relative w-full h-4 bg-gray-200 rounded-full ">
                <div
                    className="absolute top-0 left-0 h-full bg-cyan-900 rounded-full"
                    style={{
                        width: `${progressPercentage}%`,
                        transition: "width 0.3s ease-in-out",
                    }}
                ></div>

                {[...Array(totalSteps)].map((_, index) => {
                    const positionPercentage = (index / (totalSteps - 1)) * 100;

                    return (
                        <div
                            key={index}
                            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center rounded-full 
                            ${currentStep > index
                                    ? "bg-cyan-900 text-white"
                                    : "bg-gray-200 text-gray-500"} 
                            w-10 h-10 transition-colors duration-500`}
                            style={{ left: `${positionPercentage}%` }}
                        >
                            <span className="text-sm">{index + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressBar;
