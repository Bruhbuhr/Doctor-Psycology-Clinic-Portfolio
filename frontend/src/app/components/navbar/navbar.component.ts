import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm" aria-label="Điều hướng chính">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">
          <!-- Logo -->
          <button type="button" class="brand-btn" (click)="onScrollTo('home')" aria-label="Về đầu trang">
            <span class="text-xl font-bold tracking-tight text-slate-900">
              Lê <span class="text-indigo-600">Quang Vy</span>
            </span>
          </button>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <button type="button" (click)="onScrollTo('home')" class="nav-link">Trang Chủ</button>
            <button type="button" (click)="onScrollTo('services')" class="nav-link">Dịch Vụ</button>
            <button type="button" (click)="onScrollTo('about')" class="nav-link">Về Bác Sĩ</button>
            <button type="button" (click)="onScrollTo('testimonials')" class="nav-link">Đánh Giá</button>
            <button type="button" (click)="onScrollTo('contact')" class="nav-link">Liên Hệ</button>
          </div>

          <!-- CTA Button -->
          <button 
            (click)="onScrollTo('booking')" 
            class="hidden md:block btn-primary-sm">
            Đặt Lịch Khám
          </button>

          <!-- Mobile Menu Toggle -->
          <button 
            (click)="toggleMobileMenu()" 
            class="md:hidden p-2 text-slate-600"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Mở menu điều hướng">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path *ngIf="!mobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path *ngIf="mobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="mobileMenuOpen()" id="mobile-menu" class="md:hidden pb-4 animate-fade-in">
          <div class="flex flex-col space-y-3">
            <button type="button" (click)="onScrollTo('home')" class="mobile-nav-link text-left">Trang Chủ</button>
            <button type="button" (click)="onScrollTo('services')" class="mobile-nav-link text-left">Dịch Vụ</button>
            <button type="button" (click)="onScrollTo('about')" class="mobile-nav-link text-left">Về Bác Sĩ</button>
            <button type="button" (click)="onScrollTo('testimonials')" class="mobile-nav-link text-left">Đánh Giá</button>
            <button (click)="onScrollTo('booking')" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
              Đặt Lịch Khám
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .brand-btn {
      @apply flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0;
    }
    .nav-link {
      @apply text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-0 p-0;
    }
    .mobile-nav-link {
      @apply text-slate-600 hover:text-indigo-600 py-2 cursor-pointer bg-transparent border-0;
    }
    .btn-primary-sm {
      @apply bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold 
             transition-all shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:-translate-y-0.5;
    }
  `]
})
export class NavbarComponent {
  scrollTo = output<string>();
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  onScrollTo(sectionId: string) {
    this.scrollTo.emit(sectionId);
    this.mobileMenuOpen.set(false);
  }
}
