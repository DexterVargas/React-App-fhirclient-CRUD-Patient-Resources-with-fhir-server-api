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
        </CardContent>
        </Card>
    );
}
