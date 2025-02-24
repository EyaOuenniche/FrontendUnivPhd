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
  setSubSpecialties: React.Dispatch<
    React.SetStateAction<{ [programId: string]: SubSpecialty[] }>
  >;
}) {
  const [newSubSpecialty, setNewSubSpecialty] = useState<{ [programId: string]: string }>({});
  const [showForm, setShowForm] = useState<{ [programId: string]: boolean }>({});

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
    setShowForm((prev) => ({ ...prev, [programId]: false })); 
  };

  return (
    <div className={styles.step3Container}>
      {programs.map((prog) => (
        <div key={prog.id} className={styles.programCard}>
          <h3 className={styles.programTitle}>{prog.name}</h3>

          
          <div className={styles.subSpecialtiesList}>
            {subSpecialties[prog.id]?.map((sub) => (
              <div key={sub.id} className={styles.subSpecialtyBox}>
                <span>{sub.name}</span>
              </div>
            ))}
          </div>

          {subSpecialties[prog.id]?.length > 0 && !showForm[prog.id] ? (
            <button
              className={styles.addButton}
              onClick={() => setShowForm((prev) => ({ ...prev, [prog.id]: true }))}
            >
              + Add Sub-Specialty
            </button>
          ) : (
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter Sub-Specialty Name"
                value={newSubSpecialty[prog.id] || ""}
                onChange={(e) =>
                  setNewSubSpecialty({ ...newSubSpecialty, [prog.id]: e.target.value })
                }
                className={styles.inputField}
              />
              <button className={styles.confirmButton} onClick={() => handleAddSubSpecialty(prog.id)}>
                Add
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
