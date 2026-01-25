import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicInfo } from '../../models/types';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Left - Clinic Info -->
          <div class="space-y-8">
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                Liên Hệ Phòng Khám
              </div>
              <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {{ clinic()?.name || 'Phòng Khám Tâm Thần Kinh' }}
              </h2>
              <p class="text-slate-600">Không gian riêng tư, thoải mái và bảo mật tuyệt đối.</p>
            </div>

            <div class="grid gap-4">
              <!-- Address -->
              <div class="contact-card">
                <div class="icon-box">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-slate-900">Địa Chỉ</div>
                  <div class="text-slate-600">{{ clinic()?.address }}</div>
                  <div class="text-slate-600">{{ clinic()?.city }}, {{ clinic()?.state }}</div>
                </div>
              </div>

              <!-- Phone -->
              <div class="contact-card">
                <div class="icon-box">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-slate-900">Điện Thoại</div>
                  <div class="text-indigo-600 font-medium">{{ clinic()?.phone }}</div>
                </div>
              </div>

              <!-- Email -->
              <div class="contact-card">
                <div class="icon-box">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-slate-900">Email</div>
                  <div class="text-indigo-600">{{ clinic()?.email }}</div>
                </div>
              </div>
            </div>

            <!-- Hours -->
            <div class="p-6 bg-white rounded-xl border border-slate-100">
              <h3 class="font-bold text-slate-900 mb-4">Giờ Làm Việc</h3>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="text-slate-600">Thứ Hai - Thứ Sáu</div>
                <div class="text-slate-900 font-medium">{{ clinic()?.hours?.['monday'] || '8:00 - 17:00' }}</div>
                <div class="text-slate-600">Thứ Bảy</div>
                <div class="text-slate-900 font-medium">{{ clinic()?.hours?.['saturday'] || '8:00 - 12:00' }}</div>
                <div class="text-slate-600">Chủ Nhật</div>
                <div class="text-slate-500">Nghỉ</div>
              </div>
            </div>
          </div>

          <!-- Map Image -->
          <div class="bg-slate-200 rounded-3xl overflow-hidden h-[500px] lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
              alt="Hình ảnh phòng khám tâm thần"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-card {
      @apply flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100;
    }
    .icon-box {
      @apply w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0;
    }
  `]
})
export class ContactComponent {
  clinic = input<ClinicInfo | null>(null);
}
