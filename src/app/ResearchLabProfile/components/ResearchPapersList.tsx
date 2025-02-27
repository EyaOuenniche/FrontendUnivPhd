import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article"; // Paper Icon
import PersonIcon from "@mui/icons-material/Person"; // Author Icon
import SchoolIcon from "@mui/icons-material/School"; // Field Icon
import Image from "next/image";

const ResearchPapersList = ({ papers }: { papers: any[] }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3 }}>
      {papers.map((paper) => (
        <Card
          key={paper.id}
          sx={{
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              boxShadow: 6,
              transform: "scale(1.03)",
            },
          }}
        >
          {/* Paper Image */}
          <Box sx={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
          <Image src={paper.imageUrl} alt={paper.title} layout="fill" objectFit="cover" />

          </Box>

          <CardContent>
            <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
              <ArticleIcon color="primary" /> {paper.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1} mt={1}>
              <PersonIcon fontSize="small" /> {paper.authors}
            </Typography>

            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1} mt={1}>
              <SchoolIcon fontSize="small" /> {paper.field}
            </Typography>

            {/* Paper Type Badge */}
            <Chip label={paper.type} color="secondary" sx={{ mt: 1, fontSize: "12px" }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ResearchPapersList;
