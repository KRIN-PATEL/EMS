import React from "react";
import { Carousel, Container } from "react-bootstrap";
import Slide from "../assets/Banner1.jpg";
import Banner from "../assets/Banner2.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <Container className="mt-4">
        <Carousel interval={3000} pause="hover">
         
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid"
              src={Slide}
              alt="First slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Welcome to EMS</h3>
              <p>Effortlessly manage your employees with our platform.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid"
              src={Banner}
              alt="Second slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Streamline Your Workflow</h3>
              <p>Efficient tools for employee management.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default Homepage;
