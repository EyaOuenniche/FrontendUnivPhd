"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import { FormDataShape, Program, SubSpecialty, Course, Term } from "./types";
import Step1University from "./Step1Univ";
import Step2Programs from "./Step2Programs";
import Step3SubSpecialties from "./Step3SubSpecialities";
import Step4Courses from "./Step4Courses";
import Step5TermsMapping from "./Step5Terms";
import Step6Review from "./Step6Review";
import styles from "./StepperForm.module.css";


const steps = [
  "University General Information",
  "Programs",
  "Sub-Programs",
  "Courses",
  "Terms",
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


interface UniFormProps {
  editMode?: boolean;
  existingData?: FormDataShape;
  defaultStep?: number;
}

export default function UniForm({
  editMode = false,
  existingData,
  defaultStep = 0,
}: UniFormProps) {
  const router = useRouter();

  
  const [activeStep, setActiveStep] = useState<number>(defaultStep);

  
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

 
  useEffect(() => {
    if (existingData) {
      setUniversityInfo({
        universityName: existingData.universityName || "",
        accreditation: existingData.accreditation || "",
        establishedYear: existingData.establishedYear || "",
        location: existingData.location || "",
      });
      setPrograms(existingData.programs || []);
      // setSubSpecialties(existingData.subSpecialties || {});
      // setCourses(existingData.courses || {});
      // setTerms(existingData.terms || {});
    }
  }, [existingData]);

  
  const getFinalFormData = (): FormDataShape => ({
    ...universityInfo,
    programs: programs.map((prog) => ({
      ...prog,
      subSpecialties: subSpecialties[prog.id] || [],
    })),
  });

  
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    const finalData = getFinalFormData();

    if (editMode) {
      
      alert("Your info has been updated!");
      console.log("Updating existing data:", finalData);
    } else {
      
      alert("Your info has been created!");
      console.log("Creating new data:", finalData);
    }

   
    router.push("/universityProfile");
  };

  
  const StepComponent = stepComponents[activeStep];

  return (
    <div className={styles.stepperPage}>
      <div className={styles.stepperContainer}>
        <Typography sx={{ fontSize: "30px" }} className={styles.stepperTitle}>
          {editMode ? "Update University Info" : "Create Your University Profile"}
        </Typography>

        <div className={styles.stepperWrapper}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                fontSize: "18px",
                fontWeight: "600",
                color: "#2C3E50 !important",
              },
              "& .MuiStepIcon-root": {
                fontSize: "36px !important",
                color: "#0078D4 !important",
              },
              "& .MuiStepConnector-line": {
                borderColor: "#0078D4 !important",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {activeStep === steps.length ? (
          
          <Typography variant="h5" textAlign="center" color="success.main">
            🎉 Thank you! Your information has been{" "}
            {editMode ? "updated" : "submitted"}.
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

            
            <Box className={styles.stepperButtons}>
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                  onClick={handleSubmit}
                >
                  {editMode ? "Update" : "Submit"}
                </Button>
              )}
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
