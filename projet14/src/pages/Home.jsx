import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../redux/employeeSlice';

import Modal from '../components/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const Home = ({ addEmployee }) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    stateOptions: [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AS', label: 'American Samoa' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'DC', label: 'District Of Columbia' },
      { value: 'FM', label: 'Federated States Of Micronesia' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'GU', label: 'Guam' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MH', label: 'Marshall Islands' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'MP', label: 'Northern Mariana Islands' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PW', label: 'Palau' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'PR', label: 'Puerto Rico' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VI', label: 'Virgin Islands' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ],

    selectedState: null,
    zipCode: '',
    departmentOptions: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Human Resources', label: 'Human Resources' },
      { value: 'Legal', label: 'Legal' },
    ],
    selectedDepartment: null,
    errors: {},
    isModalOpen: false,
  });

  //const navigate = useNavigate();

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
  

  const customModalButtons = [
    // {
    //   label: 'Cancel',
    //  color: 'red',
    //   action: () => closeModal(),
    //  },
    {
      label: 'OK',
       color: 'green',
      action: () => {
        closeModal();
      },
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

      {/*  <Modal
          isOpen={state.isModalOpen}
          message="Employee Created!"
          buttons={customModalButtons}
          onClose={closeModal} // Fournir la fonction onClose
          color="blue"
          background="white"
          /> */}
        <Modal
        isOpen={state.isModalOpen}  />
    
      </div>
    </div>
  );
};

const mapDispatchToProps = { addEmployee };

export default connect(null, mapDispatchToProps)(Home);
