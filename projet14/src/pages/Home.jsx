import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from './employeeSlice';
import { useNavigate } from 'react-router-dom';

const Home = ({ addEmployee }) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
    errors: {},
    isModalOpen: false,
  });

  const navigate = useNavigate();

  const saveEmployee = () => {
    if (validateForm()) {
      addEmployee({
        firstName: state.firstName,
        lastName: state.lastName,
        dateOfBirth: state.dateOfBirth,
        startDate: state.startDate,
        street: state.street,
        city: state.city,
        state: state.state,
        zipCode: state.zipCode,
        department: state.department,
      });

      console.log('Employee Saved!');

      setState({ ...state, isModalOpen: true });
      
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!/^[a-zA-Z]+$/.test(state.firstName.trim())) {
      errors.firstName = 'First name must be alphabetical.';
    }

    if (!/^[a-zA-Z]+$/.test(state.lastName.trim())) {
      errors.lastName = 'Last name must be alphabetical.';
    }

    const dob = new Date(state.dateOfBirth);
    const today = new Date();
    const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18 || age > 80) {
      errors.dateOfBirth = 'Age must be between 18 and 80.';
    }

    if (state.street.trim() === '') {
      errors.street = 'Please enter a street.';
    }

    if (state.city.trim() === '') {
      errors.city = 'Please enter a city.';
    }

    if (state.state.trim() === '') {
      errors.state = 'Please select a state.';
    }

    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(state.zipCode.trim())) {
      errors.zipCode = 'Zip code must be a 5-digit number.';
    }

    setState({ ...state, errors });

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const closeModal = () => {
    setState({ ...state, isModalOpen: false });
    navigate('/EmployeeListPage');
  };

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
          />
          {state.errors.firstName && (
            <div className="error">{state.errors.firstName}</div>
          )}

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
          {state.errors.lastName && (
            <div className="error">{state.errors.lastName}</div>
          )}

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            type="text"
            id="date-of-birth"
            name="dateOfBirth"
            value={state.dateOfBirth}
            onChange={handleChange}
          />
          {state.errors.dateOfBirth && (
            <div className="error">{state.errors.dateOfBirth}</div>
          )}

          <label htmlFor="start-date">Start Date</label>
          <input
            type="text"
            id="start-date"
            name="startDate"
            value={state.startDate}
            onChange={handleChange}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={state.street}
              onChange={handleChange}
            />
            {state.errors.street && (
              <div className="error">{state.errors.street}</div>
            )}

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={state.city}
              onChange={handleChange}
            />
            {state.errors.city && (
              <div className="error">{state.errors.city}</div>
            )}

            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              value={state.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              {/* Ajoute d'autres options d'État selon tes besoins */}
            </select>
            {state.errors.state && (
              <div className="error">{state.errors.state}</div>
            )}

            <label htmlFor="zip-code">Zip Code</label>
            <input
              type="number"
              id="zip-code"
              name="zipCode"
              value={state.zipCode}
              onChange={handleChange}
            />
            {state.errors.zipCode && (
              <div className="error">{state.errors.zipCode}</div>
            )}
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            value={state.department}
            onChange={handleChange}
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
        </form>

        <button onClick={saveEmployee}>Save</button>

        {/* Modal */}
        {state.isModalOpen && (
          <div className="modal-overlay">
            <div className="modal active">
              <p>Employee Created!</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Fonction pour mapper l'action addEmployee en tant que prop
const mapDispatchToProps = { addEmployee };

// Connecter le composant Home à Redux en utilisant le connecteur
export default connect(null, mapDispatchToProps)(Home);
