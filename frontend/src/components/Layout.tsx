import { AppShell, Group, Title, NavLink, Container } from '@mantine/core'
import { NavLink as RouterNavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>AI Assistant TZ</Title>
          <Group>
            <NavLink component={RouterNavLink} to="/" label="Главная" />
            <NavLink component={RouterNavLink} to="/create" label="Создать" />
            <NavLink component={RouterNavLink} to="/archive" label="Архив" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}