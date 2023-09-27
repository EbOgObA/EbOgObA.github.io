export const php = () => {
  return app.gulp.src(app.path.src.php, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber( // Обработка ошибок
      app.plugins.notify.onError({ // Уведмоление ошибок
        title: 'PHP',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.gulp.dest(app.path.build.php)) // Выгрузка в папку результата проекта
    .pipe(app.plugins.browsersync.stream()) // Синхронизация с браузером
}

// sourcemaps - карта исходников для понимания в каком из файлов ошибка