/** Data models used across steps */

// Research Team Model
export interface ResearchTeam {
  name: string;
  members: { name: string; role: string; email: string }[];
}

// Research Paper Model
export interface ResearchPaper {
  title: string;
  abstract: string;
  publicationDate?: string;
  link?: string;
}

// Research Lab Form Data Model
export interface ResearchLabFormData {
  name: string;
  description: string;
  affiliatedInstitution?: string;
  independent: boolean;
  location: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  researchTeams: ResearchTeam[];
  researchPapers: ResearchPaper[];
}
