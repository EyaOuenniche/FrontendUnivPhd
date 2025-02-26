"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useRouter } from "next/navigation";

const ProgramCard = ({ program, programId }: { program: any; programId: number }) => {
    const router = useRouter();
  
    const handleNavigate = () => {
        router.push(`/UniversityProfile/ProgramsPage/${programId}`);
      };
      
  
    return (
      <Card
        sx={{
          cursor: "pointer",
          boxShadow: 2,
          borderRadius: 2,
          width: 350,
          height: 160,
          position: "relative",
          padding: 0,
          transition: "0.3s",
          "&:hover": { boxShadow: 4, transform: "scale(1.05)" },
        }}
        onClick={handleNavigate}
        aria-label={`Navigate to ${program.name} program page`}
        role="button"
      >
        <Box sx={{ position: "absolute", top: 8, right: 8, color: "purple" }}>
          <MenuBookIcon />
        </Box>
  
        <CardContent sx={{ padding: "16px" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            {program.name}
          </Typography>
          {program.subprograms.map((sub: string, index: number) => (
            <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              - {sub}
            </Typography>
          ))}
        </CardContent>
      </Card>
    );
  };
  

export default ProgramCard;
