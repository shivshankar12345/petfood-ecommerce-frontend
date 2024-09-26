
export interface IFormInput {
    name: string;
    email: string; // Already provided by the user
    phone: string;
    gender: 'male' | 'female' | 'other';
  }
  
 export interface LogInProps {
    email: string;
  }
  