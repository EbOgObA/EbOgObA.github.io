import { configFTP } from '../config/ftp.js'; // Подключаем конфигурационный файл
import vinylFTP from 'vinyl-ftp'; // Плагин отправляющий работу на сервер
import util from 'gulp-util'; // Утилиты позволяющие отображать ход копирования файлов на FTP сервер

export const ftp = () => {
  configFTP.log = util.log; // Выводим ход копирования файлов
  const ftpConnect = vinylFTP.create(configFTP); // Создаем подключение, основываясь на файле конфигурации
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) // Получаем все файлы в папке результата
    .pipe(app.plugins.plumber( // Обработка ошибок
      app.plugins.notify.onError({ // Уведмоление ошибок
        title: "FTP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
}