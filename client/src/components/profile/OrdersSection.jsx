import { Package, Eye } from "lucide-react";
import { getOrders } from "../../api/orderApi.js";
import { useEffect, useState } from "react";

export default function OrdersSection({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      setOrders(response.orders);
    };
    fetchOrders();
  },  [user]);


  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Package />
              </div>

              <div>
                <h3 className="font-semibold">Order {order.id}</h3>

                <p className="text-gray-500 text-sm">{order.date}</p>

                <p className="font-semibold mt-2">{order.total}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-5 md:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>

              <button className="flex items-center gap-2 border rounded-xl px-4 py-2 hover:bg-gray-100 transition">
                <Eye size={18} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
