import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

const Register = () => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser(data);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50 my-3">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
          <input
            placeholder="Username"
            className="w-full border rounded-xl px-4 py-3"
            {...register("username", {
              required: "Username required",
            })}
          />

          <input
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3"
            {...register("email", {
              required: "Email required",
            })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
            {...register("password", {
              required: "Password required",
              minLength: 6,
            })}
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <a
          href="http://localhost:3000/api/auth/google"
          className="w-full flex justify-center border rounded-xl py-3"
        >
          Register with Google
        </a>
        <div className="mt-3 flex justify-center items-center">
          <Link to="/login" className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-black">
              Login
            </Link>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
