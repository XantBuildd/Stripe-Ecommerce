import { useNavigate } from "react-router-dom";
import { User, Package, Shield, LogOut, MapPin } from "lucide-react";
import { updateUser } from "../../api/userApi.js";
import { logoutUser as logout } from "../../api/authApi.js";

const menu = [
  {
    id: "profile",
    title: "Profile",
    icon: User,
  },
  {
    id: "orders",
    title: "Orders",
    icon: Package,
  },
  {
    id: "addresses",
    title: "Addresses",
    icon: MapPin,
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
  },
];

export default function ProfileSidebar({ active, setActive, user }) {
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    await updateUser(formData);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside className="bg-white rounded-3xl shadow-sm border p-6 w-full lg:w-72">
      <div className="flex flex-col items-center">
        <img
          src={user.avatar?.url || "https://i.pravatar.cc/200"}
          alt="user avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
        />

        <h2 className="font-semibold text-xl mt-4">{user.username}</h2>

        <p className="text-sm text-gray-500">{user.email}</p>

        <input
          type="file"
          accept="image/*"
          hidden
          id="avatar"
          onChange={handleUpload}
        />

        <button
          onClick={() => document.getElementById("avatar").click()}
          className="mt-5 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Change Photo
        </button>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl transition

                ${
                  active === item.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <Icon size={19} />

              {item.title}
            </button>
          );
        })}

        <button
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition mt-5"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
