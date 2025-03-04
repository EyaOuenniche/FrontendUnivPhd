import { ResearchLabFormData } from "./types";

interface Step1BasicInfoProps {
  formData: ResearchLabFormData;
  setFormData: (data: ResearchLabFormData) => void;
  nextStep: () => void;
}

function Step1BasicInfo({ formData, setFormData, nextStep }: Step1BasicInfoProps) {
  return (
    <div>
      <h2>Basic Information & Contact</h2>
      <input
        type="text"
        placeholder="Lab Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Affiliated Institution (Optional)"
        value={formData.affiliatedInstitution || ""}
        onChange={(e) => setFormData({ ...formData, affiliatedInstitution: e.target.value })}
      />
      <label>
        <input
          type="checkbox"
          checked={formData.independent}
          onChange={(e) => setFormData({ ...formData, independent: e.target.checked })}
        />
        Independent Lab
      </label>

      <h3>Location & Contact</h3>
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.contactEmail}
        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.contactPhone || ""}
        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
      />
      <input
        type="url"
        placeholder="Website"
        value={formData.website || ""}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
      />

      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default Step1BasicInfo;
