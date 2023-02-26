type SubmitAuthFormType = {
  sendData: Record<string, string>;
  errorMessages: Record<string, string>;
  pageType: "Sign-in" | "Sign-up";
};

export function submitAuthForm(props: SubmitAuthFormType): void {
  for (const error in props.errorMessages) {
    if (props.errorMessages[error].length) return;
  }

  for (const data in props.sendData) {
    if (!props.sendData[data].length) return;
  }

  console.log(props.sendData);
}
