import React, { useState, useEffect } from "react";
import { Container, Card, Table, Alert, Badge } from "react-bootstrap";
import { requestAPI } from "../../api/request";

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUserRequests();
    }, []);

    const fetchUserRequests = async () => {
        try {
            setLoading(true);
            const response = await requestAPI.getMyRequests();
            setRequests(response || []);
        } catch (err) {
            setError("Failed to fetch your requests");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        let variant;

        switch (status) {
            case "Approved":
                variant = "success";
                break;
            case "Rejected":
                variant = "danger";
                break;
            default:
                variant = "secondary";
        }

        return <Badge bg={variant}>{status}</Badge>;
    };

    const getAccessTypeBadge = (type) => {
        let variant;

        switch (type) {
            case "Read":
                variant = "info";
                break;
            case "Write":
                variant = "warning";
                break;
            case "Admin":
                variant = "danger";
                break;
            default:
                variant = "primary";
        }

        return <Badge bg={variant}>{type}</Badge>;
    };

    return (
        <Container className="mt-10 py-4">
            <Card>
                <Card.Header>
                    <h2 className="mb-0">My Access Requests</h2>
                </Card.Header>
                <Card.Body>
                    {error && (
                        <Alert variant="danger" onClose={() => setError("")} dismissible>
                            {error}
                        </Alert>
                    )}

                    {loading ? (
                        <p>Loading your requests...</p>
                    ) : requests.length === 0 ? (
                        <p>You haven't made any access requests yet.</p>
                    ) : (
                        <Table striped bordered hover responsive className="align-middle text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Software</th>
                                    <th>Access Type</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.software?.name || "N/A"}</td>
                                        <td>{getAccessTypeBadge(request.accessType)}</td>
                                        <td>{request.reason}</td>
                                        <td>{getStatusBadge(request.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MyRequests;
