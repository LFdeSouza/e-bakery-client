import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/authSlice";
import { IUser } from "../../types/User";

const Signup = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUser>({
    username: "",
    password: "",
    id: Math.random().toString(),
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [invalidInput, setInvalidInput] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData.username || !userData.password) return;
    if (userData.password !== passwordConfirmation) {
      setInvalidInput(true);
      return;
    }
    dispatch(setUser(userData));
    clearForm();
  };

  const clearForm = () => {
    setUserData({
      username: "",
      password: "",
      id: Math.random().toString(),
    });
    setPasswordConfirmation("");
  };

  return (
    <div className=" mx-auto mt-36 flex min-h-[70vh] max-w-7xl flex-col px-28">
      {invalidInput && (
        <div className="top-0 p-2 mb-4 text-center text-white bg-orange-700 rounded-lg">
          Password must match
        </div>
      )}
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
            type="password"
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
              setPasswordConfirmation(e.target.value)
            }
            type="password"
            value={passwordConfirmation}
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

export default Signup;
