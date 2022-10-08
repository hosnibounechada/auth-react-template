function isEmail(email: string) {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== "" && email.match(emailFormat)) return true;
  return false;
}

function isPhone(phone: string) {
  var phoneFormat = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  if (phone !== "" && phone.match(phoneFormat)) return true;
  return false;
}

export function verifyInput(input: string) {
  if (isEmail(input)) return { name: "email" };
  if (isPhone(input)) return { name: "phone" };
  return { name: "username" };
}
