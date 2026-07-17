import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

export default function AddressesSection() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Addresses</h2>

        <button className="bg-black text-white rounded-xl px-5 py-2 flex items-center gap-2 hover:bg-gray-800 transition">
          <Plus size={18} />
          Add Address
        </button>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="border rounded-2xl p-6 hover:shadow-md transition">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-xl p-3 h-fit">
                <MapPin />
              </div>

              <div>
                <h3 className="font-semibold">Home</h3>

                <p className="text-gray-500 mt-2">Nicolas Guzman</p>

                <p className="text-gray-500">Armenia, Quindío</p>

                <p className="text-gray-500">Colombia</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="border rounded-lg p-2 hover:bg-gray-100">
                <Pencil size={18} />
              </button>

              <button className="border rounded-lg p-2 hover:bg-red-50 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
