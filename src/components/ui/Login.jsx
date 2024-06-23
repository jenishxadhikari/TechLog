import { useState } from "react";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
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
            Login to your account
          </h2>
          <p className="mt-5 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          {error && <p className="py-2 text-center text-red-600">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5 flex flex-col">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
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
              <Button type="submit" text="Sign In" className="self-center" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
