import { useEffect, useState } from 'react';
import telegramService from '../../helpers/telegramService';

const TelegramIntegration = () => {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Підключення Telegram Web Apps SDK
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      if (window.Telegram) {
        telegramService.tg = window.Telegram.WebApp;
        telegramService.ready();
        setIsTelegram(true);

        // Вмикаємо кнопку назад Telegram
        telegramService.enableBackButton();
        
        // Додаємо обробник кліку для кнопки назад
        telegramService.BackButton.onClick(() => {
        //   telegramService.tg.close();
             window.history.back();
        });

        // Налаштовуємо головну кнопку Telegram
        telegramService.MainButton.show();
        telegramService.MainButton.setText('Open in Browser');
        telegramService.MainButton.onClick(() => {
          window.open(window.location.href, '_blank');
        });
      }
    };
    document.body.appendChild(script);

    // Очищення при розмонтаженні компонента
    return () => {
      if (telegramService.tg) {
        telegramService.disableBackButton();
        telegramService.MainButton.hide();
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {isTelegram && (
        <div>
          <div id="open-in-browser" style={{ display: 'none' }}>
            This site is best viewed in a browser.
          </div>
        </div>
      )}
    </div>
  );
};

export default TelegramIntegration;
