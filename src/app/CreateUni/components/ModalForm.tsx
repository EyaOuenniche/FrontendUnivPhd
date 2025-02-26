"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { Course, Term } from "../components/types";
import styles from "./Modal.module.css";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Course | Term) => void;
  type: "course" | "term";
}

export default function ModalForm({ open, onClose, onSave, type }: ModalFormProps) {
  const [formData, setFormData] = useState(
    type === "course"
      ? { name: "", courseCode: "", credits: 3, prerequisites: "" }
      : { name: "", startDate: "", endDate: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (type === "course") {
      const newCourse: Course = {
        id: String(Date.now()),
        name: formData.name.trim(),
        courseCode: (formData.courseCode ?? "").trim(),
        credits: Number(formData.credits),
        prerequisites: formData.prerequisites
          ? formData.prerequisites.split(",").map((p) => p.trim())
          : [],
      };
      onSave(newCourse);
    } else {
      const newTerm: Term = {
        id: String(Date.now()),
        name: formData.name.trim(),
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        courses: [], 
      };
      onSave(newTerm);
    }

    onClose();
    setFormData(type === "course"
      ? { name: "", courseCode: "", credits: 3, prerequisites: "" }
      : { name: "", startDate: "", endDate: "" }
    );
  };

  return (
    open && (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>{type === "course" ? "Add Course" : "Add Term"}</h2>
          <div className={styles.form}>
            <label>
              {type === "course" ? "Course Name" : "Term Name"}
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            {type === "course" ? (
              <>
                <label>
                  Course Code
                  <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} />
                </label>
                <label>
                  Credits
                  <input type="number" name="credits" value={formData.credits} onChange={handleChange} />
                </label>
                <label>
                  Prerequisites (comma-separated)
                  <input type="text" name="prerequisites" value={formData.prerequisites} onChange={handleChange} />
                </label>
              </>
            ) : (
              <>
                <label>
                  Start Date
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                </label>
                <label>
                  End Date
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                </label>
              </>
            )}
          </div>
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.save} onClick={handleSave} disabled={!formData.name.trim()}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}
  