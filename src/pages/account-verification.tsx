import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRequest, useAuth } from "../hooks";

const AccountVerification = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { setAuth } = useAuth();

  const { doRequest } = useRequest({ url: "/verifyEmail", method: "post", body: { email, code } });
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) return;
    const { email } = state;
    if (!email) return;
    setEmail(email);
  }, [state]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, accessToken } = await doRequest();
    setAuth({ user: { ...user, accessToken } });

    navigate("/home");
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Verify your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={onSubmit} method="POST">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                autoComplete="current-Code"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Verify account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountVerification;
