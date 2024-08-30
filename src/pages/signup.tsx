import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUser } from '@/services/api';

const SignupPage: React.FC = () => {
    const validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .required('Required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values: { first_name: string; last_name: string; email: string; password: string; confirmPassword: string }) => {
        const { confirmPassword, first_name, last_name, email, ...rest } = values; // Remove confirmPassword and prepare user data

        const userData = {
            ...rest,
            first_name,
            last_name,
            email,
            username: email,
             // Create username from first and last names
        };

        console.log("DATA", userData);
        

        try {
            await createUser(userData); // Chama a API para criar o usuário
            alert('User created successfully!');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                {/* <h2 className="text-2xl font-bold mb-0 text-center">Sign Up</h2> */}
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <Field
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <Field
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;