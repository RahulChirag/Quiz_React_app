import React, { useState, useEffect } from "react";

const JsonFileChecker = ({ onFileSelect }) => {
  const [jsonFiles, setJsonFiles] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchJsonFiles = async () => {
      try {
        const response = await fetch("/src/components/games.json");
        if (!response.ok) {
          throw new Error("Failed to fetch JSON files");
        }
        const data = await response.json();
        setJsonFiles(data.files);
      } catch (error) {
        console.error("Error fetching JSON files:", error);
      }
    };

    fetchJsonFiles();
  }, []);

  const handleButtonClick = async (file) => {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON file: ${file}`);
      }
      const data = await response.json();
      setSelectedData(data);
      onFileSelect(data); // Call the onFileSelect function passed from App.jsx
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  return (
    <div>
      <h2>JSON Files in src Directory:</h2>
      {jsonFiles.map((file, index) => {
        const fileName = file.split("/").pop().replace(".json", "");
        return (
          <button key={index} onClick={() => handleButtonClick(file)}>
            {fileName}
          </button>
        );
      })}
    </div>
  );
};

export default JsonFileChecker;
