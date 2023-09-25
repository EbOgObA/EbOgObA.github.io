export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}` // Базовая папка, откуда запускать файлы (результат проекта)
    },
    notify: false, // Убираются сообщения в браузере
    port: 3000 // Порт для локального сервера
  })
}