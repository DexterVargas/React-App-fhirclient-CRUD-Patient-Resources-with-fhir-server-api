import type { FHIRPatient, FHIRBundle, CreatePatientData } from "../types/fhir";

const FHIR_BASE_URL = 'https://fhir-bootcamp.medblocks.com/fhir';
// const FHIR_BASE_URL = 'http://localhost:8080/fhir';


export class FHIRApiService {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${FHIR_BASE_URL}${endpoint}`;
        console.log(url)
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/fhir+json',
                'Accept': 'application/fhir+json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`FHIR API Error: ${response.status} ${response.statusText}`);
        }


        return response.json();
    }

    async getPatients(searchParams?: {
        name?: string;
        gender?: string;
        _count?: number;
        _offset?: number;
    }): Promise<FHIRBundle> {
        const params = new URLSearchParams();
        
        if (searchParams?.name) {
            params.append('name', searchParams.name);
        }
        if (searchParams?.gender) {
            params.append('gender', searchParams.gender);
        }
        if (searchParams?._count) {
            params.append('_count', searchParams._count.toString());
        }
        if (searchParams?._offset) {
            params.append('_offset', searchParams._offset.toString());
        }

        const queryString = params.toString();
        const endpoint = `/Patient${queryString ? `?${queryString}` : ''}`;
        
        return this.request<FHIRBundle>(endpoint);
    }

    async getPatientById(id: string): Promise<FHIRPatient> {
        return this.request<FHIRPatient>(`/Patient/${id}`);
    }

    async createPatient(patientData: CreatePatientData): Promise<FHIRPatient> {
        const fhirPatient: FHIRPatient = {
            resourceType: 'Patient',
            active: true,
            name: [
                {
                use: 'official',
                family: patientData.lastName,
                given: [patientData.firstName],
                },
            ],
            gender: patientData.gender,
            birthDate: patientData.birthDate,
        };

        // Add telecom if provided
        if (patientData.phone || patientData.email) {
            fhirPatient.telecom = [];
        
            if (patientData.phone) {
                fhirPatient.telecom.push({
                    system: 'phone',
                    value: patientData.phone,
                    use: 'home',
                });
            }
            
            if (patientData.email) {
                fhirPatient.telecom.push({
                    system: 'email',
                    value: patientData.email,
                    use: 'home',
                });
            }
        }

        // Add address if provided
        if (patientData.address) {
            fhirPatient.address = [
                {
                    use: 'home',
                    type: 'physical',
                    line: patientData.address.line ? [patientData.address.line] : [],
                    city: patientData.address.city,
                    state: patientData.address.state,
                    postalCode: patientData.address.postalCode,
                    country: patientData.address.country,
                },
            ];
        }

        console.log(JSON.stringify(fhirPatient))
        return this.request<FHIRPatient>('/Patient', {
            method: 'POST',
            body: JSON.stringify(fhirPatient),
        });
    }

    async updatePatient(id: string, patientData: Partial<CreatePatientData>): Promise<FHIRPatient> {
        // First get the existing patient
        const existingPatient = await this.getPatientById(id);
        
        // Update the patient data
        const updatedPatient: FHIRPatient = {
            ...existingPatient,
        };

        if (patientData.firstName || patientData.lastName) {
            updatedPatient.name = [
                {
                    use: 'official',
                    family: patientData.lastName || existingPatient.name?.[0]?.family || '',
                    given: patientData.firstName ? [patientData.firstName] : existingPatient.name?.[0]?.given || [],
                },
            ];
        }

        if (patientData.gender) {
            updatedPatient.gender = patientData.gender;
        }

        if (patientData.birthDate) {
            updatedPatient.birthDate = patientData.birthDate;
        }

        // Update telecom
        if (patientData.phone !== undefined || patientData.email !== undefined) {
            updatedPatient.telecom = [];
        
            if (patientData.phone) {
                updatedPatient.telecom.push({
                    system: 'phone',
                    value: patientData.phone,
                    use: 'home',
                });
            }
        
            if (patientData.email) {
                updatedPatient.telecom.push({
                    system: 'email',
                    value: patientData.email,
                    use: 'home',
                });
            }
        }
        
        // Update address
        const newUpdatedPatient = {
            ...updatedPatient,
            address:
                    patientData.address?.line ||
                    patientData.address?.city ||
                    patientData.address?.state ||
                    patientData.address?.postalCode ||
                    patientData.address?.country
                ? patientData.address
                : updatedPatient.address,
        };

        if (patientData.address?.line) {
            // Ensure updatedPatient.address exists
            if (!newUpdatedPatient.address) {
                newUpdatedPatient.address = [{line:[]}];
                newUpdatedPatient.address?.[0].line?.push(patientData.address.line)
            }
            
        }

        console.log(JSON.stringify(newUpdatedPatient));
        
        return this.request<FHIRPatient>(`/Patient/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newUpdatedPatient),
        });
    }

    async deletePatient(id: string): Promise<void> {
        await this.request<void>(`/Patient/${id}`, {
            method: 'DELETE',
        });
    }
}