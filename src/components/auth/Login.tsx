import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  };
  return (
    <div className="mx-auto mt-36 flex min-h-[70vh] max-w-7xl flex-col px-28">
      <form onSubmit={onSubmit} className="w-1/2 mx-auto">
        <h2 className="mb-10 text-3xl font-semibold text-mainOrange">
          Sign up
        </h2>
        <div className="flex flex-col w-full mb-4 ">
          <label htmlFor="username" className="text-lg text-gray-800">
            Username
          </label>
          <input
            id="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, username: e.target.value })
            }
            value={userData.username}
            type="text"
            className="w-full rounded-lg border border-gray-400 p-1.5 px-4"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="password" className="text-lg text-gray-800">
            Password
          </label>
          <input
            id="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, password: e.target.value })
            }
            type="text"
            value={userData.password}
            className="w-full rounded-lg border border-gray-400 p-1.5 px-4"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col w-full mb- ">
          <label
            htmlFor="passwordConfirmation"
            className="text-lg text-gray-800"
          >
            Confirm password
          </label>
          <input
            id="passwordConfirmation"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, passwordConfirmation: e.target.value })
            }
            type="text"
            value={userData.passwordConfirmation}
            className="w-full rounded-lg border border-gray-400 p-1.5 px-4"
            placeholder="passwordConfirmation"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 px-4 mt-5 text-white rounded-lg bg-mainOrange hover:bg-orange-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
