import { Link } from "react-router";

export default function Hero() {
    return (
        <>
            <div className="absolute inset-0 opacity-40">
                <div className="h-full w-full bg-[linear-gradient(90deg,rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8">
                <section className="reveal-left max-w-2xl rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-xl backdrop-blur-md sm:p-10">
                    <p className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                        Mining Maintenance
                    </p>

                    <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                        Smart Mining Equipment Monitoring
                    </h1>

                    <p className="mt-4 text-lg font-semibold text-blue-600">
                        Predict failures before they stop production
                    </p>

                    <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                        A modern HMI intelligence platform for mining companies to track
                        machines, maintenance tasks, alerts, inspections, tyres, engines,
                        hydraulic systems, and offline-first field operations.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to="/signin"
                            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Login
                        </Link>

                        <Link
                            to="/pricing"
                            className="rounded-full border border-blue-200 bg-white px-8 py-3 text-sm font-bold text-blue-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                        >
                            Create Company Account
                        </Link>
                    </div>
                </section>

                <section className="reveal-right relative hidden min-h-[520px] lg:block">
                    <div className="absolute right-0 top-8 w-[520px] rounded-[2.5rem] border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-lg">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Live Fleet Health</p>
                                    <h2 className="text-2xl font-bold">Command Center</h2>
                                </div>
                                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                                    Online
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm text-slate-500">Machines</p>
                                    <h3 className="mt-2 text-3xl font-black text-slate-900">
                                        128
                                    </h3>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm text-slate-500">Open Alerts</p>
                                    <h3 className="mt-2 text-3xl font-black text-blue-600">
                                        14
                                    </h3>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm text-slate-500">Due Tasks</p>
                                    <h3 className="mt-2 text-3xl font-black text-blue-600">
                                        32
                                    </h3>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm text-slate-500">Uptime</p>
                                    <h3 className="mt-2 text-3xl font-black text-slate-900">
                                        96%
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                                <p className="mb-3 text-sm font-semibold text-blue-600">
                                    Critical Alert
                                </p>
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                                    <span className="text-slate-700">
                                        Hydraulic pressure anomaly
                                    </span>
                                    <span className="font-bold text-blue-600">High</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-8 rounded-full bg-white px-8 py-5 text-4xl font-black text-blue-600 shadow-2xl">
                        Fast
                    </div>

                    <div className="absolute bottom-28 right-10 rotate-[-6deg] rounded-full bg-blue-100 px-8 py-5 text-4xl font-black text-blue-700 shadow-2xl">
                        Secure
                    </div>

                    <div className="absolute bottom-0 right-32 rotate-[4deg] rounded-full bg-blue-600 px-8 py-5 text-4xl font-black text-white shadow-2xl">
                        Simple
                    </div>
                </section>
            </div>
        </>
    );
}