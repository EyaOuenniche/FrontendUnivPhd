"use client";

import { Box, Typography, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Define Types for the Program Data
type Course = string; // Each course is represented by a string

interface Subprogram {
  name: string;
  semesters: string[]; // Now using semesters like ["S1", "S2", "S3", "S4"]
  courses: { [key: string]: Course[] }; // Mapping of semesters to course arrays
}

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  requirements: string[];
  subprograms: Subprogram[];
}

const ProgramPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedSubprogram, setExpandedSubprogram] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const { id } = useParams(); // Access the `id` parameter from the route

  // Set the component to render after mount (for hydration fix)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Reset expanded states when the program changes
    setExpandedSubprogram(null);
    setExpandedSemester(null);
  }, [id]); // Triggered when the program ID changes

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  // Handle cases where 'id' might be undefined during the first render
  if (!id) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">No Program ID Provided</Typography>
      </Box>
    );
  }

  // Define the programs data with the correct structure
  const programs: Program[] = [
    {
      id: "1",
      name: "Master",
      description: "A Master's program focusing on advanced topics in technology and research.",
      duration: "2 years",
      requirements: ["Bachelor's Degree in related field", "GPA > 3.0", "English Proficiency"],
      subprograms: [
        {
          name: "Master in Artificial Intelligence",
          semesters: ["S1", "S2", "S3", "S4"], // Four semesters
          courses: {
            "S1": ["AI Basics", "Machine Learning"],
            "S2": ["Data Structures", "AI Algorithms"],
            "S3": ["Deep Learning", "Computer Vision"],
            "S4": ["Advanced AI", "AI Project"],
          },
        },
        {
          name: "Master in Cybersecurity",
          semesters: ["S1", "S2", "S3", "S4"], // Four semesters
          courses: {
            "S1": ["Security Basics", "Cryptography"],
            "S2": ["Network Security", "Firewalls"],
            "S3": ["Ethical Hacking", "Cyber Forensics"],
            "S4": ["Advanced Security", "Cybersecurity Research"],
          },
        },
        {
          name: "Master in Data Science",
          semesters: ["S1", "S2", "S3", "S4"], // Four semesters
          courses: {
            "S1": ["Data Analysis", "Statistics"],
            "S2": ["Machine Learning", "Big Data"],
            "S3": ["Data Mining", "Data Visualization"],
            "S4": ["AI in Data Science", "Data Science Project"],
          },
        },
      ],
    },
    {
      id: "2",
      name: "Engineering",
      description: "An Engineering program with subprograms in Software, Systems, and Renewable Energy Engineering.",
      duration: "4 years",
      requirements: ["High School Diploma in Science", "Math and Physics proficiency"],
      subprograms: [
        {
          name: "Software Engineering",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": ["Programming Fundamentals", "Mathematics for Engineers"],
            "S2": ["Software Design", "Data Structures"],
            "S3": ["Database Systems", "Algorithms"],
            "S4": ["Operating Systems", "Computer Networks"],
            "S5": ["Software Testing", "Object-Oriented Design"],
            "S6": ["Web Development", "Cloud Computing"],
            "S7": ["Mobile App Development", "Machine Learning"],
            "S8": ["Capstone Project", "Software Engineering Research"],
          },
        },
        {
          name: "Computer Systems Engineering",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": ["Computer Architecture", "Mathematics for Systems Engineers"],
            "S2": ["Operating Systems", "Embedded Systems Basics"],
            "S3": ["Digital Logic Design", "Signals and Systems"],
            "S4": ["Embedded Programming", "Microprocessors"],
            "S5": ["Control Systems", "Advanced Networking"],
            "S6": ["Cloud Computing", "Wireless Communications"],
            "S7": ["Systems Integration", "Security in Computing"],
            "S8": ["Capstone Project", "Computer Systems Research"],
          },
        },
        {
          name: "Renewable Energy Engineering",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": ["Renewable Energy Basics", "Mathematics for Engineers"],
            "S2": ["Solar Energy Systems", "Wind Energy Fundamentals"],
            "S3": ["Energy Storage Systems", "Energy Conversion"],
            "S4": ["Hydropower Engineering", "Geothermal Energy"],
            "S5": ["Energy Management", "Smart Grid Systems"],
            "S6": ["Sustainability Engineering", "Energy Economics"],
            "S7": ["Advanced Renewable Energy", "Energy Policy"],
            "S8": ["Capstone Project", "Renewable Energy Research"],
          },
        },
      ],
    },
    // Additional program data...
  ];

  // Find the program based on the `id` parameter
  const program = programs.find((prog) => prog.id === id);

  // Handle the case if the program is not found
  if (!program) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">Program not found</Typography>
      </Box>
    );
  }

  // Accordion state management
  const handleSubprogramChange = (subprogramName: string) => {
    setExpandedSubprogram(expandedSubprogram === subprogramName ? null : subprogramName);
  };

  const handleSemesterChange = (semester: string) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Program Title, Centered */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
        List of {program.name} Programs
      </Typography>

      {/* Program Description and Duration Inside Card */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Program Overview
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "16px", color: "text.secondary" }}>
              <strong>Description:</strong> {program.description}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "16px", color: "text.secondary", mt: 2 }}>
              <strong>Duration:</strong> {program.duration}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Display Subprograms as Accordions */}
      <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 4 }}>
        <strong>Subprograms:</strong>
      </Typography>

      {/* Grid for Subprograms */}
      <Grid container spacing={3}>
        {program.subprograms.map((subprogram, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              expanded={expandedSubprogram === subprogram.name}
              onChange={() => handleSubprogramChange(subprogram.name)}
              sx={{ width: "100%", boxShadow: 2, borderRadius: 2 }}
            >
              <AccordionSummary
                expandIcon={expandedSubprogram === subprogram.name ? <RemoveIcon /> : <AddIcon />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <Typography variant="h6">{subprogram.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Display Semesters */}
                {subprogram.semesters.map((semester, index) => (
                  <Accordion
                    key={index}
                    expanded={expandedSemester === semester}
                    onChange={() => handleSemesterChange(semester)}
                    sx={{ marginBottom: 2 }}
                  >
                    <AccordionSummary
                      expandIcon={expandedSemester === semester ? <RemoveIcon /> : <AddIcon />}
                      aria-controls={`panel-semester-${index}-content`}
                      id={`panel-semester-${index}-header`}
                    >
                      <Typography variant="body1">Semester {semester}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Display Courses for the semester */}
                      <Typography variant="body2" sx={{ paddingLeft: 2 }}>
                        <strong>Courses:</strong>
                      </Typography>
                      <ul>
                        {subprogram.courses[semester].map((course, idx) => (
                          <li key={idx}><Typography variant="body2">{course}</Typography></li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProgramPage;
