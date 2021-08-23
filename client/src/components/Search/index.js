import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ImageResults from "./ImageResults";

// main search
import SearchField from "./SearchField";
import { search as mainSearch } from "./search";

// loader
import Loader from "../../loader";
import app from "../../firebase";

// const csvData = [
//   ["firstname", "lastname", "email"],
//   ["Ahmed", "Tomi", "ah@smthing.co.com"],
//   ["Raed", "Labes", "rl@smthing.co.com"],
//   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
// ];

const Search = () => {
  const db = app.firestore();

  const [labels, setLabels] = useState(true);
  const [objects, setObjects] = useState(true);
  const [texts, setTexts] = useState(true);
  const [photoScore, setphotoScore] = useState("1");
  const [faces, setFaces] = useState(true);

  // loading
  const [loading, setLoading] = useState(true);
  // data
  const [data, setData] = useState([]);
  // search
  const [search, setSearch] = useState("");

  // handlekeyup
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      console.log("Enter pressed");
      handleSearch();
    }
  };

  // button handler
  const handleButton = () => {
    handleSearch(search, labels, objects, texts, photoScore, faces);
  };

  // Main Search
  const handleSearch = async () => {
    // pre
    setLoading(true);
    const results = await mainSearch(
      search,
      labels,
      objects,
      texts,
      photoScore,
      faces
    );

    setData(results);
    setLoading(false);
  };

  const fetchData = async () => {
    let data = [];
    const response = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .orderBy("labels.labels_search")
      .limit(10)
      .get();

    response.forEach((r) => {
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
        {/* It contains checkboxes */}
        <SearchField
          labels={labels}
          setLabels={setLabels}
          objects={objects}
          setObjects={setObjects}
          texts={texts}
          setTexts={setTexts}
          photoScore={photoScore}
          setphotoScore={setphotoScore}
          faces={faces}
          setFaces={setFaces}
          // search
          search={search}
          setSearch={setSearch}
          // handlekeyup
          handleKeyUp={handleKeyUp}
          // handleButton
          handleButton={handleButton}
        />

        {/* <CSVDownload data={csvData} target="_blank" />; */}
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
            {/* <h1>Loading</h1> */}
            <Loader />
          </>
        )}
      </Container>
    </div>
  );
};

export default Search;
