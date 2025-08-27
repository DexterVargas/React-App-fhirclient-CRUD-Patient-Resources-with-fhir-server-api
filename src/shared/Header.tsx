import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left side: Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="https://www.hl7.org/fhir/assets/images/fhir-logo-www.png"
          alt="FHIR Logo"
          className="h-10 w-10"
        />
        <h1 className="text-xl font-bold text-gray-800">
          MyHealth Company | Basic CRUD for Patient Resources
        </h1>
      </div>

      {/* Right side: extra nav / actions */}
      <nav className="flex items-center gap-6">
        dexterv
      </nav>
    </header>
  );
};

export default Header;
