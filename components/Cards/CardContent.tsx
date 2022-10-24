import { FC, useState, Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { PaperClipIcon } from '@heroicons/react/24/outline';

import { CardForm } from './CardForm';

import { Chiclet } from '../Chiclet/Chiclet';

import { useAppDispatch } from '../../reducers/hooks';
import { removeCard } from '../../reducers/lanesSlice';

export const CardContent: FC<any> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { avatars, name, labels } = card;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div>
          <div className="mb-1 flex">
            <div className="grow">
              <p className="inline-block text-slate-900">{name}</p>
            </div>

            <Menu as="div" className="relative z-20 basis-4 text-left">
              <Menu.Button className="flex cursor-pointer items-end justify-end rounded-md p-1 text-sm hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <EllipsisHorizontalIcon className="max-w-5 h-5 max-h-5 w-5" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-slate-200 ' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm text-slate-800`}
                          onClick={openModal}>
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            dispatch(removeCard({ cardToRemove: card }));
                          }}
                          className={`${
                            active ? 'bg-red-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="mb-5">
            {labels.map((label) => {
              return <Chiclet key={label.id} text={label.name} color={label.color} />;
            })}
          </div>
        </div>
        <div className="flex w-full flex-1">
          {/*TODO Octver 23, 2022. Need refactor if avatar count is huge so doesn't spill out of container */}
          <div className="mt-auto  flex w-full">
            {/* If this was a real NEXTJS app i would 100% being using thier image component */}
            <div className="flex grow items-start">
              {avatars.map(({ id, img }, i) => {
                return (
                  <div key={id} className="relative h-7 w-7">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="max-w-7 -left-2 h-7 max-h-7 w-7 rounded-full border-2 border-white"
                      style={{
                        position: 'relative',
                        left: `-${i * 8}px`
                      }}
                      src={`${img}`}
                      alt="Rounded avatar"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-end justify-end">
              <PaperClipIcon className="mr-1 h-5 w-5" />
              <ArchiveBoxIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Edit Card
                  </Dialog.Title>
                  <div className="mt-6">
                    <CardForm card={card} closeModal={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
