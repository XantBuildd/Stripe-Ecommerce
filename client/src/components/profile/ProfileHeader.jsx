import { useEffect, useState } from "react";
import { getOrders } from "../../api/orderApi.js";

export default function ProfileHeader({ user }) {
  const [ordersQuantity, setOrdersQuantity] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      let count = 0;
      for (let i = 0; i < response.orders.length; i++) {
        count++;
      }

      response.orders.forEach((order) => {
        setTotalSpent((prev) => prev + order.total);
      });

      setOrdersQuantity(count);
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">
      <p className="text-gray-500 text-sm">Welcome back 👋</p>

      <h1 className="text-3xl font-bold mt-1">{user.username}</h1>

      <p className="text-gray-500 mt-2">
        Manage your personal information, orders and account security.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        <div className="border rounded-2xl p-5">
          <p className="text-gray-500">Orders</p>

          <h2 className="text-3xl font-bold mt-2">{ordersQuantity}</h2>
        </div>

        <div className="border rounded-2xl p-5">
          <p className="text-gray-500">Favorites</p>

          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="border rounded-2xl p-5">
          <p className="text-gray-500">Total Spent</p>

          <h2 className="text-3xl font-bold mt-2">${totalSpent.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}
