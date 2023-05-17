import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Form } from '@unform/web';
import { useFormData } from '../context';
import Input from './Inputs/InputDefault';
import * as Yup from 'yup';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export const siteTitle = 'Step 1 | Enter Your Info';

interface FormFields {
  name: String;
  family: String;
  nationalCode: number;
  phoneNumber: number;
}

const schema = Yup.object().shape({
  name: Yup.string()
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
  family: Yup.string()
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
  nationalCode: Yup.string()
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
  phoneNumber: Yup.string()
    .notRequired()
    .test('len', 'Just Type 11 Numbers!', (val: any) => val.length === 11)
    .test('len', 'Just Type 11 Numbers!', (val: any) => /^[0-9]+$/.test(val)),
});

export default function Step1({ nextFormStep, prevFormStep }: any) {
  function preStepClick() {
    prevFormStep();
  }
  const { data }: any = useFormData();
  const { setFormValues }: any = useFormData();
  const formRef = useRef(null);

  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [national, setNational] = useState();
  const [phone, setPhone] = useState();

  async function handleSubmit(data: FormFields) {
    (formRef as any).current.setErrors({});
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      nextFormStep();
      setFormValues({
        name: data.name,
        family: data.family,
        nationalCode: data.nationalCode,
        phoneNumber: data.phoneNumber,
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

  useEffect(() => {
    setName(data.name);
    setFamily(data.family);
    setNational(data.nationalCode);
    setPhone(data.phoneNumber);
  }, [data.family, data.name, data.nationalCode, data.phoneNumber]);

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
                  <Input name="name" type="text" def={name} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Family*
                  </label>
                  <Input name="family" type="text" def={family} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    National Code*
                  </label>
                  <Input name="nationalCode" type="text" def={national} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="success"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <div className="relative mt-1 rounded-md">
                    <Input name="phoneNumber" type="text" def={phone} />
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
