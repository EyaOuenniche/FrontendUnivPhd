import { Card, CardContent, Typography } from "@mui/material";

const ResearchPaperCard = ({ paper }: { paper: any }) => {
  return (
    <Card sx={{ p: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{paper.title}</Typography>
        <Typography variant="body2" color="textSecondary">Authors: {paper.authors}</Typography>
        <Typography variant="body2">Field: {paper.field}</Typography>
        <Typography variant="body2" fontWeight="bold">Type: {paper.type}</Typography>
      </CardContent>
    </Card>
  );
};

export default ResearchPaperCard;
