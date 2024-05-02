import React, { useState } from "react";
import { useForm } from "react-hook-form";
import firebase from "../firebase.js";
import GradeContainer from "./GradeContainer.jsx";

function MainForm({ onSubmit }) {
  let navigationString = "CBSC";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showGradeInput, setShowGradeInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sections = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const grades = [
    "Nursery",
    "LKG",
    "UKG",
    ...Array.from({ length: 10 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ),
  ];

  const onSubmitForm = async (data) => {
    try {
      // Check if there's data in local storage
      const localStorageData = localStorage.getItem("userData");

      if (localStorageData) {
        const storedUserData = JSON.parse(localStorageData);

        // If emails are the same, use the existing data and set submitted to true
        if (storedUserData.email === data.email) {
          setSubmitted(true);
          onSubmit();
          return;
        }
      }

      // If there's no data in local storage or email doesn't match, proceed

      // Add logic here to save data to Firestore
      const user = {
        userRole: data.userRole,
        firstname: data.firstname,
        lastname: data.lastname,
        school: data.school,
        email: data.email || "",
        phoneno: data.phoneno || "",
        grade: data.grade || "",
        section: data.section || "",
      };

      // Reference to the Firestore collection
      const usersRef = firebase.firestore().collection("users");

      // Add the user data to Firestore
      await usersRef.add(user);

      // Reset form after successful submission
      reset();

      // Set submitted to true after successful submission
      setSubmitted(true);
      onSubmit();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleUserRoleChange = (e) => {
    setShowGradeInput(e.target.value === "Student");
  };

  return (
    <>
      {!submitted ? ( // Render the form only if submitted is false
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="userRole">I am:</label>
          <select
            id="userRole"
            {...register("userRole")}
            onChange={handleUserRoleChange}
          >
            <option value="Principle">Principle</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>

          <label htmlFor="firstname">First name:</label>
          <input
            id="firstname"
            {...register("firstname", {
              required: "This field is required.",
              maxLength: 70,
            })}
            placeholder="Enter your first name"
          />
          <p>{errors.firstname?.message}</p>

          <label htmlFor="lastname">Last name:</label>
          <input
            id="lastname"
            {...register("lastname", {
              required: "This field is required.",
              maxLength: 70,
            })}
            placeholder="Enter your last name"
          />
          <p>{errors.lastname?.message}</p>

          <label htmlFor="school">School:</label>
          <input
            id="school"
            {...register("school", {
              required: "This field is required.",
              maxLength: 100,
            })}
            placeholder="Enter your school name"
          />
          <p>{errors.school?.message}</p>

          {/* Always render the email field */}
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            {...register("email", {
              required: "This field is required.",
              maxLength: 70,
            })}
            placeholder="Enter your email"
          />
          <p>{errors.email?.message}</p>

          {showGradeInput && (
            <>
              <label htmlFor="grade">Grade:</label>
              <select id="grade" {...register("grade")} defaultValue="">
                <option value="" disabled>
                  Select Grade
                </option>
                {grades.map((grade, index) => (
                  <option key={index} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <p>{errors.grade?.message}</p>

              <label htmlFor="section">Section:</label>
              <select id="section" {...register("section")} defaultValue="">
                <option value="" disabled>
                  Select Section
                </option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </select>
              <p>{errors.section?.message}</p>
            </>
          )}

          {!showGradeInput && (
            <>
              <label htmlFor="phoneno">Phone No:</label>
              <input
                id="phoneno"
                {...register("phoneno", {
                  required: "This field is required.",
                  maxLength: 10,
                })}
                placeholder="Enter your Phone number"
              />
              <p>{errors.phoneno?.message}</p>
            </>
          )}

          <input type="submit" />
        </form>
      ) : (
        <GradeContainer setNavigationString={navigationString} />
      )}
    </>
  );
}

export default MainForm;
