'use client';

import { useTenant } from '@/contexts/TenantContext';
import { Center, Loader, Text, Container } from '@mantine/core';
import { ThemeLoading } from './Loading/ThemeLoading';

export const TenantGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tenant, isLoading, error } = useTenant();

  if (isLoading) {
    return <ThemeLoading message="Carregando site do casamento..." />;
  }

  if (error || !tenant) {
    return (
      <Center h="100vh">
        <Container>
          <Text size="xl" fw={500} ta="center" c="red">
            {error || 'Wedding site not found'}
          </Text>
          <Text size="md" ta="center" mt="md" c="dimmed">
            Please check the URL and try again.
          </Text>
        </Container>
      </Center>
    );
  }

  return <>{children}</>;
};