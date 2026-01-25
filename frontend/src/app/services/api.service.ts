import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { 
  DoctorProfile, 
  Service, 
  Testimonial, 
  ClinicInfo, 
  BookingRequest, 
  BookingResponse 
} from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api';

  // Loading states
  isLoading = signal(false);
  error = signal<string | null>(null);

  /**
   * Fetch doctor profile from backend
   */
  getProfile(): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.baseUrl}/profile`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockProfile());
      })
    );
  }

  /**
   * Fetch all services from backend
   */
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockServices());
      })
    );
  }

  /**
   * Fetch testimonials from backend
   */
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.baseUrl}/testimonials`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockTestimonials());
      })
    );
  }

  /**
   * Fetch clinic info from backend
   */
  getClinicInfo(): Observable<ClinicInfo> {
    return this.http.get<ClinicInfo>(`${this.baseUrl}/clinic`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockClinic());
      })
    );
  }

  /**
   * Submit booking request
   */
  submitBooking(booking: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.baseUrl}/book`, booking).pipe(
      catchError(err => {
        console.warn('Backend unavailable, simulating booking', err);
        return of({
          status: 'success',
          message: 'Demo mode: Your request has been received!',
          booking_reference: `BK-DEMO-${Date.now().toString().slice(-4)}`,
          estimated_callback: 'Within 2 hours during business hours'
        });
      })
    );
  }

  // ============================================================================
  // MOCK DATA (Fallback when backend is unavailable)
  // ============================================================================

  private getMockProfile(): DoctorProfile {
    return {
      name: "Dr. Sarah Mitchell",
      title: "MD, FACC, FAHA",
      specialty: "Interventional Cardiology",
      sub_specialty: "Preventive Heart Care",
      bio: "Dr. Sarah Mitchell is a board-certified cardiologist with over 15 years of experience in interventional cardiology and preventive heart care. A former Chief Resident at Johns Hopkins Hospital, she combines cutting-edge medical expertise with a compassionate, patient-centered approach.",
      years_experience: 15,
      patients_served: 12000,
      success_rate: 98.7,
      image_url: "https://images.unsplash.com/photo-1559839734-2b71ea860485?auto=format&fit=crop&q=80&w=1000",
      credentials: [
        { title: "MD - Doctor of Medicine", institution: "Harvard Medical School", year: 2008 },
        { title: "Fellowship - Cardiology", institution: "Cleveland Clinic", year: 2014 },
        { title: "Board Certified", institution: "American Board of Internal Medicine", year: 2014 },
      ],
      languages: ["English", "Spanish", "French"]
    };
  }

  private getMockServices(): Service[] {
    return [
      { id: "srv_consult", title: "Cardiac Consultation", description: "Comprehensive heart health assessment including medical history review, physical examination, and personalized treatment planning.", price_start: 150, duration_minutes: 45, icon: "heart-pulse" },
      { id: "srv_echo", title: "Echocardiogram", description: "Non-invasive ultrasound imaging to visualize heart structure, valves, and blood flow in real-time.", price_start: 300, duration_minutes: 60, icon: "activity" },
      { id: "srv_stress", title: "Stress Testing", description: "Evaluate heart function under controlled physical stress to detect coronary artery disease.", price_start: 250, duration_minutes: 90, icon: "trending-up" },
      { id: "srv_holter", title: "Holter Monitoring", description: "24-72 hour continuous heart rhythm recording to detect arrhythmias.", price_start: 200, duration_minutes: 30, icon: "monitor" },
      { id: "srv_ekg", title: "EKG / ECG", description: "Quick, painless electrical recording of heart activity to screen for heart conditions.", price_start: 75, duration_minutes: 15, icon: "zap" },
      { id: "srv_prevention", title: "Preventive Cardiology", description: "Personalized risk assessment and lifestyle modification program for heart disease prevention.", price_start: 200, duration_minutes: 60, icon: "shield" },
    ];
  }

  private getMockTestimonials(): Testimonial[] {
    return [
      { id: "test_1", patient_name: "Michael R.", patient_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "Dr. Mitchell saved my life. After years of ignoring warning signs, she caught a serious blockage during a routine checkup. Her thorough approach and genuine care made all the difference.", date: "2025-12-15", treatment: "Cardiac Consultation" },
      { id: "test_2", patient_name: "Jennifer K.", patient_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "The most professional and caring medical experience I've ever had. Dr. Mitchell took the time to explain everything and answer all my questions. Highly recommend!", date: "2025-11-28", treatment: "Echocardiogram" },
      { id: "test_3", patient_name: "Robert T.", patient_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "After my heart attack, Dr. Mitchell created a comprehensive recovery plan. One year later, I'm healthier than I've been in decades. Forever grateful.", date: "2025-10-10", treatment: "Preventive Cardiology" },
      { id: "test_4", patient_name: "Patricia M.", patient_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "The stress test was quick and painless. The staff was incredibly supportive, and Dr. Mitchell personally reviewed my results the same day.", date: "2025-09-22", treatment: "Stress Testing" },
    ];
  }

  private getMockClinic(): ClinicInfo {
    return {
      name: "EliteMed Heart & Vascular Center",
      address: "1250 Medical Center Drive, Suite 400",
      city: "Beverly Hills",
      state: "California",
      zip_code: "90210",
      phone: "(310) 555-0199",
      email: "appointments@elitemedclinic.com",
      hours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed"
      },
      map_url: "https://maps.google.com/?q=Beverly+Hills+Medical+Center"
    };
  }
}
