export interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter at least 2 characters.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Please enter a subject.'
  if (values.message.trim().length < 10) errors.message = 'Please enter at least 10 characters.'
  return errors
}

export function createContactEmailDraftUrl(values: ContactValues, recipient: string) {
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    '',
    values.message.trim(),
  ].join('\n')

  return `https://mail.google.com/mail/?${new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: recipient,
    subject: values.subject.trim(),
    body,
  }).toString()}`
}
