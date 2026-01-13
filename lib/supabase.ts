// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ldadkrhmdyuuwiqvbanx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkYWRrcmhtZHl1dXdpcXZiYW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyODgyNzEsImV4cCI6MjA1OTg2NDI3MX0.ASYhe5DJ8jLQCCtOMdNNrD3efFQuJkklEyVU4XsPzY0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
