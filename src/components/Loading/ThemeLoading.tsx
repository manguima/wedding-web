'use client';

import { Box, Center, Loader, Text, Flex } from '@mantine/core';
import { motion } from 'framer-motion';

interface ThemeLoadingProps {
  message?: string;
}

export const ThemeLoading: React.FC<ThemeLoadingProps> = ({ 
  message = "Carregando imagens do tema..." 
}) => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
      }}
    >
      <Center h="100vh">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Flex direction="column" align="center" gap="xl">
            <Loader size="xl" color="#E5C74D" />
            <Text 
              size="lg" 
              fw={500} 
              ta="center"
              style={{ color: '#666' }}
            >
              {message}
            </Text>
            <Text 
              size="sm" 
              ta="center"
              style={{ color: '#999' }}
            >
              Preparando uma experiência única para você...
            </Text>
          </Flex>
        </motion.div>
      </Center>
    </Box>
  );
};