import styles from "./Step1BasicInfo.module.css";
import { ResearchLabFormData } from "./types";
import { Stepper, Step, StepLabel } from "@mui/material"; 

interface Step1BasicInfoProps {
  formData: ResearchLabFormData;
  setFormData: (data: ResearchLabFormData) => void;
  nextStep: () => void;
}

const steps = ["Basic Info", "Research Teams", "Research Papers", "Review & Submit"]; 

function Step1BasicInfo({ formData, setFormData, nextStep }: Step1BasicInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
      
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <h2 className={styles.heading}>Basic Information & Contact</h2>

        <label className={styles.label}>Lab Name</label>
        <input
          type="text"
          placeholder="Enter lab name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={styles.input}
        />

        <label className={styles.label}>Description</label>
        <textarea
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`${styles.input} ${styles.textarea}`}
        />

        <label className={styles.label}>Affiliated Institution (Optional)</label>
        <input
          type="text"
          placeholder="Enter institution name"
          value={formData.affiliatedInstitution || ""}
          onChange={(e) => setFormData({ ...formData, affiliatedInstitution: e.target.value })}
          className={styles.input}
        />

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={formData.independent}
            onChange={(e) => setFormData({ ...formData, independent: e.target.checked })}
          />
          <span>Independent Lab</span>
        </div>

        <h3 className={styles.heading}>Location & Contact</h3>

        <label className={styles.label}>Location</label>
        <input
          type="text"
          placeholder="Enter location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className={styles.input}
        />

        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          className={styles.input}
        />

        <label className={styles.label}>Phone Number</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={formData.contactPhone || ""}
          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          className={styles.input}
        />

        <label className={styles.label}>Website</label>
        <input
          type="url"
          placeholder="Enter website"
          value={formData.website || ""}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className={styles.input}
        />

        <button onClick={nextStep} className={styles.button}>
          Next Step →
        </button>
      </div>
    </div>
  );
}

export default Step1BasicInfo;
