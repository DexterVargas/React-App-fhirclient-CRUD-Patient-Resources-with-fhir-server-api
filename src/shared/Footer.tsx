import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/assets/logolight.png";

export default function Footer() {
    return (
        <Card className="rounded-none border-t bg-gray-50 text-gray-800">
        <CardContent className="flex items-center justify-center gap-3 p-6">
            <img src={Logo} alt="Dexter Vargas Logo" className="h-10 w-auto" />
            <span className="font-mono">
                Copyright information ©2025 {" { "}Dexter Vargas{" }"}
            </span>

            <a
          href="https://github.com/DexterVargas"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577
              0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73
              1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.493.997.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93
              0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 
              2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.838 1.234 1.91 
              1.234 3.22 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.103.823 2.222 
              0 1.605-.014 2.896-.014 3.286 0 .32.192.694.8.576C20.565 21.797 
              24 17.297 24 12c0-6.63-5.373-12-12-12z"
              clipRule="evenodd"
            />
          </svg>
          <span>MyGitHub Page</span>
        </a>
        </CardContent>
        </Card>
    );
}
