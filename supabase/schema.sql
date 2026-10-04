create table if not exists public.student_reviews (
    id uuid primary key default gen_random_uuid(),
    display_name text,
    rating smallint not null check (rating between 1 and 5),
    review text not null,
    consent_to_publish boolean not null check (consent_to_publish),
    created_at timestamptz not null default now(),
    constraint student_reviews_review_length
        check (char_length(trim(review)) between 15 and 1000),
    constraint student_reviews_display_name_length
        check (
            display_name is null
            or char_length(trim(display_name)) between 1 and 40
        )
);

alter table public.student_reviews enable row level security;

revoke all on table public.student_reviews from anon;
grant select (id, display_name, rating, review, created_at)
    on table public.student_reviews to anon;
grant insert (display_name, rating, review, consent_to_publish)
    on table public.student_reviews to anon;

drop policy if exists "Anyone can read student reviews" on public.student_reviews;
create policy "Anyone can read student reviews"
on public.student_reviews
for select
to anon
using (true);

drop policy if exists "Anyone can submit a student review" on public.student_reviews;
create policy "Anyone can submit a student review"
on public.student_reviews
for insert
to anon
with check (
    rating between 1 and 5
    and consent_to_publish
    and char_length(trim(review)) between 15 and 1000
    and (
        display_name is null
        or char_length(trim(display_name)) between 1 and 40
    )
);

do $$
begin
    if not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
            and schemaname = 'public'
            and tablename = 'student_reviews'
    ) then
        alter publication supabase_realtime add table public.student_reviews;
    end if;
end
$$;
