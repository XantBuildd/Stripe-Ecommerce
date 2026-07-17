import { useState } from "react";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileForm from "../components/profile/ProfileForm";
import OrdersSection from "../components/profile/OrdersSection";
import SecuritySection from "../components/profile/SecuritySection";
import AddressesSection from "../components/profile/AddressesSection";
import { useAuth } from "../context/useAuth.js";

export default function Profile() {
  const [active, setActive] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <ProfileSidebar active={active} setActive={setActive} user={user} />

          <div className="space-y-8">
            <ProfileHeader user={user} />

            {active === "profile" && <ProfileForm user={user} />}

            {active === "orders" && <OrdersSection user={user} />}

            {active === "addresses" && <AddressesSection />}

            {active === "security" && <SecuritySection />}
          </div>
        </div>
      </div>
    </div>
  );
}
