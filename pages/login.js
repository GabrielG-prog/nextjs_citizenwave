import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useState } from 'react';
//import Image from 'next/image';
import * as React from 'react';
import axios from 'axios';

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const router = useRouter();

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.API_ENDPOINT}/v1/admin/auth/login`,
        {
          email: emailInput,
          password: passwordInput,
        }
      );

      if (response.status === 200) {
        nookies.set(null, 'user_token', response.data.refresh_token, {});
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="absolute w-full h-full">
      {/*<div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>*/}
      <div className="container mx-auto px-4 h-full bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <h4 className="font-medium leading-tight text-5xl mt-0 mb-2 text-white text-center">
              Citizenwave
            </h4>
            <br></br>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small></small>
                </div>
                <br></br>
                <form onSubmit={loginUser}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      required
                      id="email"
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      style={{ transition: 'all .15s ease' }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mot de passe
                    </label>
                    <input
                      required
                      name="password"
                      placeholder="Mot de passe"
                      type="password"
                      id="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      style={{ transition: 'all .15s ease' }}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: 'all .15s ease' }}
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Login.getLayout = (page) => page;
