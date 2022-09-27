import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    'https://thswhsfzwmuifqwutrxc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoc3doc2Z6d211aWZxd3V0cnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkyNDE2NTMsImV4cCI6MTk2NDgxNzY1M30.bBFg1SlceDJ4tg20RYVFHmr6wAAMVEgCb7IALGMCyiM',{
        schema: 'public',

    }
)