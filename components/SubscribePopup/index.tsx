import { ReactNode, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SubscribeForm from "./SubscribeForm";
import VerificationForm from "./VerificationForm";
import Success from "./Success";

type SubscribePopupProps = {
  children: ReactNode;
};

const SubscribePopup = ({ children }: SubscribePopupProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("test@test.com");

  const toNextStep = () => {
    setStep(step + 1);
  };

  const toPrevStep = () => {
    setStep(step - 1);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {step === 1 && (
        <SubscribeForm
          onSubmit={(email: string) => {
            setEmail(email);
            toNextStep();
          }}
        />
      )}
      {step === 2 && (
        <VerificationForm
          email={email}
          toNextStep={toNextStep}
          toPrevStep={toPrevStep}
        />
      )}
      {step === 3 && <Success onClosePopup={() => {}} />}
    </Dialog>
  );
};

export default SubscribePopup;
