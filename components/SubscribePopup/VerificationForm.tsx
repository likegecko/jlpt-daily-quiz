import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { useEffect, useState, useCallback } from "react";
import http from "axios";

type VerificationFormProps = {
  email: string;
  toNextStep: () => void;
  toPrevStep: () => void;
};

const CODE_LENGTH = 6;

const VerificationForm = ({
  email,
  toNextStep,
  toPrevStep,
}: VerificationFormProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleVerifyCode = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await http.post("/api/subscribe/verify", {
        email,
        code,
      });

      if (res.status === 200) {
        toNextStep();
      } else {
        setError(true);
        setCode("");
      }
    } catch (error) {
      console.error(error);
      if (http.isAxiosError(error)) {
        setError(true);
        setCode("");
      }
    }

    setLoading(false);
  }, [code, email, loading, toNextStep]);

  useEffect(() => {
    if (code.length === CODE_LENGTH && !loading) {
      handleVerifyCode();
    } else {
      if (error) {
        setError(false);
      }
    }
  }, [code, handleVerifyCode, loading, error]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>이메일 인증</DialogTitle>
        <DialogDescription>
          입력하신 이메일 {email}로
          <br />
          인증코드를 전달하였습니다.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-start min-h-[100px] pt-3">
          <Label htmlFor="code" className="font-bold">
            인증코드
          </Label>
          <InputOTP
            id="code"
            value={code}
            maxLength={CODE_LENGTH}
            pattern={""}
            onChange={(value) => setCode(value)}
            disabled={loading}
          >
            <InputOTPGroup>
              {Array(CODE_LENGTH)
                .fill(0)
                .map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={`${error ? "border-red-500" : ""} ${
                      loading ? "bg-gray-100" : ""
                    }`}
                  />
                ))}
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <span className="text-sm text-red-600">
              인증코드를 다시 확인해 주세요.
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            variant="ghost"
            onClick={toPrevStep}
            disabled={loading}
          >
            인증번호 재요청
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default VerificationForm;
