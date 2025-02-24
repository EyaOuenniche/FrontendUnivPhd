"use client";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Course, SubSpecialty, Term } from "./types";
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

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.sectionTitle}>Courses</Typography>

      {programs.map((prog) => (
        <Box key={prog.id} className={styles.programCard}>
          <Typography className={styles.programTitle}>{prog.name}</Typography>

          {subSpecialties[prog.id]?.map((sub) => (
            <Box key={sub.id} className={styles.subSpecialtyCard}>
              <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>
              <Button variant="contained" onClick={() => { setTargetSubId(sub.id); setModalOpen(true); }}>
                Add Course
              </Button>
            </Box>
          ))}
        </Box>
      ))}

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveCourse} type="course" />
    </Box>
  );
}
