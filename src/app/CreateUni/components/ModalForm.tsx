"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { Course, Term } from "../components/types";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Course | Term) => void;
  type: "course" | "term";
}

export default function ModalForm({ open, onClose, onSave, type }: ModalFormProps) {
  const [formData, setFormData] = useState(
    type === "course"
      ? { name: "", courseCode: "", credits: 3, prerequisites: "" }
      : { name: "", startDate: "", endDate: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (type === "course") {
      const newCourse: Course = {
        id: String(Date.now()),
        name: formData.name.trim(),
        courseCode: (formData.courseCode ?? "").trim(),
        credits: Number(formData.credits),
        prerequisites: formData.prerequisites
          ? formData.prerequisites.split(",").map((p) => p.trim())
          : [],
      };
      onSave(newCourse);
    } else {
      const newTerm: Term = {
        id: String(Date.now()),
        name: formData.name.trim(),
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        courses: [],
      };
      onSave(newTerm);
    }

    onClose();
    setFormData(type === "course"
      ? { name: "", courseCode: "", credits: 3, prerequisites: "" }
      : { name: "", startDate: "", endDate: "" }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{type === "course" ? "Add Course" : "Add Term"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label={type === "course" ? "Course Name" : "Term Name"} name="name" value={formData.name} onChange={handleChange} fullWidth />
        
        {type === "course" ? (
          <>
            <TextField label="Course Code" name="courseCode" value={formData.courseCode ?? ""} onChange={handleChange} fullWidth />
            <TextField label="Credits" name="credits" type="number" value={formData.credits} onChange={handleChange} fullWidth />
            <TextField label="Prerequisites (comma-separated)" name="prerequisites" value={formData.prerequisites ?? ""} onChange={handleChange} fullWidth />
          </>
        ) : (
          <>
            <TextField label="Start Date" name="startDate" type="date" value={formData.startDate ?? ""} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="End Date" name="endDate" type="date" value={formData.endDate ?? ""} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!formData.name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
