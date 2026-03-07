import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { 
  DoctorProfile, 
  Service, 
  Testimonial, 
  ClinicInfo, 
  BookingRequest, 
  BookingResponse 
} from '../models/types';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // Loading states
  isLoading = signal(false);
  error = signal<string | null>(null);

  /**
   * Fetch doctor profile from backend
   */
  getProfile(): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.baseUrl}/profile`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockProfile());
      })
    );
  }

  /**
   * Fetch all services from backend
   */
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockServices());
      })
    );
  }

  /**
   * Fetch testimonials from backend
   */
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.baseUrl}/testimonials`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockTestimonials());
      })
    );
  }

  /**
   * Fetch clinic info from backend
   */
  getClinicInfo(): Observable<ClinicInfo> {
    return this.http.get<ClinicInfo>(`${this.baseUrl}/clinic`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data', err);
        return of(this.getMockClinic());
      })
    );
  }

  /**
   * Submit booking request
   */
  submitBooking(booking: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.baseUrl}/book`, booking).pipe(
      catchError(err => {
        console.warn('Backend unavailable, simulating booking', err);
        return of({
          status: 'success',
          message: 'Hệ thống demo: Chúng tôi đã nhận được yêu cầu của bạn.',
          booking_reference: `BK-DEMO-${Date.now().toString().slice(-4)}`,
          estimated_callback: 'Trong vòng 2 giờ trong giờ làm việc'
        });
      })
    );
  }

  // ============================================================================
  // MOCK DATA (Fallback when backend is unavailable)
  // ============================================================================

  private getMockProfile(): DoctorProfile {
    return {
      name: "BS. Lê Quang Vy",
      title: "Bác sĩ Chuyên khoa I",
      specialty: "Tâm Thần Kinh",
      sub_specialty: "Trị Liệu Tâm Lý & Rối Loạn Lo Âu",
      bio: "Bác sĩ Lê Quang Vy là chuyên gia tâm thần kinh với hơn 25 năm kinh nghiệm. Nguyên là bác sĩ điều trị tại Bệnh viện Tâm thần TP.HCM (2000-2025), bác sĩ chuyên sâu về chẩn đoán và điều trị các rối loạn tâm thần, lo âu, trầm cảm, mất ngủ và các bệnh lý thần kinh khác.",
      years_experience: 25,
      patients_served: 15000,
      success_rate: 98.5,
      image_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000",
      credentials: [
        { title: "Bác sĩ Chuyên khoa I - Tâm Thần", institution: "Đại học Y Dược TP.HCM", year: 2000 },
        { title: "Chứng chỉ Hành nghề Khám chữa bệnh", institution: "Sở Y tế TP.HCM", year: 2013 },
        { title: "Bác sĩ Hạng III", institution: "Bệnh viện Tâm thần TP.HCM", year: 2020 },
      ],
      languages: ["Tiếng Việt", "Tiếng Anh"]
    };
  }

  private getMockServices(): Service[] {
    return [
      {
        id: "srv_consult_psy",
        title: "Khám Tâm Thần Chuyên Khoa",
        description: "Đánh giá toàn diện triệu chứng tâm thần, tiền sử cá nhân và gia đình để xây dựng hướng điều trị phù hợp.",
        price_start: 500000,
        duration_minutes: 45,
        icon: "brain",
        treatment_process: [
          "Khai thác triệu chứng và tiền sử bệnh lý",
          "Đánh giá mức độ ảnh hưởng đến giấc ngủ, công việc, quan hệ",
          "Tư vấn chẩn đoán và lập kế hoạch điều trị cá nhân"
        ]
      },
      {
        id: "srv_anxiety",
        title: "Điều Trị Rối Loạn Lo Âu",
        description: "Phối hợp thuốc (nếu cần) và liệu pháp tâm lý nhằm giảm lo âu kéo dài, hoảng sợ và ám ảnh.",
        price_start: 600000,
        duration_minutes: 50,
        icon: "heart",
        treatment_process: [
          "Đo mức độ lo âu bằng thang đo lâm sàng",
          "Xây dựng phác đồ kiểm soát cơn lo âu",
          "Theo dõi định kỳ và điều chỉnh điều trị"
        ]
      },
      {
        id: "srv_depression",
        title: "Điều Trị Trầm Cảm",
        description: "Can thiệp sớm cho trầm cảm nhẹ đến nặng, tập trung cải thiện cảm xúc, năng lượng và chức năng sống.",
        price_start: 650000,
        duration_minutes: 50,
        icon: "shield",
        treatment_process: [
          "Sàng lọc và phân tầng mức độ trầm cảm",
          "Lựa chọn phương pháp điều trị phù hợp",
          "Theo dõi đáp ứng và phòng ngừa tái phát"
        ]
      },
      {
        id: "srv_sleep",
        title: "Điều Trị Mất Ngủ & Rối Loạn Giấc Ngủ",
        description: "Đánh giá nguyên nhân mất ngủ do stress, lo âu hoặc rối loạn tâm thần; cải thiện chất lượng giấc ngủ bền vững.",
        price_start: 550000,
        duration_minutes: 40,
        icon: "moon",
        treatment_process: [
          "Phân tích thói quen ngủ và yếu tố tâm lý liên quan",
          "Hướng dẫn vệ sinh giấc ngủ và kỹ thuật thư giãn",
          "Theo dõi tiến triển theo tuần"
        ]
      },
      {
        id: "srv_psychotherapy",
        title: "Tâm Lý Trị Liệu (CBT/ACT)",
        description: "Liệu pháp tâm lý có cấu trúc giúp thay đổi suy nghĩ tiêu cực, cải thiện hành vi và kỹ năng ứng phó.",
        price_start: 700000,
        duration_minutes: 60,
        icon: "message",
        treatment_process: [
          "Xác định vấn đề mục tiêu trong trị liệu",
          "Thực hành kỹ thuật trị liệu theo từng buổi",
          "Đánh giá hiệu quả và củng cố kỹ năng tự hỗ trợ"
        ]
      },
      {
        id: "srv_family",
        title: "Tư Vấn Gia Đình & Người Chăm Sóc",
        description: "Hỗ trợ gia đình hiểu đúng về bệnh, nâng cao kỹ năng đồng hành và giảm xung đột trong quá trình điều trị.",
        price_start: 500000,
        duration_minutes: 45,
        icon: "users",
        treatment_process: [
          "Đánh giá bối cảnh gia đình và vai trò chăm sóc",
          "Hướng dẫn giao tiếp hỗ trợ người bệnh",
          "Lập kế hoạch phối hợp giữa gia đình và bác sĩ"
        ]
      },
    ];
  }

  private getMockTestimonials(): Testimonial[] {
    return [
      { id: "test_1", patient_name: "Chị M. (32 tuổi)", patient_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "Tôi bị mất ngủ và lo âu kéo dài hơn 1 năm. Sau 6 tuần điều trị và trị liệu, giấc ngủ ổn định hơn, tinh thần nhẹ nhõm, đi làm lại bình thường.", date: "2025-12-15", treatment: "Điều Trị Rối Loạn Lo Âu" },
      { id: "test_2", patient_name: "Anh K. (41 tuổi)", patient_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "Bác sĩ giải thích rất rõ ràng, không phán xét và luôn tôn trọng quyền riêng tư. Tôi thấy an tâm khi chia sẻ vấn đề cá nhân.", date: "2025-11-28", treatment: "Khám Tâm Thần Chuyên Khoa" },
      { id: "test_3", patient_name: "Cô H. (56 tuổi)", patient_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "Con trai tôi trầm cảm kéo dài, gia đình rất hoang mang. Sau khi được bác sĩ tư vấn kỹ và theo dõi đều, cháu cải thiện rõ rệt.", date: "2025-10-10", treatment: "Điều Trị Trầm Cảm" },
      { id: "test_4", patient_name: "Bạn N. (27 tuổi)", patient_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", rating: 5, comment: "Liệu pháp CBT giúp tôi kiểm soát suy nghĩ tiêu cực và giảm cơn hoảng sợ. Mỗi buổi đều có mục tiêu rõ ràng, dễ áp dụng.", date: "2025-09-22", treatment: "Tâm Lý Trị Liệu (CBT/ACT)" },
    ];
  }

  private getMockClinic(): ClinicInfo {
    return {
      name: "Phòng Khám Tâm Thần Kinh Bác Sĩ Lê Quang Vy",
      address: "145 Trần Quang Khải, Phường Tân Định",
      city: "Quận 1",
      state: "TP. Hồ Chí Minh",
      zip_code: "700000",
      phone: "(028) 3844 5678",
      email: "lienhe@phongkhamtamthan.vn",
      hours: {
        monday: "8:00 - 17:00",
        tuesday: "8:00 - 17:00",
        wednesday: "8:00 - 17:00",
        thursday: "8:00 - 17:00",
        friday: "8:00 - 17:00",
        saturday: "8:00 - 12:00",
        sunday: "Nghỉ"
      },
      map_url: "https://maps.google.com/?q=145+Tran+Quang+Khai+District+1"
    };
  }
}
