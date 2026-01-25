"""
Phòng Khám Tâm Thần Kinh API - Backend
FastAPI backend cho website quảng bá phòng khám bác sĩ tâm thần kinh
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
import uvicorn

# ============================================================================
# 1. THIẾT LẬP ỨNG DỤNG
# ============================================================================

app = FastAPI(
    title="Phòng Khám Tâm Thần Kinh API",
    description="Backend chuyên nghiệp cho Website Bác Sĩ Tâm Thần Kinh & Đặt Lịch Khám",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Cấu hình CORS - Cho phép Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://localhost:3000",
        "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# 2. MÔ HÌNH DỮ LIỆU (Pydantic)
# ============================================================================

class Service(BaseModel):
    """Dịch vụ y tế của phòng khám"""
    id: str
    title: str
    description: str
    price_start: float
    duration_minutes: int
    icon: str

class Credential(BaseModel):
    """Bằng cấp chuyên môn của bác sĩ"""
    title: str
    institution: str
    year: int

class DoctorProfile(BaseModel):
    """Thông tin đầy đủ của bác sĩ"""
    name: str
    title: str
    specialty: str
    sub_specialty: Optional[str] = None
    bio: str
    years_experience: int
    patients_served: int
    success_rate: float
    image_url: str
    credentials: List[Credential]
    languages: List[str]

class Testimonial(BaseModel):
    """Đánh giá của bệnh nhân"""
    id: str
    patient_name: str
    patient_image: Optional[str] = None
    rating: int = Field(..., ge=1, le=5)
    comment: str
    date: str
    treatment: str

class ClinicInfo(BaseModel):
    """Thông tin liên hệ phòng khám"""
    name: str
    address: str
    city: str
    state: str
    zip_code: str
    phone: str
    email: str
    hours: dict[str, str]
    map_url: Optional[str] = None

class BookingRequest(BaseModel):
    """Yêu cầu đặt lịch khám"""
    patient_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    service_id: str
    preferred_date: str
    preferred_time: Optional[str] = None
    notes: Optional[str] = None

class BookingResponse(BaseModel):
    """Phản hồi đặt lịch"""
    status: str
    message: str
    booking_reference: str
    estimated_callback: str

# ============================================================================
# 3. DỮ LIỆU MẪU - BÁC SĨ TÂM THẦN KINH (Tiếng Việt)
# ============================================================================

DB_DOCTOR = DoctorProfile(
    name="BS. Lê Quang Vy",
    title="Tiến sĩ, Bác sĩ Chuyên khoa II",
    specialty="Tâm Thần Kinh",
    sub_specialty="Trị Liệu Tâm Lý & Rối Loạn Lo Âu",
    bio="Bác sĩ Lê Quang Vy là chuyên gia tâm thần kinh hàng đầu với hơn 15 năm kinh nghiệm trong lĩnh vực chẩn đoán và điều trị các rối loạn tâm thần, lo âu, trầm cảm và các bệnh lý thần kinh. Nguyên Trưởng khoa Tâm Thần Bệnh viện Chợ Rẫy, bác sĩ kết hợp y học hiện đại với liệu pháp tâm lý chuyên sâu, luôn đặt sức khỏe tinh thần của bệnh nhân lên hàng đầu.",
    years_experience=15,
    patients_served=10000,
    success_rate=96.5,
    image_url="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000",
    credentials=[
        Credential(title="Tiến sĩ Y khoa - Chuyên ngành Tâm Thần", institution="Đại học Y Dược TP.HCM", year=2008),
        Credential(title="Bác sĩ Nội trú - Tâm Thần Kinh", institution="Bệnh viện Chợ Rẫy", year=2011),
        Credential(title="Chuyên khoa II - Tâm Thần", institution="Bệnh viện Tâm Thần TP.HCM", year=2014),
        Credential(title="Chứng chỉ Tâm Lý Trị Liệu", institution="Hiệp hội Tâm Thần Hoa Kỳ (APA)", year=2015),
    ],
    languages=["Tiếng Việt", "Tiếng Anh"]
)

DB_SERVICES: List[Service] = [
    Service(
        id="srv_consult",
        title="Khám Tư Vấn Tâm Thần",
        description="Đánh giá toàn diện sức khỏe tâm thần bao gồm tiền sử bệnh, khám lâm sàng và lập kế hoạch điều trị cá nhân hóa.",
        price_start=500000,
        duration_minutes=60,
        icon="brain"
    ),
    Service(
        id="srv_depression",
        title="Điều Trị Trầm Cảm",
        description="Chẩn đoán và điều trị các rối loạn trầm cảm bằng kết hợp thuốc và liệu pháp tâm lý theo tiêu chuẩn quốc tế.",
        price_start=600000,
        duration_minutes=45,
        icon="heart"
    ),
    Service(
        id="srv_anxiety",
        title="Điều Trị Rối Loạn Lo Âu",
        description="Điều trị các rối loạn lo âu, hoảng sợ, ám ảnh cưỡng chế (OCD) và rối loạn stress sau sang chấn (PTSD).",
        price_start=600000,
        duration_minutes=45,
        icon="shield"
    ),
    Service(
        id="srv_sleep",
        title="Điều Trị Rối Loạn Giấc Ngủ",
        description="Chẩn đoán và điều trị mất ngủ, ngủ không sâu giấc, ác mộng và các rối loạn giấc ngủ khác.",
        price_start=500000,
        duration_minutes=45,
        icon="moon"
    ),
    Service(
        id="srv_therapy",
        title="Tâm Lý Trị Liệu",
        description="Liệu pháp CBT, DBT và các phương pháp trị liệu tâm lý hiện đại giúp thay đổi suy nghĩ và hành vi tiêu cực.",
        price_start=700000,
        duration_minutes=60,
        icon="message"
    ),
    Service(
        id="srv_child",
        title="Tâm Thần Nhi Khoa",
        description="Chẩn đoán và điều trị các rối loạn tâm thần ở trẻ em và thanh thiếu niên: ADHD, tự kỷ, rối loạn hành vi.",
        price_start=600000,
        duration_minutes=60,
        icon="users"
    ),
]

DB_TESTIMONIALS: List[Testimonial] = [
    Testimonial(
        id="test_1",
        patient_name="Chị Minh T.",
        patient_image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Tôi đã chiến đấu với trầm cảm suốt 3 năm trước khi gặp bác sĩ Hùng. Bác sĩ kiên nhẫn lắng nghe và xây dựng phác đồ điều trị phù hợp. Giờ tôi đã có thể sống vui vẻ trở lại.",
        date="2025-12-15",
        treatment="Điều Trị Trầm Cảm"
    ),
    Testimonial(
        id="test_2",
        patient_name="Anh Tuấn L.",
        patient_image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Cơn hoảng sợ làm tôi không thể đi làm. Bác sĩ Hùng đã giúp tôi hiểu nguyên nhân và cách kiểm soát. Sau 6 tháng điều trị, tôi đã trở lại cuộc sống bình thường.",
        date="2025-11-28",
        treatment="Điều Trị Rối Loạn Lo Âu"
    ),
    Testimonial(
        id="test_3",
        patient_name="Phụ huynh bé Khoa",
        patient_image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Con trai tôi được chẩn đoán ADHD khi 7 tuổi. Bác sĩ Hùng không chỉ điều trị cho con mà còn hướng dẫn gia đình cách hỗ trợ. Kết quả học tập của con cải thiện rõ rệt.",
        date="2025-10-10",
        treatment="Tâm Thần Nhi Khoa"
    ),
    Testimonial(
        id="test_4",
        patient_name="Chị Hương M.",
        patient_image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Mất ngủ triền miên khiến tôi kiệt sức. Bác sĩ Hùng tìm ra nguyên nhân sâu xa và điều trị hiệu quả. Giờ tôi ngủ ngon mỗi đêm mà không cần thuốc ngủ.",
        date="2025-09-22",
        treatment="Điều Trị Rối Loạn Giấc Ngủ"
    ),
    Testimonial(
        id="test_5",
        patient_name="Anh Phước N.",
        patient_image="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Tôi từng nghĩ đến tâm thần là điều đáng xấu hổ. Bác sĩ Hùng đã thay đổi suy nghĩ đó. Phòng khám chuyên nghiệp, kín đáo và bác sĩ rất tận tâm.",
        date="2025-09-05",
        treatment="Khám Tư Vấn Tâm Thần"
    ),
    Testimonial(
        id="test_6",
        patient_name="Chị Thu H.",
        patient_image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Liệu pháp CBT với bác sĩ Hùng đã thay đổi cuộc sống tôi. Tôi học được cách nhận diện và thay đổi những suy nghĩ tiêu cực. Cảm ơn bác sĩ rất nhiều!",
        date="2025-08-18",
        treatment="Tâm Lý Trị Liệu"
    ),
    Testimonial(
        id="test_7",
        patient_name="Anh Đức V.",
        patient_image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Công việc áp lực khiến tôi bị burnout nghiêm trọng. Bác sĩ Hùng giúp tôi phục hồi và học cách cân bằng cuộc sống. Highly recommend!",
        date="2025-08-02",
        treatment="Khám Tư Vấn Tâm Thần"
    ),
    Testimonial(
        id="test_8",
        patient_name="Bà Nga T.",
        patient_image="https://images.unsplash.com/photo-1559839734-2b71ea860485?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Ở tuổi 65, tôi bị trầm cảm sau khi nghỉ hưu. Bác sĩ Hùng rất kiên nhẫn và thấu hiểu. Giờ tôi đã tìm lại niềm vui sống.",
        date="2025-07-20",
        treatment="Điều Trị Trầm Cảm"
    ),
    Testimonial(
        id="test_9",
        patient_name="Anh Khoa N.",
        patient_image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
        rating=4,
        comment="Dịch vụ tốt, bác sĩ chuyên nghiệp. Chỉ tiếc là phải đặt lịch trước khá lâu vì phòng khám đông. Không gian riêng tư và thoải mái.",
        date="2025-07-05",
        treatment="Tâm Lý Trị Liệu"
    ),
    Testimonial(
        id="test_10",
        patient_name="Chị Mai A.",
        patient_image="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200",
        rating=5,
        comment="Bác sĩ Hùng đã giúp tôi vượt qua nỗi sợ xã hội. Giờ tôi có thể nói trước đám đông mà không còn run sợ. Cuộc sống thay đổi hoàn toàn!",
        date="2025-06-15",
        treatment="Điều Trị Rối Loạn Lo Âu"
    ),
]

DB_CLINIC = ClinicInfo(
    name="Phòng Khám Tâm Thần Kinh Bác Sĩ Lê Quang Vy",
    address="145 Trần Quang Khải, Phường Tân Định",
    city="Quận 1",
    state="TP. Hồ Chí Minh",
    zip_code="700000",
    phone="(028) 3844 5678",
    email="lienhe@phongkhamtamthan.vn",
    hours={
        "monday": "8:00 - 17:00",
        "tuesday": "8:00 - 17:00",
        "wednesday": "8:00 - 17:00",
        "thursday": "8:00 - 17:00",
        "friday": "8:00 - 17:00",
        "saturday": "8:00 - 12:00",
        "sunday": "Nghỉ"
    },
    map_url="https://maps.google.com/?q=Phu+Nhuan+HCMC"
)

# Lưu trữ đặt lịch trong bộ nhớ
bookings_db: List[dict] = []

# ============================================================================
# 4. API ENDPOINTS
# ============================================================================

@app.get("/", tags=["Kiểm tra"])
async def health_check():
    """Kiểm tra trạng thái server"""
    return {
        "status": "hoạt động",
        "service": "Phòng Khám Tâm Thần Kinh API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/profile", response_model=DoctorProfile, tags=["Công khai"])
async def get_doctor_profile():
    """Lấy thông tin đầy đủ của bác sĩ."""
    return DB_DOCTOR

@app.get("/api/services", response_model=List[Service], tags=["Công khai"])
async def get_services():
    """Lấy danh sách các dịch vụ y tế."""
    return DB_SERVICES

@app.get("/api/services/{service_id}", response_model=Service, tags=["Công khai"])
async def get_service_by_id(service_id: str):
    """Lấy thông tin một dịch vụ cụ thể"""
    service = next((s for s in DB_SERVICES if s.id == service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Không tìm thấy dịch vụ")
    return service

@app.get("/api/testimonials", response_model=List[Testimonial], tags=["Công khai"])
async def get_testimonials():
    """Lấy đánh giá của bệnh nhân."""
    return DB_TESTIMONIALS

@app.get("/api/clinic", response_model=ClinicInfo, tags=["Công khai"])
async def get_clinic_info():
    """Lấy thông tin liên hệ phòng khám."""
    return DB_CLINIC

@app.post("/api/book", response_model=BookingResponse, tags=["Đặt lịch"])
async def create_booking(booking: BookingRequest):
    """
    Gửi yêu cầu đặt lịch khám.
    Nhân viên sẽ liên hệ để xác nhận lịch hẹn.
    """
    service = next((s for s in DB_SERVICES if s.id == booking.service_id), None)
    if not service:
        raise HTTPException(status_code=400, detail="Dịch vụ không hợp lệ")
    
    # Tạo mã đặt lịch
    ref_prefix = booking.patient_name[:2].upper()
    ref_number = len(bookings_db) + 1001
    booking_ref = f"DL-{ref_prefix}-{ref_number}"
    
    # Lưu thông tin đặt lịch
    booking_record = {
        "reference": booking_ref,
        "patient_name": booking.patient_name,
        "email": booking.email,
        "phone": booking.phone,
        "service": service.title,
        "preferred_date": booking.preferred_date,
        "preferred_time": booking.preferred_time,
        "notes": booking.notes,
        "status": "chờ xác nhận",
        "created_at": datetime.now().isoformat()
    }
    bookings_db.append(booking_record)
    
    print(f"📅 Đặt lịch mới: {booking_ref} - {booking.patient_name} cho {service.title}")
    
    return BookingResponse(
        status="thành công",
        message="Yêu cầu đặt lịch của bạn đã được ghi nhận. Nhân viên sẽ liên hệ trong vòng 2 giờ để xác nhận.",
        booking_reference=booking_ref,
        estimated_callback="Trong vòng 2 giờ làm việc"
    )

@app.get("/api/bookings", tags=["Quản trị"])
async def get_all_bookings():
    """Xem tất cả lịch đặt (chỉ dành cho quản trị)."""
    return {"total": len(bookings_db), "bookings": bookings_db}

# ============================================================================
# 5. KHỞI CHẠY ỨNG DỤNG
# ============================================================================

if __name__ == "__main__":
    print("🏥 Khởi động Phòng Khám Tâm Thần Kinh API...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
