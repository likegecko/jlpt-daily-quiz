import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { sendVerificationEmail } from "@/lib/resend";

const VERIFICATION_EXPIRY_MINUTES = 10;

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function calculateExpiryTime(): Timestamp {
  const expiredAt = new Date();
  expiredAt.setMinutes(expiredAt.getMinutes() + VERIFICATION_EXPIRY_MINUTES);
  return Timestamp.fromDate(expiredAt);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "이메일은 필수입니다." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "유효하지 않은 이메일 형식입니다." },
        { status: 400 }
      );
    }

    const subscribersRef = collection(db, "subscribers");
    const q = query(subscribersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "이미 구독 중인 이메일입니다." },
        { status: 400 }
      );
    }

    const verificationRef = collection(db, "verificationTemp");
    const existingVerificationQuery = query(
      verificationRef,
      where("email", "==", email)
    );
    const existingVerification = await getDocs(existingVerificationQuery);

    if (!existingVerification.empty) {
      const doc = existingVerification.docs[0];
      const data = doc.data();
      const now = Timestamp.now();

      if (data.expiredAt.toDate() > now.toDate()) {
        return NextResponse.json(
          {
            error: "이미 발송된 인증 코드가 있습니다.",
            remainingMinutes: Math.ceil(
              (data.expiredAt.toDate().getTime() - now.toDate().getTime()) /
                (1000 * 60)
            ),
          },
          { status: 400 }
        );
      }
    }

    const verificationCode = generateVerificationCode();
    const expiredAt = calculateExpiryTime();

    await addDoc(verificationRef, {
      email,
      code: verificationCode,
      expiredAt,
      createdAt: Timestamp.now(),
    });

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      {
        message: "인증 코드가 발송되었습니다.",
        expiresIn: `${VERIFICATION_EXPIRY_MINUTES}분`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("구독 신청 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
