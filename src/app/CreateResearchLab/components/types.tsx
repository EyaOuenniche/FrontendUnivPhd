export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  link?: string;
}

export interface ResearchTeam {
  id: string;
  name: string;
}

export interface ResearchLab {
  id: string;
  name: string;
  description: string;
  university?: string;
  isIndependent: boolean;
  researchTeams: ResearchTeam[];
  researchPapers: ResearchPaper[];
}
