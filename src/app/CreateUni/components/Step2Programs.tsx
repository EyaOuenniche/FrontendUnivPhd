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
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    degree: "",
    admissionRequirement: "",
    applicationProcedure: "",
    tuition: "",
    duration: "",
  });

  const [showForm, setShowForm] = useState(programs.length === 0); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProgram({ ...newProgram, [e.target.name]: e.target.value });
  };

  const handleAddProgram = () => {
    if (!newProgram.name.trim()) return;

    const program: Program = {
      id: String(Date.now()),
      name: newProgram.name.trim(),
      description: newProgram.description.trim(),
      degree: newProgram.degree.trim(),
      admissionRequirement: newProgram.admissionRequirement.trim(),
      applicationProcedure: newProgram.applicationProcedure.trim(),
      tuition: Number(newProgram.tuition),
      duration: newProgram.duration.trim(), 
      subSpecialties: [],
    };

    setPrograms([...programs, program]);
    setNewProgram({
      name: "",
      description: "",
      degree: "",
      admissionRequirement: "",
      applicationProcedure: "",
      tuition: "",
      duration: "",
    });
    setShowForm(false); 
  };

  return (
    <div className={styles.step2Container}>
      {programs.map((prog) => (
        <div key={prog.id} className={styles.programCard}>
          <h3 className={styles.programName}>{prog.name}</h3>
          <p className={styles.programDetails}><strong>Degree:</strong> {prog.degree}</p>
          <p className={styles.programDetails}><strong>Duration:</strong> {prog.duration}</p>
          <p className={styles.programDetails}><strong>Description:</strong> {prog.description}</p>
          <p className={styles.programDetails}><strong>Admission Requirement:</strong> {prog.admissionRequirement}</p>
          <p className={styles.programDetails}><strong>Application Procedure:</strong> {prog.applicationProcedure}</p>
          <p className={styles.programDetails}><strong>Tuition:</strong> ${prog.tuition}</p>
        </div>
      ))}

      {!showForm && (
        <button className={styles.showFormButton} onClick={() => setShowForm(true)}>
          Add Another Program
        </button>
      )}

      {showForm && (
        <div>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.inputLabel}>Program Name</label>
            <input id="name" name="name" type="text" value={newProgram.name} onChange={handleChange} className={styles.inputField} placeholder="Enter program name" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="degree" className={styles.inputLabel}>Degree Type</label>
            <input id="degree" name="degree" type="text" value={newProgram.degree} onChange={handleChange} className={styles.inputField} placeholder="E.g. Bachelor's, Master's, PhD" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="duration" className={styles.inputLabel}>Duration</label>
            <input
              id="duration"
              name="duration"
              type="text"
              value={newProgram.duration}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="e.g. 2 years"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.inputLabel}>Description</label>
            <textarea id="description" name="description" value={newProgram.description} onChange={handleChange} className={styles.inputField} placeholder="Enter program description"></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="tuition" className={styles.inputLabel}>Tuition Fee ($)</label>
            <input id="tuition" name="tuition" type="number" value={newProgram.tuition} onChange={handleChange} className={styles.inputField} placeholder="Enter tuition fee" />
          </div>

          <button className={styles.addProgramButton} onClick={handleAddProgram}>Add Program</button>
        </div>
      )}
    </div>
  );
}
