### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Development окружение в докере
Перед первым запуском выполните `node init.js`

`docker-compose up -d uno-db pgadmin` - запустит базу данных с интерфейсом
1. uno-db - база данных (uno-db)
2. pgadmin - интерфейс базы данных (uno-db)

Вход в pgadmin:
* host: http://localhost:8080
* email: admin@admin.com
* password: secret

## Production окружение в докере
Перед первым запуском выполните `node init.js`

`docker-compose up -d` - запустит все сервисы
1. node - клиент (client)
2. node - сервер (server)
3. uno-db - база данных (uno-db)
4. pgadmin - интерфейс базы данных (uno-db)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker-compose up -d {sevice_name}`, например `docker-compose up -d server`

## Contributing

[CONTRIBUTING](./.github/CONTRIBUTING.md)
