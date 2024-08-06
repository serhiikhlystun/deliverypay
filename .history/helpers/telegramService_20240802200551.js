// services/telegramService.js

class TelegramService {
    constructor() {
      if (typeof window !== 'undefined' && window.Telegram) {
        this.tg = window.Telegram.WebApp;
      } else {
        this.tg = null;
      }
    }
  
    get MainButton() {
      return this.tg ? this.tg.MainButton : null;
    }
  
    get BackButton() {
      return this.tg ? this.tg.BackButton : null;
    }
  
    sendData(data) {
      if (this.tg) {
        this.tg.sendData(JSON.stringify(data));
      }
    }
  
    ready() {
      if (this.tg) {
        this.tg.ready();
      }
    }
  
    enableBackButton() {
      if (this.tg) {
        this.tg.BackButton.show();
      }
    }
  
    disableBackButton() {
      if (this.tg) {
        this.tg.BackButton.hide();
      }
    }
  }
  
  const telegramService = new TelegramService();
  export default telegramService;
  