"use client";

import { Box, Typography, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SchoolIcon from '@mui/icons-material/School';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Define Types for the Program Data
type Course = { name: string; code: string; credits: number };

interface Subprogram {
  name: string;
  semesters: string[];
  courses: { [key: string]: Course[] };
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { id } = useParams(); // Access the `id` parameter from the route

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setExpandedSubprogram(null);
    setExpandedSemester(null);
  }, [id]);

  if (!isMounted) {
    return null;
  }

  if (!id) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">No Program ID Provided</Typography>
      </Box>
    );
  }

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
            "S1": [
              { name: "AI Basics", code: "AI101", credits: 4 },
              { name: "Machine Learning", code: "ML102", credits: 4 }
            ],
            "S2": [
              { name: "Data Structures", code: "DS201", credits: 3 },
              { name: "AI Algorithms", code: "AI203", credits: 4 }
            ],
            "S3": [
              { name: "Deep Learning", code: "DL301", credits: 4 },
              { name: "Computer Vision", code: "CV302", credits: 4 }
            ],
            "S4": [
              { name: "Advanced AI", code: "AI401", credits: 4 },
              { name: "AI Project", code: "AI402", credits: 5 }
            ]
          }
        },
        {
          name: "Master in Cybersecurity",
          semesters: ["S1", "S2", "S3", "S4"], // Four semesters
          courses: {
            "S1": [
              { name: "Security Basics", code: "SEC101", credits: 3 },
              { name: "Cryptography", code: "CRY102", credits: 4 }
            ],
            "S2": [
              { name: "Network Security", code: "NET201", credits: 4 },
              { name: "Firewalls", code: "FW202", credits: 3 }
            ],
            "S3": [
              { name: "Ethical Hacking", code: "EH301", credits: 4 },
              { name: "Cyber Forensics", code: "CF302", credits: 3 }
            ],
            "S4": [
              { name: "Advanced Security", code: "AS401", credits: 4 },
              { name: "Cybersecurity Research", code: "CRR402", credits: 5 }
            ]
          }
        },
        {
          name: "Master in Data Science",
          semesters: ["S1", "S2", "S3", "S4"], // Four semesters
          courses: {
            "S1": [
              { name: "Data Analysis", code: "DA101", credits: 4 },
              { name: "Statistics", code: "ST101", credits: 3 }
            ],
            "S2": [
              { name: "Machine Learning", code: "ML201", credits: 4 },
              { name: "Big Data", code: "BD202", credits: 4 }
            ],
            "S3": [
              { name: "Data Mining", code: "DM301", credits: 4 },
              { name: "Data Visualization", code: "DV302", credits: 3 }
            ],
            "S4": [
              { name: "AI in Data Science", code: "AI401", credits: 4 },
              { name: "Data Science Project", code: "DS402", credits: 5 }
            ]
          }
        }
      ]
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
            "S1": [
              { name: "Programming Fundamentals", code: "PF101", credits: 4 },
              { name: "Mathematics for Engineers", code: "ME102", credits: 3 }
            ],
            "S2": [
              { name: "Software Design", code: "SD201", credits: 4 },
              { name: "Data Structures", code: "DS202", credits: 4 }
            ],
            "S3": [
              { name: "Database Systems", code: "DB301", credits: 4 },
              { name: "Algorithms", code: "ALG302", credits: 3 }
            ],
            "S4": [
              { name: "Operating Systems", code: "OS401", credits: 4 },
              { name: "Computer Networks", code: "CN402", credits: 4 }
            ],
            "S5": [
              { name: "Software Testing", code: "ST501", credits: 3 },
              { name: "Object-Oriented Design", code: "OOD502", credits: 4 }
            ],
            "S6": [
              { name: "Web Development", code: "WD601", credits: 4 },
              { name: "Cloud Computing", code: "CC602", credits: 4 }
            ],
            "S7": [
              { name: "Mobile App Development", code: "MAD701", credits: 4 },
              { name: "Machine Learning", code: "ML702", credits: 3 }
            ],
            "S8": [
              { name: "Capstone Project", code: "CP801", credits: 5 },
              { name: "Software Engineering Research", code: "SER802", credits: 4 }
            ]
          }
        },
        {
          name: "Computer Systems Engineering",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": [
              { name: "Computer Architecture", code: "CA101", credits: 4 },
              { name: "Mathematics for Systems Engineers", code: "MSE102", credits: 3 }
            ],
            "S2": [
              { name: "Operating Systems", code: "OS201", credits: 4 },
              { name: "Embedded Systems Basics", code: "ESB202", credits: 4 }
            ],
            "S3": [
              { name: "Digital Logic Design", code: "DLD301", credits: 4 },
              { name: "Signals and Systems", code: "SS302", credits: 3 }
            ],
            "S4": [
              { name: "Embedded Programming", code: "EP401", credits: 4 },
              { name: "Microprocessors", code: "MP402", credits: 4 }
            ],
            "S5": [
              { name: "Control Systems", code: "CS501", credits: 4 },
              { name: "Advanced Networking", code: "AN502", credits: 4 }
            ],
            "S6": [
              { name: "Cloud Computing", code: "CC601", credits: 4 },
              { name: "Wireless Communications", code: "WC602", credits: 3 }
            ],
            "S7": [
              { name: "Systems Integration", code: "SI701", credits: 4 },
              { name: "Security in Computing", code: "SC702", credits: 4 }
            ],
            "S8": [
              { name: "Capstone Project", code: "CP801", credits: 5 },
              { name: "Computer Systems Research", code: "CSR802", credits: 4 }
            ]
          }
        },
        {
          name: "Renewable Energy Engineering",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": [
              { name: "Renewable Energy Basics", code: "REB101", credits: 4 },
              { name: "Mathematics for Engineers", code: "ME102", credits: 3 }
            ],
            "S2": [
              { name: "Solar Energy Systems", code: "SES201", credits: 4 },
              { name: "Wind Energy Fundamentals", code: "WEF202", credits: 3 }
            ],
            "S3": [
              { name: "Energy Storage Systems", code: "ESS301", credits: 4 },
              { name: "Energy Conversion", code: "EC302", credits: 3 }
            ],
            "S4": [
              { name: "Hydropower Engineering", code: "HE401", credits: 4 },
              { name: "Geothermal Energy", code: "GE402", credits: 4 }
            ],
            "S5": [
              { name: "Energy Management", code: "EM501", credits: 3 },
              { name: "Smart Grid Systems", code: "SGS502", credits: 4 }
            ],
            "S6": [
              { name: "Sustainability Engineering", code: "SE601", credits: 4 },
              { name: "Energy Economics", code: "EE602", credits: 3 }
            ],
            "S7": [
              { name: "Advanced Renewable Energy", code: "ARE701", credits: 4 },
              { name: "Energy Policy", code: "EP702", credits: 4 }
            ],
            "S8": [
              { name: "Capstone Project", code: "CP801", credits: 5 },
              { name: "Renewable Energy Research", code: "RER802", credits: 4 }
            ]
          }
        }
      ]
    },
    {
      id: "3",
      name: "Licence",
      description: "A license program with subprograms in Computer Science and Information Technology",
      duration: "3 years",
      requirements: ["High School Diploma in Science", "Math and Physics proficiency"],
      subprograms: [
        {
          name: "Computer Science",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6"], // Six semesters
          courses: {
            "S1": [
              { name: "Introduction to Programming", code: "IP101", credits: 4 },
              { name: "Discrete Mathematics", code: "DM102", credits: 3 }
            ],
            "S2": [
              { name: "Data Structures", code: "DS201", credits: 4 },
              { name: "Computer Organization", code: "CO202", credits: 4 }
            ],
            "S3": [
              { name: "Algorithms", code: "ALG301", credits: 4 },
              { name: "Database Systems", code: "DBS302", credits: 3 }
            ],
            "S4": [
              { name: "Operating Systems", code: "OS401", credits: 4 },
              { name: "Computer Networks", code: "CN402", credits: 4 }
            ],
            "S5": [
              { name: "Artificial Intelligence", code: "AI501", credits: 4 },
              { name: "Software Engineering", code: "SE502", credits: 3 }
            ],
            "S6": [
              { name: "Machine Learning", code: "ML601", credits: 4 },
              { name: "Capstone Project", code: "CP602", credits: 5 }
            ]
          }
        },
        {
          name: "Information Technology",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6"], // Six semesters
          courses: {
            "S1": [
              { name: "IT Fundamentals", code: "IT101", credits: 4 },
              { name: "Mathematics for IT", code: "MATHIT102", credits: 3 }
            ],
            "S2": [
              { name: "Web Development", code: "WD201", credits: 4 },
              { name: "Network Fundamentals", code: "NF202", credits: 4 }
            ],
            "S3": [
              { name: "Database Management", code: "DM301", credits: 4 },
              { name: "Cybersecurity Basics", code: "CSB302", credits: 3 }
            ],
            "S4": [
              { name: "Cloud Computing", code: "CC401", credits: 4 },
              { name: "Mobile App Development", code: "MAD402", credits: 4 }
            ],
            "S5": [
              { name: "IT Project Management", code: "ITPM501", credits: 3 },
              { name: "System Administration", code: "SA502", credits: 4 }
            ],
            "S6": [
              { name: "Big Data Analytics", code: "BDA601", credits: 4 },
              { name: "Capstone Project", code: "CP602", credits: 5 }
            ]
          }
        }
      ]
    },
    {
      id: "4",
      name: "PhD",
      description: "A doctoral program with subprograms in Computer Science and Renewable Energy",
      duration: "4-6 years",
      requirements: ["Master's Degree in relevant field", "Research Proposal"],
      subprograms: [
        {
          name: "PhD in Computer Science",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": [
              { name: "Advanced Algorithms", code: "AA101", credits: 4 },
              { name: "Research Methodology in Computer Science", code: "RMCS102", credits: 3 }
            ],
            "S2": [
              { name: "Machine Learning Theory", code: "MLT201", credits: 4 },
              { name: "Computer Vision", code: "CV202", credits: 4 }
            ],
            "S3": [
              { name: "Data Mining", code: "DM301", credits: 4 },
              { name: "Advanced Databases", code: "AD302", credits: 3 }
            ],
            "S4": [
              { name: "Cloud Computing", code: "CC401", credits: 4 },
              { name: "Big Data Analytics", code: "BDA402", credits: 4 }
            ],
            "S5": [
              { name: "Deep Learning", code: "DL501", credits: 4 },
              { name: "AI Ethics", code: "AIE502", credits: 3 }
            ],
            "S6": [
              { name: "Computational Complexity", code: "CC601", credits: 4 },
              { name: "Cryptography and Security", code: "CS602", credits: 3 }
            ],
            "S7": [
              { name: "Research Seminar in Computer Science", code: "RSC701", credits: 3 },
              { name: "PhD Dissertation Work", code: "PDW702", credits: 6 }
            ],
            "S8": [
              { name: "Final Thesis Defense", code: "FTD801", credits: 5 },
              { name: "Dissertation Submission", code: "DS802", credits: 2 }
            ]
          }
        },
        {
          name: "PhD in Renewable Energy",
          semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"], // Eight semesters
          courses: {
            "S1": [
              { name: "Renewable Energy Systems", code: "RES101", credits: 4 },
              { name: "Research Methodology in Energy Studies", code: "RMES102", credits: 3 }
            ],
            "S2": [
              { name: "Solar Energy Technology", code: "SET201", credits: 4 },
              { name: "Wind Energy Systems", code: "WES202", credits: 4 }
            ],
            "S3": [
              { name: "Energy Storage Systems", code: "ESS301", credits: 4 },
              { name: "Grid Integration of Renewable Energy", code: "GIRE302", credits: 4 }
            ],
            "S4": [
              { name: "Sustainable Energy Development", code: "SED401", credits: 4 },
              { name: "Environmental Impact of Energy", code: "EIE402", credits: 3 }
            ],
            "S5": [
              { name: "Energy Efficiency in Buildings", code: "EEB501", credits: 4 },
              { name: "Smart Grids and Renewable Energy", code: "SGRE502", credits: 3 }
            ],
            "S6": [
              { name: "Bioenergy", code: "BIO601", credits: 4 },
              { name: "Hydropower Engineering", code: "HE602", credits: 4 }
            ],
            "S7": [
              { name: "Research Seminar in Renewable Energy", code: "RSRE701", credits: 3 },
              { name: "PhD Dissertation Work", code: "PDW702", credits: 6 }
            ],
            "S8": [
              { name: "Final Thesis Defense", code: "FTD801", credits: 5 },
              { name: "Dissertation Submission", code: "DS802", credits: 2 }
            ]
          }
        }
      ]
    }
  ];
  

  const program = programs.find((prog) => prog.id === id);

  if (!program) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">Program not found</Typography>
      </Box>
    );
  }

  const handleSubprogramChange = (subprogramName: string) => {
    setExpandedSubprogram(expandedSubprogram === subprogramName ? null : subprogramName);
  };

  const handleSemesterChange = (semester: string) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // Add delete logic here when needed
    console.log("Program deleted");
    setOpenDeleteDialog(false);
  };
  return (
    <Box sx={{ padding: 2, backgroundColor: "white", height: "100vh" }}>
   <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          textAlign: "center",
          color: "black",
          display: "flex",
          alignItems: "center", // Aligns the text and icon in a row
          justifyContent: "center",
        }}
      >
        <SchoolIcon sx={{ marginRight: 2, fontSize: 36, color: "#003366" }} /> {/* Dark blue icon */}
        {program.name} Programs
      </Typography>
      {/* Buttons for Edit and Delete */}
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginRight: 2 }}
          startIcon={<EditIcon />}
          onClick={() => console.log("Edit functionality here")} // Implement your edit logic
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Box>
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
    <Card sx={{ 
  width: "100%", 
  boxShadow: 6, // Increased shadow
  borderRadius: 4, 
  backgroundColor: "rgba(255, 255, 255, 0.98)", // Slight blue tint to white
  '&:hover': {
    boxShadow: 8, // Adds a stronger shadow on hover for interaction
  },
  transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for hover effect
}}>
 <CardContent sx={{ padding: 4 }}>
  <Typography
    variant="h5"
    sx={{
      mb: 2,
      fontWeight: "bold",
      color: "#003366",  // Dark blue color
      textAlign: "center",  // Center text horizontally
      display: "flex",  // Use flexbox for vertical alignment
      justifyContent: "center",  // Center content vertically
      alignItems: "center",  // Ensure content is aligned vertically within the container
      mt: -2 // Move the heading a bit closer to the top
    }}
  >
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
<Dialog
  open={openDeleteDialog}
  onClose={handleCloseDeleteDialog}
  sx={{
    "& .MuiDialog-paper": {
      width: '400px',  // Adjust the width
      height: '200px', // Adjust the height
    }
  }}
