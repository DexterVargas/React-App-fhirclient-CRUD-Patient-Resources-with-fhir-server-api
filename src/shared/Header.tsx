import React from "react";
import Logo from "@/assets/logolight.png";

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img
                src="https://www.hl7.org/fhir/assets/images/fhir-logo-www.png"
                alt="FHIR Logo"
                className="h-12 w-32"
                />
                <h1 className="inline-block py-0.5 pl-3 text-heading z-20 relative before:content-[''] before:absolute before:w-2/3 before:ml-20 before:top-0 before:left-0 before:bottom-0 before:-z-10 before:bg-indigo-50 font-['Caveat']">
                    <i className="text-2xl text-primary"> Java de Clinica</i>
                </h1>
            </div>
            <nav className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-300">
                        <img
                        src={Logo}
                        alt="Dexter Vargas Logo"
                        className="h-full w-full object-cover"
                        />
                    </div>
                    <span className="text-lg font-semibold tracking-wide font-mono">
                        {"{ "}Dexter Vargas{" }"}
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
