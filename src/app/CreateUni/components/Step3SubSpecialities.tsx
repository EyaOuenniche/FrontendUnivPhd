"use client";
import React, { useState } from "react";
import { SubSpecialty } from "./types";
import styles from "./Step3.module.css";

export default function Step3SubSpecialties({
  programs,
  subSpecialties,
  setSubSpecialties,
}: {
  programs: { id: string; name: string }[];
  subSpecialties: { [programId: string]: SubSpecialty[] };
  setSubSpecialties: React.Dispatch<React.SetStateAction<{ [programId: string]: SubSpecialty[] }>>;
}) {
  const [newSubSpecialty, setNewSubSpecialty] = useState<{ [programId: string]: string }>({});

  const handleAddSubSpecialty = (programId: string) => {
    const subName = newSubSpecialty[programId]?.trim();
    if (!subName) return;

    const newSub: SubSpecialty = {
      id: String(Date.now()),
      name: subName,
      courses: [],
      terms: [],
    };

    setSubSpecialties((prev) => ({
      ...prev,
      [programId]: prev[programId] ? [newSub, ...prev[programId]] : [newSub],
    }));

    setNewSubSpecialty((prev) => ({ ...prev, [programId]: "" }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sub-Specialties</h2>

      {programs.map((prog) => (
        <div key={prog.id} className={styles.programCard}>
          <h3 className={styles.programName}>{prog.name}</h3>

          {/* Display Existing Sub-Specialties */}
          <div className={styles.subSpecialtiesList}>
            {subSpecialties[prog.id]?.map((sub) => (
              <div key={sub.id} className={styles.subSpecialtyItem}>
                - {sub.name}
              </div>
            ))}
          </div>

          {/* Add New Sub-Specialty */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter Sub-Specialty Name"
              value={newSubSpecialty[prog.id] || ""}
              onChange={(e) =>
                setNewSubSpecialty({ ...newSubSpecialty, [prog.id]: e.target.value })
              }
              className={styles.input}
            />
            <button className={styles.addButton} onClick={() => handleAddSubSpecialty(prog.id)}>
              <span className={styles.buttonText}>+</span> Add Sub-Specialty
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
