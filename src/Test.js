import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const  Test = () => {

    const [isRegistering, setIsRegistering] = useState(true);
    // Add additional fields as needed for registration  
    const initialValues = { username: '', password: '', };
    const onSubmit = (values, { resetForm }) => {
        // Handle form submission logic based on isRegistering state    
        if (isRegistering) {
            // Registration logic     
            console.log('Registering:', values);
        } else {
            // Login logic     

            console.log('Logging in:', values);
        }    // Reset the form after submission    
        resetForm();
    };

    return (
        <>
            <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit}> 
                <Form>            <label htmlFor="username">Username:</label>
                    <Field type="text" id="username" name="username" />
                    <ErrorMessage name="username" component="div" />
                    <label htmlFor="password">Password:</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                    {/* Add additional fields for registration here */}
                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                </Form>
            </Formik>
            <div>
                <p>
                    {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
                    <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Login' : 'Register'}
                    </button>
                </p>
            </div>
        </div>
        </>
    );
};
export default Test;