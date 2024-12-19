"use client";

import { useToast } from "@/hooks/use-toast";
import { useCopyToClipboard } from "react-use";

const EMAIL = "like.gecko1@gmail.com";

const Footer = () => {
  const { toast } = useToast();
  const [state, copy] = useCopyToClipboard();

  const copyEmail = () => {
    copy(EMAIL);
    toast({
      title: "이메일이 복사 되었습니다.",
      description: state.value ?? "",
    });
  };

  return (
    <footer className="flex items-center justify-center h-[150px] w-full bg-gray-200">
      <div className="h-full flex flex-col w-full max-w-[900px] p-4 sm:flex-row">
        <div className="flex flex-col justify-center h-full">
          <span className="text-sm text-gray-500">
            Copyright © 2025, Daily JLPT. All rights reserved.
          </span>
          <span
            className="text-sm text-gray-500 font-bold cursor-pointer"
            onClick={copyEmail}
          >
            {EMAIL}
          </span>
        </div>
        <div className="text-gray-500 text-sm">이것저것</div>
      </div>
    </footer>
  );
};

export default Footer;
