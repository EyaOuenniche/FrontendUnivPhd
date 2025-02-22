import { useState } from "react";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";


export default function HorizontalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      {/* Sidebar Toggle Button */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.menuButton}>
        ☰
      </button>

      {/* Website Logo */}
      <span style={styles.logo}>Univ.tn</span>

      {/* User Menu (Profile + Sign Out) */}
        <UserMenu/>
      {/* Sidebar (only visible when open) */}
      {isSidebarOpen && <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />}
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#333",
    color: "white",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  menuButton: {
    fontSize: "20px",
    background: "none",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
