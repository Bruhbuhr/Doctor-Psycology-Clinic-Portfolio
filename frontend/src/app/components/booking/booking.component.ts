import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Service } from '../../models/types';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="booking" class="py-24 bg-indigo-950 text-white relative overflow-hidden">
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
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">Đăng Ký Tư Vấn</h2>
            <p class="text-slate-300 max-w-lg mx-auto">
              Mọi thông tin của bạn được bảo mật tuyệt đối. Nhân viên sẽ liên hệ trong vòng 2 giờ để xác nhận lịch hẹn.
            </p>
          </div>

          <form [formGroup]="formGroup()" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="label-text">Họ và Tên *</label>
                <input formControlName="patient_name" type="text" class="input-field" placeholder="Nguyễn Văn A"/>
                @if (formGroup().get('patient_name')?.touched && formGroup().get('patient_name')?.invalid) {
                  <p class="error-text">Vui lòng nhập họ tên đầy đủ</p>
                }
              </div>

              <div class="space-y-2">
                <label class="label-text">Số Điện Thoại *</label>
                <input formControlName="phone" type="tel" class="input-field" placeholder="0901 234 567"/>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="label-text">Địa Chỉ Email *</label>
                <input formControlName="email" type="email" class="input-field" placeholder="email@example.com"/>
              </div>

              <div class="space-y-2">
                <label class="label-text">Dịch Vụ Quan Tâm *</label>
                <select formControlName="service_id" class="input-field [&>option]:text-slate-900 [&>option]:bg-white">
                  @for (service of services(); track service.id) {
                    <option [value]="service.id">{{ service.title }}</option>
                  }
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <label class="label-text">Ngày Muốn Khám *</label>
              <input formControlName="preferred_date" type="date" class="input-field [color-scheme:dark]"/>
            </div>

            <div class="space-y-2">
              <label class="label-text">Ghi chú (không bắt buộc)</label>
              <textarea formControlName="notes" class="input-field min-h-[80px]" placeholder="Mô tả ngắn về tình trạng của bạn..."></textarea>
            </div>

            <button type="submit" [disabled]="formGroup().invalid || isSubmitting()" class="submit-btn" [class.opacity-50]="formGroup().invalid || isSubmitting()">
              @if (isSubmitting()) {
                <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Đang xử lý...
              } @else {
                Xác Nhận Đặt Lịch
              }
            </button>

            @if (status()) {
              <div class="p-4 rounded-xl border text-center animate-fade-in"
                   [class]="status()?.includes('✅') ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-200' : 'bg-red-500/20 border-red-500/30 text-red-200'">
                {{ status() }}
              </div>
            }
          </form>
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

  onSubmit() {
    this.submitForm.emit();
  }
}
