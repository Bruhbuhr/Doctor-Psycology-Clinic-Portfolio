/**
 * TypeScript interfaces matching backend Pydantic models
 * End-to-end type safety between FastAPI and Angular
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  price_start: number;
  duration_minutes: number;
  icon: string;
}

export interface Credential {
  title: string;
  institution: string;
  year: number;
}

export interface DoctorProfile {
  name: string;
  title: string;
  specialty: string;
  sub_specialty?: string;
  bio: string;
  years_experience: number;
  patients_served: number;
  success_rate: number;
  image_url: string;
  credentials: Credential[];
  languages: string[];
}

export interface Testimonial {
  id: string;
  patient_name: string;
  patient_image?: string;
  rating: number;
  comment: string;
  date: string;
  treatment: string;
}

export interface ClinicInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  hours: Record<string, string>;
  map_url?: string;
}

export interface BookingRequest {
  patient_name: string;
  email: string;
  phone: string;
  service_id: string;
  preferred_date: string;
  preferred_time?: string;
  notes?: string;
}

export interface BookingResponse {
  status: string;
  message: string;
  booking_reference: string;
  estimated_callback: string;
}
