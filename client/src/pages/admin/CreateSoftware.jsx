import { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { softwareAPI } from "../../api/software";

const CreateSoftware = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAccessLevelChange = (level) => {
    setAccessLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || accessLevels.length === 0) {
      return setError("All fields are required");
    }

    try {
      setError("");
      setLoading(true);
      await softwareAPI.create({ name, description, accessLevels });
      navigate("/software", { state: { message: "Software created successfully" } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header>
          <h2>Create New Software</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Software Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Access Levels</Form.Label>
              <div>
                {["Read", "Write", "Admin"].map((level) => (
                  <Form.Check
                    key={level}
                    type="checkbox"
                    label={level}
                    checked={accessLevels.includes(level)}
                    onChange={() => handleAccessLevelChange(level)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Software"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateSoftware;
