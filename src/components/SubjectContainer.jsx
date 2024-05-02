import React, { useState } from "react";

function SubjectContainer(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectClick = (subjectValue) => {
    // Concatenate the subjectValue with the existing navigationString
    const updatedNavigationString = props.navigationString + "-" + subjectValue;

    // Call the onSubmit prop function to handle the submission with the updatedNavigationString
    props.onSubmit(updatedNavigationString);

    console.log(updatedNavigationString);
    console.log("Subject button clicked:", subjectValue);

    // Set selectedSubject to the clicked subject
    setSelectedSubject(subjectValue);
  };

  const subjects = [
    { name: "Science", value: "science" },
    { name: "Math", value: "math" },
  ];

  return (
    <div>
      {subjects.map((subject) => (
        <button
          key={subject.value}
          onClick={() => handleSubjectClick(subject.value)}
        >
          {subject.name}
        </button>
      ))}
    </div>
  );
}

export default SubjectContainer;
