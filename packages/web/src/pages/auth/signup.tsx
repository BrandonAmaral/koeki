import { useCallback, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik, Field } from 'formik';

import useRequest from '../../hooks/useRequest';
import { Container, Content } from '../../styles/pages/SignUp';
import authRouting from '../../components/authRouting';

interface RegisterFormData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

const SignUp = () => {
  const { makeRequest } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = useCallback(async (data: RegisterFormData) => {
    await makeRequest(data);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    password_confirm: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords must match',
    ),
  });

  return (
    <Container>
      <Content>
        <h1>Create an account</h1>
        <Formik
          initialValues={{
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            confirm_password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnMount={false}
          validateOnChange={false}
        >
          <Form>
            <label>Firstname</label>
            <Field name="firstname" autoComplete="off" />
            <ErrorMessage name="firstname" />

            <label>Lastname</label>
            <Field name="lastname" autoComplete="off" />
            <ErrorMessage name="lastname" />

            <label>Email</label>
            <Field name="email" autoComplete="off" />
            <ErrorMessage name="email" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />

            <label>Confirm Password</label>
            <Field name="password_confirm" type="password" />
            <ErrorMessage name="password_confirm" />

            <Link href="/auth/signin">Already have an account?</Link>

            <button type="submit">Register</button>
          </Form>
        </Formik>
      </Content>
    </Container>
  );
};

export default authRouting(SignUp, 'public');
