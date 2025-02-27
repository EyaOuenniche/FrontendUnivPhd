import { Box, Card, CardContent, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups"; // Team Icon
import WorkIcon from "@mui/icons-material/Work"; // Project Icon

const ResearchTeamsList = ({ teams }: { teams: any[] }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3 }}>
      {teams.map((team) => (
        <Card
          key={team.id}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              boxShadow: 6,
              transform: "scale(1.03)",
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
              <GroupsIcon color="primary" /> {team.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1} mt={1}>
              <WorkIcon fontSize="small" /> {team.project}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ResearchTeamsList;
