import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Container, Row, Col } from "reactstrap";

import JobAnalytics from "./JobAnalytics";

const API_BASE_URL = "http://localhost:4000";

const JOB_EVENT = "JOB_EVENT";

const socket = io(API_BASE_URL);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [jobData, setJobData] = useState();

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

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(JOB_EVENT);
    };
  }, []);

  if (!isConnected) {
    return "Loading";
  }

  return (
    <Container className="mx-2">
      <Row>
        <Col className="d-flex justify-content-center">
          <JobAnalytics jobData={jobData} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
