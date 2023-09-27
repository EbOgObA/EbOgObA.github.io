export const composer = () => {
  return app.gulp.src(app.path.src.composer)
    .pipe(app.gulp.dest(app.path.build.composer))
}

// src() - метод gulp, который получает доступ к папкам и файлам по указанному пути (путь - аргумент метода)
// dest() - destination (пункт назначения), указываем путь куда переносить файлы

// У данной задачи единственная функция получение файлов с исходниками и перенос в папку результата