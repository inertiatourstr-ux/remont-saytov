# Инерция — ремонт старых сайтов

Одностраничный лендинг. Чистый HTML/CSS/JS, без сборки: файлы из репозитория и есть сайт.

```
index.html              страница
assets/css/style.css    стили и адаптив (бургер ≤900 px, телефон ≤600 px, узкий ≤480 px)
assets/js/main.js       меню, аккордеоны, слайдер кейсов, форма, cookie-баннер
assets/img/             картинки в WebP
assets/fonts/           Archivo, локально (лицензия OFL)
```

## Публикация на GitHub Pages

1. GitHub Desktop → **File → Add local repository** → выбрать эту папку → **Publish repository** (снять галочку «Keep this code private», если нужен бесплатный Pages).
2. На github.com в репозитории: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
3. Через 1–2 минуты сайт откроется по адресу `https://<логин>.github.io/<репозиторий>/`.
4. Свой домен: там же, **Custom domain**, и у регистратора CNAME на `<логин>.github.io`.

Все пути относительные, поэтому сайт работает и в подпапке `github.io/<репозиторий>/`, и на своём домене.

## Заявки

Форма ничего не отправляет на сервер. По кнопке «Написать в Telegram» открывается чат с [@Webfusiondigital](https://t.me/Webfusiondigital), в поле ввода уже набрано:

```
Здравствуйте! Нужен экспресс-аудит сайта.
Сайт: …
Контакт: …
Что случилось: …
```

Посетителю остаётся нажать «Отправить». Тот же текст копируется в буфер обмена — на случай, если Telegram не подставит его сам.

Сменить аккаунт: константа `TG_USER` в `assets/js/main.js` и ссылки `t.me/Webfusiondigital` в `index.html`.

## Локальный просмотр

```bash
python3 -m http.server 8080
```

и открыть http://localhost:8080
