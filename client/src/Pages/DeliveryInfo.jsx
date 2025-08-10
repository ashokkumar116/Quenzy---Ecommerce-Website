import React from "react";
import { MdLocalShipping, MdLocationOn, MdAccessTime, MdOutlineTrackChanges, MdOutlineContactSupport } from "react-icons/md";
import { FiBox, FiPhone } from "react-icons/fi";

export default function DeliveryInfo() {
  return (
    <div className="min-h-screen  bg-base-200 text-base-content p-6 sm:p-10 lg:p-16 ">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Hero / Header */}
        <header className="bg-base-100/80 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Delivery Information</h1>
            <p className="mt-2 text-sm md:text-base text-base-content/70">
              Know how Quenzy delivers — shipping methods, zones, estimated times, tracking and return policy.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-lg">
              <MdLocalShipping className="w-6 h-6 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Free delivery</div>
                <div className="text-xs text-base-content/60">On orders above ₹499</div>
              </div>
            </div>
            <div className="text-sm text-base-content/70">Delivery support: <span className="font-medium">+91 98765 43210</span></div>
          </div>
        </header>

        {/* Info cards */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-base-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MdLocationOn className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delivery Zones</h3>
                <p className="mt-1 text-sm text-base-content/70">We currently deliver to Tamil Nadu and neighbouring states. Enter your pincode at checkout to confirm availability.</p>
              </div>
            </div>
          </article>

          <article className="bg-base-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MdAccessTime className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Estimated Delivery Times</h3>
                <ul className="mt-2 text-sm text-base-content/70 space-y-1">
                  <li><strong>Metro cities:</strong> 2–4 business days</li>
                  <li><strong>Tier 2 cities:</strong> 3–6 business days</li>
                  <li><strong>Rural areas:</strong> 5–8 business days</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="bg-base-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiBox className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Shipping Methods & Charges</h3>
                <p className="mt-2 text-sm text-base-content/70">Standard shipping, Express (where available), and Cash-on-Delivery. Shipping charges apply based on weight and destination — shown at checkout.</p>
              </div>
            </div>
          </article>
        </section>

        {/* Tracking + Returns Section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-base-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MdOutlineTrackChanges className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Order Tracking <span className="text-base-content/50 text-sm italic">(Coming soon)</span></h3>
                <p className="mt-2 text-sm text-base-content/70">Once your order is shipped, you will receive an SMS and email with a tracking link. Use the order number in My Orders to track live updates.</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <input aria-label="Order number" placeholder="Enter order number" className="flex-1 input input-bordered" disabled />
                  <button disabled className="btn btn-primary">Track</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MdOutlineContactSupport className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Returns & Refunds <span className="text-base-content/50 text-sm italic">(Coming soon)</span></h3>
                <p className="mt-2 text-sm text-base-content/70">Return window: 7 days from delivery for damaged or wrong items. Open a return from My Orders and we’ll guide you through the pickup process.</p>
                <ul className="mt-3 text-sm text-base-content/70 space-y-1">
                  <li>Refund processed within 5–7 business days after item received.</li>
                  <li>Cash-on-Delivery refunds by bank transfer only.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-8 bg-base-100 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <details className="rounded-md p-4 border" open>
              <summary className="cursor-pointer font-medium">How long does shipping take?</summary>
              <p className="mt-2 text-sm text-base-content/70">Times depend on location — typically 2–8 business days. Exact estimate appears at checkout after you enter your pincode.</p>
            </details>

            <details className="rounded-md p-4 border">
              <summary className="cursor-pointer font-medium">Do you offer express delivery?</summary>
              <p className="mt-2 text-sm text-base-content/70">Yes, Express is available for select pincodes. Availability and extra charges are shown at checkout.</p>
            </details>

            <details className="rounded-md p-4 border">
              <summary className="cursor-pointer font-medium">Can I change my delivery address after placing an order?</summary>
              <p className="mt-2 text-sm text-base-content/70">Address can be changed only before the order is shipped. Contact our support immediately if you need to update the address.</p>
            </details>

            <details className="rounded-md p-4 border">
              <summary className="cursor-pointer font-medium">What if my item is damaged?</summary>
              <p className="mt-2 text-sm text-base-content/70">Report damaged items within 24 hours of receiving. We’ll arrange a pickup and replacement or refund after verification.</p>
            </details>
          </div>
        </section>

        {/* CTA and small print */}
        <footer className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="bg-base-100 p-6 rounded-xl shadow-sm flex-1">
            <h3 className="font-semibold">Still have questions?</h3>
            <p className="mt-2 text-sm text-base-content/70">Call us or start a chat — we’re happy to help with delivery timings and availability.</p>
            <div className="mt-3 flex items-center gap-3">
              <FiPhone className="w-5 h-5" />
              <a href="tel:+919876543210" className="font-medium">+91 98765 43210</a>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-xl shadow-sm w-full md:w-96">
            <h4 className="font-semibold">Delivery Guidelines</h4>
            <ul className="mt-2 text-sm text-base-content/70 space-y-1">
              <li>Provide a phone number reachable at delivery time.</li>
              <li>Enter accurate pin code — it determines courier availability.</li>
              <li>Deliveries attempted twice before returning to warehouse.</li>
            </ul>
            <div className="mt-4">
              <a href="/contact" className="btn btn-outline btn-sm">Contact support</a>
            </div>
          </div>
        </footer>

        <p className="mt-6 text-xs text-center text-base-content/50">Last updated: Aug 10, 2025</p>
      </div>
    </div>
  );
}
