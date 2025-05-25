import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { softwareAPI } from '../../api/software';
import { requestAPI } from '../../api/request';
import RequestAccessForm from '../../components/user/RequestAccessForm';

const RequestAccess = () => {
    const { token } = useAuth();
    const [softwareList, setSoftwareList] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSoftware = async () => {
            try {
                const data = await softwareAPI.getAll();
                setSoftwareList(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch software list');
            }
        };
        fetchSoftware();
    }, []);

    const handleSubmit = async (softwareId, accessType, reason) => {
        try {
            await requestAPI.create({ softwareId, accessType, reason,token });
            setSuccess('Request submitted successfully!');
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to submit request');
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Request Software Access</h1>
            {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>}
            <RequestAccessForm softwareList={softwareList} onSubmit={handleSubmit} />
        </div>
    );
};

export default RequestAccess;
