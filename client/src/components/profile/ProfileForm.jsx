import { Camera } from "lucide-react";
import { useState } from "react";
import { updateUser } from "../../api/userApi.js";

export default function ProfileForm({ user }) {
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone || "",
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    await updateUser(formData);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    await updateUser(form);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-3xl shadow-sm border p-8 mt-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Personal Information</h2>

          <p className="text-gray-500 mt-1">Update your account information.</p>
        </div>

        <input
          type="file"
          accept="image/*"
          hidden
          id="avatar"
          onChange={handleUpload}
        />

        <button
          type="button"
          onClick={() => document.getElementById("avatar").click()}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <Camera size={18} />
          Upload
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="text-sm text-gray-500">Username</label>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-500">Phone Number</label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
          Save Changes
        </button>
      </div>
    </form>
  );
}
