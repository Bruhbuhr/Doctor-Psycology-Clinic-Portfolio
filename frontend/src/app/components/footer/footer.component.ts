import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicInfo } from '../../models/types';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-slate-900 border-t border-slate-800 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-12">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold">
                TT
              </div>
              <span class="text-xl font-bold text-white">
                Tâm<span class="text-indigo-400">Thần</span>
              </span>
            </div>
            <p class="text-slate-400 max-w-sm">
              Cung cấp dịch vụ chăm sóc sức khỏe tinh thần chuyên nghiệp, bảo mật và tận tâm. Sức khỏe tinh thần của bạn là ưu tiên hàng đầu của chúng tôi.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold text-white mb-4">Liên Kết Nhanh</h4>
            <ul class="space-y-2">
              <li><a (click)="navClick.emit('services')" class="footer-link">Dịch Vụ</a></li>
              <li><a (click)="navClick.emit('about')" class="footer-link">Về Bác Sĩ</a></li>
              <li><a (click)="navClick.emit('testimonials')" class="footer-link">Đánh Giá</a></li>
              <li><a (click)="navClick.emit('contact')" class="footer-link">Liên Hệ</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold text-white mb-4">Liên Hệ</h4>
            <ul class="space-y-2 text-slate-400">
              <li>{{ clinic()?.phone }}</li>
              <li>{{ clinic()?.email }}</li>
              <li>{{ clinic()?.city }}, {{ clinic()?.state }}</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-slate-500 text-sm">
            &copy; 2025 Phòng Khám Tâm Thần Kinh. Bản quyền thuộc về chúng tôi.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="footer-link-sm">Chính Sách Bảo Mật</a>
            <a href="#" class="footer-link-sm">Điều Khoản Sử Dụng</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-link { @apply text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors; }
    .footer-link-sm { @apply text-slate-400 hover:text-white transition-colors text-sm; }
  `]
})
export class FooterComponent {
  clinic = input<ClinicInfo | null>(null);
  navClick = output<string>();
}
