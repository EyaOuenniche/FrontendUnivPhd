import { ResearchLabFormData, ResearchPaper } from "./types";
import ResearchPaperForm from "@/app/CreateResearchPapers/components/ResearchPaperForm";

interface Step3ResearchPapersProps {
  formData: ResearchLabFormData;
  setFormData: (data: ResearchLabFormData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

function Step3ResearchPapers({ formData, setFormData, nextStep, prevStep }: Step3ResearchPapersProps) {
  return (
    <div>
      <h2>Research Papers</h2>
      <ResearchPaperForm
        embedded
        onSave={(paperData: ResearchPaper) =>
          setFormData({ ...formData, researchPapers: [...formData.researchPapers, paperData] })
        }
      />
      <ul>
        {formData.researchPapers.map((paper, index) => (
          <li key={index}>{paper.title}</li>
        ))}
      </ul>

      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default Step3ResearchPapers;
