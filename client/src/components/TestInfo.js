import React from "react";

const TestInfo = ({ name, score }) => {
  return (
    <div>
      <div>
        user
        {name}
      </div>
      <div>score {score}</div>
    </div>
  );
};

export default TestInfo;
