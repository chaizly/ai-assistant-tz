import { Title, Text, Button, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()
  return (
    <Stack align="center" mt={80} gap="lg">
      <Title order={1}>AI Assistant TZ</Title>
      <Text c="dimmed" size="lg" ta="center" maw={600}>
        Панель управления генератором технических заданий.
        Создавайте заявки, управляйте ими и готовьте данные для ИИ.
      </Text>
      <Button size="lg" onClick={() => navigate('/create')}>
        Создать заявку
      </Button>
    </Stack>
  )
}