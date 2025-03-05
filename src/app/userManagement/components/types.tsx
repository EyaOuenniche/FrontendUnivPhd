export interface Entity {
    id: number;
    [key: string]: string | number | boolean;
  }
  
  export interface UserProfile extends Entity {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    linkedin: string;
    dob: string;
    isActive: boolean;
    name: string;
    isAdmin: boolean;
  }
  
  export interface University extends Entity {
    id: number;
    name: string;
    location: string;
    established: number;
  }