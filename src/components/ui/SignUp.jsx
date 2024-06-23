import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import { useState } from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10">
        <div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign Up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign in now
            </Link>
          </p>
          {error && <p className="py-2 text-center text-red-600">{error}</p>}
          <form onSubmit={handleSubmit(create)} className="mt-8">
            <div className="flex flex-col space-y-5">
              <Input
                label="Name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+)+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" text="Sign Up" className="self-center" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
