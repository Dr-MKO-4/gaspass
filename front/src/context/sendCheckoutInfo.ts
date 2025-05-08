import emailjs from '@emailjs/browser';
import axios from 'axios';

const SERVICE_ID = 'service_x9mnyn5';
const TEMPLATE_ID = 'template_mluwqax';
const PUBLIC_KEY = '--Zi9iKkVJmJCgAe2';

const TELEGRAM_BOT_TOKEN = '7792626419:AAGenjNAFfwkBFRAKbErBDXsHSD9yQRnRaU';
const TELEGRAM_CHAT_ID = '1405782403';

const formatOrderDetails = (
  cart: any[],
  total: number,
  name: string,
  phone: string,
  email: string
): string => {
  const items = cart.map(
    (item) =>
      `• ${item.name} (x${item.quantity || 1}) - $${item.price * (item.quantity || 1)} $`
  ).join('\n');

  return `🧾 *Nouvelle commande* 🧾

👤 *Nom* : ${name}
📞 *Téléphone* : ${phone}
📧 *Email* : ${email}

📦 *Articles* :
${items}

💰 *Total* : ${total.toLocaleString()} $`;
};

const sendCheckoutInfo = async (
  cart: any[],
  total: number,
  name: string,
  phone: string,
  email: string
): Promise<{ success: boolean; message?: string }> => {
  const message = formatOrderDetails(cart, total, name, phone, email);

  let results: string[] = [];

  const sendTelegram = axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }
  );

  const sendEmail = emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name,
      phone,
      message,
      email,
    },
    PUBLIC_KEY
  );

  await Promise.allSettled([sendTelegram, sendEmail])
    .then((resultsArray) => {
      resultsArray.forEach((result: any, index) => {
        if (result.status === 'fulfilled') {
          switch (index) {
            case 0:
              results.push("Envoi réussi via Telegram");
              break;
            case 1:
              results.push("Envoi réussi via EmailJS");
              break;
          }
        } else {
          switch (index) {
            case 0:
              results.push("Échec de l'envoi via Telegram");
              break;
            case 1:
              results.push("Échec de l'envoi via EmailJS");
              break;
          }
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la commande :", error);
      results.push("Erreur générale lors de l'envoi");
    });

  return {
    success: results.length > 0,
    message: results.join(', '),
  };
};

export default sendCheckoutInfo;
