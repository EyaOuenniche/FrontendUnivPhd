"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import styles from "./ResearchLab.module.css";


interface ResearchTeam {
  name: string;
  members: string;
}

interface ResearchPaper {
  title: string;
  authors: string[];
  publicationYear: string;
  link?: string;
}

interface ResearchLab {
  name: string;
  description: string;
  establishedYear: string;
  location: string;
  director: string;
  contactEmail: string;
  website?: string;
  researchAreas: string[];
  affiliatedUniversity: string;
  researchTeams: ResearchTeam[];
  researchPapers: ResearchPaper[];
}

export default function ResearchLabForm() {
  const [researchLab, setResearchLab] = useState<ResearchLab>({
    name: "",
    description: "",
    establishedYear: "",
    location: "",
    director: "",
    contactEmail: "",
    website: "",
    researchAreas: [""],
    affiliatedUniversity: "",
    researchTeams: [{ name: "", members: "" }],
    researchPapers: [{ title: "", authors: [""], publicationYear: "", link: "" }],
  });

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ResearchLab,
    index?: number,
    subField?: string
  ) => {
    if (field === "researchTeams" && index !== undefined && subField) {
      const updatedTeams = [...researchLab.researchTeams];
      updatedTeams[index] = { ...updatedTeams[index], [subField]: e.target.value };
      setResearchLab({ ...researchLab, researchTeams: updatedTeams });
    } else if (field === "researchPapers" && index !== undefined && subField) {
      const updatedPapers = [...researchLab.researchPapers];
      updatedPapers[index] = { ...updatedPapers[index], [subField]: e.target.value };
      setResearchLab({ ...researchLab, researchPapers: updatedPapers });
    } else if (field === "researchAreas" && index !== undefined) {
      const updatedAreas = [...researchLab.researchAreas];
      updatedAreas[index] = e.target.value;
      setResearchLab({ ...researchLab, researchAreas: updatedAreas });
    } else {
      setResearchLab({ ...researchLab, [field]: e.target.value });
    }
  };

  const addField = (field: keyof ResearchLab) => {
    if (field === "researchTeams") {
      setResearchLab({
        ...researchLab,
        researchTeams: [...researchLab.researchTeams, { name: "", members: "" }],
      });
    } else if (field === "researchPapers") {
      setResearchLab({
        ...researchLab,
        researchPapers: [
          ...researchLab.researchPapers,
          { title: "", authors: [""], publicationYear: "", link: "" },
        ],
      });
    } else if (field === "researchAreas") {
      setResearchLab({
        ...researchLab,
        researchAreas: [...researchLab.researchAreas, ""],
      });
    }
  };

  const removeField = (field: keyof ResearchLab, index: number) => {
    const updatedArray = (researchLab[field] as any[]).filter((_, i) => i !== index);
    setResearchLab({ ...researchLab, [field]: updatedArray });
  };

  const handleSubmit = () => {
    console.log("Research Lab Created:", researchLab);
    alert("Research Lab Profile Created!");
  };

  
  

  return (
    
      <div className={styles.container}>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h4" gutterBottom className={styles.title}>
              Create Research Lab
            </Typography>

            <Grid container spacing={2}>
             
              <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Research Lab Name"
                value={researchLab.name}
                onChange={(e) => handleChange(e, "name")}
                
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Established Year"
                  value={researchLab.establishedYear}
                  onChange={(e) => handleChange(e, "establishedYear")}
                  className={styles.input}
                  
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={researchLab.location}
                  onChange={(e) => handleChange(e, "location")}
                  className={styles.input}
                 
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Director"
                  value={researchLab.director}
                  onChange={(e) => handleChange(e, "director")}
                  className={styles.input}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  value={researchLab.contactEmail}
                  onChange={(e) => handleChange(e, "contactEmail")}
                  className={styles.input}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website (Optional)"
                  value={researchLab.website}
                  onChange={(e) => handleChange(e, "website")}
                  className={styles.input}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={researchLab.description}
                  onChange={(e) => handleChange(e, "description")}
                  className={styles.input}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                    },
                    "& .MuiInputBase-root": {
                    borderRadius: "12px",
                    padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0078D4",
                    fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                    },
                    "& .MuiFilledInput-root:hover:before": {
                    borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                    },
                    "& .MuiFilledInput-root.Mui-focused:before": {
                    borderBottom: "2px solid #0078D4",
                    },
                }}
                />
              </Grid>

             
              <Grid item xs={12}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  Research Teams
                </Typography>
                {researchLab.researchTeams.map((team, index) => (
                  <Grid container spacing={2} key={index} alignItems="center" className={styles.row}>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Team Name"
                        value={team.name}
                        onChange={(e) => handleChange(e, "researchTeams", index, "name")}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                            },
                            "& .MuiInputBase-root": {
                            borderRadius: "12px",
                            padding: "12px",
                            },
                            "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            color: "#555",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0078D4",
                            fontWeight: "bold",
                            },
                            "& .MuiFilledInput-root:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                            },
                            "& .MuiFilledInput-root:hover:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                            },
                            "& .MuiFilledInput-root.Mui-focused:before": {
                            borderBottom: "2px solid #0078D4",
                            },
                        }}
                        className={styles.input}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Members"
                        type="number"
                        value={team.members}
                        onChange={(e) => handleChange(e, "researchTeams", index, "members")}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                            },
                            "& .MuiInputBase-root": {
                            borderRadius: "12px",
                            padding: "12px",
                            },
                            "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            color: "#555",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0078D4",
                            fontWeight: "bold",
                            },
                            "& .MuiFilledInput-root:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                            },
                            "& .MuiFilledInput-root:hover:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                            },
                            "& .MuiFilledInput-root.Mui-focused:before": {
                            borderBottom: "2px solid #0078D4",
                            },
                        }}
                        className={styles.input}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => removeField("researchTeams", index)}>
                        <Delete color="secondary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button startIcon={<Add />} onClick={() => addField("researchTeams")} className={styles.addButton}>
                  Add Research Team
                </Button>
              </Grid>

             
              <Grid item xs={12}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  Research Papers
                </Typography>
                {researchLab.researchPapers.map((paper, index) => (
                  <Grid container spacing={2} key={index} alignItems="center" className={styles.row}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Title"
                        value={paper.title}
                        onChange={(e) => handleChange(e, "researchPapers", index, "title")}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                            },
                            "& .MuiInputBase-root": {
                            borderRadius: "12px",
                            padding: "12px",
                            },
                            "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            color: "#555",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0078D4",
                            fontWeight: "bold",
                            },
                            "& .MuiFilledInput-root:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                            },
                            "& .MuiFilledInput-root:hover:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                            },
                            "& .MuiFilledInput-root.Mui-focused:before": {
                            borderBottom: "2px solid #0078D4",
                            },
                        }}
                        className={styles.input}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Publication Year"
                        type="number"
                        value={paper.publicationYear}
                        onChange={(e) => handleChange(e, "researchPapers", index, "publicationYear")}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                            },
                            "& .MuiInputBase-root": {
                            borderRadius: "12px",
                            padding: "12px",
                            },
                            "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            color: "#555",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0078D4",
                            fontWeight: "bold",
                            },
                            "& .MuiFilledInput-root:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                            },
                            "& .MuiFilledInput-root:hover:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                            },
                            "& .MuiFilledInput-root.Mui-focused:before": {
                            borderBottom: "2px solid #0078D4",
                            },
                        }}
                        className={styles.input}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Link (Optional)"
                        value={paper.link}
                        onChange={(e) => handleChange(e, "researchPapers", index, "link")}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                            boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.15)",
                            },
                            "& .MuiInputBase-root": {
                            borderRadius: "12px",
                            padding: "12px",
                            },
                            "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            color: "#555",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0078D4",
                            fontWeight: "bold",
                            },
                            "& .MuiFilledInput-root:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.2)",
                            },
                            "& .MuiFilledInput-root:hover:before": {
                            borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
                            },
                            "& .MuiFilledInput-root.Mui-focused:before": {
                            borderBottom: "2px solid #0078D4",
                            },
                        }}
                        className={styles.input}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={() => removeField("researchPapers", index)}>
                        <Delete color="secondary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button startIcon={<Add />} onClick={() => addField("researchPapers")} className={styles.addButton}>
                  Add Research Paper
                </Button>
              </Grid>

             
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                  className={styles.submitButton}
                >
                  Create Research Lab
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
   
  );
}
