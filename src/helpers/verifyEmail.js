export default function verifyEmailWithRegex({ email, password }) {
  /** Para realizar o uso de verificação do email, usei o regex pattern email abaixo:
   * Source: https://forum.blip.ai/t/resolvido-regex-para-validacao-de-email/1635 */
  const minPasswordLength = 6;
  const emailRegex = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
  return (emailRegex.test(email) && password.length >= minPasswordLength);
}
