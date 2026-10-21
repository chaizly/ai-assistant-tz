import { Table, Title, Badge, Button, Group, Loader, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { tzApi } from '../api/tz'
import type { Tz } from '../types'
import { TzForm } from '../components/TzForm'

const priorityColor: Record<Tz['priority'], string> = {
  low: 'gray',
  medium: 'blue',
  high: 'red',
}

export function Archive() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState<Tz | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['tz'],
    queryFn: tzApi.list,
  })

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      tzApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tz'] })
      setEditing(null)
      notifications.show({ message: 'Обновлено', color: 'green' })
    },
  })

  const remove = useMutation({
    mutationFn: (id: number) => tzApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tz'] })
      notifications.show({ message: 'Удалено', color: 'red' })
    },
  })

  const confirmDelete = (id: number) =>
    modals.openConfirmModal({
      title: 'Удалить заявку?',
      children: <Text>Действие необратимо.</Text>,
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: () => remove.mutate(id),
    })

  if (isLoading) return <Loader mt="xl" />

  return (
    <>
      <Title order={2} mb="md">Архив заявок</Title>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Название</Table.Th>
            <Table.Th>URL</Table.Th>
            <Table.Th>Приоритет</Table.Th>
            <Table.Th>Дата</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map(tz => (
            <Table.Tr key={tz.id}>
              <Table.Td>{tz.id}</Table.Td>
              <Table.Td>{tz.processName}</Table.Td>
              <Table.Td>{tz.targetUrl}</Table.Td>
              <Table.Td>
                <Badge color={priorityColor[tz.priority]}>{tz.priority}</Badge>
              </Table.Td>
              <Table.Td>{tz.createdAt}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button size="xs" onClick={() => setEditing(tz)}>
                    Изменить
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    variant="light"
                    onClick={() => confirmDelete(tz.id)}
                  >
                    Удалить
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {editing && (
        <TzForm
          initial={editing}
          loading={update.isPending}
          onSubmit={data => update.mutate({ id: editing.id, data })}
          onCancel={() => setEditing(null)}
          title={`Редактировать #${editing.id}`}
        />
      )}
    </>
  )
}