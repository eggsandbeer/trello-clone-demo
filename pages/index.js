// import Head from 'next/head';
// import Image from 'next/image';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../reducers/store';

import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';

import { Lanes } from '../components/Lanes/Lanes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// October 23, 2022. Component strucuture Headers/SubHeaders/Body could probably use re-org here.
export default function Home() {
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="flex min-h-screen flex-row bg-gray-100 text-slate-900">
          <Sidebar />
          <main className="main -ml-96 flex w-screen flex-grow flex-col bg-white transition-all duration-150 ease-in md:ml-0">
            <Header />
            <hr className="w-full border-t border-gray-200" />
            <div className="main-content mt-6 mr-12 ml-12 flex flex-grow flex-col">
              {/* <Counter /> */}
              <h2 className="mb-2 text-2xl font-bold text-gray-700">Overview</h2>
              <p className="text-md text-slate-500">
                Edit or modify all cards as you want
              </p>
              <hr className="my-4 w-full border-t border-gray-200" />
              <div className="mt-4 flex flex-grow flex-col">
                <Lanes />
              </div>
            </div>
            <footer className="footer px-4 py-6"></footer>
          </main>
        </div>
      </DndProvider>
    </ReduxProvider>
  );
}
