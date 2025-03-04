import { ResearchLabFormData, ResearchTeam } from "./types";
import ResearchTeamForm from "../../CreateResearchTeam/components/ResearchTeamForm";

interface Step2ResearchTeamsProps {
  formData: ResearchLabFormData;
  setFormData: (data: ResearchLabFormData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

function Step2ResearchTeams({ formData, setFormData, nextStep, prevStep }: Step2ResearchTeamsProps) {
  return (
    <div>
      <h2>Research Teams</h2>
      <ResearchTeamForm
        embedded
        onSave={(teamData: ResearchTeam) =>
          setFormData({ ...formData, researchTeams: [...formData.researchTeams, teamData] })
        }
      />
      <ul>
        {formData.researchTeams.map((team, index) => (
          <li key={index}>{team.name}</li>
        ))}
      </ul>

      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default Step2ResearchTeams;
