import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { authService } from "../../services/authService";

import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

type SignupPayload = {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/cart";

  const signinRedirectPath = `/signin?redirect=${encodeURIComponent(
    redirectTo,
  )}`;

  const [active, setActive] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setApiError("");
    setSuccessMessage("");
  };

  const validateForm = (data: SignupPayload) => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!data.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload: SignupPayload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      companyName: String(formData.get("companyName") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    const validationErrors = validateForm(payload);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setApiError("");
      setSuccessMessage("");

      const response = await authService.register({
        company_name: payload.companyName,
        fname: payload.firstName,
        lname: payload.lastName,
        email: payload.email,
        password: payload.password,
        mobile: payload.phone,
      });

      console.log("Signup API Success:", response);

      const registerResponse = response as any;

      const token =
        registerResponse?.token ||
        registerResponse?.accessToken ||
        registerResponse?.access_token ||
        registerResponse?.data?.token ||
        registerResponse?.data?.accessToken ||
        registerResponse?.data?.access_token;

      if (token) {
        localStorage.setItem("token", token);
      }

      setSuccessMessage("Account created successfully. Redirecting to cart...");

      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 800);
    } catch (error: any) {
      console.error("Signup API Error:", error);

      setApiError(
        error?.response?.data?.message ||
          error?.message ||
          "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: #0f172a !important;
            transition: background-color 999999s ease-in-out 0s !important;
            box-shadow: inset 0 0 0 1000px #ffffff !important;
            caret-color: #0f172a !important;
          }

          .dark input:-webkit-autofill,
          .dark input:-webkit-autofill:hover,
          .dark input:-webkit-autofill:focus,
          .dark input:-webkit-autofill:active {
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: #ffffff !important;
            transition: background-color 999999s ease-in-out 0s !important;
            box-shadow: inset 0 0 0 1000px #0f172a !important;
            caret-color: #ffffff !important;
          }
        `}
      </style>

      <Navbar active={active} setActive={setActive} />

      <main
        className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-10"
        style={{
          backgroundImage: "url('/signin-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] dark:bg-slate-950/65" />

        <div className="absolute left-10 top-32 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/30">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="hidden flex-col justify-center border-r border-slate-200 bg-slate-50/90 p-6 dark:border-slate-800 dark:bg-slate-800/60 lg:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/30">
                H
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
                Start your HME account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Create your mining company account and manage fleet,
                maintenance, alerts, and reports in one place.
              </p>

              <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p>✔ Fleet & Machine Tracking</p>
                <p>✔ Maintenance Planning</p>
                <p>✔ Alert Monitoring</p>
                <p>✔ Offline-first system</p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-4 text-center lg:text-left">
                <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                  Create Account
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Enter your company details
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label>First Name *</Label>

                    <Input
                      name="firstName"
                      placeholder="John"
                      className={`mt-1 ${
                        errors.firstName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                      onChange={() => clearError("firstName")}
                    />

                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Last Name *</Label>

                    <Input
                      name="lastName"
                      placeholder="Doe"
                      className={`mt-1 ${
                        errors.lastName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                      onChange={() => clearError("lastName")}
                    />

                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>Company Name *</Label>

                    <Input
                      name="companyName"
                      placeholder="ABC Mining Pvt Ltd"
                      className={`mt-1 ${
                        errors.companyName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                      onChange={() => clearError("companyName")}
                    />

                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Phone *</Label>

                    <Input
                      name="phone"
                      placeholder="9876543210"
                      className={`mt-1 ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                      onChange={() => clearError("phone")}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Company Email *</Label>

                    <Input
                      name="email"
                      type="email"
                      placeholder="company@email.com"
                      className={`mt-1 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                      onChange={() => clearError("email")}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>Password *</Label>

                    <div className="relative mt-1">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter strong password"
                        className={`pr-12 ${
                          errors.password
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : ""
                        }`}
                        onChange={() => clearError("password")}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 z-20 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      >
                        {showPassword ? (
                          <EyeIcon className="h-5 w-5 fill-current" />
                        ) : (
                          <EyeCloseIcon className="h-5 w-5 fill-current" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {apiError && (
                  <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    {apiError}
                  </p>
                )}

                {successMessage && (
                  <p className="mt-3 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-600 dark:bg-green-500/10 dark:text-green-400">
                    {successMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-center dark:bg-slate-800/60">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to={signinRedirectPath}
                    className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="[&_.reveal]:!translate-y-0 [&_.reveal]:!opacity-100">
        <Footer />
      </div>
    </div>
  );
}