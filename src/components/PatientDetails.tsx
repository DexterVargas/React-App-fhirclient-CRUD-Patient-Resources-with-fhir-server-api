import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { FHIRPatient } from "@/types/fhir";
import { Loader2 } from "lucide-react";

interface PatientDetailsProps {
  open: boolean;
  onClose: () => void;
  patient?: FHIRPatient;
  loading?: boolean;
}

export default function PatientDetails({ open, onClose, patient, loading }: PatientDetailsProps) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>

        { loading ? (
            <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading patient details...</span>
          </div>
        ) : patient ? (
          <div className="space-y-2">
            <p><strong>ID:</strong> {patient.id}</p>
            <p><strong>Name:</strong> {patient.name?.[0]?.given?.join(" ")} {patient.name?.[0]?.family}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Birth Date:</strong> {patient.birthDate}</p>

            {patient.telecom && (
              <div>
                <strong>Contact:</strong>
                <ul className="list-disc ml-5">
                  {patient.telecom.map((t, i) => (
                    <li key={i}>{t.system}: {t.value}</li>
                  ))}
                </ul>
              </div>
            )}

            {patient.address && (
              <div>
                <strong>Address:</strong>
                <p>
                  {patient.address[0].line?.join(", ")}, {patient.address[0].city},{" "}
                  {patient.address[0].state} {patient.address[0].postalCode},{" "}
                  {patient.address[0].country}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p>No patient data available.</p>
        )}

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
