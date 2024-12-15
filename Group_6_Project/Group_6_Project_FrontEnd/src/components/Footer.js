import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="footer text-center py-3"
      style={{
        backgroundColor: "rgb(244,249,253)", 
        color: "#333", 
        fontSize: "1rem", 
      }}
    >
      <Container>
        &copy; Designed By <strong>VKD - Vipul, Krin, Dinesh</strong> 2024
      </Container>
    </footer>
  );
};

export default Footer;
