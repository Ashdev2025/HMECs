import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";

import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";

type FormErrors = {
  email?: string;
  password?: string;
};

type LoginUser = {
  id?: string | number;
  role?: string;
  role_name?: string;
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  companyName?: string;
  company?: string;
  company_name?: string;
  role_id?: string | number;
};

type LoginResponse = {
  message?: string;
  token?: string;
  accessToken?: string;
  access_token?: string;
  user?: LoginUser;
  admin?: LoginUser;
  company?: LoginUser;
  data?: {
    token?: string;
    accessToken?: string;
    access_token?: string;
    user?: LoginUser;
    admin?: LoginUser;
    company?: LoginUser;
  };
};

type DecodedToken = {
  role?: string;
  role_name?: string;
  email?: string;
  name?: string;
  companyName?: string;
  company?: string;
  user?: LoginUser;
  exp?: number;
};

export default function SignInForm() {


  const [active, setActive] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    const rememberedEmail = localStorage.getItem("rememberEmail");

    if (rememberMe === "true" && rememberedEmail) {
      setEmail(rememberedEmail);
      setIsChecked(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Company email is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const decodeToken = (token: string): DecodedToken | null => {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((char) => {
            return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  };

  const normalizeRole = (role?: string | number | null) => {
    if (!role) return "";

    return String(role)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");
  };

  const getRedirectPathByRole = (role?: string | number | null) => {
    const normalizedRole = normalizeRole(role);

    if (
      normalizedRole === "super_admin" ||
      normalizedRole === "superadmin" ||
      normalizedRole === "super_admin_role"
    ) {
      return "/super-admin/dashboard";
    }

    if (
      normalizedRole === "admin" ||
      normalizedRole === "company_admin" ||
      normalizedRole === "companyadmin"
    ) {
      return "/company-admin/dashboard";
    }

    if (normalizedRole === "operator") {
      return "/operator/dashboard";
    }

    if (normalizedRole === "mechanic") {
      return "/mechanic/dashboard";
    }

    if (normalizedRole === "engineer") {
      return "/engineer/dashboard";
    }

    if (normalizedRole === "planner") {
      return "/planner/dashboard";
    }

    if (normalizedRole === "viewer") {
      return "/viewer/dashboard";
    }

    return null;
  };

  const clearAuthStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  const getUserFullName = (user?: LoginUser) => {
    const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
    return user?.name || fullName || user?.email || "User";
  };

  const getLoginData = (response: LoginResponse) => {
    return response?.data || response;
  };

  const showLoginSuccessToast = (
    role?: string | number | null,
    user?: LoginUser,
  ) => {
    const normalizedRole = normalizeRole(role);

    if (normalizedRole === "super_admin" || normalizedRole === "superadmin") {
      toast.success("Super Admin login successful");
      return;
    }

    if (normalizedRole === "admin" || normalizedRole === "company_admin") {
      const companyName =
        user?.companyName ||
        user?.company_name ||
        user?.company ||
        getUserFullName(user);

      toast.success(`${companyName} login successful`);
      return;
    }

    if (normalizedRole === "operator") {
      toast.success("Operator login successful");
      return;
    }

    if (normalizedRole === "mechanic") {
      toast.success("Mechanic login successful");
      return;
    }

    if (normalizedRole === "engineer") {
      toast.success("Engineer login successful");
      return;
    }

    if (normalizedRole === "planner") {
      toast.success("Planner login successful");
      return;
    }

    if (normalizedRole === "viewer") {
      toast.success("Viewer login successful");
      return;
    }

    toast.success("Login successful");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setErrors({});

      const response = (await authService.login({
        email: email.trim(),
        password,
      })) as LoginResponse;

      console.log("LOGIN RESPONSE:", response);

      const loginData = getLoginData(response);

      const token =
        loginData?.token || loginData?.accessToken || loginData?.access_token;

      const apiUser =
        loginData?.user || loginData?.admin || loginData?.company || undefined;

      console.log("LOGIN DATA:", loginData);
      console.log("TOKEN:", token);
      console.log("API USER:", apiUser);

      if (!token) {
        clearAuthStorage();
        setErrors({ password: "Token not found in login response." });
        toast.error("Token not found in login response");
        return;
      }

      const decodedToken = decodeToken(token);

      console.log("DECODED TOKEN:", decodedToken);

      const userRole =
        decodedToken?.role ||
        decodedToken?.role_name ||
        decodedToken?.user?.role ||
        decodedToken?.user?.role_name ||
        apiUser?.role ||
        apiUser?.role_name;

      const redirectPath = getRedirectPathByRole(userRole);

      console.log("USER ROLE:", userRole);
      console.log("REDIRECT PATH:", redirectPath);

      if (!redirectPath) {
        clearAuthStorage();
        setErrors({
          password: `Role not allowed: ${userRole || "No role found"}`,
        });
        toast.error(`Role not allowed: ${userRole || "No role found"}`);
        return;
      }

      const finalUser: LoginUser = {
        id: apiUser?.id,
        role: normalizeRole(userRole),
        role_name: apiUser?.role_name,
        role_id: apiUser?.role_id,
        email:
          decodedToken?.email ||
          decodedToken?.user?.email ||
          apiUser?.email ||
          email.trim(),
        name:
          decodedToken?.name ||
          decodedToken?.user?.name ||
          apiUser?.name ||
          getUserFullName(apiUser),
        first_name: apiUser?.first_name,
        last_name: apiUser?.last_name,
        companyName:
          decodedToken?.companyName ||
          decodedToken?.user?.companyName ||
          apiUser?.companyName ||
          apiUser?.company_name,
        company:
          decodedToken?.company ||
          decodedToken?.user?.company ||
          apiUser?.company ||
          apiUser?.company_name,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(finalUser));
      localStorage.setItem("role", normalizeRole(userRole));
      localStorage.setItem("email", finalUser.email || "");
      localStorage.setItem("name", finalUser.name || "");

      // After setting token, check subscription for company admin
      let finalRedirect = redirectPath;
      if (normalizeRole(userRole) === "company_admin" || normalizeRole(userRole) === "admin") {
        try {
          const sub = await userService.getActiveSubscription();
          if (!sub) {
            finalRedirect = "/plans";
          }
        } catch (subErr) {
          console.error("Sub check error during login:", subErr);
          // If error, default to redirectPath and let dashboard handle it
        }
      }

      if (isChecked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("rememberEmail", email.trim());
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberEmail");
      }

      showLoginSuccessToast(userRole, finalUser);
      
      // Check for redirect query parameter
      const searchParams = new URLSearchParams(window.location.search);
      const redirectParam = searchParams.get("redirect");
      const finalDest = redirectParam || finalRedirect;

      window.location.href = finalDest;
    } catch (error) {
      console.error("Login API Error:", error);

      clearAuthStorage();
      setErrors({ password: "Invalid email or password" });
      toast.error("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar active={active} setActive={setActive} />

      <main
        className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-10 pt-32"
        style={{
          backgroundImage: "url('/signin-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] dark:bg-slate-950/65" />

        <div className="absolute left-10 top-32 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/30">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/30">
              H
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
              Sign in to access your HME dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <Label>
                Company Email <span className="text-red-500">*</span>
              </Label>

              <Input
                type="email"
                placeholder="you@company.com"
                className={`mt-2 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email || errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                      password: "",
                    }));
                  }
                }}
              />

              {errors.email && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label>
                Password <span className="text-red-500">*</span>
              </Label>

              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pr-12 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }
                  }}
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
                <p className="mt-1 text-xs font-medium text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Checkbox checked={isChecked} onChange={setIsChecked} />

                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </div>

              <Link
                to="/reset-password"
                className="text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-5 rounded-2xl bg-slate-50 p-3 text-center dark:bg-slate-800/60">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <div className="[&_.reveal]:!translate-y-0 [&_.reveal]:!opacity-100">
        <Footer />
      </div>
    </div>
  );
}