import { Box, Typography, Chip, Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';

interface UniversityHeaderProps {
  name: string;
  verified: string;
  location: string;
  type: string;  // New prop for university type (e.g., Public or Private)
  imageUrl: string;
}

const UniversityHeader = ({ name, verified, location, type, imageUrl }: UniversityHeaderProps) => {
  return (
    <Box sx={{ textAlign: "center", color: "white", borderRadius: "10px", overflow: "hidden", width: "100%" }}>
      {/* Image Container */}
      <Box sx={{ width: "100%", height: "300px", position: "relative" }}>
        <img
          src={imageUrl}
          alt="University"
          style={{
            width: "100%", // Ensures image fills the container
            height: "100%",
            objectFit: "cover", // Keeps image aspect ratio
          }}
        />

        {/* Transparent gray overlay on top of the image */}
        <Box
          sx={{
            position: "absolute",
            top: "50%", // Position the overlay starting from the middle of the image
            left: 0,
            width: "100%", // Ensure the overlay width is equal to the image
            minHeight: "150px", // Set a minimum height to prevent content from being cut off
            backgroundColor: "rgba(169, 169, 169, 0.2)", // More transparent gray background
            backdropFilter: "blur(3px)", // Optional blur effect for style
            padding: 2,
            zIndex: 1,
            boxSizing: "border-box", // Ensures padding does not affect width
            textAlign: "left", // Align the text to the left inside the overlay
            display: "flex",
            flexDirection: "column", // Allow content to stack vertically
            justifyContent: "center", // Vertically center the content in the box
            alignItems: "flex-start", // Align everything to the left
          }}
        >
          {/* University Name and Verified Tag */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mr: 2 }}>
              {name}
            </Typography>
            <Chip
              label={verified}
              color="primary" // Change to blue color
              sx={{
                fontSize: "16px",
                height: "30px", // You can adjust the chip height if needed
                padding: "5px", // Adjust padding for better alignment
              }}
            />
          </Box>

          {/* Location Icon and Data */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {/* Location Icon and Data */}
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <LocationOnIcon sx={{ color: "white", mr: 1 }} />
              <Typography variant="h6">{location}</Typography>
            </Box>

            {/* Type Icon and Data */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SchoolIcon sx={{ color: "white", mr: 1 }} />
              <Typography variant="h6">{type}</Typography>
            </Box>
          </Box>

          {/* Edit Profile Button at the top-right */}
          <Button
            sx={{
              position: "absolute",
              top: 10, // Position the button at the top
              right: 10, // Align to the right
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
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UniversityHeader;
