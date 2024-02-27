import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../redux/employeeSlice';
import statesData from './states.json';
import departmentsData from './departments.json';
import Modal from 'react-customise-modal-bis';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';




const Home = ({ addEmployee }) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    stateOptions: statesData,

    selectedState: null,
    zipCode: '',
    departmentOptions: departmentsData,
    selectedDepartment: null,
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
        state: state.selectedState?.value,
        zipCode: state.zipCode,
        department: state.selectedDepartment?.value,
      });

      console.log('Employee Saved!');
      console.log("ici", state);
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

    // Date of Birth validation
    const dob = state.dateOfBirth ? new Date(state.dateOfBirth) : null;
    const today = new Date();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

    if (!dob || isNaN(dob.getTime()) || dob > today || dob > eighteenYearsAgo) {
      errors.dateOfBirth = 'Please enter a valid date of birth for someone who is 18 years or older.';
    }

    const minBirthYear = 1900; // Ajoutez cette ligne pour définir l'année minimale de naissance

    if (!dob || isNaN(dob.getTime()) || dob > today || dob > eighteenYearsAgo || dob.getFullYear() < minBirthYear) {
      errors.dateOfBirth = 'Please enter a valid date of birth for someone who is 18 years or older and born after 1900.'; // Modifiez le message d'erreur
    }


    // Start Date validation
    const startDate = state.startDate ? new Date(state.startDate) : null;

    if (startDate == null || startDate < eighteenYearsAgo) {
      errors.startDate = 'Please enter a valid start date.';

    }




    if (state.street.trim() === '') {
      errors.street = 'Please enter a street.';
    }

    if (state.city.trim() === '') {
      errors.city = 'Please enter a city.';
    }

    if (!state.selectedState) {
      errors.state = 'Please select a state.';
    }

    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(state.zipCode.trim())) {
      errors.zipCode = 'Zip code must be a 5-digit number.';
    }

    if (!state.selectedDepartment) {
      errors.department = 'Please select a department.';
    }

    setState({ ...state, errors });

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleStateChange = (selectedState) => {
    setState({ ...state, selectedState });
  };

  const handleDepartmentChange = (selectedDepartment) => {
    setState({ ...state, selectedDepartment });
  };

  const closeModal = () => {
    setState({ ...state, isModalOpen: false });

  };
  const handleOkButtonClick = () => { console.log("ferme modal");
  };
  const handleOk = () => {
    // Logique à exécuter lors de l'appui sur le bouton OK de la modale
    console.log("OK button clicked");
    // Redirection vers la page employe
    navigate('/EmployeeListPage');
  };
  const customModalButtons = [
    {
      label: 'OK',
      action: handleOkButtonClick,
    },
  ];

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
          <DatePicker
            id="date-of-birth"
            name="dateOfBirth"
            selected={state.dateOfBirth ? new Date(state.dateOfBirth) : null}
            onChange={(date) => handleChange({ target: { name: 'dateOfBirth', value: date } })}
            dateFormat="MM/dd/yyyy"
          />
          {state.errors.dateOfBirth && (
            <div className="error">{state.errors.dateOfBirth}</div>
          )}

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            id="start-date"
            name="startDate"
            selected={state.startDate ? new Date(state.startDate) : null}
            onChange={(date) => handleChange({ target: { name: 'startDate', value: date } })}
            dateFormat="MM/dd/yyyy"
          />
          {state.errors.startDate && (
            <div className="error">{state.errors.startDate}</div>
          )}
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
            <Select
              id="state"
              name="state"
              value={state.selectedState}
              options={state.stateOptions}
              onChange={handleStateChange}
            />
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
          <Select
            id="department"
            name="department"
            value={state.selectedDepartment}
            options={state.departmentOptions}
            onChange={handleDepartmentChange}
          />
          {state.errors.department && (
            <div className="error">{state.errors.department}</div>
          )}
        </form>

        <button onClick={saveEmployee}>Save</button>


        <Modal
          isOpen={state.isModalOpen}
          onClose={closeModal}
          message="Employee Created"
          buttons={customModalButtons}
          onOk={handleOk}
          textColor="blue"
          modalBackground="white"
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = { addEmployee };

export default connect(null, mapDispatchToProps)(Home);
