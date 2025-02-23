"use client";
import React, { useState } from "react";
import { FormDataShape, SubSpecialty } from "./types";
import styles from "./Step3.module.css"; 


export default function Step3SubSpecialties({
  formData,
  setFormData,
}: {
  formData: FormDataShape;
  setFormData: React.Dispatch<React.SetStateAction<FormDataShape>>;
}) {
 
  const [subNames, setSubNames] = useState<{ [programId: string]: string }>({});

  const handleAddSubSpecialty = (programId: string) => {
    const subName = (subNames[programId] || "").trim();
    if (!subName) return;

    const updatedPrograms = formData.programs.map((p) => {
      if (p.id === programId) {
        const newSub: SubSpecialty = {
          id: String(Date.now()),
          name: subName,
          courses: [],
          terms: [],
        };
        return { ...p, subSpecialties: [newSub, ...p.subSpecialties] }; 
      }
      return p;
    });
    setFormData({ ...formData, programs: updatedPrograms });

    
    setSubNames({ ...subNames, [programId]: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sub-Specialties</h2>
      {formData.programs.map((prog) => (
        <div key={prog.id} className={styles.programCard}>
          <h3 className={styles.programName}>{prog.name}</h3>

          
          <div className={styles.subSpecialtiesList}>
            {prog.subSpecialties.map((sub) => (
              <div key={sub.id} className={styles.subSpecialtyItem}>
                - {sub.name}
              </div>
            ))}
          </div>

         
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter Sub-Specialty Name"
              value={subNames[prog.id] || ""}
              onChange={(e) =>
                setSubNames({ ...subNames, [prog.id]: e.target.value })
              }
              className={styles.input}
            />
            <button
              className={styles.addButton}
              onClick={() => handleAddSubSpecialty(prog.id)}
            >
              <span className={styles.buttonText}>+</span> Add Sub-Specialty
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
