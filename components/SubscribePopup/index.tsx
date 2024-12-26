import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SubscribeForm from "./SubscribeForm";
import VerificationForm from "./VerificationForm";
import Success from "./Success";
import { Button } from "@/components/ui/button";

const SubscribePopup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("test@test.com");
  const [categories, setCategories] = useState<string[]>([]);
  const [dailyAmount, setDailyAmount] = useState<number>(10);

  const [open, setOpen] = useState(false);

  const toNextStep = () => {
    setStep(step + 1);
  };

  const toPrevStep = () => {
    setStep(step - 1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="lg" className="rounded-full font-bold">
          무료 구독하기
        </Button>
      </DialogTrigger>
      {step === 1 && (
        <SubscribeForm
          onSubmit={(
            email: string,
            categories: string[],
            dailyAmount: number
          ) => {
            setEmail(email);
            setCategories(categories);
            setDailyAmount(dailyAmount);
            toNextStep();
          }}
        />
      )}
      {step === 2 && (
        <VerificationForm
          email={email}
          categories={categories}
          dailyAmount={dailyAmount}
          toNextStep={toNextStep}
          toPrevStep={toPrevStep}
        />
      )}
      {step === 3 && <Success onClosePopup={() => setOpen(false)} />}
    </Dialog>
  );
};

export default SubscribePopup;
