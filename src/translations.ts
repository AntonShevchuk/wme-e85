export const NAME = 'E85'

export const TRANSLATION = {
  'en': {
    title: 'Street Geometry',
    description: 'Simplify and straighten up streets',
    buttons: {
      A: 'Simplify',
      B: 'Straighten',
      H: 'Doglegs',
    },
    settings: {
      simplify: {
        title: 'Settings',
        description: 'Settings for simplifying segments',
        short: 'Remove a fragment shorter than',
        angle: 'If the angle is bigger than',
        twoShort: 'and fragments shorter than',
      },
      buttons: {
        title: 'Buttons',
        description: 'Set the angle of the buttons',
        C: '1st Button',
        D: '2nd Button',
        E: '3rd Button',
        F: '4th Button',
        G: '5th Button',
      },
      microDoglegs: {
        title: 'Micro Doglegs',
        description: 'Settings for removing micro doglegs',
        enabled: 'Enable doglegs button',
        maxDistance: 'Maximum distance from junction',
        minDistance: 'Minimum distance from junction (0 to disable)',
      },
    },
  },
  'uk': {
    title: 'Геометрія вулиць',
    description: 'Спрощуйте та вирівнюйте вулиці',
    buttons: {
      A: 'Спростити',
      B: 'Вирівняти',
      H: 'Доглеги',
    },
    settings: {
      simplify: {
        title: 'Налаштування',
        description: 'Для спрощення сегментів будуть враховані наступні параметри',
        short: 'Видаляти фрагменти менші ніж',
        angle: 'Або якщо кут більше ніж',
        twoShort: 'та фрагменти меньші ніж',
      },
      buttons: {
        title: 'Кнопки',
        description: 'Налаштуйте кут для кнопок',
        C: 'Для першої',
        D: 'Для другої',
        E: 'Для третьої',
        F: 'Для четвертої',
        G: 'Для п\'ятої',
      },
      microDoglegs: {
        title: 'Мікро доглеги',
        description: 'Налаштування для видалення мікро доглегів',
        enabled: 'Увімкнути кнопку доглегів',
        maxDistance: 'Максимальна відстань від перетину',
        minDistance: 'Мінімальна відстань від перетину (0 для вимкнення)',
      },
    },
  },
  'ru': {
    title: 'Геометрия улиц',
    description: 'Упрощайте и выравнивайте геометрию улиц',
    buttons: {
      A: 'Упростить',
      B: 'Выровнять',
      H: 'Доглеги',
    },
    settings: {
      simplify: {
        title: 'Настройки',
        description: 'Параметры для упрощения геометрии сегмента',
        short: 'Если фрагмент короче, чем',
        angle: 'Или угол больше чем',
        twoShort: 'и фрагменты меньше, чем',
      },
      buttons: {
        title: 'Кнопки',
        description: 'Настройте угол для кнопок',
        C: 'Для 1-ой кнопки',
        D: 'Для 2-ой кнопки',
        E: 'Для 3-ей кнопки',
        F: 'Для 4-ой кнопки',
        G: 'Для 5-ой кнопки',
      },
      microDoglegs: {
        title: 'Микро доглеги',
        description: 'Настройки для удаления микро доглегов',
        enabled: 'Включить кнопку доглегов',
        maxDistance: 'Максимальное расстояние от перекрёстка',
        minDistance: 'Минимальное расстояние от перекрёстка (0 для отключения)',
      },
    },
  }
}
