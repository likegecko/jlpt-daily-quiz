/* eslint-disable */
// @ts-nocheck

import { NextResponse } from "next/server";
import { generateQuizByLevels } from "@/utils/generate-quiz";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import QuizTemplate from "@/components/QuizTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Subscriber {
  email: string;
  isActive: boolean;
  categories: Record<string, boolean>;
  dailyQuizCount: number;
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: "인증되지 않은 요청입니다." },
        { status: 401 }
      );
    }

    const subscribersRef = collection(db, "subscribers");
    const subscribersQuery = query(
      subscribersRef,
      where("isActive", "==", true)
    );

    const subscribersSnapshot = await getDocs(subscribersQuery);
    const subscribers: Subscriber[] = subscribersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Subscriber[];

    const results = {
      totalSubscribers: subscribers.length,
      successCount: 0,
      failedCount: 0,
      errors: [] as { email: string; error: string }[],
    };

    for (const subscriber of subscribers) {
      try {
        const questions = await generateQuizByLevels(
          subscriber.categories,
          subscriber.dailyQuizCount
        );

        await resend.emails.send({
          from: "JLPT 학습 메이트 <daily-jlpt@resend.dev>",
          to: subscriber.email,
          subject: `[JLPT 학습 메이트] ${new Date().toLocaleDateString(
            "ko-KR"
          )} 학습 문제`,
          react: QuizTemplate({
            words: questions,
            date: new Date(),
          }),
        });

        results.successCount += 1;
      } catch (error: unknown) {
        results.failedCount += 1;
        results.errors.push({
          email: subscriber.email,
          error: error?.message!,
        });
      }
    }

    return NextResponse.json(
      {
        message: "일일 퀴즈 발송이 완료되었습니다.",
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("일일 퀴즈 발송 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
