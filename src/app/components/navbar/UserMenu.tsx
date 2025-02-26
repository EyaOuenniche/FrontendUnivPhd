import { useState } from "react";

// Define the style types explicitly
const styles: { [key: string]: React.CSSProperties } = {
  container: { position: "relative" },
  avatar: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  menu: {
    position: "absolute",
    right: 0,
    top: "30px",
    background: "#fff",
    color: "#000",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    padding: "10px",
  },
};

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.avatar}>
        👤
      </button>
      {isOpen && (
        <div style={styles.menu}>
          <p>My Profile</p>
          <p>Sign Out</p>
        </div>
      )}
    </div>
  );
}
