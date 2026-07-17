import { Lock } from "lucide-react";
import { useState } from "react";
import { updatePassword } from "../../api/userApi.js";

export default function SecuritySection() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await updatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess("Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8">
      <h2 className="text-2xl font-semibold">Security</h2>

      <p className="text-gray-500 mt-2">
        Change your password to keep your account secure.
      </p>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3">
          {success}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-500">Current Password</label>

          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">New Password</label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <button className="mt-4 bg-black text-white rounded-xl px-7 py-3 hover:bg-gray-800 transition flex items-center gap-2">
          <Lock size={18} />
          Update Password
        </button>
      </form>
    </div>
  );
}
