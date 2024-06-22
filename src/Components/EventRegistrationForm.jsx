import React, { useState } from 'react'
import './EventRegistrationForm.css'
const useFormValidation = (initialState, validate) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // In JavaScript, e typically stands for event , and target refers to the object where the event was dispatched or triggered.
        const newValue = type === 'checkbox' ? checked : value;
        setValues({
            ...values,
            [name]: newValue,
        });
    }
    const handleBlur = () => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(values, null, 2));
        }
    }

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    }
}




const validate = (values) => {

    let errors = {};
    if (!values.name) {
        errors.name = "Name is required";
    }
    if (!values.email) {
        errors.email = "Email is required";
    }
    if (!values.age) {
        errors.age = "Age is required";
    } else if (values.age <= 0) {
        errors.age = "Invalid age"
    }
    if (values.attendingWithGuest && !values.guestName) {
        errors.guestName = 'Guest Name is required if you are attending with a guest';
    }
    return errors;

}


const EventRegistrationForm = () => {

    const initialState = {
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: ''
    }
    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors
    } = useFormValidation(initialState, validate)

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">
                    Name:
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.name}
                        name="name"
                        placeholder="" />
                    {errors.name && <p>{errors.name}</p>}
                </label>
            </div>
            <div>
                <label htmlFor="">
                    Email:
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        name='email' />
                    {errors.email && <p>{errors.email}</p>}

                </label>
            </div>
            <div>
                <label htmlFor="">
                    Age:
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        name="age"
                        value={values.age}
                        placeholder='' />
                    {errors.age && <p>{errors.age}</p>}

                </label>
            </div>
            <div>
                <label htmlFor="">
                    Are you attending with a guest ?
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        checked={values.attendingWithGuest}
                        name="attendingWithGuest" />
                </label>
            </div>
            {
                values.attendingWithGuest && (
                    <div>
                        <label htmlFor="">
                            Guest Name:
                            <input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.guestName}
                                type="text"
                                name="guestName" />
                            {errors.guestName && <p>{errors.guestName}</p>}

                        </label>
                    </div>
                )
            }
            <button
                type='submit'>Submit</button>
        </form>
    )
}

export default EventRegistrationForm