>
  <DialogTitle>Delete Program</DialogTitle>
  <DialogContent>
    <Typography variant="body1">Are you sure you want to delete this program?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="primary">
      No
    </Button>
    <Button onClick={handleConfirmDelete} color="error">
      Yes
    </Button>
  </DialogActions>
</Dialog>




      <Typography variant="body1" sx={{ marginBottom: 2, marginTop: 4 }}>
        {/* <strong>Subprograms:</strong> */}
      </Typography>

      <Grid container spacing={3}>
        {program.subprograms.map((subprogram, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              expanded={expandedSubprogram === subprogram.name}
              onChange={() => handleSubprogramChange(subprogram.name)}
              sx={{
                width: "100%",
                boxShadow: 6, // Increased box-shadow for better visibility
                borderRadius: 2,
                backgroundColor: "#f4f8fb", // Optional: light background for contrast
              }}
            >
              <AccordionSummary
                expandIcon={
                  expandedSubprogram === subprogram.name ? (
                    <RemoveIcon sx={{ color: "darkblue" }} /> // Dark blue color for minus
                  ) : (
                    <AddIcon sx={{ color: "darkblue" }} /> // Dark blue color for plus
                  )
                }
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <Typography variant="h6">{subprogram.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {subprogram.semesters.map((semester, semesterIndex) => (
                  <Accordion
                    key={semesterIndex}
                    expanded={expandedSemester === semester}
                    onChange={() => handleSemesterChange(semester)}
                    sx={{ marginBottom: 2 }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expandedSemester === semester ? (
                          <RemoveIcon sx={{ color: "darkblue" }} /> // Dark blue color for minus
                        ) : (
                          <AddIcon sx={{ color: "darkblue" }} /> // Dark blue color for plus
                        )
                      }
                      aria-controls={`panel-semester-${semesterIndex}-content`}
                      id={`panel-semester-${semesterIndex}-header`}
                    >
                      <Typography variant="body1">Semester {semester}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Display Courses in a Table */}
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Course Name</TableCell>
                              <TableCell>Course Code</TableCell>
                              <TableCell>Credits</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {subprogram.courses[semester].map((course, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  backgroundColor: index % 2 === 0 ? "#d0e5f4" : "white", // Alternating rows
                                }}
                              >
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.code}</TableCell>
                                <TableCell>{course.credits}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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
