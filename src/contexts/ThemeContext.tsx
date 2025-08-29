'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTenant } from './TenantContext';

export interface ThemeAssets {
  header_background: string;
  logo: string;
  about_image: string;
  building_image: string;
  checkout_image: string;
  tree1: string;
  tree2: string;
  chair: string;
  thanks_image: string;
  background_pattern: string;
  [key: string]: string;
}

export interface ThemeContent {
  headerTitle?: string;
  headerSubtitle?: string;
  aboutTitle?: string;
  aboutText?: string;
  countdownTitle?: string;
  rsvpTitle?: string;
  rsvpDescription?: string;
  locationTitle?: string;
  locationDescription?: string;
  footerText?: string;
  [key: string]: any;
}

export interface WeddingData {
  weddingDate?: string;
  weddingTime?: string;
  weddingLocation?: string;
  weddingAddress?: string;
  weddingObservations?: string;
}

export interface ThemeColors {
  // Cores principais
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Cores de texto
  textLight: string;
  textDark: string;
  textMuted: string;
  
  // Header
  headerBackground: string;
  headerTextColor: string;
  headerAccentColor: string;
  headerFilterBrightness: number;
  
  // About
  aboutBackground: string;
  aboutTextColor: string;
  aboutShadowColor: string;
  
  // Countdown
  countdownBackground: string;
  countdownTextColor: string;
  countdownBorderColor: string;
  
  // Confirm
  confirmBackground: string;
  confirmTextColor: string;
  confirmAccentColor: string;
  confirmButtonColor: string;
  confirmFilterBrightness: number;
  
  // Gerais
  buttonPrimaryColor: string;
  buttonTextColor: string;
  borderColor: string;
}

export interface ThemeData {
  assets: ThemeAssets;
  content: ThemeContent;
  weddingData?: WeddingData;
  colors?: ThemeColors;
}

// Dados padrão como fallback
const defaultAssets: ThemeAssets = {
  header_background: '/images/img_header_section.jpg',
  logo: '/images/logo.svg',
  about_image: '/images/img_aboutus_section.png',
  building_image: '/images/img_building_section.png',
  checkout_image: '/images/img_checkout_section.png',
  tree1: '/images/tree1.png',
  tree2: '/images/tree2.png',
  chair: '/images/chair.png',
  thanks_image: '/images/thks.png',
  background_pattern: '/backgroundUrl.jpg',
};

const defaultContent: ThemeContent = {
  headerTitle: 'Nosso Grande Dia',
  headerSubtitle: 'Você está convidado para celebrar conosco',
  aboutTitle: 'Nossa História',
  aboutText: 'Esta é a história do nosso amor...',
  countdownTitle: 'Contagem Regressiva',
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Por favor, confirme sua presença até a data limite',
  locationTitle: 'Local da Cerimônia',
  locationDescription: 'Venha celebrar conosco neste dia especial',
  footerText: 'Feito com ❤️ para nosso dia especial',
};

const defaultWeddingData: WeddingData = {
  weddingDate: '2024-11-09',
  weddingTime: '15:30',
  weddingLocation: 'Sítio Geranium',
  weddingAddress: 'Endereço do local',
  weddingObservations: '',
};

const defaultColors: ThemeColors = {
  // Cores principais
  primaryColor: '#E5C74D',
  secondaryColor: '#F5D759',
  accentColor: '#ffde22',
  
  // Cores de texto
  textLight: '#ffffff',
  textDark: '#000000',
  textMuted: '#00000099',
  
  // Header
  headerBackground: 'transparent',
  headerTextColor: '#ffffff',
  headerAccentColor: '#E5C74D',
  headerFilterBrightness: 50,
  
  // About
  aboutBackground: '#ffffff',
  aboutTextColor: '#000000',
  aboutShadowColor: '#dddddd',
  
  // Countdown
  countdownBackground: '#E1F0D2',
  countdownTextColor: '#000000',
  countdownBorderColor: '#000000',
  
  // Confirm
  confirmBackground: 'transparent',
  confirmTextColor: '#ffffff',
  confirmAccentColor: '#F5D759',
  confirmButtonColor: '#F5D759',
  confirmFilterBrightness: 25,
  
  // Gerais
  buttonPrimaryColor: '#F5D759',
  buttonTextColor: '#000000',
  borderColor: '#ffffff',
};

