import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Service } from '../../models/types';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="booking" class="py-24 bg-indigo-950 text-white relative overflow-hidden" aria-labelledby="booking-heading">
      <!-- Background decorations -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div class="absolute right-0 top-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
        <div class="absolute left-0 bottom-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 relative z-10">
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div class="text-center mb-10">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
              Đặt Lịch Ngay
            </div>
            <h2 id="booking-heading" class="text-3xl lg:text-4xl font-bold mb-4">Đăng Ký Khám Tâm Thần</h2>
            <p class="text-slate-300 max-w-lg mx-auto">
              Mọi thông tin cá nhân và bệnh sử được bảo mật tuyệt đối. Lễ tân y khoa sẽ liên hệ trong vòng 2 giờ để xác nhận lịch hẹn phù hợp.
            </p>
          </div>

          <form [formGroup]="formGroup()" (ngSubmit)="onSubmit()" class="space-y-6" aria-describedby="booking-note">
            <p id="booking-note" class="text-xs text-slate-300/90">Các trường có dấu <span class="text-rose-300">*</span> là bắt buộc.</p>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="patient_name" class="label-text">Họ và Tên *</label>
                <input id="patient_name" formControlName="patient_name" type="text" class="input-field" placeholder="Nguyễn Văn A" aria-describedby="patient-name-error" autocomplete="name"/>
                @if (formGroup().get('patient_name')?.touched && formGroup().get('patient_name')?.invalid) {
                  <p id="patient-name-error" class="error-text" role="alert">Vui lòng nhập họ tên đầy đủ</p>
                }
              </div>

              <div class="space-y-2">
                <label for="phone" class="label-text">Số Điện Thoại *</label>
                <input id="phone" formControlName="phone" type="tel" class="input-field" placeholder="0901 234 567" aria-describedby="phone-help" autocomplete="tel"/>
                <p id="phone-help" class="text-[11px] text-slate-400">Ví dụ: 0901 234 567 hoặc +84 901 234 567</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="email" class="label-text">Địa Chỉ Email *</label>
              <input id="email" formControlName="email" type="email" class="input-field" placeholder="email@example.com" aria-describedby="email-error" autocomplete="email"/>
              @if (formGroup().get('email')?.touched && formGroup().get('email')?.invalid) {
                <p id="email-error" class="error-text" role="alert">Vui lòng nhập email hợp lệ</p>
              }
            </div>

              <div class="space-y-2">
                <label for="service_id" class="label-text">Dịch Vụ Quan Tâm *</label>
                <select id="service_id" formControlName="service_id" class="input-field [&>option]:text-slate-900 [&>option]:bg-white">
                  @for (service of services(); track service.id) {
                    <option [value]="service.id">{{ service.title }}</option>
                  }
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <label for="preferred_date" class="label-text">Ngày Muốn Khám *</label>
              <input id="preferred_date" formControlName="preferred_date" type="date" class="input-field [color-scheme:dark]" aria-describedby="preferred-date-error"/>
              @if (formGroup().get('preferred_date')?.touched && formGroup().get('preferred_date')?.invalid) {
                <p id="preferred-date-error" class="error-text" role="alert">Vui lòng chọn ngày muốn khám</p>
              }
            </div>

            <div class="space-y-2">
              <label for="notes" class="label-text">Ghi chú (không bắt buộc)</label>
              <textarea id="notes" formControlName="notes" class="input-field min-h-[80px]" placeholder="Mô tả ngắn về tình trạng của bạn (ví dụ: khó ngủ, lo âu kéo dài, căng thẳng công việc)..."></textarea>
            </div>

             <button type="submit" class="submit-btn" [disabled]="isSubmitting()">
              @if (isSubmitting()) {
                <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Đang xử lý...
              } @else {
                Xác Nhận Đặt Lịch
              }
            </button>

            @if (status()) {
              <div class="p-4 rounded-xl border text-center animate-fade-in" aria-live="polite"
                   [class]="status()?.includes('✅') ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-200' : 'bg-red-500/20 border-red-500/30 text-red-200'">
                {{ status() }}
              </div>
            }
          </form>

          @if (status() && status()?.includes('✅')) {
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" aria-label="Đặt lịch thành công">
              <div class="bg-white text-slate-900 rounded-2xl p-8 max-w-sm w-[90%] text-center shadow-2xl">
                <h3 class="text-xl font-bold mb-2">Đặt lịch thành công!</h3>
                <p class="text-slate-600 text-sm mb-6">
                  Chúng tôi đã tiếp nhận thông tin. Lễ tân y khoa sẽ liên hệ để xác nhận lịch khám và hướng dẫn trước buổi hẹn.
                </p>
                <button type="button" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl"
                        (click)="onDismissStatus()">
                  Đóng
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .label-text { @apply text-sm font-medium text-slate-300; }
    .input-field { @apply w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder-slate-500; }
    .error-text { @apply text-red-400 text-xs; }
    .submit-btn { @apply w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2; }
  `]
})
export class BookingComponent {
  services = input.required<Service[]>();
  formGroup = input.required<FormGroup>();
  isSubmitting = input(false);
  status = input<string | null>(null);
  
  submitForm = output<void>();
  dismissStatus = output<void>();

  onSubmit() {
    this.submitForm.emit();
  }

  onDismissStatus() {
    this.dismissStatus.emit();
  }
}
