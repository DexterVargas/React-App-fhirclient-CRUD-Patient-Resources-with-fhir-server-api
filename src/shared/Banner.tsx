import { Card, CardContent } from "@/components/ui/card";

export default function Banner() {
    return (
        <Card className="mt-4 bg-blue-50 border-blue-200 shadow-sm">
            <CardContent className="p-6">
                <h2 className="font-semibold text-blue-800">
                    Basic Patients Resources CRUD (Create, Read, Update, Delete) operation
                </h2>
                <p className="text-sm text-blue-700 mt-2">
                    Operations on <span className="font-medium">Patient</span> resources by interacting with a{" "}
                    <span className="font-medium">FHIR server API</span>.
                </p>
                <p className="text-sm text-blue-700 mt-1">
                    App uses{" "}
                    <a
                        href="https://fhir-bootcamp.medblocks.com/fhir"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-900"
                    >
                        https://fhir-bootcamp.medblocks.com/fhir
                    </a>{" "}
                    for API calls. see <a href="https://medblocks.com/training/courses/fhir-fundamentals" className="underline hover:text-red-500">link </a>for more details.
                    <span className="inline-block">
                        To get started with <i><b>hapi-fhir-jpaserver-starter</b></i>, you can find helpful guides at this  <a href="https://github.com/hapifhir/hapi-fhir-jpaserver-starter" target="_blank" className="underline hover:text-red-500">link. </a>
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}