interface ThemeContextType {
  themeData: ThemeData;
  isLoading: boolean;
  isImagesLoading: boolean;
  showContent: boolean;
  error: string | null;
  getAsset: (key: string) => string;
  getContent: (key: string) => string;
  getWeddingData: () => WeddingData;
  getColor: (key: keyof ThemeColors) => string | number;
  refetch: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeData, setThemeData] = useState<ThemeData>({
    assets: defaultAssets,
    content: defaultContent,
    weddingData: defaultWeddingData,
    colors: defaultColors,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const { tenant } = useTenant();

  // Função para pré-carregar imagens
  const preloadImages = useCallback(async (assets: ThemeAssets) => {
    setIsImagesLoading(true);
    
    const imagePromises = Object.entries(assets).map(([key, url]) => {
      return new Promise<void>((resolve, reject) => {
        if (!url || !url.startsWith('http')) {
          // Para URLs locais, considerar como já carregadas
          resolve();
          return;
        }
        
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to load image: ${key} - ${url}`);
          resolve(); // Não vamos falhar por uma imagem
        };
        img.src = url;
        
        // Timeout para evitar travamento
        setTimeout(() => {
          console.warn(`Image load timeout: ${key} - ${url}`);
          resolve();
        }, 10000); // 10 segundos timeout
      });
    });

    try {
      await Promise.all(imagePromises);
      console.log('All images preloaded successfully');
    } catch (error) {
      console.error('Error preloading images:', error);
    } finally {
      // Delay mínimo para evitar loading muito rápido
      setTimeout(() => {
        setIsImagesLoading(false);
        setShowContent(true);
      }, 500);
    }
  }, []);

  const loadThemeData = useCallback(async () => {
    if (!tenant?.id) {
      console.log('No tenant ID available yet');
      // Se não há tenant, mostrar conteúdo padrão após um tempo
      setTimeout(() => {
        setIsImagesLoading(false);
        setShowContent(true);
      }, 1000);
      return;
    }

    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';
      
      // Adicionar timestamp para evitar cache
      const timestamp = new Date().getTime();
      const url = `${apiUrl}/theme-assets/theme-data?t=${timestamp}`;
      console.log('Loading theme data from:', url);
      
      // Add tenant information to headers
      const tenantSlug = tenant?.slug || 'default';
      const tenantIdValue = tenant?.id || tenantSlug;
      
      const response = await fetch(url, {
        headers: {
          'X-Tenant-ID': tenantIdValue,
          'X-Tenant-Slug': tenantSlug,
          'Host': typeof window !== 'undefined' ? window.location.host : 'localhost',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        cache: 'no-store', // Next.js specific
      });

      if (!response.ok) {
        throw new Error('Failed to load theme data');
      }

      const data = await response.json();
      console.log('Theme data loaded:', data);

      // Buscar dados do casamento separadamente
      let weddingData = defaultWeddingData;
      try {
        const weddingResponse = await fetch(`${apiUrl}/theme-assets/wedding-data?t=${timestamp}`, {
          headers: {
            'X-Tenant-ID': tenantIdValue,
            'X-Tenant-Slug': tenantSlug,
            'Host': typeof window !== 'undefined' ? window.location.host : 'localhost',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          cache: 'no-store',
        });
        
        if (weddingResponse.ok) {
          const weddingDataResponse = await weddingResponse.json();
          weddingData = { ...defaultWeddingData, ...weddingDataResponse };
        }
      } catch (err) {
        console.warn('Could not load wedding data, using defaults:', err);
      }

      // Buscar cores do tema separadamente
      let colors = defaultColors;
      try {
        const colorsResponse = await fetch(`${apiUrl}/theme-assets/colors?t=${timestamp}`, {
          headers: {
            'X-Tenant-ID': tenantIdValue,
            'X-Tenant-Slug': tenantSlug,
            'Host': typeof window !== 'undefined' ? window.location.host : 'localhost',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          cache: 'no-store',
        });
        
        if (colorsResponse.ok) {
          const colorsDataResponse = await colorsResponse.json();
          colors = { ...defaultColors, ...colorsDataResponse };
        }
      } catch (err) {
        console.warn('Could not load colors data, using defaults:', err);
      }
      
      // Mesclar com dados padrão para garantir que todos os campos existem
      const mergedAssets = { ...defaultAssets, ...data.assets };
      const mergedData = {
        assets: mergedAssets,
        content: { ...defaultContent, ...data.content },
        weddingData: weddingData,
        colors: colors,
      };
      
      setThemeData(mergedData);
      setError(null);
      
      // Pré-carregar as imagens
      await preloadImages(mergedAssets);
    } catch (err) {
      console.error('Error loading theme data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load theme');
      // Em caso de erro, usar dados padrão
      setThemeData({
        assets: defaultAssets,
        content: defaultContent,
        weddingData: defaultWeddingData,
        colors: defaultColors,
      });
      // Pré-carregar as imagens padrão mesmo em caso de erro
      await preloadImages(defaultAssets);
    } finally {
      setIsLoading(false);
    }
  }, [tenant?.id]);

  useEffect(() => {
    loadThemeData();
  }, [loadThemeData]);

  // Adicionar evento para escutar mudanças
  useEffect(() => {
    const handleThemeUpdate = () => {
      loadThemeData();
    };

    window.addEventListener('theme-updated', handleThemeUpdate);
    
    return () => {
      window.removeEventListener('theme-updated', handleThemeUpdate);
    };
  }, [loadThemeData]);

  const getAsset = (key: string): string => {
    return themeData.assets[key] || defaultAssets[key] || '';
  };

  const getContent = (key: string): string => {
    return themeData.content[key] || defaultContent[key] || '';
  };

  const getWeddingData = (): WeddingData => {
    return themeData.weddingData || defaultWeddingData;
  };

  const getColor = (key: keyof ThemeColors): string | number => {
    return themeData.colors?.[key] || defaultColors[key];
  };

  const refetch = async () => {
    await loadThemeData();
  };

  return (
    <ThemeContext.Provider value={{ themeData, isLoading, isImagesLoading, showContent, error, getAsset, getContent, getWeddingData, getColor, refetch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};