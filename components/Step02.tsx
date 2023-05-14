/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Form } from '@unform/web';
import { useRegisterData } from '../context/register';
import Input from './Inputs/InputDefault';
import * as Yup from 'yup';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
export const siteTitle = 'Step 2 | Enter Your Login Data';

interface FormFilds {
  hcode: number;
  pcode: number;
  mobile: number;
  phone: number;
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
    [Yup.ref('password'), null],
    'Password Does Not Match!'
  ),
  email: Yup.string()
    .required('')
    .min(8, 'The length of this field is at least 8 characters'),
});

export default function Step2({ formStep, nextFormStep, prevFormStep }: any) {
  function preStepClick() {
    prevFormStep();
  }

  var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ],
    fixNumbers = function (str: any) {
      if (typeof str === 'string') {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    };

  const { setFormValues }: any = useRegisterData();

  const formRef = useRef(null);
  const hCode = useRef({});

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailCode, setEmailCode] = useState(null);
  const [email, setEmail] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameCode, setUsernameCode] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [register, setRegister] = useState(0);

  async function handleSubmit(data: any) {
    (formRef as any).current.setErrors({});
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      setFormValues({
        code_upper_head: data.code_upper_head,
        identification_code: data.identification_code,
        mobile: data.mobile,
        phone_number: data.phone_number,
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
                    <Input name="email" type="email" />
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
                    <Input name="username" type="text" />
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
                    <Input name="password" type="password" />
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
                    className="mr-2 block text-sm text-gray-900"
                  >
                    <Link className="text-green-600" href="/terms">
                      Terms & Condisionts
                    </Link>
                    Accept
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
                  <button
                    type="submit"
                    className="group col-span-2 duration-200 mt-5 relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {registerLoading == false && (
                        <ChevronRightIcon
                          className="h-5 w-5 text-green-500 group-hover:text-green-400"
                          aria-hidden="true"
                        />
                      )}

                      {registerLoading == true && (
                        <svg
                          className="inline animate-spin h-5 w-5 text-red"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                    </span>
                    {registerLoading == true && (
                      <span>در حال ارتباط با سرور...</span>
                    )}
                    {registerLoading == false && <span>تکمیل ثبت نام</span>}
                    {register == 400 && <span>دوباره تلاش کنید!</span>}
                  </button>
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
                    مرحله قبل
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <span className="font-light text-small">
                    تا آخرین مرحله ثبت نام هرگز مرورگر خود را رفرش ندهید.
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
