"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Course, SubSpecialty } from "./types";
import styles from "./Step4.module.css";

/** Dialog for adding a Course */
function AddCourseDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
}) {
  const [courseData, setCourseData] = useState({
    name: "",
    courseCode: "",
    credits: 3,
    prerequisites: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!courseData.name.trim() || !courseData.courseCode.trim()) return;
    const newCourse: Course = {
      id: String(Date.now()),
      name: courseData.name.trim(),
      courseCode: courseData.courseCode.trim(),
      credits: Number(courseData.credits),
      prerequisites: courseData.prerequisites
        ? courseData.prerequisites.split(",").map((p) => p.trim())
        : [],
    };

    onSave(newCourse);
    onClose();
    setCourseData({ name: "", courseCode: "", credits: 3, prerequisites: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Course Name" name="name" value={courseData.name} onChange={handleChange} fullWidth />
        <TextField label="Course Code" name="courseCode" value={courseData.courseCode} onChange={handleChange} fullWidth />
        <TextField label="Credits" name="credits" type="number" value={courseData.credits} onChange={handleChange} fullWidth />
        <TextField
          label="Prerequisites (comma-separated)"
          name="prerequisites"
          value={courseData.prerequisites}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!courseData.name.trim() || !courseData.courseCode.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** STEP 4: COURSES */
export default function Step4Courses({
  programs,
  subSpecialties,
  courses,
  setCourses,
}: {
  programs: { id: string; name: string }[];
  subSpecialties: { [programId: string]: SubSpecialty[] };
  courses: { [subId: string]: Course[] };
  setCourses: React.Dispatch<React.SetStateAction<{ [subId: string]: Course[] }>>;
}) {
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [targetSubId, setTargetSubId] = useState<string | null>(null);

  const handleSaveCourse = (course: Course) => {
    if (!targetSubId) return;
    setCourses((prev) => ({
      ...prev,
      [targetSubId]: prev[targetSubId] ? [...prev[targetSubId], course] : [course],
    }));
    setAddCourseOpen(false);
  };

  console.log("Programs:", programs);
  console.log("SubSpecialties:", subSpecialties);

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.sectionTitle}>
        Courses
      </Typography>

      {programs.length === 0 ? (
        <Typography>No programs available. Please add a program first.</Typography>
      ) : (
        programs.map((prog) => (
          <Box key={prog.id} className={styles.programCard}>
            <Typography className={styles.programTitle}>{prog.name}</Typography>

            {/* 🔹 FIX: Fetch sub-specialties from `subSpecialties` state */}
            {!subSpecialties[prog.id] || subSpecialties[prog.id].length === 0 ? (
              <Typography>No sub-specialties found. Please add a sub-specialty first.</Typography>
            ) : (
              subSpecialties[prog.id].map((sub) => (
                <Box key={sub.id} className={styles.subSpecialtyCard}>
                  <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>

                  {/* List Courses */}
                  {courses[sub.id] && courses[sub.id].length > 0 ? (
                    <ul className={styles.courseList}>
                      {courses[sub.id].map((c) => (
                        <li key={c.id} className={styles.courseItem}>
                          {c.name} ({c.courseCode}, {c.credits} credits)
                          {c.prerequisites.length > 0 && (
                            <em className={styles.coursePrereqs}> | Prereqs: {c.prerequisites.join(", ")}</em>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography>No courses added yet.</Typography>
                  )}

                  {/* Add Course Button */}
                  <Button
                    variant="contained"
                    className={styles.addCourseButton}
                    onClick={() => {
                      setTargetSubId(sub.id);
                      setAddCourseOpen(true);
                    }}
                  >
                    Add Course
                  </Button>
                </Box>
              ))
            )}
          </Box>
        ))
      )}

      {/* Course Dialog */}
      <AddCourseDialog open={addCourseOpen} onClose={() => setAddCourseOpen(false)} onSave={handleSaveCourse} />
    </Box>
  );
}
