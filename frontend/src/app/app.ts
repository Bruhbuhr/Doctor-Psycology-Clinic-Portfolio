import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';
import { DoctorProfile, Service, Testimonial, ClinicInfo } from './models/types';

// Feature Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { BookingComponent } from './components/booking/booking.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    BookingComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      
      <!-- Header/Navigation -->
      <header role="banner">
        <app-navbar (scrollTo)="scrollToSection($event)"></app-navbar>
      </header>

      <!-- Main Content -->
      <main id="main-content" role="main" aria-label="Main content">
        <article itemscope itemtype="https://schema.org/MedicalBusiness">
          <app-hero 
            [profile]="profile()" 
            (contactClick)="scrollToSection('booking')"
            (servicesClick)="scrollToSection('services')">
          </app-hero>

          <app-services [services]="services()"></app-services>

          <app-about [profile]="profile()"></app-about>

          <app-testimonials [testimonials]="testimonials()"></app-testimonials>

          <app-contact [clinic]="clinic()"></app-contact>

          <app-booking 
            [services]="services()"
            [formGroup]="bookingForm"
            [isSubmitting]="isSubmitting()"
            [status]="submitStatus()"
            (submitForm)="onSubmit()">
          </app-booking>
        </article>
      </main>

      <!-- Footer -->
      <app-footer 
        [clinic]="clinic()" 
        (navClick)="scrollToSection($event)">
      </app-footer>

    </div>
  `
})
export class App implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  // Data Signals
  profile = signal<DoctorProfile | null>(null);
  services = signal<Service[]>([]);
  testimonials = signal<Testimonial[]>([]);
  clinic = signal<ClinicInfo | null>(null);
  
  // UI State
  isSubmitting = signal(false);
  submitStatus = signal<string | null>(null);

  // Form
  bookingForm: FormGroup = this.fb.group({
    patient_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    service_id: ['', Validators.required],
    preferred_date: ['', Validators.required],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData(): void {
    this.apiService.getProfile().subscribe(data => this.profile.set(data));
    this.apiService.getServices().subscribe(data => {
      this.services.set(data);
      // Pre-select first service
      if (data.length > 0) {
        this.bookingForm.patchValue({ service_id: data[0].id });
      }
    });
    this.apiService.getTestimonials().subscribe(data => this.testimonials.set(data));
    this.apiService.getClinicInfo().subscribe(data => this.clinic.set(data));
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set(null);

    this.apiService.submitBooking(this.bookingForm.value).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.submitStatus.set(`✅ ${response.message} Reference: ${response.booking_reference}`);
        this.bookingForm.reset();
        setTimeout(() => this.submitStatus.set(null), 8000);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitStatus.set('❌ Something went wrong. Please try again.');
      }
    });
  }
}
