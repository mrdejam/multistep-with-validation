import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
// import { Container, InputField, Error } from './styles';

export default function Input({ name, def, checks, loading, type }: any) {
  const inputRef = useRef(null);

  const {
    fieldName,
    defaultValue = def,
    registerField,
    error,
  } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <div>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            name={fieldName}
            ref={inputRef}
            id={fieldName}
            defaultValue={defaultValue}
            autoComplete="off"
            type={type}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
          {checks && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
          {loading == true && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-red"
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
            </div>
          )}
        </div>
      </div>
      <div className="text-red-500 text-xs text-left">{error}</div>
    </div>
  );
}
