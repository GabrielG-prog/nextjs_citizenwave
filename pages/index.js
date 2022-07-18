import Link from 'next/link';
import nookies from 'nookies';
import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Index = (props) => {
  const [allData] = useState(props.accounts.content);
  const [filteredData, setFilteredData] = useState(allData);

  const emailInput = (event) => {
    let value = event.target.value;
    let result = [];

    result = allData.filter((data) => {
      return data.email.search(value) != -1;
    });
    setFilteredData(result);
  };

  const idInput = (event) => {
    let value = event.target.value;

    let result = [];

    result = allData.filter((data) => {
      return data.id.search(value) != -1;
    });
    setFilteredData(result);
  };

  const statusSelect = (event) => {
    let value = event.target.value;

    let result = [];

    result = allData.filter((data) => {
      return data.status.search(value) != -1;
    });
    setFilteredData(result);
  };

  const roleSelect = (event) => {
    let value = event.target.value;

    let result = [];

    result = allData.filter((data) => {
      return data.authority.search(value) != -1;
    });
    setFilteredData(result);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <input
                list="id_data"
                type="search"
                placeholder="Id"
                onChange={idInput}
                className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              />
              <datalist id="id_data">
                {allData.map((item) => (
                  <option key={item.id} value={item.id} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <input
                list="email_data"
                type="search"
                placeholder="Email"
                onChange={emailInput}
                className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              />
              <datalist id="email_data">
                {allData.map((item) => (
                  <option key={item.id} value={item.email} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <select
                onChange={(event) => statusSelect(event)}
                className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              >
                <option value="">Statut</option>
                <option value="NEW">Nouveau</option>
                <option value="ACTIVE">Active</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <select
                onChange={(event) => roleSelect(event)}
                className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              >
                <option value="">Rôle</option>
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mt-8 justify-center overflow-x-scroll">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="block w-full">
            <table className="items-center w-full bg-white border-collapse rounded shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Id
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Autorisation
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((value) => (
                  <tr key={value.id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <Link href={`/account/${value.id}`}>
                        <a>{value.id}</a>
                      </Link>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {value.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {value.authority}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {value.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br></br>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">15</span> of{' '}
              <span className="font-medium">50</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                2
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              >
                3
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              >
                4
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let cookies = nookies.get(context).user_token;

  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(
      `${process.env.API_ENDPOINT}/v1/admin/accounts`,
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );

    const accounts = res.data;

    if (!accounts) {
      return {
        notFound: true,
      };
    }

    return { props: { accounts } };
  } catch (error) {
    console.log(error);
  }
}

export default withRouter(Index);
