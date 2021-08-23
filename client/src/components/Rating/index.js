import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ImageResults from "./ImageResults";

// loader
import Loader from "../../loader";

import app from "../../firebase";
const db = app.firestore();

const Rating = () => {
  // loading
  const [loading, setLoading] = useState(true);

  // data
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let data = [];
    const response = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .orderBy("labels.labels_search")
      .limit(10)
      .get();
    console.log('response', response);
    response.forEach((r) => {
      console.log(r);
      data.push(Object.assign({ uid: r.id }, r.data()));
    });

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container className="mt-3">
        {/* It will show resutls */}
        {!loading ? (
          <>
            {data.length !== 0 ? (
              <ImageResults results={data} />
            ) : (
              <div>
                <Container>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <h1>No results found!</h1>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </Container>
    </div>
  );
};

export default Rating;
