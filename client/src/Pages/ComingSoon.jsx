import React from "react";
import { MdShoppingCart } from "react-icons/md";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <MdShoppingCart /> Quenzy
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-base-content">This Page is Coming Soon 🚧</h1>
        <p className="mt-3 text-base text-base-content/70">
          We’re still working on this section to give you the best experience. Check back later for updates.
        </p>

        {/* Back to Home Button */}
        <div className="mt-6">
          <a href="/" className="btn btn-primary">Go Back Home</a>
        </div>
      </div>
    </div>
  );
}
