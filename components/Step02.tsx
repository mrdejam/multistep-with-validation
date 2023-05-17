import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Form } from '@unform/web';
import { useFormData } from '../context';
import Input from './Inputs/InputDefault';
import * as Yup from 'yup';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
export const siteTitle = 'Step 2 | Enter Your Login Data';

interface FormFilds {
  email: String;
  username: String;
  password: String;
  verifyPassword: String;
}

const nameRegex = /^[A-Za-z]+$/;
const schema = Yup.object().shape({
  username: Yup.string()
    .required()
    .matches(nameRegex, 'Just Enter English Characters')
    .max(15, 'Characters < 15')
    .min(5, 'Characters > 5'),
  password: Yup.string()
    .required()
    .min(8, 'Password > 8')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Your Password Is Weakly!'
    ),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password')],
    'Password Does Not Match!'
  ),
  email: Yup.string()
    .required('')
    .min(8, 'The length of this field is at least 8 characters'),
});

export default function Step2({ nextFormStep, prevFormStep }: any) {
  function preStepClick() {
    prevFormStep();
  }
  const { data }: any = useFormData();
  const { setFormValues }: any = useFormData();
  const formRef = useRef(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(data: FormFilds) {
    (formRef as any).current.setErrors({});
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      setFormValues({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      nextFormStep();
    } catch (err) {
      const validationErrors: any = {};
      if (err instanceof Yup.ValidationError) {
        // Validation failed - do show error
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        (formRef as any).current.setErrors(validationErrors);
      }
    }
  }
  useEffect(() => {
    setEmail(data.email);
    setUsername(data.username);
    setPassword(data.password);
  }, [data.email, data.password, data.username]);

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="text-center mx-auto max-w-sm">
        <div>
          <Link href="https://dejam.ir">
            <img
              className="h-12 inline"
              src="https://drive.google.com/uc?export=view&id=1--tbj0aF0r0LoukM26gQg9bR7jBNbgiS"
              alt="mrdejam"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-700">Login Info</h2>
          <p className="mt-2 text-sm text-gray-600">
            Step 2: Set Username & Password For Login
          </p>
        </div>
        <div className="mt-8">
          <div>
            <div className="mt-6 relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500"> </span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="mt-6 text-left space-y-7">
              <Form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email*
                  </label>

                  <div className="relative mt-1 rounded-md">
                    <Input name="email" type="email" def={email} />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    UserName*
                  </label>

                  <div className="relative mt-1 rounded-md">
                    <Input name="username" type="text" def={username} />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password*
                  </label>

                  <div className="relative mt-1 rounded-md">
                    <Input name="password" type="password" def={password} />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verify Password*
                  </label>

                  <div className="relative mt-1 rounded-md">
                    <Input name="confirm_password" type="password" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    <Link className="text-green-600" href="/terms">
                      Terms & Condisionts
                    </Link>
                    Accept
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
                  <button
                    onClick={preStepClick}
                    className="group duration-200 mt-5 relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pr-3">
                      <ChevronLeftIcon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="group col-span-2 duration-200 mt-5 relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3"></span>
                    <span>Submit</span>
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <span className="font-light text-small">
                    Dont Refresh Your Browser!
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
