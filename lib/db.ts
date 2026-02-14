import { supabase } from './supabase';

// Auth functions
export const registerUser = async (email: string, password: string, regNumber: string, fullName: string) => {
    try {
        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        // Create user profile
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([
                {
                    id: authData.user?.id,
                    email,
                    reg_number: regNumber,
                    full_name: fullName,
                },
            ])
            .select();

        if (userError) throw userError;

        return { user: userData, success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return { error, success: false };
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return { session: data.session, success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { error, success: false };
    }
};

export const logoutUser = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { error, success: false };
    }
};

export const getCurrentUser = async () => {
    try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user: data.user, success: true };
    } catch (error) {
        console.error('Get user error:', error);
        return { error, success: false };
    }
};

// Lost Items functions
export const createLostItem = async (
    userId: string,
    title: string,
    description: string,
    category: string,
    location: string,
    securityQuestion: string,
    securityAnswer: string,
    imageUrl?: string
) => {
    try {
        const { data, error } = await supabase
            .from('lost_items')
            .insert([
                {
                    user_id: userId,
                    title,
                    description,
                    category,
                    location,
                    security_question: securityQuestion,
                    security_answer: securityAnswer,
                    image_url: imageUrl,
                },
            ])
            .select();

        if (error) throw error;
        return { item: data, success: true };
    } catch (error) {
        console.error('Create lost item error:', error);
        return { error, success: false };
    }
};

export const getLostItems = async () => {
    try {
        const { data, error } = await supabase
            .from('lost_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { items: data, success: true };
    } catch (error) {
        console.error('Get lost items error:', error);
        return { error, success: false };
    }
};

// Found Items functions
export const createFoundItem = async (
    userId: string,
    title: string,
    description: string,
    category: string,
    location: string,
    contactInfo: string,
    imageUrl?: string
) => {
    try {
        const { data, error } = await supabase
            .from('found_items')
            .insert([
                {
                    user_id: userId,
                    title,
                    description,
                    category,
                    location,
                    contact_info: contactInfo,
                    image_url: imageUrl,
                },
            ])
            .select();

        if (error) throw error;
        return { item: data, success: true };
    } catch (error) {
        console.error('Create found item error:', error);
        return { error, success: false };
    }
};

export const getFoundItems = async () => {
    try {
        const { data, error } = await supabase
            .from('found_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { items: data, success: true };
    } catch (error) {
        console.error('Get found items error:', error);
        return { error, success: false };
    }
};

// Matches functions
export const getMatches = async (lostItemId: string) => {
    try {
        const { data, error } = await supabase
            .from('matches')
            .select('*, found_items(*)')
            .eq('lost_item_id', lostItemId)
            .order('confidence_score', { ascending: false });

        if (error) throw error;
        return { matches: data, success: true };
    } catch (error) {
        console.error('Get matches error:', error);
        return { error, success: false };
    }
};

export const createMatch = async (
    lostItemId: string,
    foundItemId: string,
    confidenceScore: number
) => {
    try {
        const { data, error } = await supabase
            .from('matches')
            .insert([
                {
                    lost_item_id: lostItemId,
                    found_item_id: foundItemId,
                    confidence_score: confidenceScore,
                },
            ])
            .select();

        if (error) throw error;
        return { match: data, success: true };
    } catch (error) {
        console.error('Create match error:', error);
        return { error, success: false };
    }
};
