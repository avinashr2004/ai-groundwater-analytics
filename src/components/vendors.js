import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Header from './Header1'; // Import your header component
import './ManageVendors.css'; // Import the CSS file

const ManageVendors = () => {
  const [vendors, setVendors] = useState([
    {
      vendorId: '21001',
      name: 'Aimee',
      location: 'Liu',
      email: 'ututorpro@gmail.com',
      contact: '6479949992',
      username: 'Aimee000',
      lastLoggedIn: '2021-05-29',
    },
    {
      vendorId: '21002',
      name: 'John Doe',
      location: 'New York',
      email: 'john@example.com',
      contact: '1234567890',
      username: 'johndoe',
      lastLoggedIn: '2021-06-01',
    },
    {
      vendorId: '21003',
      name: 'Jane Smith',
      location: 'Los Angeles',
      email: 'jane@example.com',
      contact: '0987654321',
      username: 'janesmith',
      lastLoggedIn: '2021-06-05',
    },
    {
      vendorId: '21004',
      name: 'Mike Johnson',
      location: 'Chicago',
      email: 'mike@example.com',
      contact: '5555555555',
      username: 'mikej',
      lastLoggedIn: '2021-06-10',
    },
    {
      vendorId: '21005',
      name: 'Emily Davis',
      location: 'Miami',
      email: 'emily@example.com',
      contact: '4444444444',
      username: 'emilyd',
      lastLoggedIn: '2021-06-15',
    },
    {
      vendorId: '21006',
      name: 'Michael Brown',
      location: 'Houston',
      email: 'michael@example.com',
      contact: '3333333333',
      username: 'michaelb',
      lastLoggedIn: '2021-06-20',
    },
    {
      vendorId: '21007',
      name: 'Sarah Wilson',
      location: 'Phoenix',
      email: 'sarah@example.com',
      contact: '2222222222',
      username: 'sarahw',
      lastLoggedIn: '2021-06-25',
    },
    {
      vendorId: '21008',
      name: 'David Miller',
      location: 'Dallas',
      email: 'david@example.com',
      contact: '1111111111',
      username: 'davidm',
      lastLoggedIn: '2021-06-30',
    },
    {
      vendorId: '21009',
      name: 'Laura Garcia',
      location: 'San Francisco',
      email: 'laura@example.com',
      contact: '6666666666',
      username: 'laurag',
      lastLoggedIn: '2021-07-05',
    },
    {
      vendorId: '21010',
      name: 'Daniel Martinez',
      location: 'Seattle',
      email: 'daniel@example.com',
      contact: '7777777777',
      username: 'danielm',
      lastLoggedIn: '2021-07-10',
    },
    // Duplicating for a total of 60 entries with variations
    ...Array.from({ length: 60 }, (_, index) => ({
      vendorId: `210${index + 11}`,
      name: `Vendor ${index + 11}`,
      location: `Location ${index + 11}`,
      email: `vendor${index + 11}@example.com`,
      contact: `555-000-${String(index + 1000).slice(-4)}`,
      username: `vendor${index + 11}`,
      lastLoggedIn: `2021-07-${String((index % 30) + 1).padStart(2, '0')}`,
    })),
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newVendor, setNewVendor] = useState({
    vendorId: '',
    name: '',
    location: '',
    email: '',
    contact: '',
    username: '',
    lastLoggedIn: '',
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setNewVendor({
      vendorId: '',
      name: '',
      location: '',
      email: '',
      contact: '',
      username: '',
      lastLoggedIn: '',
    });
  };

  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  const handleAddOrEditVendor = () => {
    if (isEditing) {
      const updatedVendors = [...vendors];
      updatedVendors[editIndex] = newVendor;
      setVendors(updatedVendors);
    } else {
      setVendors([...vendors, newVendor]);
    }
    handleCloseModal();
  };

  return (
    <div>
      <Header />
      <div className="vendors-container">
        <h3>Manage Vendors</h3>
        <Button variant="primary" onClick={handleShowModal}>
          Add Vendor
        </Button>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vendor ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Username</th>
                <th>Last Logged In</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index}>
                  <td>{vendor.vendorId}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.location}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.contact}</td>
                  <td>{vendor.username}</td>
                  <td>{vendor.lastLoggedIn}</td>
                  <td>
                    <Button variant="warning" onClick={() => { /* Edit vendor logic */ }}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => { /* Delete vendor logic */ }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Vendor' : 'Add Vendor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVendorId">
              <Form.Label>Vendor ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Vendor ID"
                name="vendorId"
                value={newVendor.vendorId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newVendor.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={newVendor.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newVendor.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact"
                name="contact"
                value={newVendor.contact}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={newVendor.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastLoggedIn">
              <Form.Label>Last Logged In</Form.Label>
              <Form.Control
                type="date"
                name="lastLoggedIn"
                value={newVendor.lastLoggedIn}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrEditVendor}>
            {isEditing ? 'Update Vendor' : 'Add Vendor'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageVendors;
