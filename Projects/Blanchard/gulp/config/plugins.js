import replace from 'gulp-replace'; // Поиск и замена путей, например при хранении картинок в одной папке, а резульатов в другой
import plumber from 'gulp-plumber'; // Помогает обработать возникающие ошибки при работе с тем или иным файлом
import notify from 'gulp-notify'; // Удобно выводит сообщения, в частности о тех же ошибках
import browsersync from 'browser-sync'; // Синхронизация любых изменений файлов и браузера
import newer from 'gulp-newer'; // Проверка обновлений, действительно ли обновилась картинка, обработка только тех изображений, к-ых нет в папке результата
import ifPlugin from "gulp-if"; // Условное ветвление

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
}