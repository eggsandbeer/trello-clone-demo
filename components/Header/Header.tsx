import { FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const Header: FC = () => {
  return (
    <header className="header mt-12 mr-12 ml-12 mb-6">
      <div className="header-content">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-700">Stripe Payments 💳</h1>
        </div>
        <div className="flex flex-row items-center">
          <form className="ml-auto w-80" action="#">
            <div className="relative hidden md:flex">
              <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center">
                <MagnifyingGlassIcon className="h-7 w-7 pl-2  text-slate-300" />
              </div>
              <input
                id="search"
                type="text"
                name="search"
                className="h-10 w-full rounded-md bg-slate-50 stroke-2 pl-10 pr-4 text-sm placeholder-slate-300 focus:border focus:border-gray-600 focus:outline-none sm:text-base"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};
