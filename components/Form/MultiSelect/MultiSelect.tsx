// TODO October 23, 2022. Should probably break this down into label, input wrapper
// components for more reuseability and consistency.

import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

export const MultiSelect = ({
  id,
  handleChange,
  label,
  name,
  selectedOptions,
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function isSelected(value) {
    return selectedOptions.find((el) => el.id === value.id) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedOptionsUpdated = [
        ...selectedOptions,
        options.find((el) => el.id === value.id)
      ];
      handleChange(selectedOptionsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedOptionsUpdated = selectedOptions.filter((el) => el.id !== value.id);
    handleChange(selectedOptionsUpdated);
    setIsOpen(true);
  }

  return (
    <div className="relative mb-4 w-full">
      <div className="text-sm">
        {selectedOptions.length > 0 && (
          <>Selected: {selectedOptions.map((option) => `${option.name}, `)}</>
        )}
      </div>
      <Listbox
        as="div"
        className="space-y-1"
        value={selectedOptions}
        onChange={(value) => {
          handleSelect(value);
        }}>
        <div className="relative">
          <span className="inline-block w-full rounded-md shadow-sm">
            <Listbox.Button
              className="focus:shadow-outline-blue relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
              onClick={() => setIsOpen(!isOpen)}>
              <span className="block truncate">
                {selectedOptions.length < 1
                  ? 'Select option'
                  : `Selected options (${selectedOptions.length})`}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor">
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Listbox.Button>
          </span>

          <Transition
            unmount={false}
            show={isOpen}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            <Listbox.Options
              static
              className="shadow-xs z-120 max-h-60 overflow-auto rounded-md bg-white py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
              {options.map((option) => {
                const selected = isSelected(option);
                return (
                  <Listbox.Option key={option.id} value={option}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-blue-600 text-white' : 'text-gray-900'
                        } relative cursor-default select-none py-2 pl-8 pr-4`}>
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          } block truncate`}>
                          {option.name}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-blue-600'
                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <label
        // for="floating_email"
        className="text-sm text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600">
        Notification Labels
      </label>
    </div>
  );
};
