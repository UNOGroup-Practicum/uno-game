/* eslint-disable no-useless-escape */
const regExpValidate = {
  Login: /^(?=^.{3,20}$)((?=.*\d)|(?=.*\W?))(?![.\n])(?=.*[A-Za-z]).*$/,
  Password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/,
  Email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  Name: /^[A-ZА-ЯЁ]{1,}[-A-Za-zА-Яа-яЁё]{0,}$/,
  Phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
};

type ValidatePropsType = {
  value: string;
  type: string;
};

enum InputTypes {
  Login = "login",
  Password = "password",
}

export function validateForm(props: ValidatePropsType) {
  const { value, type } = props;
  const ErrorMessage = {
    Login: "",
    Password: "",
  };

  if (type === InputTypes.Login) {
    if (value.length === 0) {
      ErrorMessage.Login = "Логин не может быть пустым";
    } else if (value.length < 3) {
      ErrorMessage.Login = "Логин должен содержать не менее 3 символов";
    } else if (value.length > 20) {
      ErrorMessage.Login = "Логин должен содержать меньше 20 символов";
    } else if (!regExpValidate.Login.test(value)) {
      ErrorMessage.Login = "Логин не удовлетворяет требованиям";
    }
  }

  if (type === InputTypes.Password) {
    if (value.length === 0) {
      ErrorMessage.Password = "Пароль не может быть пустым";
    } else if (value.length < 8) {
      ErrorMessage.Password = "Пароль должен содержать больше 8 символов";
    } else if (value.length > 40) {
      ErrorMessage.Password = "Пароль должен содержать меньше 40 символов";
    } else if (!regExpValidate.Password.test(value)) {
      ErrorMessage.Password = "Пароль не удовлетворяет требованиям";
    }
  }

  return ErrorMessage;
}
