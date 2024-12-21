import { useWindowSize } from "react-use";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import Confetti from "react-confetti";

import { createPortal } from "react-dom";

type SuccessProps = {
  onClosePopup: () => void;
};

const ConfettiPortal = () => {
  const { width, height } = useWindowSize();

  return createPortal(
    <Confetti
      width={width}
      height={height}
      recycle
      style={{
        zIndex: 99,
      }}
    />,
    document.body
  );
};

const Success = ({ onClosePopup }: SuccessProps) => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>이메일 인증</DialogTitle>
          <DialogDescription>dd</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <Button onClick={onClosePopup}>확인</Button>
        </div>
        <ConfettiPortal />
      </DialogContent>
    </>
  );
};

export default Success;
