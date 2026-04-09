import { supabase } from '../utils/supabaseClient';

export interface CommunityPost {
  post_id?: number;
  type: string;
  title: string;
  description: string;
  area: string;
  location: string;
  user_email?: string;
  user_name?: string;
  user_phone?: string;
  status?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

class CommunityService {
  async createPost(post: CommunityPost) {
    try {
      // Get the current user from localStorage
      const userData = localStorage.getItem('userData');
      const user = userData ? JSON.parse(userData) : null;
      const user_name = user?.name || 'Community Member';
      const user_email = user?.email || '';

      // Create post with all required fields
      const postData: any = {
        title: post.title,
        description: post.description,
        type: post.type || 'general',
        area: post.area || 'General',
        location: post.location || '',
        user_name: user_name,
        user_email: user_email,
        user_phone: post.user_phone || '',
        status: post.status || 'active',
        image_url: post.image_url || null,
      };

      console.log('🌍 Creating community post with data:', postData);

      const { data, error } = await supabase
        .from('community_post')
        .insert([postData])
        .select();

      if (error) {
        console.error('❌ Supabase error, falling back to localStorage:', error.message);
        
        // Fallback: Store in localStorage instead
        const communityPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
        const newPost = {
          id: communityPosts.length + 1,
          post_id: communityPosts.length + 1,
          title: post.title,
          description: post.description,
          location: post.location || '',
          user_name: user_name,
          user_email: user_email,
          type: post.type || 'general',
          area: post.area || 'General',
          status: post.status || 'active',
          created_at: new Date().toISOString(),
          image: post.image_url || null,
        };
        
        communityPosts.push(newPost);
        localStorage.setItem('communityPosts', JSON.stringify(communityPosts));
        console.log('✅ Community post saved to localStorage:', newPost);
        return { success: true, data: newPost, usingLocalStorage: true };
      }

      console.log('✅ Community post created in Supabase:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Community post creation error:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getAllPosts() {
    try {
      const { data, error } = await supabase
        .from('community_post')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase error, loading from localStorage:', error.message);
        // Fallback to localStorage
        const communityPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
        console.log('✅ Community posts loaded from localStorage:', communityPosts.length);
        return communityPosts;
      }

      console.log('✅ Community posts fetched from Supabase:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Fetch posts error:', error);
      // Final fallback to localStorage
      const communityPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
      return communityPosts;
    }
  }

  async getPostsByArea(area: string) {
    try {
      const { data, error } = await supabase
        .from('community_post')
        .select('*')
        .eq('area', area)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching posts by area:', error);
      return [];
    }
  }

  async getPostsByType(type: string) {
    try {
      const { data, error } = await supabase
        .from('community_post')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching posts by type:', error);
      return [];
    }
  }

  async updatePostStatus(postId: number, status: string) {
    try {
      const { data, error } = await supabase
        .from('community_post')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('post_id', postId)
        .select()
        .single();

      if (error) throw error;
      console.log('✅ Post status updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating post status:', error);
      throw error;
    }
  }

  async deletePost(postId: number) {
    try {
      const { error } = await supabase
        .from('community_post')
        .delete()
        .eq('post_id', postId);

      if (error) throw error;
      console.log('✅ Post deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}

export const communityService = new CommunityService();
