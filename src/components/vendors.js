import React, { useState } from 'react';
import { Table, Button, Form, InputGroup, FormControl, Modal } from 'react-bootstrap';

const ManageVendors = () => {
  // Dummy data for the table
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
    // Add more vendor objects here...
  ]);

  // Modal state for adding and editing
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Determines if we're editing an existing vendor

  // New vendor data (or edited data)
  const [newVendor, setNewVendor] = useState({
    vendorId: '',
    name: '',
    location: '',
    email: '',
    contact: '',
    username: '',
    lastLoggedIn: '',
  });

  const [editIndex, setEditIndex] = useState(null); // Tracks which vendor is being edited

  // Handle modal open/close
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false); // Reset to adding mode
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  // Handle vendor addition or editing
  const handleAddOrEditVendor = () => {
    if (isEditing) {
      // Update the vendor at the editIndex
      const updatedVendors = [...vendors];
      updatedVendors[editIndex] = newVendor;
      setVendors(updatedVendors);
    } else {
      // Add new vendor
      setVendors([...vendors, newVendor]);
    }

    // Reset form and close modal
    handleCloseModal();
  };

  // Handle delete vendor
  const handleDeleteVendor = (index) => {
    const updatedVendors = vendors.filter((_, i) => i !== index);
    setVendors(updatedVendors);
  };

  // Handle edit vendor (open modal with pre-filled data)
  const handleEditVendor = (index) => {
    setIsEditing(true); // Switch to editing mode
    setEditIndex(index); // Track which vendor is being edited
    setNewVendor(vendors[index]); // Pre-fill modal with vendor data
    handleShowModal();
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Manage Vendors</h1>
        <Button variant="primary" onClick={handleShowModal}>Add Vendor</Button>
      </div>

      {/* Filter Inputs */}
      <div className="mb-3">
        <InputGroup className="mb-2">
          <Form.Select>
            <option>Select Location</option>
            {/* Add locations here */}
          </Form.Select>

          <Form.Select>
            <option>Select Name</option>
            {/* Add vendor names here */}
          </Form.Select>

          <Form.Select>
            <option>Select Contact Deadline</option>
            {/* Add deadline options */}
          </Form.Select>

          <Form.Select>
            <option>Select by Most Active</option>
            {/* Add activity filter */}
          </Form.Select>
        </InputGroup>
        {/* Additional Filters */}
        <InputGroup>
          <FormControl placeholder="Vendor ID" />
          <FormControl placeholder="Vendor Name" />
          <FormControl placeholder="Location" />
          <FormControl placeholder="Vendor Email" />
          <FormControl placeholder="Vendor Contact" />
        </InputGroup>
      </div>

      {/* Vendor Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Vendor Name</th>
            <th>Location</th>
            <th>Vendor ID</th>
            <th>Vendor Email</th>
            <th>Vendor Contact</th>
            <th>Username</th>
            <th>Last Logged-in</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr key={index}>
              <td><a href="#">Profile</a></td>
              <td>{vendor.name}</td>
              <td>{vendor.location}</td>
              <td>{vendor.vendorId}</td>
              <td>{vendor.email}</td>
              <td>{vendor.contact}</td>
              <td>{vendor.username}</td>
              <td>{vendor.lastLoggedIn}</td>
              <td>
                <Button variant="info" className="me-2" onClick={() => handleEditVendor(index)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteVendor(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination (optional, if data grows) */}
      <div className="d-flex justify-content-between">
        <span>Showing 1 to {vendors.length} of {vendors.length} entries</span>
        <nav>
          <ul className="pagination">
            <li className="page-item"><Button variant="link">1</Button></li>
            {/* Add pagination links */}
          </ul>
        </nav>
      </div>

      {/* Modal for Adding/Editing Vendor */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Vendor' : 'Add Vendor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formVendorName">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newVendor.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newVendor.location}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVendorId">
              <Form.Label>Vendor ID</Form.Label>
              <Form.Control
                type="text"
                name="vendorId"
                value={newVendor.vendorId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVendorEmail">
              <Form.Label>Vendor Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newVendor.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVendorContact">
              <Form.Label>Vendor Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={newVendor.contact}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newVendor.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastLoggedIn">
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
            {isEditing ? 'Save Changes' : 'Add Vendor'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageVendors;
