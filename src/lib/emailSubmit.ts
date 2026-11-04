import { weddingConfig } from '../config/weddingConfig';

interface EmailSubmission {
  subject: string;
  fields: Record<string, string | number>;
}

interface FormSubmitResponse {
  success?: string | boolean;
  ok?: boolean;
  message?: string;
}

export async function sendEmailSubmission({ subject, fields }: EmailSubmission): Promise<void> {
  let response: Response;

  try {
    response = await fetch(
      `https://formsubmit.co/ajax/${weddingConfig.submissions.email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          ...fields,
        }),
      },
    );
  } catch {
    throw new Error(
      'Your message could not be sent. Please check your connection and try again.',
    );
  }

  const data = (await response.json().catch(() => null)) as FormSubmitResponse | null;
  const delivered = String(data?.success) === 'true' || data?.ok === true;

  if (!response.ok || !delivered) {
    throw new Error(
      data?.message || 'Your message could not be sent. Please try again.',
    );
  }
}
