"use client";
import React, { useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import { FormDataShape, Program, SubSpecialty, Course, Term } from "./types";

import Step1University from "./Step1Univ";
import Step2Programs from "./Step2Programs";
import Step3SubSpecialties from "./Step3SubSpecialities";
import Step4Courses from "./Step4Courses";
import Step5TermsMapping from "./Step5Terms";
import Step6Review from "./Step6Review";

const steps = [
  "University Info",
  "Programs",
  "Sub-Specialties",
  "Courses",
  "Terms & Mapping",
  "Review",
];

const stepComponents = [
  Step1University,
  Step2Programs,
  Step3SubSpecialties,
  Step4Courses,
  Step5TermsMapping,
  Step6Review,
];

export default function MultiStepWizard() {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Split state into smaller, step-specific states
  const [universityInfo, setUniversityInfo] = useState({
    universityName: "",
    accreditation: "",
    establishedYear: "",
    location: "",
  });

  const [programs, setPrograms] = useState<Program[]>([]);
  const [subSpecialties, setSubSpecialties] = useState<{ [key: string]: SubSpecialty[] }>({});
  const [courses, setCourses] = useState<{ [key: string]: Course[] }>({});
  const [terms, setTerms] = useState<{ [key: string]: Term[] }>({});

  // Function to get the complete data before submission
  const getFinalFormData = (): FormDataShape => ({
    ...universityInfo,
    programs: programs.map((program) => ({
      ...program,
      subSpecialties: subSpecialties[program.id] || [],
    })),
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    const finalData = getFinalFormData();
    console.log("Submitted Data:", finalData);
    setActiveStep((prev) => prev + 1);
  };

  const StepComponent = stepComponents[activeStep];

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, padding: 3 }}>
      <Typography variant="h4" textAlign="center" mb={4} fontWeight="600" color="#2C3E50">
        Create your University Profile
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel StepIconProps={{ style: { color: activeStep >= index ? "#3498db" : "#bbb" } }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: "500", color: "#2ECC71" }}>
          Thank you! Your information has been submitted.
        </Typography>
      ) : (
        <>
          <StepComponent
            universityInfo={universityInfo}
            setUniversityInfo={setUniversityInfo}
            programs={programs}
            setPrograms={setPrograms}
            subSpecialties={subSpecialties}
            setSubSpecialties={setSubSpecialties}
            courses={courses}
            setCourses={setCourses}
            terms={terms}
            setTerms={setTerms}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outlined"
                sx={{ fontWeight: "bold", padding: "8px 16px", borderRadius: 3, textTransform: "none" }}
              >
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  fontWeight: "bold",
                  padding: "8px 16px",
                  borderRadius: 3,
                  backgroundColor: "#3498db",
                  ":hover": { backgroundColor: "#2980b9" },
                  textTransform: "none",
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  fontWeight: "bold",
                  padding: "8px 16px",
                  borderRadius: 3,
                  backgroundColor: "#2ECC71",
                  ":hover": { backgroundColor: "#27AE60" },
                  textTransform: "none",
                }}
              >
                Submit
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
