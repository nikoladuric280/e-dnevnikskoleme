import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, error: 'Nedostaju email ili lozinka.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
