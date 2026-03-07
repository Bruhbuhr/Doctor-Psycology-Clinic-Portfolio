import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfile } from '../../models/types';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-24 bg-slate-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left - Credentials -->
          <div class="space-y-8">
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                Về Bác Sĩ
              </div>
              <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Chuyên Môn Cao, <br/>
                <span class="text-indigo-600">Thấu Hiểu & Đồng Cảm</span>
              </h2>
              <p class="text-slate-600 text-lg leading-relaxed">
                Bác sĩ có nhiều năm kinh nghiệm tại bệnh viện chuyên khoa tâm thần, luôn kết hợp đánh giá lâm sàng kỹ lưỡng với liệu pháp phù hợp từng người bệnh.
              </p>
            </div>

            <div class="grid sm:grid-cols-3 gap-3">
              <div class="trust-chip">Khám riêng tư</div>
              <div class="trust-chip">Phác đồ cá nhân hóa</div>
              <div class="trust-chip">Theo dõi sát sau khám</div>
            </div>

            <!-- Credentials List -->
            <div class="space-y-4">
              @for (credential of profile()?.credentials || []; track credential.year) {
                <div class="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold shrink-0">
                    {{ credential.year }}
                  </div>
                  <div>
                    <div class="font-semibold text-slate-900">{{ credential.title }}</div>
                    <div class="text-slate-500 text-sm">{{ credential.institution }}</div>
                  </div>
                </div>
              }
            </div>

            <!-- Languages -->
            <div class="flex items-center gap-4">
              <span class="text-slate-500 text-sm font-medium">Ngôn ngữ:</span>
              <div class="flex gap-2">
                @for (lang of profile()?.languages || ['Tiếng Việt', 'Tiếng Anh']; track lang) {
                  <span class="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
                    {{ lang }}
                  </span>
                }
              </div>
            </div>
          </div>

          <!-- Right - Image/Stats Card -->
          <div class="relative">
            <div class="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                alt="Phòng khám tâm thần"
                class="w-full h-64 object-cover rounded-2xl mb-6"
              />
              
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 bg-indigo-50 rounded-xl">
                  <div class="text-3xl font-black text-indigo-600">{{ profile()?.years_experience || 15 }}+</div>
                  <div class="text-slate-600 text-sm font-medium">Năm Kinh Nghiệm</div>
                </div>
                <div class="text-center p-4 bg-slate-100 rounded-xl">
                  <div class="text-3xl font-black text-slate-900">{{ profile()?.success_rate || 96.5 }}%</div>
                  <div class="text-slate-600 text-sm font-medium">Bệnh Nhân Hài Lòng</div>
                </div>
              </div>

              <!-- Certifications badges -->
              <div class="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-100">
                <div class="badge-item">
                  <div class="badge-icon">🧠</div>
                  <span class="badge-label">Tâm Thần Học</span>
                </div>
                <div class="badge-item">
                  <div class="badge-icon">💜</div>
                  <span class="badge-label">Tâm Lý Trị Liệu</span>
                </div>
                <div class="badge-item">
                  <div class="badge-icon">🎓</div>
                  <span class="badge-label">Tiến Sĩ Y Khoa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .badge-item { @apply text-center; }
    .badge-icon { @apply w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-2; }
    .badge-label { @apply text-xs text-slate-500 font-medium; }
    .trust-chip { @apply text-center text-sm font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700; }
  `]
})
export class AboutComponent {
  profile = input<DoctorProfile | null>(null);
}
