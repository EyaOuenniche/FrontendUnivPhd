"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Program, SubSpecialty, Course, Term } from "./types";
import styles from "./Step6.module.css";

interface Step6Props {
  universityInfo: {
    universityName: string;
    accreditation: string;
    establishedYear: string;
    location: string;
  };
  programs: Program[];
  subSpecialties: { [programId: string]: SubSpecialty[] };
  courses: { [subId: string]: Course[] };
  terms: { [subId: string]: Term[] };
}

export default function Step6Review({
  universityInfo,
  programs,
  subSpecialties,
  courses,
  terms,
}: Step6Props) {
  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.header}>
        🎓 Review Your University Profile
      </Typography>

     
      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>University Information</Typography>
        <Typography className={styles.text}><strong>Name:</strong> {universityInfo.universityName}</Typography>
        <Typography className={styles.text}><strong>Accreditation:</strong> {universityInfo.accreditation}</Typography>
        <Typography className={styles.text}><strong>Established Year:</strong> {universityInfo.establishedYear}</Typography>
        <Typography className={styles.text}><strong>Location:</strong> {universityInfo.location}</Typography>
      </Box>

      
      {programs.map((prog) => (
        <Box key={prog.id} className={styles.section}>
          <Typography className={styles.programName}>{prog.name}</Typography>

          {subSpecialties[prog.id]?.map((sub) => (
            <Box key={sub.id} className={styles.subSpecialtyCard}>
              <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>

             
              {courses[sub.id]?.length > 0 ? (
                <Box>
                  <Typography className={styles.sectionTitle}>Courses:</Typography>
                  <ul className={styles.courseList}>
                    {courses[sub.id].map((c) => (
                      <li key={c.id} className={styles.courseItem}>
                        <strong>{c.name}</strong> ({c.courseCode || "No Code"}) - {c.credits} Credits
                        {c.prerequisites.length > 0 && (
                          <span className={styles.prereqs}> [Prereqs: {c.prerequisites.join(", ")}]</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Box>
              ) : (
                <Typography className={styles.noItems}>No courses added.</Typography>
              )}

              
              {terms[sub.id]?.length > 0 ? (
                <Box>
                  <Typography className={styles.sectionTitle}>Terms & Assigned Courses:</Typography>
                  {terms[sub.id].map((t) => (
                    <Box key={t.id} className={styles.termCard}>
                      <Typography className={styles.termName}>{t.name}</Typography>
                      {t.startDate && t.endDate && (
                        <Typography className={styles.termDates}>({t.startDate} - {t.endDate})</Typography>
                      )}
                      
                      
                      {t.courses.length > 0 ? (
                        <ul className={styles.courseList}>
                          {t.courses.map((course) => (
                            <li key={course.id} className={styles.courseItem}>
                              <strong>{course.name}</strong> ({course.courseCode || "No Code"})  
                              - {course.credits} Credits
                              {course.prerequisites.length > 0 && (
                                <span className={styles.prereqs}> [Prereqs: {course.prerequisites.join(", ")}]</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography className={styles.noItems}>No courses assigned.</Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography className={styles.noItems}>No terms added.</Typography>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
