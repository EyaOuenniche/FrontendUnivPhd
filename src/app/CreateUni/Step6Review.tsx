"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { FormDataShape } from "./types";
import styles from './Step6.module.css'; // Import CSS module for custom styles

/** STEP 6: REVIEW */
export default function Step6Review({
  formData,
}: {
  formData: FormDataShape;
}) {
  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.header}>
        Review All Data
      </Typography>
      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>University Information</Typography>
        <Typography className={styles.text}><strong>University:</strong> {formData.universityName}</Typography>
        <Typography className={styles.text}><strong>Accreditation:</strong> {formData.accreditation}</Typography>
        <Typography className={styles.text}><strong>Established:</strong> {formData.establishedYear} | <strong>Location:</strong> {formData.location}</Typography>
      </Box>

      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>Programs</Typography>
        {formData.programs.map((prog) => (
          <Box key={prog.id} className={styles.programCard}>
            <Typography className={styles.programName}>{prog.name}</Typography>
            <Typography className={styles.programDescription}><strong>Description:</strong> {prog.description}</Typography>
            <Typography className={styles.programDetail}><strong>Degree:</strong> {prog.degree}</Typography>
            <Typography className={styles.programDetail}><strong>Admission Requirement:</strong> {prog.admissionRequirement}</Typography>
            <Typography className={styles.programDetail}><strong>Application Procedure:</strong> {prog.applicationProcedure}</Typography>
            <Typography className={styles.programDetail}><strong>Tuition:</strong> {prog.tuition}</Typography>

            {prog.subSpecialties.map((sub) => (
              <Box key={sub.id} className={styles.subSpecialtyCard}>
                <Typography className={styles.subSpecialtyName}>{sub.name}</Typography>
                <Typography className={styles.subSpecialtyText}><strong>Courses:</strong></Typography>
                {sub.courses.map((c) => (
                  <Box key={c.id} className={styles.courseItem}>
                    <Typography>- {c.name} ({c.courseCode}, {c.credits} credits)</Typography>
                    {c.prerequisites.length > 0 && <Typography className={styles.prereqs}>[Prereqs: {c.prerequisites.join(", ")}]</Typography>}
                  </Box>
                ))}

                <Typography className={styles.subSpecialtyText}><strong>Terms:</strong></Typography>
                {sub.terms.map((t) => (
                  <Box key={t.id} className={styles.termCard}>
                    <Typography className={styles.termName}><strong>{t.name}</strong></Typography>
                    {t.startDate && t.endDate && (
                      <Typography className={styles.termDates}>{`${t.startDate} to ${t.endDate}`}</Typography>
                    )}
                    <Box className={styles.termCourses}>
                      <Typography><strong>Courses:</strong> {t.courses.length === 0 ? "None" : ""}</Typography>
                      {t.courses.map((cid) => {
                        const courseObj = sub.courses.find((cc) => cc.id === cid);
                        if (!courseObj) return null;
                        return (
                          <Box key={cid} className={styles.termCourseItem}>
                            <Typography>- {courseObj.name} ({courseObj.courseCode})</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
