import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../models/types';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            Đánh Giá Của Bệnh Nhân
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Hành Trình Phục Hồi Của Họ
          </h2>
          <p class="text-slate-600 text-lg">
            Những câu chuyện thực từ những bệnh nhân đã tin tưởng giao phó sức khỏe tinh thần cho chúng tôi.
          </p>
        </div>

        @if (testimonials().length > 0) {
          <div class="relative max-w-4xl mx-auto">
            <!-- Active Testimonial Card -->
            <div class="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden transition-all duration-500">
              <div class="absolute top-6 left-6 text-8xl text-indigo-500/20 font-serif">"</div>
              
                @for (t of [currentTestimonial()]; track t.id) {
                  <div class="relative z-10 animate-fade-in">
                    <div class="flex gap-1 mb-6">
                      @for (star of getStars(t.rating); track $index) {
                        <span class="text-yellow-400 text-xl">{{ star }}</span>
                      }
                    </div>

                    <blockquote class="text-xl lg:text-2xl font-medium leading-relaxed mb-8">
                      "{{ t.comment }}"
                    </blockquote>

                    <div class="flex items-center gap-4">
                      <img 
                        [src]="t.patient_image || 'https://via.placeholder.com/60'"
                        [alt]="t.patient_name"
                        class="w-14 h-14 rounded-full object-cover border-2 border-indigo-400"
                      />
                      <div>
                        <div class="font-bold text-lg">{{ t.patient_name }}</div>
                        <div class="text-indigo-300 text-sm">{{ t.treatment }}</div>
                      </div>
                    </div>
                  </div>
                }
            </div>

            <!-- Navigation Controls -->
            <div class="flex items-center justify-center gap-4 mt-8">
              <button (click)="prev()" class="nav-btn" aria-label="Đánh giá trước">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <div class="flex gap-2">
                @for (t of testimonials(); track t.id; let i = $index) {
                  <button 
                    (click)="setActive(i)"
                    [class]="i === activeTestimonial() ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'"
                    class="h-2 rounded-full transition-all"
                    [attr.aria-label]="'Đánh giá ' + (i + 1)">
                  </button>
                }
              </div>

              <button (click)="next()" class="nav-btn" aria-label="Đánh giá tiếp theo">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .nav-btn {
      @apply w-12 h-12 rounded-full bg-slate-100 hover:bg-indigo-50 flex items-center justify-center transition-colors;
    }
  `]
})
export class TestimonialsComponent {
  testimonials = input.required<Testimonial[]>();
  activeTestimonial = signal(0);

  get currentTestimonial() {
    return () => this.testimonials()[this.activeTestimonial()];
  }

  next() {
    const next = (this.activeTestimonial() + 1) % this.testimonials().length;
    this.activeTestimonial.set(next);
  }

  prev() {
    const prev = this.activeTestimonial() === 0 ? this.testimonials().length - 1 : this.activeTestimonial() - 1;
    this.activeTestimonial.set(prev);
  }

  setActive(index: number) {
    this.activeTestimonial.set(index);
  }

  getStars(rating: number): string[] {
    return Array(rating).fill('★');
  }
}
