import { Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { TzForm } from '../components/TzForm'
import { tzApi } from '../api/tz'
import type { TzInput } from '../types'

export function Create() {
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TzInput) => tzApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tz'] })
      notifications.show({ message: 'Заявка создана', color: 'green' })
      navigate('/archive')
    },
  })

  return (
    <>
      <Title order={2} mb="md">Новая заявка</Title>
      <TzForm onSubmit={mutate} loading={isPending} />
    </>
  )
}