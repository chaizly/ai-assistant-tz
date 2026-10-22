import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput, Textarea, Select, MultiSelect, Button,
  Group, Stack, Paper, Title,
} from '@mantine/core'
import { tzSchema, type TzFormValues } from '../schemas'
import type { Tz, TzInput } from '../types'

const FIELD_OPTIONS = ['title', 'company', 'salary', 'description', 'link']
const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
]

interface Props {
  initial?: Tz
  loading?: boolean
  title?: string
  onSubmit: (data: TzInput) => void
  onCancel?: () => void
}

export function TzForm({ initial, loading, title = 'Данные заявки', onSubmit, onCancel }: Props) {
  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm<TzFormValues>({
    resolver: zodResolver(tzSchema),
    defaultValues: initial
      ? {
          processName: initial.processName,
          description: initial.description,
          targetUrl: initial.targetUrl,
          fields: initial.fields,
          priority: initial.priority,
        }
      : { fields: [], priority: 'medium', processName: '', description: '', targetUrl: '' },
  })

  return (
    <Paper p="lg" withBorder mt="md">
      <Title order={3} mb="md">{title}</Title>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Stack>
          <TextInput
            label="Название процесса"
            placeholder="Парсинг вакансий"
            error={errors.processName?.message}
            {...register('processName')}
          />
          <Textarea
            label="Описание"
            minRows={4}
            placeholder="Что автоматизируем и зачем"
            error={errors.description?.message}
            {...register('description')}
          />
          <TextInput
            label="URL источника"
            placeholder="https://example.com"
            error={errors.targetUrl?.message}
            {...register('targetUrl')}
          />
          <Controller
            control={control}
            name="fields"
            render={({ field, fieldState }) => (
              <MultiSelect
                label="Поля для извлечения"
                data={FIELD_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="priority"
            render={({ field, fieldState }) => (
              <Select
                label="Приоритет"
                data={PRIORITY_OPTIONS}
                value={field.value}
                onChange={v => field.onChange(v ?? 'medium')}
                error={fieldState.error?.message}
              />
            )}
          />
          <Group justify="flex-end">
            {onCancel && (
              <Button variant="default" onClick={onCancel}>Отмена</Button>
            )}
            <Button type="submit" loading={loading}>Сохранить</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}