import styles from "./Step2ResearchTeams.module.css";
import { ResearchLabFormData, ResearchTeam } from "./types";
import { Stepper, Step, StepLabel } from "@mui/material"; // Import MUI Stepper
import ResearchTeamForm from "../../CreateResearchTeam/components/ResearchTeamForm";

interface Step2ResearchTeamsProps {
  formData: ResearchLabFormData;
  setFormData: (data: ResearchLabFormData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const steps = ["Basic Info", "Research Teams", "Research Papers", "Review & Submit"]; // Stepper Labels

function Step2ResearchTeams({ formData, setFormData, nextStep, prevStep }: Step2ResearchTeamsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
       
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <h2 className={styles.heading}>Add Research Teams</h2>

        
        <ResearchTeamForm
          embedded
          onSave={(teamData: ResearchTeam) =>
            setFormData({ ...formData, researchTeams: [...formData.researchTeams, teamData] })
          }
        />

        
        <div className={styles.teamList}>
          {formData.researchTeams.length > 0 ? (
            formData.researchTeams.map((team, index) => (
              <div key={index} className={styles.teamCard}>
                <span><strong>{team.name}</strong> - {team.members.length} members</span>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "10px", color: "#6b7280" }}>No research teams added yet.</p>
          )}
        </div>

        <button onClick={prevStep} className={styles.button}>
           Back
        </button>
        <button onClick={nextStep} className={styles.button}>
          Next Step 
        </button>
      </div>
    </div>
  );
}

export default Step2ResearchTeams;
