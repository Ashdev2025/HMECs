import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = (data: any) => {
    const newErrors: FormErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!data.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (data.companyName.trim().length < 3) {
      newErrors.companyName = "Company name must be at least 3 characters";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(data.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Za-z]/.test(data.password)) {
      newErrors.password = "Password must include alphabets";
    } else if (!/[0-9]/.test(data.password)) {
      newErrors.password = "Password must include at least 1 number";
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password = "Password must include at least 1 uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      newErrors.password = "Use a stronger password with 1 special character";
    }

    return newErrors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
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

    setErrors({});
    console.log("Signup Success:", payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50 px-4 py-10">
      <div className="w-full max-w-5xl">
        <Link
          to="/signin"
          className="mb-6 inline-flex items-center text-sm text-slate-500 hover:text-blue-600"
        >
          <ChevronLeftIcon className="size-5" />
          Back to sign in
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="hidden flex-col justify-center border-r border-slate-200 bg-slate-50 p-10 lg:flex">
              <h2 className="text-2xl font-black text-slate-900">
                <span className="text-blue-600">HME</span>
                <span className="text-slate-900">intelligence</span>
              </h2>

              <p className="mt-4 text-slate-600">
                Create your mining company account and start managing your fleet,
                maintenance, and alerts in one place.
              </p>

              <div className="mt-8 space-y-3 text-sm text-slate-600">
                <p>✔ Fleet & Machine Tracking</p>
                <p>✔ Maintenance Planning</p>
                <p>✔ Alert Monitoring</p>
                <p>✔ Offline-first system</p>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900">
                  Create Account
                </h1>
                <p className="mt-2 text-slate-500">
                  Enter your company details
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>First Name *</Label>
                    <Input
                      name="firstName"
                      placeholder="John"
                      onChange={() => clearError("firstName")}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Last Name *</Label>
                    <Input
                      name="lastName"
                      placeholder="Doe"
                      onChange={() => clearError("lastName")}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>Company Name *</Label>
                    <Input
                      name="companyName"
                      placeholder="ABC Mining Pvt Ltd"
                      onChange={() => clearError("companyName")}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Phone *</Label>
                    <Input
                      name="phone"
                      placeholder="9876543210"
                      onChange={() => clearError("phone")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Email *</Label>
                    <Input
                      name="email"
                      placeholder="company@email.com"
                      onChange={() => clearError("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>Password *</Label>

                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter strong password"
                        className="pr-12"
                        onChange={() => clearError("password")}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center text-gray-500 transition hover:text-blue-600"
                      >
                        {showPassword ? (
                          <EyeIcon className="size-5 fill-gray-500 hover:fill-blue-600" />
                        ) : (
                          <EyeCloseIcon className="size-5 fill-gray-500 hover:fill-blue-600" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.password}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-500">
                      Password must include 8 characters, uppercase letter,
                      alphabet, number and special character.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}