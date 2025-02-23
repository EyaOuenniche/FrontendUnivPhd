"use client";
import React, { useState } from "react";
import { FormDataShape, Program } from "./types";
import styles from "./Step2.module.css"; 


export default function Step2Programs({
  formData,
  setFormData,
}: {
  formData: FormDataShape;
  setFormData: React.Dispatch<React.SetStateAction<FormDataShape>>;
}) {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [degree, setDegree] = useState("");
  const [admissionRequirement, setAdmissionRequirement] = useState("");
  const [applicationProcedure, setApplicationProcedure] = useState("");
  const [tuition, setTuition] = useState<number>(0);

 
  const [showForm, setShowForm] = useState(formData.programs.length === 0);

  
  const handleAddProgram = () => {
    if (!name.trim()) return; 

    const newProgram: Program = {
      id: String(Date.now()),
      name: name.trim(),
      description: description.trim(),
      degree: degree.trim(),
      admissionRequirement: admissionRequirement.trim(),
      applicationProcedure: applicationProcedure.trim(),
      tuition,
      subSpecialties: [],
    };

    setFormData({
      ...formData,
      programs: [newProgram, ...formData.programs], 
    });

    
    setName("");
    setDescription("");
    setDegree("");
    setAdmissionRequirement("");
    setApplicationProcedure("");
    setTuition(0);
    setShowForm(false); 
  };

  return (
    <div className={styles["step2-container"]}>
      <h2 className={styles.title}>Programs</h2>

      
      {formData.programs.length > 0 && (
        <div className={styles["program-grid"]}>
          {formData.programs.map((prog) => (
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

      
      {showForm && (
        <div className={styles["input-container"]}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Program Name"
            className={styles["input-field"]}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={styles["input-field"]}
          />

          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Degree (e.g. Bachelor's)"
            className={styles["input-field"]}
          />

          <textarea
            value={admissionRequirement}
            onChange={(e) => setAdmissionRequirement(e.target.value)}
            placeholder="Admission Requirement"
            className={styles["input-field"]}
          />

          <textarea
            value={applicationProcedure}
            onChange={(e) => setApplicationProcedure(e.target.value)}
            placeholder="Application Procedure"
            className={styles["input-field"]}
          />

          <input
            type="number"
            value={tuition}
            onChange={(e) => setTuition(+e.target.value)}
            placeholder="Tuition"
            className={styles["input-field"]}
          />

          <button className={styles["add-program-btn"]} onClick={handleAddProgram}>
            Add Program
          </button>
        </div>
      )}

     
      {formData.programs.length > 0 && !showForm && (
        <button className={styles["toggle-form-btn"]} onClick={() => setShowForm(true)}>
          Add Another Program
        </button>
      )}
    </div>
  );
}
