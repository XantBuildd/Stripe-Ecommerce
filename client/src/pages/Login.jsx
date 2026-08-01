import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center">Welcome Back 👋</h1>

        <p className="text-center text-gray-500 mt-3">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <input
              placeholder="Email"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] transition"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <a
          href="stripe-ecommerce-production.up.railway.app/api/auth/google"
          className="w-full flex justify-center items-center gap-3 border rounded-xl py-3 hover:bg-gray-50 transition"
        >
          Continue with Google
        </a>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-black">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
