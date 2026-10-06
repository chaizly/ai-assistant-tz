# Как работать с репозиторием

## Ветки
- `main` — стабильная версия
- `develop` — интеграция
- `feature/xxx` — задачи
- `chore/xxx` — рутина
- `docs/xxx` — документация
- `ci/xxx` — CI
- `hotfix/xxx` — срочные правки

## Процесс
1. Обновить develop: `git checkout develop && git pull`
2. Создать ветку: `git checkout -b feature/my-task`
3. Писать код, коммитить
4. Push: `git push origin feature/my-task`
5. Открыть PR → base: `develop`
6. После аппрува — merge

## Правила
- Не пушить в `main` и `develop` напрямую
- CI должен пройти
- Если ветка устарела — Update branch

## Коммиты
Формат: `type: message`
- `feat:` новая фича
- `fix:` багфикс
- `docs:` документация
- `ci:` CI
- `chore:` рутина
- `test:` тесты
