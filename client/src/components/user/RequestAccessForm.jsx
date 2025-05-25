import { useState, useEffect } from 'react';

const RequestAccessForm = ({ softwareList, onSubmit }) => {
    const [selectedSoftware, setSelectedSoftware] = useState('');
    const [accessType, setAccessType] = useState('');
    const [reason, setReason] = useState('');
    const [availableAccessTypes, setAvailableAccessTypes] = useState([]);

    useEffect(() => {
        const selected = softwareList.find(s => s.id.toString() === selectedSoftware);
        if (selected) {
            setAvailableAccessTypes(selected.accessLevels || []);
        } else {
            setAvailableAccessTypes([]);
        }
    }, [selectedSoftware, softwareList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedSoftware || !accessType || !reason) return;
        onSubmit(selectedSoftware, accessType, reason);
        setSelectedSoftware('');
        setAccessType('');
        setReason('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Software</label>
                <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedSoftware}
                    onChange={(e) => setSelectedSoftware(e.target.value)}
                    required
                >
                    <option value="">-- Select Software --</option>
                    {softwareList.map(software => (
                        <option key={software.id} value={software.id}>
                            {software.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Access Type</label>
                <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={accessType}
                    onChange={(e) => setAccessType(e.target.value)}
                    required
                    disabled={!selectedSoftware}
                >
                    <option value="">-- Select Access Type --</option>
                    {availableAccessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Reason for Access</label>
                <textarea
                    className="w-full border border-gray-300 rounded p-2"
                    rows="4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Explain why you need access"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit Request
            </button>
        </form>
    );
};

export default RequestAccessForm;
