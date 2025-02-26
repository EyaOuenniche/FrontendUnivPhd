import { Box, Typography, Card, CardContent } from "@mui/material";
import UniversityHeader from "./components/UniversityHeader";
import ProgramsList from "./components/ProgramsList";

const UniversityProfile = () => {
  // Mock data for MedTech University with programs (no subprograms yet)
  const universityData = {
    name: "MedTech University",
    verified: "Verified",
    location: "Les Berges du Lac II, Tunis, Tunisia",
    type: "Private",
    description:
      "MedTech University is a top engineering school in Tunisia, offering high-quality education in technology and innovation.",
    imageUrl: "/university1.jpg",
    programs: [
      {
        id: 1,
        name: "Master",
        subprograms: ["Master in Artificial Intelligence", "Master in Cybersecurity", "Master in Data Science"],
      },
      {
        id: 2,
        name: "Engineering",
        subprograms: ["Software Engineering", "Computer Systems Engineering", "Renewable Energy Engineering"],
      },
      {
        id: 3,
        name: "Licence",
        subprograms: ["Licence in Computer Science", "Licence in Information Technology"],
      },
      {
        id: 4,
        name: "PhD",
        subprograms: ["PhD in Computer Science", "PhD in Renewable Energy"],
      },
    ],
  };
  

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", pb: 5 }}>
      <Box sx={{ width: "97%", margin: "0 auto" }}>
        {/* University Header Section */}
        <UniversityHeader
          name={universityData.name}
          verified={universityData.verified}
          location={universityData.location}
          type={universityData.type} // Passing type to the header component
          imageUrl={universityData.imageUrl}
        />

        {/* University Description Section */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}> {/* Reduced mt from 5 to 3 */}
          <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ padding: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                University Overview
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "16px", color: "text.secondary" }}>
                {universityData.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* List of Programs Section */}
        <Box mt={5}>
          <ProgramsList programs={universityData.programs} />
        </Box>
      </Box>
    </Box>
  );
};

export default UniversityProfile;
