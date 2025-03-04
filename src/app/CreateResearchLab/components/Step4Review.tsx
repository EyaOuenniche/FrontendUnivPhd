import { ResearchLabFormData } from "./types";

interface Step4ReviewSubmitProps {
  formData: ResearchLabFormData;
  prevStep: () => void;
  submitForm: () => void;
}

function Step4ReviewSubmit({ formData, prevStep, submitForm }: Step4ReviewSubmitProps) {
  return (
    <div>
      <h2>Review & Submit</h2>
      
      <h3>Basic Information</h3>
      <p><strong>Lab Name:</strong> {formData.name}</p>
      <p><strong>Description:</strong> {formData.description}</p>
      <p><strong>Affiliated Institution:</strong> {formData.affiliatedInstitution || "None"}</p>
      <p><strong>Independent:</strong> {formData.independent ? "Yes" : "No"}</p>

      <h3>Location & Contact</h3>
      <p><strong>Location:</strong> {formData.location}</p>
      <p><strong>Email:</strong> {formData.contactEmail}</p>
      <p><strong>Phone:</strong> {formData.contactPhone || "Not Provided"}</p>
      <p><strong>Website:</strong> {formData.website || "Not Provided"}</p>

      <h3>Research Teams</h3>
      {formData.researchTeams.length > 0 ? (
        <ul>
          {formData.researchTeams.map((team, index) => (
            <li key={index}><strong>{team.name}</strong> - {team.members.length} members</li>
          ))}
        </ul>
      ) : (
        <p>No research teams added.</p>
      )}

      <h3>Research Papers</h3>
      {formData.researchPapers.length > 0 ? (
        <ul>
          {formData.researchPapers.map((paper, index) => (
            <li key={index}><strong>{paper.title}</strong> ({paper.publicationDate || "No date"})</li>
          ))}
        </ul>
      ) : (
        <p>No research papers added.</p>
      )}

      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}

export default Step4ReviewSubmit;
