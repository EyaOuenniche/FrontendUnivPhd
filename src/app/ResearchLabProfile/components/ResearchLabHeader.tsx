import { Box, Typography, Chip, Button } from "@mui/material";
import Image from "next/image";

const ResearchLabHeader = ({ data }: { data: any }) => {
  const handleEditClick = () => {
    alert("Edit Profile Clicked"); // Placeholder for now, replace with actual logic
  };

  return (
    <Box sx={{ position: "relative", textAlign: "center", color: "white", borderRadius: "10px", overflow: "hidden" }}>
      {/* Edit Profile Button at the top-right */}
      <Button
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: "primary.main",
          color: "white",
          padding: "8px 20px",
          boxShadow: 3,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        onClick={handleEditClick}
      >
        Edit Profile
      </Button>

      {/* Research Lab Image */}
      <Box sx={{ width: "100%", height: "300px", position: "relative" }}>
        <Image src={data.imageUrl} alt="Research Lab" layout="fill" objectFit="cover" />
      </Box>

      {/* Research Lab Details */}
      <Box sx={{ p: 3, backgroundColor: "#333" }}>
        {/* Name & Verified Tag in One Line */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <Typography variant="h3" fontWeight="bold">{data.name}</Typography>
          {data.verified && <Chip label="Verified" color="primary" sx={{ fontSize: "16px", height: "24px" }} />}
        </Box>

        <Typography variant="h6" sx={{ mt: 1 }}>📍 {data.location}</Typography>
        <Typography variant="body1" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
          {data.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResearchLabHeader;
