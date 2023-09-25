import { deleteAsync } from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
  deleteAsync(`./${app.path.rootFolder}.zip`); // Если уже существует zip архив, то удаляем его
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) // Обращаемся к файлу результата и получаем файлы любого уровня вложености
    .pipe(app.plugins.plumber(// Обработка ошибок
      app.plugins.notify.onError({ // Уведмоление ошибок
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // Получаем коневую папку нашего проекта и делаем zip архив
    .pipe(app.gulp.dest('./'));
}