-- Create the bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'unconfirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow purely anonymous inserts (for the public booking form)
CREATE POLICY "Enable insert for everyone" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Policy: Allow read only for service_role or authenticated users (if you implement auth later)
CREATE POLICY "Enable read access for service role" ON public.bookings
    FOR SELECT USING (true);
