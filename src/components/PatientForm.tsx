import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { CreatePatientData } from "@/types/fhir";

interface PatientFormProps {
    mode: "create" | "edit";
    initialData?: Partial<CreatePatientData>;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePatientData) => Promise<void>;
}

export default function PatientForm({
    mode,
    initialData,
    open,
    onClose,
    onSubmit,
}: PatientFormProps) {
    const [form, setForm] = useState<CreatePatientData>({
        firstName: "",
        lastName: "",
        gender: "unknown",
        birthDate: "",
        phone: "",
        email: "",
        address: { line: "", city: "", state: "", postalCode: "", country: "" },
    });

    useEffect(() => {
        if (initialData) {
            setForm((prev) => ({
                ...prev,
                ...initialData,
                address: { ...prev.address, ...initialData.address },
            }));
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(form);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Add Patient" : "Edit Patient"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="unknown">Unknown</option>
                        </select>

                        <Input
                            type="date"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Input
                            name="address.line"
                            placeholder="Street Address"
                            value={form.address?.line || ""}
                            onChange={handleChange}
                        />
                        <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                            name="address.city"
                            placeholder="City"
                            value={form.address?.city || ""}
                            onChange={handleChange}
                        />
                        <Input
                            name="address.state"
                            placeholder="State"
                            value={form.address?.state || ""}
                            onChange={handleChange}
                        />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <Input
                                name="address.postalCode"
                                placeholder="Postal Code"
                                value={form.address?.postalCode || ""}
                                onChange={handleChange}
                            />
                            <Input
                                name="address.country"
                                placeholder="Country"
                                value={form.address?.country || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {mode === "create" ? "Create" : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
