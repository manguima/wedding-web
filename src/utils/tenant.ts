export interface TenantInfo {
  id: string;
  slug: string;
  domain: string;
  name: string;
  config?: {
    groomName: string;
    brideName: string;
    weddingDate: string;
    weddingLocation: string;
    weddingAddress?: string;
    enableGifts: boolean;
    enableRSVP: boolean;
    enableStories: boolean;
    enableMessages: boolean;
    welcomeMessage?: string;
    aboutUsText?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    logoUrl?: string;
  };
}

export async function detectTenant(): Promise<TenantInfo | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const host = window.location.hostname;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';

  try {
    // In development, extract subdomain from localhost
    if (host.includes('localhost')) {
      const subdomain = host.split('.')[0];
      
      if (subdomain === 'localhost') {
        // No subdomain, use default tenant
        return await fetchTenantInfo(apiUrl, 'default');
      } else {
        // Subdomain provided, use it as tenant slug
        return await fetchTenantInfo(apiUrl, subdomain);
      }
    } else {
      // Production mode - use full domain
      const response = await fetch(`${apiUrl}/tenants/by-domain/${host}`);
      if (!response.ok) {
        throw new Error('Tenant not found');
      }
      return await response.json();
    }
  } catch (error) {
    console.error('Error detecting tenant:', error);
    return null;
  }
}

async function fetchTenantInfo(apiUrl: string, slug: string): Promise<TenantInfo | null> {
  try {
    const response = await fetch(`${apiUrl}/tenants/by-slug/${slug}`);
    if (!response.ok) {
      throw new Error('Tenant not found');
    }
    const tenant = await response.json();
    
    return {
      id: tenant.id,
      slug: tenant.slug,
      domain: tenant.domain,
      name: tenant.name,
      config: tenant.tenantConfig ? {
        groomName: tenant.tenantConfig.groomName,
        brideName: tenant.tenantConfig.brideName,
        weddingDate: tenant.tenantConfig.weddingDate,
        weddingLocation: tenant.tenantConfig.weddingLocation,
        weddingAddress: tenant.tenantConfig.weddingAddress,
        enableGifts: tenant.tenantConfig.enableGifts,
        enableRSVP: tenant.tenantConfig.enableRSVP,
        enableStories: tenant.tenantConfig.enableStories,
        enableMessages: tenant.tenantConfig.enableMessages,
        welcomeMessage: tenant.tenantConfig.welcomeMessage,
        aboutUsText: tenant.tenantConfig.aboutUsText,
      } : undefined,
      theme: {
        primaryColor: tenant.primaryColor,
        secondaryColor: tenant.secondaryColor,
        logoUrl: tenant.logoUrl,
      },
    };
  } catch (error) {
    console.error('Error fetching tenant info:', error);
    return null;
  }
}

export function getTenantApiUrl(tenantSlug?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';
  
  if (!tenantSlug || typeof window === 'undefined') {
    return baseUrl;
  }

  const host = window.location.hostname;
  
  // In development mode with localhost
  if (host.includes('localhost')) {
    // API is always on the same port regardless of subdomain
    return baseUrl;
  }
  
  // In production, API might be on a different subdomain
  return baseUrl;
}