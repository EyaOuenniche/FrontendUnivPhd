"use client";
import React, { useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { FormDataShape, Program, SubSpecialty, Course, Term } from "./components/types";

import Step1University from "./components/Step1Univ";
import Step2Programs from "./components/Step2Programs";
import Step3SubSpecialties from "./components/Step3SubSpecialities";
import Step4Courses from "./components/Step4Courses";
import Step5TermsMapping from "./components/Step5Terms";
import Step6Review from "./components/Step6Review";
import styles from "./StepperForm.module.css";

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

export default function UniForm() {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Split state for better performance
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

  // Function to get final data
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
    <div className={styles.stepperPage}>
      <div className={styles.stepperContainer}>
        <Typography className={styles.stepperTitle}>
          Create Your University Profile
        </Typography>

        {/* Improved Stepper Layout */}
        <div className={styles.stepperWrapper}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel
                  StepIconProps={{
                    style: {
                      color: activeStep >= index ? "#0078D4" : "#ddd",
                      transition: "color 0.3s ease-in-out",
                    },
                  }}
                  className={styles.stepperLabel}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Step Content */}
        {activeStep === steps.length ? (
          <Typography variant="h5" textAlign="center" color="success.main">
            🎉 Thank you! Your information has been submitted.
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

            {/* Navigation Buttons */}
            <Box className={styles.stepperButtons}>
              {activeStep > 0 && (
                <button className={styles.secondaryButton} onClick={handleBack}>
                  Back
                </button>
              )}
              {activeStep < steps.length - 1 ? (
                <button className={styles.primaryButton} onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button className={styles.primaryButton} onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
