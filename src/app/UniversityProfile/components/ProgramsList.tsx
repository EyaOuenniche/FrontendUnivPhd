"use client";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import ProgramCard from "./ProgramCard";

const ProgramsList = ({ programs }: { programs: any[] }) => {
  const [showAll, setShowAll] = useState(false);

  // Show the first 3 programs by default, or all if `showAll` is true
  const visiblePrograms = showAll ? programs : programs.slice(0, 3);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the left
        gap: 2,
        width: "100%",
        maxWidth: "100%", // Full width, but space for left and right padding
        paddingX: "5%", // Leave 5% space on the left and right
        position: "relative", // Needed for absolute positioning of the "See More" button
      }}
    >
      {/* Render the cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start", // Align the cards to the left
          gap: 2,
          width: "100%",
        }}
      >
<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 2, width: "100%" }}>
  {visiblePrograms.map((program) => (
    <ProgramCard key={program.id} program={program} programId={program.id} />
  ))}
</Box>

      </Box>

      {/* Show "See More" button if there are more than 3 programs */}
      {programs.length > 3 && !showAll && (
        <Button
          onClick={() => setShowAll(true)}
          variant="contained"
          sx={{
            position: "absolute", // Position the button under the cards
            bottom: 8, // Adjust the position to align more with the cards (push it slightly higher)
            right: "2%", // Move the button further to the right
            paddingX: 2, // Make the button a bit larger horizontally
            paddingY: 1, // Adjust vertical padding for a better fit
            backgroundColor: "purple",
            "&:hover": { backgroundColor: "darkpurple" },
            fontSize: "0.75rem", // Smaller font size
          }}
        >
          See More
        </Button>
      )}

      {/* If "See More" is clicked, we show all cards and the button disappears */}
      {showAll && programs.length > 3 && (
        <Button
          onClick={() => setShowAll(false)}
          variant="outlined"
          sx={{
            position: "absolute", // Position the button under the cards
            bottom: 8, // Adjust the position to align with the cards
            right: "2%", // Move the button further to the right
            paddingX: 2, // Adjust horizontal padding to make it larger
            paddingY: 1, // Adjust vertical padding for a better fit
            color: "purple",
            borderColor: "purple",
            "&:hover": { borderColor: "darkpurple", color: "darkpurple" },
            fontSize: "0.75rem", // Smaller font size
          }}
        >
          Show Less
        </Button>
      )}
    </Box>
  );
};

export default ProgramsList;
