import React from "react";

// Individual cell component
const IndividualCell = ({ type, success }) => {
  const className = `step-cell step-cell-${type} ${success ? "success" : ""}`;
  return (
    <div className={className}>
      {type === "number" && success ? <span>&#10003;</span> : null}
    </div>
  );
};

// Horizontal step component
const HorizontalStep = ({ position, header, description, isActive }) => {
  const className = `step-item step-item-${position} ${
    isActive ? "active" : ""
  }`;
  return (
    <div className={className}>
      <span className="step-header">{header}</span>
      {description && <p className="step-description">{description}</p>}
      <IndividualCell type="number" success={isActive} />
    </div>
  );
};

// Vertical step component
const VerticalStep = ({ showLine, header, description, isActive }) => {
  return (
    <div className={`step-item step-item-vertical ${isActive ? "active" : ""}`}>
      <span className="step-header">{header}</span>
      {description && <p className="step-description">{description}</p>}
      {showLine && <div className="step-line" />}
      <IndividualCell type="line" success={isActive} />
    </div>
  );
};

// Main progress step component
const CheckoutStepper = ({
  orientation,
  numberOfSteps,
  currentStep,
  header,
  description,
}) => {
  const progress = ((currentStep - 1) * 100) / (numberOfSteps - 1);

  return (
    <div className={`step-container ${orientation}-stepper`}>
      {orientation === "horizontal" ? (
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      ) : (
        <div className="progress-bar" style={{ height: `${progress}%` }} />
      )}
      {Array.from({ length: numberOfSteps }, (_, index) => {
        const isActive = index + 1 === currentStep;
        return orientation === "horizontal" ? (
          <HorizontalStep
            key={index}
            position={
              index === 0
                ? "start"
                : index === numberOfSteps - 1
                ? "end"
                : "middle"
            }
            header={header[index]}
            description={description && description[index]}
            isActive={isActive}
          />
        ) : (
          <VerticalStep
            key={index}
            showLine={index !== numberOfSteps - 1}
            header={header[index]}
            description={description && description[index]}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
