"use client";
import React from "react";
import styles from "./Step1Univ.module.css";

export default function Step1University({
  universityInfo,
  setUniversityInfo,
}: {
  universityInfo: {
    universityName: string;
    accreditation: string;
    establishedYear: string;
    location: string;
  };
  setUniversityInfo: React.Dispatch<
    React.SetStateAction<{
      universityName: string;
      accreditation: string;
      establishedYear: string;
      location: string;
    }>
  >;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUniversityInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.step1Container}>
      <h2 className={styles.title}>University Info</h2>

      <label htmlFor="universityName" className={styles.inputLabel}>
        University Name
      </label>
      <input
        id="universityName"
        name="universityName"
        type="text"
        value={universityInfo.universityName}
        onChange={handleChange}
        className={styles.inputField}
      />

      <label htmlFor="accreditation" className={styles.inputLabel}>
        Accreditation
      </label>
      <input
        id="accreditation"
        name="accreditation"
        type="text"
        value={universityInfo.accreditation}
        onChange={handleChange}
        className={styles.inputField}
      />

      <label htmlFor="establishedYear" className={styles.inputLabel}>
        Established Year
      </label>
      <input
        id="establishedYear"
        name="establishedYear"
        type="text"
        value={universityInfo.establishedYear}
        onChange={handleChange}
        className={styles.inputField}
      />

      <label htmlFor="location" className={styles.inputLabel}>
        Location
      </label>
      <input
        id="location"
        name="location"
        type="text"
        value={universityInfo.location}
        onChange={handleChange}
        className={styles.inputField}
      />
    </div>
  );
}
