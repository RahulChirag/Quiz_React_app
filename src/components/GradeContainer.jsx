import React, { useState } from "react";
import SubjectContainer from "./SubjectContainer";

function GradeContainer(props) {
  const [navigationString, setNavigationString] = useState(
    props.setNavigationString
  );
  const [selectedGrade, setSelectedGrade] = useState(false);
  const [showSubjectContainer, setShowSubjectContainer] = useState(false);

  const grades = [
    { name: "Nursery", value: "nursery" },
    { name: "JrKG", value: "jrkg" },
    { name: "SrKG", value: "srkg" },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: (i + 1).toString().padStart(2, "0"),
      value: (i + 1).toString().padStart(2, "0"),
    })),
  ];

  // Loop through grades array and update name property for each grade
  grades.forEach((grade, index) => {
    if (index >= 3) {
      grade.name = "Grade-" + grade.name;
    }
  });

  const handleButtonClick = () => {
    // Toggle between grade selection and subject container
    setSelectedGrade(!selectedGrade);
    setShowSubjectContainer(!showSubjectContainer);
  };

  const handleGradeButtonClick = (gradeValue) => {
    // Concatenate the gradeValue with the existing navigationString
    const updatedNavigationString = navigationString + "-" + gradeValue;
    console.log(updatedNavigationString);

    // Update the navigation string
    setNavigationString(updatedNavigationString);

    // Toggle between grade selection and subject container
    setSelectedGrade(!selectedGrade);
    setShowSubjectContainer(!showSubjectContainer);
  };

  const handleSubmit = (updatedNavigationString) => {
    // Implement your submit logic here
    console.log("Navigation string submitted:", updatedNavigationString);
  };

  return (
    <>
      <div>
        {/* Conditionally render grade buttons or the subject container */}
        {selectedGrade ? (
          <SubjectContainer
            navigationString={navigationString}
            onSubmit={handleSubmit}
          />
        ) : (
          grades.map((grade) => (
            <button
              key={grade.value}
              onClick={() => handleGradeButtonClick(grade.value)}
            >
              {grade.name}
            </button>
          ))
        )}
      </div>
    </>
  );
}

export default GradeContainer;
