export default function Footer() {
  return (
    <footer id="contact" className="reveal scroll-mt-24 bg-slate-800 px-5 py-12 text-slate-300 lg:px-8 border-t border-slate-700">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-black">
            <span className="text-blue-400">HME</span>
            <span className="text-white">intelligence</span>
          </h3>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            AI powered maintenance and fleet monitoring platform for mining companies.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white">Product</h4>
          <p className="mt-4 cursor-pointer text-sm text-slate-400 hover:text-blue-400">
            Features
          </p>
          <p className="mt-2 cursor-pointer text-sm text-slate-400 hover:text-blue-400">
            Pricing
          </p>
          <p className="mt-2 cursor-pointer text-sm text-slate-400 hover:text-blue-400">
            Reports
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white">Modules</h4>
          <p className="mt-4 text-sm text-slate-400">Fleet</p>
          <p className="mt-2 text-sm text-slate-400">Maintenance</p>
          <p className="mt-2 text-sm text-slate-400">Alerts</p>
        </div>

        <div>
          <h4 className="font-bold text-white">Contact</h4>
          <p className="mt-4 text-sm text-slate-400">support@miningai.com</p>
          <p className="mt-2 text-sm text-slate-400">India</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
        © 2026 HMEintelligence. All rights reserved.
      </div>
    </footer>
  );
}