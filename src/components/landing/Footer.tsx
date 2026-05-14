import { Link } from "react-router";
import logo1 from "../../assets/images/landingpageimages/logo1.png";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-200 bg-white px-5 py-9 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <img
              src={logo1}
              alt="HME Logo"
              className="h-16 w-auto object-contain"
            />

            <p className="mt-4 max-w-sm text-sm font-medium leading-7">
              The all-in-one maintenance and reporting platform built for heavy
              mining operations.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm font-medium">
              <li>
                <a href="#features" className="transition hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#maintenance"
                  className="transition hover:text-blue-600"
                >
                  Maintenance
                </a>
              </li>
              <li>
                <a href="#reports" className="transition hover:text-blue-600">
                  Reports
                </a>
              </li>
              <li>
                <Link to="/plans" className="transition hover:text-blue-600">
                  Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm font-medium">
              <li>
                <a href="#about" className="transition hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="transition hover:text-blue-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="transition hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-blue-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm font-medium">
              <li>
                <a href="#help" className="transition hover:text-blue-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#docs" className="transition hover:text-blue-600">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#terms" className="transition hover:text-blue-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="transition hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 text-center text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-500">
          © 2026 MineTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}