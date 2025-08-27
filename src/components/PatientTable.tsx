import { useEffect, useState, useCallback } from "react";
import { Pencil, Eye, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FHIRApiService } from "@/services/fhirApi";

import PatientForm from "@/components/PatientForm";
import PatientDetails from "@/components/PatientDetails";

import type { FHIRPatient, FHIRBundle, CreatePatientData} from "@/types/fhir";

const api = new FHIRApiService();

export default function PatientTable() {
    const [patients, setPatients] = useState<FHIRPatient[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // form modal state management | Edit
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [editPatient, setEditPatient] = useState<CreatePatientData | undefined>();

    // form modal state management | View
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [viewPatient, setViewPatient] = useState<FHIRPatient | undefined>();
    const [loadingView, setLoadingView] = useState(false);


    // Fetch patients
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        try {
            const bundle: FHIRBundle = await api.getPatients({ name: search });
            setPatients(bundle.entry?.map((e) => e.resource) || []);
        } catch (err) {
            console.error("Error fetching patients:", err);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    // open modal for creating
    const handleCreate = () => {
        setFormMode("create");
        setEditPatient(undefined);
        setIsFormOpen(true);
    };

    // open modal for editing
    const handleEdit = async (patient: FHIRPatient) => {
        setFormMode("edit");
        console.log("handleEdit id: ", patient?.id)
        setEditPatient({
            id: patient?.id,
            firstName: patient.name?.[0]?.given?.[0] || "",
            lastName: patient.name?.[0]?.family || "",
            gender: patient.gender ?? "unknown",
            birthDate: patient.birthDate || "",
            // telecom & address parsing can be added here
        });
        setIsFormOpen(true);
        await fetchPatients();
    };

    // submit handler
    const handleSubmit = async (data: CreatePatientData) => {
        console.log("handleSubmit ", formMode)
        console.log("handleSubmit ", formMode === "edit" && editPatient?.id)
        console.log("handleSubmit ", editPatient?.id)
        console.log("handleSubmit ", data)

        if (formMode === "create") {
            await api.createPatient(data);
        } else if (formMode === "edit" && editPatient?.id) {
            await api.updatePatient(editPatient.id, data);
        }
        await fetchPatients();
    };

    // fetch patient details
    const handleView = async (id: string) => {
        try {
            setLoadingView(true);
            const patient = await api.getPatientById(id);
            setViewPatient(patient);
            setIsDetailsOpen(true);
        } catch (error) {
            console.error("Error fetching patient details", error);
        } finally {
            setLoadingView(false);
        }
    };

    // Delete patient
    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this patient?")) return;
        try {
            await api.deletePatient(id);
            setPatients((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Error deleting:", err);
        }
        await fetchPatients();
    };

  return (
    <Card className="p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button className="flex gap-2" onClick={handleCreate}>
          <Plus size={18} /> Add Patient
        </Button>
      </div>

      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Birth Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{patient.id}</td>
                  <td className="p-2 border">
                    {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
                  </td>
                  <td className="p-2 border">{patient.gender}</td>
                  <td className="p-2 border">{patient.birthDate}</td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-blue-600 hover:text-blue-800 size-8"
                            onClick={() => handleView(patient.id!)}>
                            <Eye size={16} />
                        </Button>
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleEdit(patient)}
                            className="text-green-600 hover:text-green-800 size-8">
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-800 size-8"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </CardContent>

        <PatientForm
            mode={formMode}
            initialData={editPatient}
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleSubmit}
        />
        <PatientDetails
            open={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            patient={viewPatient}
            loading={loadingView} 
        />
    </Card>
  );
}
