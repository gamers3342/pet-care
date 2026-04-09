const SUPABASE_URL = 'https://hqtwkyvoiwguuukgyrhx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxdHdreXZvaXdndXV1a2d5cmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDQ5MTcsImV4cCI6MjA4NTgyMDkxN30.DXLbjwXpWzt47Iupgz8nlq7IHqFWaAvPadZlzOTMzKc';

async function getOpenAPI() {
  const url = `${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const appUserSchema = json.definitions?.app_user?.properties;
  console.log('app_user columns:', Object.keys(appUserSchema || {}));
  console.log('clinic columns:', Object.keys(json.definitions?.clinic?.properties || {}));
}
getOpenAPI();
