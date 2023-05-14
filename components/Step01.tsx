/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Form } from '@unform/web';
import { useRegisterData } from '../context/register';
import Input from './Inputs/InputDefault';
import * as Yup from 'yup';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
export const siteTitle = 'Step 1 | Enter Your Info';

interface FormFilds {
  hcode: number;
  pcode: number;
  mobile: number;
  phone: number;
}

const numRegex = /^[A-Za-z]+$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = Yup.object().shape({
  code_upper_head: Yup.string()
    .required()
    .test(
      'len',
      'This field must be larger than 3 characters!',
      (val: any) => val.length > 3
    )
    .test(
      'len',
      'This Field CanNot Empty or Just Type Characters!',
      (val: any) => /^[A-z]+$/.test(val)
    ),
  identification_code: Yup.string()
    .required()
    .test(
      'len',
      'This field must be larger than 3 characters!',
      (val: any) => val.length > 3
    )
    .test(
      'len',
      'This Field CanNot Empty or Just Type Characters!',
      (val: any) => /^[A-z]+$/.test(val)
    ),
  mobile: Yup.string()
    .required()
    .test(
      'len',
      'This Field CanNot Empty or Just Type 10 Numbers!',
      (val: any) => val.length === 10
    )
    .test(
      'len',
      'This Field CanNot Empty or Just Type 10 Numbers!',
      (val: any) => /^[0-9]+$/.test(val)
    ),
  phone_number: Yup.string()
    .notRequired()
    .test('len', 'Just Type 11 Numbers!', (val: any) => val.length === 11)
    .test('len', 'Just Type 11 Numbers!', (val: any) => /^[0-9]+$/.test(val)),
});

export default function Step1({ formStep, nextFormStep, prevFormStep }: any) {
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

  const [upperLoading, setUpperLoading] = useState(false);
  const [identiLoading, setidentiLoading] = useState(false);
  const [mobileLoading, setmobileLoading] = useState(false);
  const [upperCode, setUpperCode] = useState(0);
  const [identiCode, setIdentiCode] = useState(0);
  const [mobileCode, setMobileCode] = useState(0);

  async function handleSubmit(data: any) {
    (formRef as any).current.setErrors({});
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      nextFormStep();
      setFormValues({
        code_upper_head: data.code_upper_head,
        identification_code: data.identification_code,
        mobile: data.mobile,
        phone_number: data.phone_number,
      });
      
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
          <h2 className="mt-6 text-3xl font-bold text-gray-700">
            Enter Your Info
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Step One: Specifying Personal Information
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
                    Name*
                  </label>
                  <Input
                    name="code_upper_head"
                    type="code_upper_head"
                    // value={setInputs}
                    loading={upperLoading}
                    checks={upperCode == 400}
                    // onChange={setInputs}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Family*
                  </label>
                  <Input
                    name="identification_code"
                    type="identification_code"
                    loading={identiLoading}
                    checks={identiCode == 400}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    National Code*
                  </label>
                  <Input
                    name="mobile"
                    type="text"
                    loading={mobileLoading}
                    checks={mobileCode == 400}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <div className="relative mt-1 rounded-md">
                    <Input name="phone_number" type="phone_number" />
                  </div>
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
                    Prev Step
                  </button>
                  <button
                    type="submit"
                    className="group col-span-2 duration-200 mt-5 relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 right-0 flex items-center pl-3">
                      <ChevronRightIcon
                        className="h-5 w-5 text-green-500 group-hover:text-green-400"
                        aria-hidden="true"
                      />
                    </span>
                    Next Step
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
