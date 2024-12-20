import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "./ui/button";

import http from "axios";
import Spinner from "./Spinner";

type SubscribePopupProps = {
  children: ReactNode;
};

const SubscribePopup = ({ children }: SubscribePopupProps) => {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [dailyAmount, setDailyAmount] = useState("10");

  const [loading, setLoading] = useState(false);

  const handleRequestEmailValidate = async () => {
    setLoading(false);

    try {
      const res = await http.post("/api/subscribe", {
        email,
        categories,
        dailyAmount,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>구독하기</DialogTitle>
          <DialogDescription>
            매일매일 JLPT 단어 문제를 메일로 받아보세요!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="font-bold">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled={loading}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="올바른 이메일을 입력해 주세요."
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <Label htmlFor="categories" className="font-bold">
                출제범위
              </Label>
              <sub className="text-gray-400">*복수 선택 가능</sub>
            </div>
            <ToggleGroup
              id="categories"
              type="multiple"
              variant="outline"
              size="lg"
              value={categories}
              disabled={loading}
              onValueChange={(value) => setCategories(value)}
              className="justify-start"
            >
              <ToggleGroupItem value="n5" aria-label="N5" className="font-bold">
                N5
              </ToggleGroupItem>
              <ToggleGroupItem value="n4" aria-label="N4" className="font-bold">
                N4
              </ToggleGroupItem>
              <ToggleGroupItem value="n3" aria-label="N3" className="font-bold">
                N3
              </ToggleGroupItem>
              <ToggleGroupItem value="n2" aria-label="N2" className="font-bold">
                N2
              </ToggleGroupItem>
              <ToggleGroupItem value="n1" aria-label="N1" className="font-bold">
                N1
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="daily_amount" className="font-bold">
              일일문항수
            </Label>
            <Input
              id="daily_amount"
              type="number"
              value={dailyAmount}
              disabled={loading}
              onChange={(event) => setDailyAmount(event.target.value)}
            />
          </div>
        </div>

        <Button
          size="lg"
          disabled={loading || !email || !categories.length || !dailyAmount}
          onClick={handleRequestEmailValidate}
        >
          {loading ? <Spinner /> : "구독"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribePopup;
