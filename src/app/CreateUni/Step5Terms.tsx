"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField } from "@mui/material";

import { FormDataShape, Term } from "./types";

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
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    const newTerm: Term = {
      id: String(Date.now()),
      name: name.trim(),
      startDate,
      endDate,
      courses: [],
    };
    onSave(newTerm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Term</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Term Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** STEP 5: TERMS & MAPPING */
export default function Step5TermsMapping({
  formData,
  setFormData,
}: {
  formData: FormDataShape;
  setFormData: React.Dispatch<React.SetStateAction<FormDataShape>>;
}) {
  const [addTermOpen, setAddTermOpen] = useState(false);
  const [targetSubForTerm, setTargetSubForTerm] = useState<{
    programId: string;
    subId: string;
  } | null>(null);

  const handleSaveTerm = (term: Term) => {
    if (!targetSubForTerm) return;
    const { programId, subId } = targetSubForTerm;
    const updatedPrograms = formData.programs.map((p) => {
      if (p.id === programId) {
        return {
          ...p,
          subSpecialties: p.subSpecialties.map((s) => {
            if (s.id === subId) {
              return { ...s, terms: [...s.terms, term] };
            }
            return s;
          }),
        };
      }
      return p;
    });
    setFormData({ ...formData, programs: updatedPrograms });
  };

  const handleToggleCourseInTerm = (
    programId: string,
    subId: string,
    termId: string,
    courseId: string
  ) => {
    const updatedPrograms = formData.programs.map((p) => {
      if (p.id === programId) {
        return {
          ...p,
          subSpecialties: p.subSpecialties.map((s) => {
            if (s.id === subId) {
              return {
                ...s,
                terms: s.terms.map((t) => {
                  if (t.id === termId) {
                    let newCourses = [...t.courses];
                    const idx = newCourses.indexOf(courseId);
                    if (idx >= 0) {
                      newCourses.splice(idx, 1);
                    } else {
                      newCourses.push(courseId);
                    }
                    return { ...t, courses: newCourses };
                  }
                  return t;
                }),
              };
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
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Terms & Mapping
      </Typography>
      {formData.programs.map((prog) => (
        <Box key={prog.id} sx={{ border: "1px solid #ccc", mb: 2, p: 1 }}>
          <Typography variant="subtitle1">{prog.name}</Typography>

          {prog.subSpecialties.map((sub) => (
            <Box
              key={sub.id}
              sx={{
                ml: 2,
                p: 1,
                borderLeft: "4px solid #999",
                mb: 2,
              }}
            >
              <Typography>{sub.name}</Typography>

              {sub.terms.map((term) => (
                <Box key={term.id} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
                  <strong>
                    {term.name}{" "}
                    {term.startDate && term.endDate
                      ? (`${term.startDate} to ${term.endDate}`)
                      : ""}
                  </strong>
                  <Box sx={{ ml: 2 }}>
                    {sub.courses.map((course) => {
                      const isChecked = term.courses.includes(course.id);
                      return (
                        <Box key={course.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                handleToggleCourseInTerm(
                                  prog.id,
                                  sub.id,
                                  term.id,
                                  course.id
                                )
                              }
                            />
                            {course.name} ({course.courseCode})
                          </label>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}

              <Button
                variant="outlined"
                onClick={() => {
                  setTargetSubForTerm({ programId: prog.id, subId: sub.id });
                  setAddTermOpen(true);
                }}
              >
                Add Term
              </Button>
            </Box>
          ))}
        </Box>
      ))}

      <AddTermDialog
        open={addTermOpen}
        onClose={() => setAddTermOpen(false)}
        onSave={handleSaveTerm}
      />
    </Box>
  );
}

