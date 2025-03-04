"use client";

import { useState } from "react";
import { ResearchLabFormData } from "./types";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2ResearchTeams from "./Step2ResearchTeams";
import Step3ResearchPapers from "./Step3ResearchPapers";
import Step4ReviewSubmit from "./Step4Review";

function ResearchLabForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<ResearchLabFormData>({
    name: "",
    description: "",
    affiliatedInstitution: "",
    independent: false,
    location: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    researchTeams: [],
    researchPapers: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitForm = () => {
    console.log("Submitting Research Lab:", formData);
    // TODO: Add API call here to send `formData` to the backend.
  };

  return (
    <div>
      {/* <h1>Create Research Lab</h1>
      <p>Step {step} of 4</p> */}

      {step === 1 && <Step1BasicInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 2 && <Step2ResearchTeams formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3ResearchPapers formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <Step4ReviewSubmit formData={formData} prevStep={prevStep} submitForm={submitForm} />}
    </div>
  );
}

export default ResearchLabForm;
