import { Component, input } from '@angular/core';
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
            Dịch Vụ Của Chúng Tôi
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Chăm Sóc Sức Khỏe Tinh Thần Toàn Diện
          </h2>
          <p class="text-slate-600 text-lg">
            Dịch vụ chẩn đoán và điều trị tâm thần kinh chuyên sâu, kết hợp y học hiện đại với liệu pháp tâm lý theo tiêu chuẩn quốc tế.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of services(); track service.id) {
            <div class="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 cursor-pointer">
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
              
              <div class="flex items-center justify-between pt-4 border-t border-slate-200/50">
                <div>
                  <span class="text-sm text-slate-500">Từ</span>
                  <span class="text-lg font-bold text-slate-900 ml-1">{{ service.price_start | number }}đ</span>
                </div>
                <span class="text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Xem thêm
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  services = input.required<Service[]>();

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
}
