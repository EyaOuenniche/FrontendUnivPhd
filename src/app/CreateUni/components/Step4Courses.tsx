"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Course, SubSpecialty, Term } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalForm from "./ModalForm"; 
import styles from "./Step4.module.css";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSubId, setTargetSubId] = useState<string | null>(null);

  const handleSaveCourse = (data: Course | Term) => {
    if ("courseCode" in data) { 
      setCourses((prev) => ({
        ...prev,
        [targetSubId!]: prev[targetSubId!] ? [...prev[targetSubId!], data] : [data],
      }));
    }
    setModalOpen(false);
  };

  const handleDeleteCourse = (subId: string, courseId: string) => {
    setCourses((prev) => ({
      ...prev,
      [subId]: prev[subId].filter((c) => c.id !== courseId),
    }));
  };

  return (
    <Box className={styles.container}>
      {programs.map((prog) => (
        <Box key={prog.id} className={styles.programCard}>
          <Typography  sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "12px",
            color: "#003366",
          }}

          className={styles.programTitle}>{prog.name}</Typography>

          {subSpecialties[prog.id]?.map((sub) => (
            <Box key={sub.id} className={styles.subSpecialtyCard}>
              <Typography sx={{
                 fontSize: "1.1rem",
                 fontWeight: "bold",
                 marginBottom: "10px",
                 color: "#004080",
                 }}
                 >{sub.name}</Typography>

             
              <div className={styles.courseList}>
                {courses[sub.id]?.map((course) => (
            <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseContent}>
              <p className={styles.courseTitle}>{course.name}</p>
              
              
              <p className={styles.courseCode}><strong>Code:</strong> {course.courseCode}</p>
          
           
              <p className={styles.courseCredits}><strong>Credits:</strong> {course.credits}</p>
          
              
              {course.prerequisites && course.prerequisites.length > 0 ? (
                <p className={styles.coursePrerequisites}>
                  <strong>Prerequisites:</strong> {course.prerequisites.join(", ")}
                </p>
              ) : (
                <p className={styles.coursePrerequisites}><strong>Prerequisites:</strong> None</p>
              )}
            </div>
          
            <IconButton
              onClick={() => handleDeleteCourse(sub.id, course.id)}
              color="error"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          
               
                ))}
              </div>

              <button
                className={styles.addButton}
                onClick={() => {
                  setTargetSubId(sub.id);
                  setModalOpen(true);
                }}
              >
                + Add Course
              </button>
            </Box>
          ))}
        </Box>
      ))}

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveCourse} type="course" />
    </Box>
  );
}
