interface SidebarProps {
    closeSidebar: () => void;
  }
  
  // Explicitly define the style types
  const styles: { [key: string]: React.CSSProperties } = {
    sidebar: {
      position: "fixed",
      left: 0,
      top: 0,
      width: "200px",
      height: "100%",
      background: "#222",
      color: "white",
      padding: "20px",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "18px",
      cursor: "pointer",
    },
  };
  
  export default function Sidebar({ closeSidebar }: SidebarProps) {
    return (
      <aside style={styles.sidebar}>
        <button onClick={closeSidebar} style={styles.closeButton}>✖</button> {/* Close Button */}
        <ul>
          <li>My Universities</li>
          <li>My Research Labs</li>
          <li>My Papers</li>
        </ul>
      </aside>
    );
  }
  