'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Stack,
  Group,
  TextInput,
  Textarea,
  Modal,
  Flex,
  Alert,
  Loader
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconMusic, IconMicrophone, IconHeart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { createMusicSuggestion } from '@/utils/apiHelpers';
import { useGuestStore } from '@/zustand/slices/guestStore';

interface MusicSuggestionForm {
  artistName: string;
  songTitle: string;
  message?: string;
  guestName: string;
  codeKey: string;
}

export const MusicSuggestionSection = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const { code } = useGuestStore();

  const form = useForm<MusicSuggestionForm>({
    initialValues: {
      artistName: '',
      songTitle: '',
      message: '',
      guestName: '',
      codeKey: code?.codeKey || ''
    },
    validate: {
      artistName: (value) => value.trim().length === 0 ? 'Nome do artista é obrigatório' : null,
      songTitle: (value) => value.trim().length === 0 ? 'Título da música é obrigatório' : null,
      guestName: (value) => value.trim().length === 0 ? 'Seu nome é obrigatório' : null,
      codeKey: (value) => value.trim().length === 0 ? 'Código do convite é obrigatório' : null
    }
  });

  const handleSubmit = async (values: MusicSuggestionForm) => {
    try {
      setLoading(true);
      
      const response = await createMusicSuggestion({
        artistName: values.artistName.trim(),
        songTitle: values.songTitle.trim(),
        message: values.message?.trim() || '',
        guestName: values.guestName.trim(),
        codeKey: values.codeKey.trim()
      });

      if (response.success) {
        showNotification({
          title: 'Sucesso!',
          message: 'Sua sugestão musical foi enviada com sucesso!',
          color: 'green',
          icon: <IconHeart size={16} />
        });
        
        form.reset();
        close();
      } else {
        throw new Error(response.message || 'Erro ao enviar sugestão');
      }
    } catch (error: any) {
      console.error('Error submitting music suggestion:', error);
      showNotification({
        title: 'Erro',
        message: error.message || 'Erro ao enviar sugestão musical. Tente novamente.',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py={80}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stack align="center" gap={40}>
          <Stack align="center" gap={20}>
            <IconMusic size={48} color="#E5C74D" />
            <Title order={2} ta="center" c="white" fz={{ base: 28, md: 36 }}>
              Sugestões Musicais
            </Title>
            <Text ta="center" c="dimmed" size="lg" maw={600}>
              Ajude-nos a criar a trilha sonora perfeita para nossa festa!
              Sugira suas músicas favoritas para tocarmos na nossa celebração.
            </Text>
          </Stack>

          <Card 
            shadow="xl" 
            radius="lg" 
            p={40}
            bg="rgba(255, 255, 255, 0.05)"
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(229, 199, 77, 0.2)'
            }}
          >
            <Stack align="center" gap={30}>
              <IconMicrophone size={40} color="#E5C74D" />
              
              <Stack align="center" gap={10}>
                <Text fw={600} size="xl" c="white">
                  Compartilhe sua música especial
                </Text>
                <Text ta="center" c="dimmed" size="md">
                  Queremos que nossa festa tenha as músicas que vocês amam!
                </Text>
              </Stack>

              <Button
                size="lg"
                radius="xl"
                color="yellow"
                leftSection={<IconMusic size={20} />}
                onClick={open}
                style={{
                  background: 'linear-gradient(45deg, #E5C74D, #F5D759)',
                  color: '#000',
                  fontWeight: 600
                }}
              >
                Sugerir Música
              </Button>
            </Stack>
          </Card>
        </Stack>
      </motion.div>

      {/* Music Suggestion Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <IconMusic size={24} color="#E5C74D" />
            <Text fw={600} size="lg">Sugerir Música</Text>
          </Group>
        }
        size="md"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Alert color="blue" variant="light">
              <Text size="sm">
                Sugestões especiais para tornar nossa festa ainda mais especial! 🎵
              </Text>
            </Alert>

            <TextInput
              label="Seu Nome"
              placeholder="Digite seu nome"
              required
              {...form.getInputProps('guestName')}
            />

            <TextInput
              label="Código do Convite"
              placeholder="Digite o código do seu convite"
              required
              {...form.getInputProps('codeKey')}
            />

            <TextInput
              label="Nome do Artista/Banda"
              placeholder="Ex: Ed Sheeran, The Beatles..."
              required
              {...form.getInputProps('artistName')}
            />

            <TextInput
              label="Título da Música"
              placeholder="Ex: Perfect, Here Comes The Sun..."
              required
              {...form.getInputProps('songTitle')}
            />

            <Textarea
              label="Mensagem (Opcional)"
              placeholder="Conte-nos por que essa música é especial..."
              minRows={3}
              maxRows={5}
              {...form.getInputProps('message')}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={close} disabled={loading}>
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={loading}
                leftSection={!loading && <IconHeart size={16} />}
                color="yellow"
                style={{
                  background: 'linear-gradient(45deg, #E5C74D, #F5D759)',
                  color: '#000'
                }}
              >
                {loading ? 'Enviando...' : 'Enviar Sugestão'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};