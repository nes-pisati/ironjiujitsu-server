// src/services/whatsapp.service.ts
import axios from 'axios';

type ReminderType = '7_DAYS' | '3_DAYS' | 'EXPIRED';

interface SendWhatsappParams {
  phone: string;
  name: string;
  reminderType: ReminderType;
}

const templateMap: Record<ReminderType, string> = {
  '7_DAYS': 'abbonamento_scadenza_7_giorni',
  '3_DAYS': 'abbonamento_scadenza_3_giorni',
  'EXPIRED': 'abbonamento_scadenza_oggi'
};

export const sendWhatsappMessage = async ({
  phone,
  name,
  reminderType
}: SendWhatsappParams) => {

  const payload = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    template: {
      name: templateMap[reminderType],
      language: { code: 'it' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: name }
          ]
        }
      ]
    }
  };

  try {
    await axios.post(
      `${process.env.WHATSAPP_BASE_URL}/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error: any) {
    console.error(
      'WhatsApp send error',
      error?.response?.data || error.message
    );
  }
};
