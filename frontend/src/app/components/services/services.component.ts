import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/types';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            Chuyên Khoa Tâm Thần
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Dịch Vụ Chẩn Đoán & Điều Trị Chuyên Sâu
          </h2>
          <p class="text-slate-600 text-lg">
            Kế hoạch điều trị cá nhân hóa cho trầm cảm, lo âu, mất ngủ, stress kéo dài và các rối loạn tâm thần thường gặp.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of services(); track service.id) {
            <div class="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 cursor-pointer h-full flex flex-col"
                 (click)="openModal(service)">
              <!-- Icon -->
              <div class="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-2xl group-hover:bg-indigo-600 group-hover:shadow-indigo-600/20 group-hover:scale-110 transition-all duration-300">
                <span class="group-hover:grayscale-0 group-hover:text-white transition-colors">{{ getIcon(service.icon) }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed mb-4">
                {{ service.description }}
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t border-slate-200/50 mt-auto">
                <div>
                  <span class="text-sm text-slate-500">Từ</span>
                  <span class="text-lg font-bold text-slate-900 ml-1">{{ service.price_start | number }}đ</span>
                </div>
                <button 
                  class="text-indigo-600 text-sm font-semibold transition-all inline-flex items-center gap-1 hover:text-indigo-800"
                  (click)="$event.stopPropagation(); openModal(service)">
                  Xem chi tiết
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Modal Popup -->
      @if (selectedService()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-label="Chi tiết dịch vụ">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
               (click)="closeModal()"></div>

          <!-- Modal Content -->
          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
            <!-- Modal Header -->
            <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-xl text-indigo-600">
                  {{ getIcon(selectedService()!.icon) }}
                </div>
                <h3 class="text-xl font-bold text-slate-900">{{ selectedService()!.title }}</h3>
              </div>
              <button class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                      (click)="closeModal()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Modal Body (Scrollable) -->
            <div class="p-6 overflow-y-auto">
              <div class="mb-6">
                <h4 class="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Giới thiệu</h4>
                <p class="text-slate-600 leading-relaxed">{{ selectedService()!.description }}</p>
              </div>

              @if (selectedService()!.treatment_process) {
                <div>
                  <h4 class="text-sm font-bold text-indigo-700 uppercase tracking-wide mb-4">Quy trình điều trị</h4>
                  <ul class="space-y-4">
                    @for (step of selectedService()!.treatment_process; track step; let i = $index) {
                      <li class="flex gap-4">
                        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                          {{ i + 1 }}
                        </div>
                        <span class="text-slate-700">{{ step }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>

            <!-- Modal Footer -->
            <div class="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <span class="text-sm text-slate-500 block">Chi phí tham khảo</span>
                <span class="text-xl font-bold text-indigo-600">{{ selectedService()!.price_start | number }}đ</span>
              </div>
              <button class="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                      (click)="closeModal()"> <!-- Could link to booking later -->
                Đặt lịch ngay
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  `
})
export class ServicesComponent {
  services = input.required<Service[]>();
  selectedService = signal<Service | null>(null);

  getIcon(iconKey: string): string {
    const icons: Record<string, string> = {
      'brain': '🧠',
      'heart': '💜',
      'shield': '🛡️',
      'moon': '🌙',
      'message': '💬',
      'users': '👨‍👩‍👧'
    };
    return icons[iconKey] || '•';
  }

  openModal(service: Service) {
    this.selectedService.set(service);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.selectedService.set(null);
    document.body.style.overflow = ''; // Restore scrolling
  }
}
