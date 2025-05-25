import React, { useState, useEffect } from "react";
import { Container, Card, Table, Button, Alert, Badge } from "react-bootstrap";
import { requestAPI } from "../../api/request";

const PendingRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await requestAPI.getPendingRequests();
            setRequests(response.data);
        } catch (err) {
            setError("Failed to fetch pending requests");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await requestAPI.updateRequestStatus(id, { status });
            setMessage(`Request ${status.toLowerCase()} successfully`);
            fetchPendingRequests();
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${status.toLowerCase()} request`);
        }
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Header>
                    <h2>Pending Access Requests</h2>
                </Card.Header>
                <Card.Body>
                    {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
                    {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

                    {loading ? (
                        <p>Loading requests...</p>
                    ) : requests.length === 0 ? (
                        <p>No pending requests found.</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Software</th>
                                    <th>Access Type</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.user.username}</td>
                                        <td>{request.software.name}</td>
                                        <td>
                                            <Badge bg={
                                                request.accessType === "Read" ? "info" :
                                                    request.accessType === "Write" ? "warning" : "danger"
                                            }>
                                                {request.accessType}
                                            </Badge>
                                        </td>
                                        <td>{request.reason}</td>
                                        <td>
                                            <Badge bg={
                                                request.status === "Pending" ? "secondary" :
                                                    request.status === "Approved" ? "success" : "danger"
                                            }>
                                                {request.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleUpdateStatus(request.id, "Approved")}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(request.id, "Rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </td>
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

export default PendingRequests; 