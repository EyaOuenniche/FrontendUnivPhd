"use client";

import ResearchLabHeader from "./components/ResearchLabHeader";
import ResearchTeamsList from "./components/ResearchTeamsList";
import ResearchPapersList from "./components/ResearchPapersList";
import { Box, Container } from "@mui/material";

// Mock data
const researchLabData = {
    name: "Advanced AI Research Lab",
    verified: true,
    location: "Tunis, Tunisia",
    description: "A leading research lab dedicated to advancing artificial intelligence and machine learning.",
    imageUrl: "/lab.jpg",  // ✅ Works fine
    researchTeams: [
      { id: 1, name: "Deep Learning Team", project: "Neural Network Optimization" },
      { id: 2, name: "NLP Research Group", project: "Large Language Models" },
    ],
    researchPapers: [
      { 
        id: 1, 
        title: "Advancements in AI", 
        authors: "Dr. Smith et al.", 
        field: "Artificial Intelligence", 
        type: "Journal", 
        paperUrl: "https://example.com/ai-paper", 
        imageUrl: "/ResearchPaper.jpg" 
      },
      { 
        id: 2, 
        title: "Ethics in AI", 
        authors: "Prof. Brown et al.", 
        field: "Machine Ethics", 
        type: "Conference Paper", 
        paperUrl: "https://example.com/ethics-paper", 
        imageUrl: "/research_paper_sample.jpg" 
      },
    ],
};

  
  

const ResearchLabProfile = () => {
  return (
    <Container 
      maxWidth="xl" // Changed from "lg" to "xl" for more width
      sx={{ 
        backgroundColor: "#f8f9fc", 
        minHeight: "100vh", 
        pb: 5, 
        pt: 3, 
        width: "100%", // Ensures full width
        px: { xs: 2, sm: 4, md: 8 }, // Adds responsive horizontal padding
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Research Lab Header */}
        <ResearchLabHeader data={researchLabData} />

        {/* Research Teams List */}
        <Box mt={5}>
          <ResearchTeamsList teams={researchLabData.researchTeams} />
        </Box>

        {/* Research Papers List */}
        <Box mt={5}>
          <ResearchPapersList papers={researchLabData.researchPapers} />
        </Box>
      </Box>
    </Container>
  );
};

export default ResearchLabProfile;
