/** Data models used across steps */

// A Course object
export interface Course {
    id: string;
    name: string;
    courseCode: string;
    credits: number;
    prerequisites: string[];  
  }
  
  // A Term object
  export interface Term {
    id: string;
    name: string;
    startDate?: string;
    endDate?: string;
    courses: string[];  
  }
  
  // A SubSpecialty object
  export interface SubSpecialty {
    id: string;
    name: string;
    courses: Course[];
    terms: Term[];
  }
  
  // A Program object
  export interface Program {
    id: string;
    name: string;
    description: string;
    degree: string;                
    admissionRequirement: string;
    applicationProcedure: string;
    tuition: number;               
    subSpecialties: SubSpecialty[];
  }
  
  // The top-level Form Data
  export interface FormDataShape {
    universityName: string;
    accreditation: string;
    establishedYear: string;
    location: string;
    programs: Program[];
  }
 
  