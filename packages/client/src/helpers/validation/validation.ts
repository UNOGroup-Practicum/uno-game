export const REQUIRED_MESSAGE = "Обязательное для заполнения";

export enum InputNames {
  LOGIN = "LOGIN",
  PASSWORD = "PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  EMAIL = "EMAIL",
  NAME = "NAME",
  PHONE = "PHONE",
}

export const ERROR_MESSAGE: Record<string, string> = {
  LOGIN: "От 3 до 20 знаков (EN)",
  PASSWORD: "От 8 до 40 символов (EN), обязательно хотя бы одна заглавная буква и цифра",
  CONFIRM_PASSWORD: "Пароли не совпадают",
  EMAIL: "(EN), непробельные знаки, @..., .домен",
  NAME: "(RU/EN), первая буква прописная, -",
  PHONE: 'от 10 до 15 знаков, можно начать с "+"',
};

const VALIDATE_REGEXP: Record<string, RegExp> = {
  LOGIN: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
  PASSWORD: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/,
  EMAIL: /^[a-zA-Z0-9-_\\/=+(){}\\[\]$!]+@[a-zA-Z]+\.[a-zA-Z0-9]+$/,
  NAME: /^[A-ZА-ЯЁ]{1}([A-Za-zА-Яа-яЁё\\-]){0,}$/,
  PHONE: /^[+]?[0-9]{10,15}$/,
};

export const validateCheck = (
  value: string,
  name: string,
  messageType: string = name
): string | boolean => {
  if (!value.match(VALIDATE_REGEXP[name as keyof typeof VALIDATE_REGEXP])) {
    return ERROR_MESSAGE[messageType as keyof typeof ERROR_MESSAGE];
  }

  return true;
};

export const validationTemplate = (name: string, messageType: string = name) => {
  return {
    required: REQUIRED_MESSAGE,
    validate: (value: string) => validateCheck(value, name, messageType),
  };
};

// export const loginValidation = {
//   required: REQUIRED_MESSAGE,
//   validate: (value: string) => validateCheck(value, 'LOGIN'),
// };

// export const passwordValidation = {
//   required: REQUIRED_MESSAGE,
//   validate: (value: string) => validateCheck(value, 'PASSWORD'),
// };

// export const emailValidation = {
//   required: REQUIRED_MESSAGE,
//   validate: (value: string) => validateCheck(value, 'EMAIL'),
// }

// export const nameValidation = {
//   required: REQUIRED_MESSAGE,
//   validate: (value: string) => validateCheck(value, 'NAME'),
// }

// export const phoneValidation = {
//   required: REQUIRED_MESSAGE,
//   validate: (value: string) => validateCheck(value, 'PHONE')
// }
