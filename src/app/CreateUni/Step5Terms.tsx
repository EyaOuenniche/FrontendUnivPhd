"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Term, Course, SubSpecialty } from "./types";
import styles from "./Step5.module.css";

/** Dialog for Adding a Term */
function AddTermDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (term: Term) => void;
}) {
  const [termData, setTermData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermData({ ...termData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!termData.name.trim()) return;
    const newTerm: Term = {
      id: String(Date.now()),
      name: termData.name.trim(),
      startDate: termData.startDate || undefined,
      endDate: termData.endDate || undefined,
      courses: [],
    };

    onSave(newTerm);
    onClose();
    setTermData({ name: "", startDate: "", endDate: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Term</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Term Name" name="name" value={termData.name} onChange={handleChange} fullWidth />
        <TextField label="Start Date" name="startDate" type="date" value={termData.startDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        <TextField label="End Date" name="endDate" type="date" value={termData.endDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!termData.name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** STEP 5: TERMS & MAPPING */
export default function Step5TermsMapping({
  programs,
  subSpecialties,
  terms,
  setTerms,
  courses,
}: {
  programs: { id: string; name: string }[];
  subSpecialties: { [programId: string]: SubSpecialty[] };
  terms: { [subId: string]: Term[] };
  setTerms: React.Dispatch<React.SetStateAction<{ [subId: string]: Term[] }>>;
  courses: { [subId: string]: Course[] };
}) {
  const [addTermOpen, setAddTermOpen] = useState(false);
  const [targetSubId, setTargetSubId] = useState<string | null>(null);

  const handleSaveTerm = (term: Term) => {
    if (!targetSubId) return;
    setTerms((prev) => ({
      ...prev,
      [targetSubId]: prev[targetSubId] ? [...prev[targetSubId], term] : [term],
    }));
    setAddTermOpen(false);
  };

  const handleToggleCourseInTerm = (subId: string, termId: string, courseId: string) => {
    setTerms((prev) => ({
      ...prev,
      [subId]: prev[subId].map((t) => 
        t.id === termId ? { ...t, courses: t.courses.includes(courseId) ? t.courses.filter((id) => id !== courseId) : [...t.courses, courseId] } : t
      ),
    }));
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.sectionTitle}>
        Terms & Course Mapping
      </Typography>

      {programs.length === 0 ? (
        <Typography>No programs available. Please add a program first.</Typography>
      ) : (
        programs.map((prog) => (
          <Box key={prog.id} className={styles.programCard}>
            <Typography className={styles.programTitle}>{prog.name}</Typography>

            {!subSpecialties[prog.id] || subSpecialties[prog.id].length === 0 ? (
              <Typography>No sub-specialties available. Please add a sub-specialty first.</Typography>
            ) : (
              subSpecialties[prog.id].map((sub) => (
                <Box key={sub.id} className={styles.subSpecialtyCard}>
                  <Typography className={styles.subSpecialtyTitle}>{sub.name}</Typography>

                  {/* List Terms */}
                  {terms[sub.id] && terms[sub.id].length > 0 ? (
                    terms[sub.id].map((term) => (
                      <Box key={term.id} className={styles.termCard}>
                        <Typography className={styles.termTitle}>
                          {term.name} ({term.startDate} - {term.endDate})
                        </Typography>

                        {/* Course Selection */}
                        <Box>
                          {courses[sub.id]?.map((course) => (
                            <FormControlLabel
                              key={course.id}
                              control={
                                <Checkbox
                                  checked={term.courses.includes(course.id)}
                                  onChange={() => handleToggleCourseInTerm(sub.id, term.id, course.id)}
                                />
                              }
                              label={`${course.name} (${course.courseCode})`}
                            />
                          ))}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No terms added yet.</Typography>
                  )}

                  {/* Add Term Button */}
                  <Button
                    variant="contained"
                    className={styles.addTermButton}
                    onClick={() => {
                      setTargetSubId(sub.id);
                      setAddTermOpen(true);
                    }}
                  >
                    Add Term
                  </Button>
                </Box>
              ))
            )}
          </Box>
        ))
      )}

      {/* Term Dialog */}
      <AddTermDialog open={addTermOpen} onClose={() => setAddTermOpen(false)} onSave={handleSaveTerm} />
    </Box>
  );
}
