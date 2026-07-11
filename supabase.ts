import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Create the Supabase client safely
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Structure Interfaces
export interface ContactSubmission {
  id?: string;
  name?: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface ReservationSubmission {
  id?: string;
  email: string;
  package_name: string;
  created_at?: string;
}

/**
 * Submits a new contact message.
 * Saves to Supabase if configured, otherwise falls back to saving in localStorage.
 */
export const submitContactMessage = async (data: ContactSubmission) => {
  if (supabase) {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: data.name || 'Anonymous',
          email: data.email,
          subject: data.subject,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase contact submission error:', error);
      throw error;
    }
    return { success: true, source: 'supabase', data: result };
  } else {
    // Local fallback
    const localContacts = JSON.parse(localStorage.getItem('itsi_local_contacts') || '[]');
    const newContact = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    localContacts.push(newContact);
    localStorage.setItem('itsi_local_contacts', JSON.stringify(localContacts));
    return { success: true, source: 'local', data: newContact };
  }
};

/**
 * Submits a package/kit reservation.
 * Saves to Supabase if configured, otherwise falls back to saving in localStorage.
 */
export const reservePackage = async (data: ReservationSubmission) => {
  if (supabase) {
    const { data: result, error } = await supabase
      .from('product_reservations')
      .insert([
        {
          email: data.email,
          package_name: data.package_name,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase reservation error:', error);
      throw error;
    }
    return { success: true, source: 'supabase', data: result };
  } else {
    // Local fallback
    const localReservations = JSON.parse(localStorage.getItem('itsi_local_reservations') || '[]');
    const newReservation = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    localReservations.push(newReservation);
    localStorage.setItem('itsi_local_reservations', JSON.stringify(localReservations));
    return { success: true, source: 'local', data: newReservation };
  }
};

/**
 * Get all past submissions for developers or the logged in user to audit their records
 */
export const getMySubmissions = async (email: string) => {
  if (supabase) {
    const { data: contacts } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    const { data: reservations } = await supabase
      .from('product_reservations')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    return {
      contacts: contacts || [],
      reservations: reservations || [],
    };
  } else {
    const localContacts = JSON.parse(localStorage.getItem('itsi_local_contacts') || '[]');
    const localReservations = JSON.parse(localStorage.getItem('itsi_local_reservations') || '[]');

    return {
      contacts: localContacts.filter((c: any) => c.email === email),
      reservations: localReservations.filter((r: any) => r.email === email),
    };
  }
};
