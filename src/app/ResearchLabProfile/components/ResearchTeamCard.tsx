import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ResearchTeamCard = ({ team }: { team: any }) => {
  const router = useRouter();

  return (
    <Card sx={{ p: 2, cursor: "pointer", boxShadow: 2 }} onClick={() => router.push(`/research-team/${team.id}`)}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{team.name}</Typography>
        <Typography variant="body2" color="textSecondary">Project: {team.project}</Typography>
      </CardContent>
    </Card>
  );
};

export default ResearchTeamCard;
