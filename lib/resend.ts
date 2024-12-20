import { Resend } from "resend";
import VerificationTemplate from "../components/VerificationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "JLPT 학습 메이트 <daily-jlpt@resend.dev>",
      to: email,
      subject: "[JLPT 학습 메이트] 이메일 인증 코드입니다",
      react: VerificationTemplate({ code }),
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("이메일 발송 실패:", error);
    throw error;
  }
}
