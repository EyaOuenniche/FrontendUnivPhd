"use client";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Term, SubSpecialty, Course } from "./types";
import ModalForm from "./ModalForm"; 
import styles from "./Step5.module.css";

export default function Step5TermsMapping({
  programs,
  subSpecialties,
  terms,
  setTerms,
}: {
  programs: { id: string; name: string }[];
  subSpecialties: { [programId: string]: SubSpecialty[] };
  terms: { [subId: string]: Term[] };
  setTerms: React.Dispatch<React.SetStateAction<{ [subId: string]: Term[] }>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSubId, setTargetSubId] = useState<string | null>(null);

  const handleSaveTerm = (data: Course | Term) => {
    if (!("courseCode" in data)) { 
      setTerms((prev) => ({
        ...prev,
        [targetSubId!]: prev[targetSubId!] ? [...prev[targetSubId!], data] : [data],
      }));
    }
    setModalOpen(false);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.sectionTitle}>Terms & Course Mapping</Typography>

      {programs.map((prog) => (
        <Box key={prog.id} className={styles.programCard}>
          <Typography className={styles.programTitle}>{prog.name}</Typography>

          {subSpecialties[prog.id]?.map((sub) => (
            <Box key={sub.id} className={styles.subSpecialtyCard}>
              <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>
              <Button variant="contained" onClick={() => { setTargetSubId(sub.id); setModalOpen(true); }}>
                Add Term
              </Button>
            </Box>
          ))}
        </Box>
      ))}

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveTerm} type="term" />
    </Box>
  );
}
