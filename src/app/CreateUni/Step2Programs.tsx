"use client";
import React, { useState } from "react";
import { Program } from "./types";
import styles from "./Step2.module.css"; 

export default function Step2Programs({
  programs,
  setPrograms,
}: {
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
}) {
  const [programData, setProgramData] = useState({
    name: "",
    description: "",
    degree: "",
    admissionRequirement: "",
    applicationProcedure: "",
    tuition: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProgramData({ ...programData, [e.target.name]: e.target.value });
  };

  const handleAddProgram = () => {
    if (!programData.name.trim()) return; 

    const newProgram: Program = {
      id: String(Date.now()),
      ...programData,
      tuition: parseFloat(programData.tuition) || 0,
      subSpecialties: [],
    };

    setPrograms((prev) => [newProgram, ...prev]);
    setProgramData({ name: "", description: "", degree: "", admissionRequirement: "", applicationProcedure: "", tuition: "" });
  };

  return (
    <div className={styles["step2-container"]}>
      <h2 className={styles.title}>Programs</h2>

      {/* List of Existing Programs */}
      {programs.length > 0 && (
        <div className={styles["program-grid"]}>
          {programs.map((prog) => (
            <div key={prog.id} className={styles["program-card"]}>
              <h3>{prog.name}</h3>
              <p><em>{prog.degree}</em></p>

              <div className={styles["program-details"]}>
                <div className={styles["detail-box"]}>
                  <strong>Description:</strong>
                  <p>{prog.description}</p>
                </div>

                <div className={styles["detail-box"]}>
                  <strong>Admission Requirement:</strong>
                  <p>{prog.admissionRequirement}</p>
                </div>

                <div className={styles["detail-box"]}>
                  <strong>Application Procedure:</strong>
                  <p>{prog.applicationProcedure}</p>
                </div>

                <div className={styles["detail-box"]}>
                  <strong>Tuition:</strong>
                  <p>{prog.tuition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Program Input Form */}
      <div className={styles["input-container"]}>
        <input
          type="text"
          name="name"
          value={programData.name}
          onChange={handleChange}
          placeholder="Program Name"
          className={styles["input-field"]}
        />

        <textarea
          name="description"
          value={programData.description}
          onChange={handleChange}
          placeholder="Description"
          className={styles["input-field"]}
        />

        <input
          type="text"
          name="degree"
          value={programData.degree}
          onChange={handleChange}
          placeholder="Degree (e.g. Master's)"
          className={styles["input-field"]}
        />

        <textarea
          name="admissionRequirement"
          value={programData.admissionRequirement}
          onChange={handleChange}
          placeholder="Admission Requirement"
          className={styles["input-field"]}
        />

        <textarea
          name="applicationProcedure"
          value={programData.applicationProcedure}
          onChange={handleChange}
          placeholder="Application Procedure"
          className={styles["input-field"]}
        />

        <input
          type="number"
          name="tuition"
          value={programData.tuition}
          onChange={handleChange}
          placeholder="Tuition"
          className={styles["input-field"]}
        />

        <button className={styles["add-program-btn"]} onClick={handleAddProgram}>
          Add Program
        </button>
      </div>
    </div>
  );
}
