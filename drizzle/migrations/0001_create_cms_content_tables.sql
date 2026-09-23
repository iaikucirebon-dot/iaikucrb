-- FACULTIES
CREATE TABLE public.faculties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faculties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faculties TO authenticated;
GRANT ALL ON public.faculties TO service_role;
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active faculties" ON public.faculties FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins manage faculties select" ON public.faculties FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert faculties" ON public.faculties FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update faculties" ON public.faculties FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete faculties" ON public.faculties FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER faculties_set_updated_at BEFORE UPDATE ON public.faculties FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- PROGRAMS
CREATE TABLE public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid REFERENCES public.faculties(id) ON DELETE CASCADE,
  code text NOT NULL DEFAULT '',
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX programs_faculty_id_idx ON public.programs(faculty_id);
GRANT SELECT ON public.programs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programs TO authenticated;
GRANT ALL ON public.programs TO service_role;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active programs" ON public.programs FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins select programs" ON public.programs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert programs" ON public.programs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update programs" ON public.programs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete programs" ON public.programs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER programs_set_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- LECTURERS
CREATE TABLE public.lecturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL DEFAULT '',
  expertise text NOT NULL DEFAULT '',
  photo_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lecturers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lecturers TO authenticated;
GRANT ALL ON public.lecturers TO service_role;
ALTER TABLE public.lecturers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active lecturers" ON public.lecturers FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins select lecturers" ON public.lecturers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert lecturers" ON public.lecturers FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update lecturers" ON public.lecturers FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete lecturers" ON public.lecturers FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER lecturers_set_updated_at BEFORE UPDATE ON public.lecturers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- TUITION ITEMS (PMB biaya)
CREATE TABLE public.tuition_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  amount bigint NOT NULL DEFAULT 0,
  note text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tuition_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tuition_items TO authenticated;
GRANT ALL ON public.tuition_items TO service_role;
ALTER TABLE public.tuition_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active tuition" ON public.tuition_items FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins select tuition" ON public.tuition_items FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert tuition" ON public.tuition_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update tuition" ON public.tuition_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete tuition" ON public.tuition_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER tuition_items_set_updated_at BEFORE UPDATE ON public.tuition_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- PMB REGISTRATIONS
CREATE TABLE public.admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  whatsapp text NOT NULL,
  origin_school text,
  program_name text,
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'baru',
  admin_note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.admissions TO authenticated;
GRANT ALL ON public.admissions TO service_role;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins select admissions" ON public.admissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update admissions" ON public.admissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete admissions" ON public.admissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admissions_set_updated_at BEFORE UPDATE ON public.admissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();