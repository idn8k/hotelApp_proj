import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://eqxoefdbhtvjcdlwdxaq.supabase.co';
const supabaseKey =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeG9lZmRiaHR2amNkbHdkeGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDcxNjMsImV4cCI6MjAxODQ4MzE2M30.IfGbNqkt3iWDTUzi9cRmvIoqsiRhLKa5pvykOPt_EFo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
