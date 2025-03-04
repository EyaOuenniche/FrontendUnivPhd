import { useState } from "react";
import { ResearchPaper } from "../../CreateResearchLab/components/types";

interface ResearchPaperFormProps {
  embedded?: boolean;
  onSave?: (paperData: ResearchPaper) => void;
}

function ResearchPaperForm({ embedded, onSave }: ResearchPaperFormProps) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    const paperData: ResearchPaper = { title, abstract, publicationDate, link };

    if (embedded && onSave) {
      onSave(paperData);
    } else {
      console.log("Submitting independently:", paperData);
      
    }
  };

  return (
    <div>
      <h2>{embedded ? "Add Research Paper to Lab" : "Create Research Paper"}</h2>
      <input type="text" placeholder="Paper Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} />
      <input type="date" placeholder="Publication Date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
      <input type="url" placeholder="Link (Optional)" value={link} onChange={(e) => setLink(e.target.value)} />

      <button onClick={handleSubmit}>{embedded ? "Add Paper" : "Create Paper"}</button>
    </div>
  );
}

export default ResearchPaperForm;
