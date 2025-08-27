import { Card, CardContent } from "@/components/ui/card";

export default function Banner() {
  return (
    <Card className="mt-4 bg-blue-50 border-blue-200 shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-blue-800">
          CRUD (Create, Read, Update, Delete)
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
          for API calls.
        </p>
      </CardContent>
    </Card>
  );
}
