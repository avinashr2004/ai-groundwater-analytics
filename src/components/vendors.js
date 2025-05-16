import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Header from './Header1';

const styles = {
  container: {
    padding: '2rem',
    background: '#f0f2f5',
    minHeight: 'calc(100vh - 64px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#1e3c72',
    fontSize: '1.75rem',
    fontWeight: '600',
    margin: 0,
  },
  addButton: {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableContainer: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  table: {
    margin: 0,
  },
  tableHeader: {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: 'white',
  },
  tableHeaderCell: {
    padding: '1rem 1.5rem',
    fontWeight: '500',
    border: 'none',
  },
  tableRow: {
    transition: 'background-color 0.2s',
  },
  tableCell: {
    padding: '1rem 1.5rem',
    verticalAlign: 'middle',
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    background: '#f59e0b',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
  },
  deleteButton: {
    background: '#ef4444',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
  },
  modal: {
    borderRadius: '16px',
  },
  modalHeader: {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: 'white',
    border: 'none',
    padding: '1.25rem 1.5rem',
  },
  modalBody: {
    padding: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  formLabel: {
    color: '#4b5563',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  formControl: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    transition: 'border-color 0.2s',
  },
  modalFooter: {
    padding: '1.25rem 1.5rem',
    border: 'none',
  },
};

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
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>Manage Vendors</h3>
          <Button style={styles.addButton} onClick={handleShowModal}>
            Add Vendor
          </Button>
        </div>
        
        <div style={styles.tableContainer}>
          <Table style={styles.table} hover>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableHeaderCell}>Vendor ID</th>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Location</th>
                <th style={styles.tableHeaderCell}>Email</th>
                <th style={styles.tableHeaderCell}>Contact</th>
                <th style={styles.tableHeaderCell}>Username</th>
                <th style={styles.tableHeaderCell}>Last Logged In</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index} style={{
                  ...styles.tableRow,
                  backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white'
                }}>
                  <td style={styles.tableCell}>{vendor.vendorId}</td>
                  <td style={styles.tableCell}>{vendor.name}</td>
                  <td style={styles.tableCell}>{vendor.location}</td>
                  <td style={styles.tableCell}>{vendor.email}</td>
                  <td style={styles.tableCell}>{vendor.contact}</td>
                  <td style={styles.tableCell}>{vendor.username}</td>
                  <td style={styles.tableCell}>{vendor.lastLoggedIn}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <Button 
                        style={styles.editButton}
                        onClick={() => {
                          setIsEditing(true);
                          setEditIndex(index);
                          setNewVendor(vendor);
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        style={styles.deleteButton}
                        onClick={() => {
                          const updatedVendors = vendors.filter((_, i) => i !== index);
                          setVendors(updatedVendors);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header style={styles.modalHeader} closeButton>
            <Modal.Title>{isEditing ? 'Edit Vendor' : 'Add Vendor'}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form>
              {['vendorId', 'name', 'location', 'email', 'contact', 'username', 'lastLoggedIn'].map((field) => (
                <Form.Group style={styles.formGroup} key={field} controlId={`form${field.charAt(0).toUpperCase() + field.slice(1)}`}>
                  <Form.Label style={styles.formLabel}>
                    {field.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + field.split(/(?=[A-Z])/).join(' ').slice(1)}
                  </Form.Label>
                  <Form.Control
                    style={styles.formControl}
                    type={field === 'email' ? 'email' : field === 'lastLoggedIn' ? 'date' : 'text'}
                    placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
                    name={field}
                    value={newVendor[field]}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer style={styles.modalFooter}>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button 
              style={styles.addButton} 
              onClick={handleAddOrEditVendor}
            >
              {isEditing ? 'Update Vendor' : 'Add Vendor'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManageVendors;