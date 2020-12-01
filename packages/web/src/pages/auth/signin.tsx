import { useCallback } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import authRouting from '../../components/authRouting';
import useRequest from '../../hooks/useRequest';
import { Container, Content } from '../../styles/pages/SignIn';

interface LoginFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { makeRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = useCallback(async (data: LoginFormData) => {
    await makeRequest(data);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Container>
      <Content>
        <h1>Welcome</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnMount={false}
          validateOnChange={false}
        >
          <Form>
            <label>Email</label>
            <Field name="email" autoComplete="off" />
            <ErrorMessage name="email" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />

            <Link href="/auth/signup">Register</Link>

            <button type="submit">Enter</button>
          </Form>
        </Formik>
      </Content>
    </Container>
  );
};

export default authRouting(SignIn, 'public');
