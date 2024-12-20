import { ReactNode } from "react";
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

type SubscribePopupProps = {
  children: ReactNode;
};

const SubscribePopup = ({ children }: SubscribePopupProps) => {
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
              placeholder="올바른 이메일을 입력해 주세요."
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <Label htmlFor="levels" className="font-bold">
                출제범위
              </Label>
              <sub className="text-gray-400">*복수 선택 가능</sub>
            </div>
            <ToggleGroup
              type="multiple"
              variant="outline"
              size="lg"
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
            <Input id="daily_amount" type="number" />
          </div>
        </div>

        <Button size="lg">구독</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribePopup;
