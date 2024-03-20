import * as Yup from 'yup';

export const validationSignUp = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short')
    .max(50, 'Too Long!')
    .required('Username is required')
    .matches(/^[^\s]+$/, 'Username cannot contain spaces')
    .matches(/^[^\d]/, 'Username cannot start with a number'),
  firstName: Yup.string()
    .min(4, 'Too Short')
    .max(50, 'Too Long!')
    .required('First name is required')
    .matches(/^[^\s]+$/, 'First name cannot contain spaces'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[^\s]+$/, 'Last name cannot contain spaces'),
  phoneNo: Yup.string().required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Must be a valid email',
    )
    .matches(/^[^\s]+$/, 'Email cannot contain spaces'),
});

export const validationUserAdressInfo = Yup.object().shape({
  zipCode: Yup.string().required('zipCode is required'),
});

export const validationUserPassword = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password length should be 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(8, 'Confirm password must be at least 8 characters')
});
export const validationUserLogin = Yup.object().shape({
  email: Yup.string()
    .email('Email is required')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Must be a valid email',
    )
    .matches(/^[^\s]+$/, 'Email cannot contain spaces'),
  password: Yup.string().required('Password is required'),
});

export const validationforgetEmail = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Must be a valid email',
    )
    .matches(/^[^\s]+$/, 'Email cannot contain spaces'),
});

export const zipCodeValidation = Yup.object().shape({
  zipCode: Yup.string()
    .min(4, 'Zip code should have more than 3 characters')
    .required('Zip code is required'),
});

export const validationSettingsProfile = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short')
    .max(50, 'Too Long!')
    .required('Username is required')
    .matches(/^[^\s]+$/, 'Username cannot contain spaces')
    .matches(/^[^\d]/, 'Username cannot start with a number'),
  firstName: Yup.string()
    .min(4, 'Too Short')
    .max(50, 'Too Long!')
    .required('First name is required')
    .matches(/^[^\s]+$/, 'First name cannot contain spaces'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[^\s]+$/, 'Last name cannot contain spaces'),
  phoneNo: Yup.string().required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Must be a valid email',
    )
    .matches(/^[^\s]+$/, 'Email cannot contain spaces'),
  zipCode: Yup.string()
    .min(4, 'Zip code should have more than 4 characters')
    .required('Zip code is required'),
});

export const validationForgetConfirmPassword = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password length should be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .min(8, 'Password length should be at least 8 characters'),
});

export const validationforgetPhone = Yup.object().shape({
  phone: Yup.string()
    .required('phone Number is required')
    .min(8, 'Password length should be at least 8 characters'),
})
