"use client"
import { useState } from "react";

interface ResearchTeamFormProps {
  embedded?: boolean; // Determines if the form is used inside ResearchLabForm
  onSave?: (teamData: any) => void; // Callback function when saving in embedded mode
}

function ResearchTeamForm({ embedded, onSave }: ResearchTeamFormProps) {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([{ name: "", role: "", email: "" }]);

  const handleAddMember = () => {
    setMembers([...members, { name: "", role: "", email: "" }]);
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleSubmit = () => {
    const teamData = { name: teamName, members };

    if (embedded && onSave) {
      onSave(teamData); // Send data to parent (ResearchLabForm)
    } else {
      console.log("Submitting independently...", teamData);
      // API call to save team independently (not implemented yet)
    }
  };

  return (
    <div>
      <h2>{embedded ? "Add Research Team to Lab" : "Create Research Team"}</h2>

      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <h3>Members</h3>
      {members.map((member, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Full Name"
            value={member.name}
            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Role/Position"
            value={member.role}
            onChange={(e) => handleMemberChange(index, "role", e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={member.email}
            onChange={(e) => handleMemberChange(index, "email", e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAddMember}>Add Member</button>
      <button onClick={handleSubmit}>{embedded ? "Add Team" : "Create Team"}</button>
    </div>
  );
}

export default ResearchTeamForm;
