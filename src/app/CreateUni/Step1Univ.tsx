"use client";
import React from "react";
import { FormDataShape } from "./types";
import styles from "./Step1Univ.module.css"; 

export default function Step1University({
  formData,
  setFormData,
}: {
  formData: FormDataShape;
  setFormData: React.Dispatch<React.SetStateAction<FormDataShape>>;
}) {
  return (
    <div className={styles.step1Container}>
      <h2 className={styles.title}>University Info</h2>

      <label htmlFor="universityName" className={styles.inputLabel}>
        University Name
      </label>
      <input
        id="universityName"
        type="text"
        value={formData.universityName}
        onChange={(e) =>
          setFormData({ ...formData, universityName: e.target.value })
        }
        className={styles.inputField}
      />

      <label htmlFor="accreditation" className={styles.inputLabel}>
        Accreditation
      </label>
      <input
        id="accreditation"
        type="text"
        value={formData.accreditation}
        onChange={(e) =>
          setFormData({ ...formData, accreditation: e.target.value })
        }
        className={styles.inputField}
      />

      <label htmlFor="establishedYear" className={styles.inputLabel}>
        Established Year
      </label>
      <input
        id="establishedYear"
        type="text"
        value={formData.establishedYear}
        onChange={(e) =>
          setFormData({ ...formData, establishedYear: e.target.value })
        }
        className={styles.inputField}
      />

      <label htmlFor="location" className={styles.inputLabel}>
        Location
      </label>
      <input
        id="location"
        type="text"
        value={formData.location}
        onChange={(e) =>
          setFormData({ ...formData, location: e.target.value })
        }
        className={styles.inputField}
      />
    </div>
  );
}
