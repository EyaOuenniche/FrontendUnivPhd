"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { FormDataShape, Course } from "./types";
import styles from './Step4.module.css'; // Import CSS module

/** Dialog for adding a Course */
function AddCourseDialog({
  open,
  onClose,
  onSave,
  existingCourses,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  existingCourses: Course[];
}) {
  const [name, setName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credits, setCredits] = useState<number>(3);
  const [prereqs, setPrereqs] = useState<string>("");

  const handleSave = () => {
    if (!name.trim() || !courseCode.trim()) return;
    const newCourse: Course = {
      id: String(Date.now()),
      name: name.trim(),
      courseCode: courseCode.trim(),
      credits,
      prerequisites: prereqs
        ? prereqs.split(",").map((prereq) => prereq.trim())
        : [],
    };
    onSave(newCourse);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          className={styles.inputField}
        />
        <TextField
          label="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          fullWidth
          className={styles.inputField}
        />
        <TextField
          label="Credits"
          type="number"
          value={credits}
          onChange={(e) => setCredits(+e.target.value)}
          fullWidth
          className={styles.inputField}
        />
        <TextField
          label="Prerequisites (comma-separated)"
          value={prereqs}
          onChange={(e) => setPrereqs(e.target.value)}
          fullWidth
          className={styles.inputField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!name.trim() || !courseCode.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** STEP 4: COURSES */
export default function Step4Courses({
  formData,
  setFormData,
}: {
  formData: FormDataShape;
  setFormData: React.Dispatch<React.SetStateAction<FormDataShape>>;
}) {
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [targetSub, setTargetSub] = useState<{ programId: string; subId: string } | null>(null);

  const handleSaveCourse = (course: Course) => {
    if (!targetSub) return;
    const { programId, subId } = targetSub;
    const updatedPrograms = formData.programs.map((p) => {
      if (p.id === programId) {
        return {
          ...p,
          subSpecialties: p.subSpecialties.map((s) => {
            if (s.id === subId) {
              return { ...s, courses: [...s.courses, course] };
            }
            return s;
          }),
        };
      }
      return p;
    });
    setFormData({ ...formData, programs: updatedPrograms });
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Courses (with credits, codes, prerequisites)
      </Typography>
      {formData.programs.map((prog) => (
        <Box key={prog.id} className={styles.programCard}>
          <Typography className={styles.programTitle}>{prog.name}</Typography>
          {prog.subSpecialties.map((sub) => (
            <Box key={sub.id} className={styles.subSpecialtyCard}>
              <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>
              <ul className={styles.courseList}>
                {sub.courses.map((c) => (
                  <li key={c.id} className={styles.courseItem}>
                    {c.name} ({c.courseCode}, {c.credits} credits)
                    {c.prerequisites.length > 0 && (
                      <em className={styles.coursePrereqs}>
                        | Prereqs: {c.prerequisites.join(", ")}
                      </em>
                    )}
                  </li>
                ))}
              </ul>
              <Button
                variant="outlined"
                className={styles.addCourseButton}
                onClick={() => {
                  setTargetSub({ programId: prog.id, subId: sub.id });
                  setAddCourseOpen(true);
                }}
              >
                Add Course
              </Button>
            </Box>
          ))}
        </Box>
      ))}
      <AddCourseDialog
        open={addCourseOpen}
        onClose={() => setAddCourseOpen(false)}
        onSave={handleSaveCourse}
        existingCourses={
          targetSub
            ? formData.programs
                .find((p) => p.id === targetSub.programId)
                ?.subSpecialties.find((s) => s.id === targetSub.subId)
                ?.courses || []
            : []
        }
      />
    </Box>
  );
}
