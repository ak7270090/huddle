import { Container, Row, Col } from "react-bootstrap";


export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className=" d-flex justify-content-between align-items-center">
          <Col size={12} sm={6}>
            <span className="font-weight-bold text-white">Huddle</span>
            <span className="text-sm-right text-primary font-weight-bold">
              07
            </span>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <p>Thank you for attention</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
