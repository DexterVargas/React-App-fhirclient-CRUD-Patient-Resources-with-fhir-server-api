export interface FHIRPatient {
  resourceType: 'Patient';
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
  };
  identifier?: Array<{
    use?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    system?: string;
    value?: string;
  }>;
  active?: boolean;
  name?: Array<{
    use?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
  }>;
  telecom?: Array<{
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  }>;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
  address?: Array<{
    use?: string;
    type?: string;
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>;
  contact?: Array<{
    relationship?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
    name?: {
      family?: string;
      given?: string[];
    };
    telecom?: Array<{
      system?: string;
      value?: string;
      use?: string;
    }>;
  }>;
}

export interface FHIRBundle {
    resourceType: 'Bundle';
    id?: string;
    type: 'searchset' | 'collection' | 'batch' | 'transaction';
    total?: number;
    entry?: Array<{
        fullUrl?: string;
        resource: FHIRPatient;
        search?: {
          mode?: string;
        };
    }>;
}

export interface CreatePatientData {
    id?:string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other' | 'unknown';
    birthDate: string;
    phone?: string;
    email?: string;
    address?: {
        line?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    };
}

// export interface UpdatePatientData extends CreatePatientData {
//   id: string;
// }
