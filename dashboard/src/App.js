import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Container, Row, Col } from "reactstrap";

import Products from "./Products";
import JobAnalytics from "./JobAnalytics";

// const API_BASE_URL = "http://localhost:4000";
const API_BASE_URL = "";

const PRODUCT_EVENT = "PRODUCT_EVENT";
const JOB_EVENT = "JOB_EVENT";

const socket = io();

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [jobData, setJobData] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on(JOB_EVENT, (data) => {
      setJobData(data);
    });

    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then(({ data }) => {
        setProducts(data);
        socket.on(PRODUCT_EVENT, (data) => {
          setProducts((products) => [...products, data]);
        });
      });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(JOB_EVENT);
      socket.off(PRODUCT_EVENT);
    };
  }, []);

  if (!isConnected) {
    return "Loading";
  }

  return (
    <Container className="m-auto">
      <Row>
        <Col className="d-flex justify-content-center">
          <JobAnalytics jobData={jobData} />
        </Col>
      </Row>

      <Row className="my-5">
        <Col className="d-flex justify-content-center">
          <Products products={products} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
