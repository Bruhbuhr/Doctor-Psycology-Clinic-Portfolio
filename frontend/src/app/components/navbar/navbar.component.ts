import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex items-center gap-3 cursor-pointer" (click)="onScrollTo('home')">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
              TT
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-900">
              Tâm<span class="text-indigo-600">Thần</span>
            </span>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a (click)="onScrollTo('home')" class="nav-link">Trang Chủ</a>
            <a (click)="onScrollTo('services')" class="nav-link">Dịch Vụ</a>
            <a (click)="onScrollTo('about')" class="nav-link">Về Bác Sĩ</a>
            <a (click)="onScrollTo('testimonials')" class="nav-link">Đánh Giá</a>
            <a (click)="onScrollTo('contact')" class="nav-link">Liên Hệ</a>
          </div>

          <!-- CTA Button -->
          <button 
            (click)="onScrollTo('booking')" 
            class="hidden md:block btn-primary-sm">
            Đặt Lịch Khám
          </button>

          <!-- Mobile Menu Toggle -->
          <button (click)="toggleMobileMenu()" class="md:hidden p-2 text-slate-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path *ngIf="!mobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path *ngIf="mobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="mobileMenuOpen()" class="md:hidden pb-4 animate-fade-in">
          <div class="flex flex-col space-y-3">
            <a (click)="onScrollTo('home')" class="mobile-nav-link">Trang Chủ</a>
            <a (click)="onScrollTo('services')" class="mobile-nav-link">Dịch Vụ</a>
            <a (click)="onScrollTo('about')" class="mobile-nav-link">Về Bác Sĩ</a>
            <a (click)="onScrollTo('testimonials')" class="mobile-nav-link">Đánh Giá</a>
            <button (click)="onScrollTo('booking')" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
              Đặt Lịch Khám
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-link {
      @apply text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer;
    }
    .mobile-nav-link {
      @apply text-slate-600 hover:text-indigo-600 py-2 cursor-pointer;
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
