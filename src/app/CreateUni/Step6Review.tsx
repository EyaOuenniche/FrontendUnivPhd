"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { FormDataShape } from "./types";
import styles from "./Step6.module.css";

export default function Step6Review({
  universityInfo,
  programs,
  subSpecialties,
  courses,
  terms,
}: {
  universityInfo: {
    universityName: string;
    accreditation: string;
    establishedYear: string;
    location: string;
  };
  programs: { id: string; name: string }[];
  subSpecialties: { [programId: string]: { id: string; name: string }[] };
  courses: { [subId: string]: { id: string; name: string; courseCode: string; credits: number; prerequisites: string[] }[] };
  terms: { [subId: string]: { id: string; name: string; startDate?: string; endDate?: string; courses: string[] }[] };
}) {
  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.header}>
        Review Your University Profile
      </Typography>

      {/* University Info Section */}
      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>University Information</Typography>
        <Typography className={styles.text}><strong>Name:</strong> {universityInfo.universityName}</Typography>
        <Typography className={styles.text}><strong>Accreditation:</strong> {universityInfo.accreditation}</Typography>
        <Typography className={styles.text}><strong>Established Year:</strong> {universityInfo.establishedYear}</Typography>
        <Typography className={styles.text}><strong>Location:</strong> {universityInfo.location}</Typography>
      </Box>

      {/* Programs Section */}
      <Box className={styles.section}>
        <Typography className={styles.sectionTitle}>Programs</Typography>
        {programs.length === 0 ? (
          <Typography>No programs added yet.</Typography>
        ) : (
          programs.map((prog) => (
            <Box key={prog.id} className={styles.programCard}>
              <Typography className={styles.programName}>{prog.name}</Typography>

              {/* Sub-Specialties */}
              {subSpecialties[prog.id]?.length > 0 ? (
                subSpecialties[prog.id].map((sub) => (
                  <Box key={sub.id} className={styles.subSpecialtyCard}>
                    <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>

                    {/* Courses */}
                    {courses[sub.id]?.length > 0 ? (
                      <Box className={styles.courseList}>
                        <Typography className={styles.subSpecialtyText}><strong>Courses:</strong></Typography>
                        {courses[sub.id].map((c) => (
                          <Typography key={c.id} className={styles.courseItem}>
                            - {c.name} ({c.courseCode}, {c.credits} credits) 
                            {c.prerequisites.length > 0 && (
                              <em className={styles.prereqs}> [Prereqs: {c.prerequisites.join(", ")}]</em>
                            )}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      <Typography>No courses added.</Typography>
                    )}

                    {/* Terms & Course Mapping */}
                    {terms[sub.id]?.length > 0 ? (
                      <Box className={styles.termList}>
                        <Typography className={styles.subSpecialtyText}><strong>Terms:</strong></Typography>
                        {terms[sub.id].map((t) => (
                          <Box key={t.id} className={styles.termCard}>
                            <Typography className={styles.termName}><strong>{t.name}</strong></Typography>
                            {t.startDate && t.endDate && (
                              <Typography className={styles.termDates}>({t.startDate} - {t.endDate})</Typography>
                            )}
                            <Box className={styles.termCourses}>
                              {t.courses.length > 0 ? (
                                t.courses.map((cid) => {
                                  const courseObj = courses[sub.id].find((cc) => cc.id === cid);
                                  return courseObj ? (
                                    <Typography key={cid} className={styles.termCourseItem}>
                                      - {courseObj.name} ({courseObj.courseCode})
                                    </Typography>
                                  ) : null;
                                })
                              ) : (
                                <Typography>No courses assigned.</Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography>No terms added.</Typography>
                    )}
                  </Box>
                ))
              ) : (
                <Typography>No sub-specialties added.</Typography>
              )}
            </Box>
          ))
        )}
      </Box>

     
    </Box>
  );
}
