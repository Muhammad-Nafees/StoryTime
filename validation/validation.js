import * as Yup from 'yup';

export const validationSignUp = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short').max(50, 'Too Long!').required('User name is required').matches(
        /^[^\s]+$/,
        'User name cannot contain spaces'
    ),
    firstName: Yup.string().min(4, 'Too Short').max(50, 'Too Long!').required('First name is required').matches(
        /^[^\s]+$/,
        'First name cannot contain spaces'
    ),
    lastName: Yup.string().required("Last name is required").matches(
        /^[^\s]+$/,
        'Last name cannot contain spaces'
    ),
    phoneNo: Yup.string().required('Phone number is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            'Must be a valid email'
        ).matches(
            /^[^\s]+$/,
            'Email cannot contain spaces'
        ),
});

export const validationUserAdressInfo = Yup.object().shape({
    zipCode: Yup.string().required('zipCode is required')
})
