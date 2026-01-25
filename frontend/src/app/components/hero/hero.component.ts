import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfile } from '../../models/types';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="pt-32 pb-20 lg:pt-44 lg:pb-32 px-4 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60 z-0"></div>
      <div class="absolute bottom-0 left-0 -ml-40 -mb-40 w-[400px] h-[400px] bg-gradient-to-tr from-violet-50 to-indigo-50 rounded-full blur-3xl opacity-40 z-0"></div>
      
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <!-- Left Content -->
        <div class="space-y-8 animate-fade-in-up">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            Đang Nhận Bệnh Nhân Mới
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Chăm Sóc <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-500">
              Sức Khỏe Tinh Thần
            </span>
            <br/>Tận Tâm
          </h1>
          
          <p class="text-lg text-slate-600 max-w-lg leading-relaxed">
            {{ profile()?.bio || 'Chuyên gia tâm thần kinh với nhiều năm kinh nghiệm trong chẩn đoán và điều trị các rối loạn tâm thần, lo âu, trầm cảm...' }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button (click)="contactClick.emit()" class="btn-primary-hero">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Đặt Lịch Tư Vấn
            </button>
            <button (click)="servicesClick.emit()" class="btn-secondary-hero">
              Xem Dịch Vụ
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 lg:gap-8 pt-8 border-t border-slate-200">
            <div class="text-center sm:text-left">
              <div class="text-3xl lg:text-4xl font-black text-slate-900">{{ profile()?.years_experience || '15' }}+</div>
              <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Năm Kinh Nghiệm</div>
            </div>
            <div class="text-center sm:text-left">
              <div class="text-3xl lg:text-4xl font-black text-slate-900">{{ (profile()?.patients_served || 10000) / 1000 }}k+</div>
              <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Bệnh Nhân</div>
            </div>
            <div class="text-center sm:text-left">
              <div class="text-3xl lg:text-4xl font-black text-slate-900">{{ profile()?.success_rate || '96.5' }}%</div>
              <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Hài Lòng</div>
            </div>
          </div>
        </div>

        <!-- Right - Doctor Image -->
        <div class="relative lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 group">
          <img 
            [src]="profile()?.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000'" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Ảnh Bác Sĩ"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
          
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="text-white">
              <div class="text-2xl lg:text-3xl font-bold">{{ profile()?.name || 'BS. Nguyễn Thanh Hùng' }}</div>
              <div class="text-indigo-300 font-medium text-lg">{{ profile()?.specialty || 'Tâm Thần Kinh' }}</div>
              <div class="text-slate-300 text-sm mt-1">{{ profile()?.title || 'Tiến sĩ, Bác sĩ Chuyên khoa II' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .btn-primary-hero {
      @apply bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 
             transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2;
    }
    .btn-secondary-hero {
      @apply bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold 
             hover:bg-slate-50 transition-all flex items-center justify-center gap-2;
    }
  `]
})
export class HeroComponent {
  profile = input<DoctorProfile | null>(null);
  
  contactClick = output<void>();
  servicesClick = output<void>();
}
