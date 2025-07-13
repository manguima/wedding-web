'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TenantInfo, detectTenant } from '@/utils/tenant';

interface TenantContextType {
  tenant: TenantInfo | null;
  isLoading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
  error: null,
});

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        setIsLoading(true);
        const detectedTenant = await detectTenant();
        
        if (!detectedTenant) {
          throw new Error('Tenant not found');
        }
        
        console.log('Tenant detected:', detectedTenant);
        setTenant(detectedTenant);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tenant');
        setTenant(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, isLoading, error }}>
      {children}
    </TenantContext.Provider>
  );
};