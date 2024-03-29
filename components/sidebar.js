import React from 'react';
import Link from 'next/link';
import { MenuIcon, LogoutIcon, XIcon } from '@heroicons/react/solid';

export default function Sidebar({ handleLogout }) {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-cyan-50 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <MenuIcon className="h-5 w-5 text-black-500" />
          </button>
          {/* Brand */}
          <Link href={'/'}>
            <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              Citizenwave admin
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative"> </li>
            <li className="inline-block relative">
              <LogoutIcon
                onClick={handleLogout}
                className="h-5 w-5 text-black-500"
              />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href={'/'}>
                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      CITIZENWAVE ADMIN
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <XIcon className="h-5 w-5 text-black-500" />
                  </button>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                {' '}
                <Link href={'/organizations'}>
                  <a className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    Organisations
                  </a>
                </Link>
              </li>

              <li className="items-center">
                {' '}
                <Link href={'/themes'}>
                  <a className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    Thèmes
                  </a>
                </Link>
              </li>
              <li className="items-center">
                {' '}
                <Link href={'/themes'}>
                  <a className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    Idée
                  </a>
                </Link>
              </li>
              <li className="items-center">
                {' '}
                <Link href={'/themes'}>
                  <a className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    Listes
                  </a>
                </Link>
              </li>
              <li className="items-center">
                {' '}
                <Link href={'/themes'}>
                  <a className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    profiles
                  </a>
                </Link>
              </li>
              <li className="items-center">
                {' '}
                <Link href={'/themes'}>
                  <a className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    Commentaires
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
