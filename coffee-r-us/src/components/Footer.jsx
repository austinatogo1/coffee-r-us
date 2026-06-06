function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "1.5rem",
      marginTop: "auto",
      background: "var(--brown-dark)",
      color: "var(--white)",
      fontSize: "0.9rem"
    }}>
      © {new Date().getFullYear()} austinatogo1
    </footer>
  );
}

export default Footer;