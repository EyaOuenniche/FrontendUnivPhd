"use client";
import React, { useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import { FormDataShape } from "./types";

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

export default function MultiStepWizard() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataShape>({
    universityName: "",
    accreditation: "",
    establishedYear: "",
    location: "",
    programs: [],
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    setActiveStep((prev) => prev + 1); 
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <Step1University formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2Programs formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3SubSpecialties formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step4Courses formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step5TermsMapping formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step6Review formData={formData} />;
      default:
        return <div style={{color:"red"}}> Unknown Step</div>
    }
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, padding: 3 }}>
      <Typography variant="h4" textAlign="center" mb={4} fontWeight="600" color="#2C3E50">
       Create your University Profile
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ fontWeight: "bold", color: "#3498db" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: "500", color: "#2ECC71" }}>
          Thank you! Your information has been submitted.
        </Typography>
      ) : (
        <>
          {getStepContent(activeStep)}

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
                sx={{ fontWeight: "bold", padding: "8px 16px", borderRadius: 3, backgroundColor: "#3498db", textTransform: "none" }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ fontWeight: "bold", padding: "8px 16px", borderRadius: 3, backgroundColor: "#2ECC71", textTransform: "none" }}
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
