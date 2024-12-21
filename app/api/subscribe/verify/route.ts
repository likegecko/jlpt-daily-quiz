// app/api/verify/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "이메일과 인증 코드는 필수입니다." },
        { status: 400 }
      );
    }

    const verificationRef = collection(db, "verificationTemp");
    const q = query(verificationRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        {
          error:
            "유효하지 않은 인증 시도입니다. 인증 코드를 다시 요청해주세요.",
        },
        { status: 400 }
      );
    }

    const verificationDoc = querySnapshot.docs[0];
    const verificationData = verificationDoc.data();

    const now = Timestamp.now();
    if (now.toDate() > verificationData.expiredAt.toDate()) {
      await deleteDoc(verificationDoc.ref);

      return NextResponse.json(
        {
          error: "인증 코드가 만료되었습니다. 새로운 인증 코드를 요청해주세요.",
        },
        { status: 400 }
      );
    }

    if (verificationData.code !== code) {
      return NextResponse.json(
        { error: "잘못된 인증 코드입니다." },
        { status: 400 }
      );
    }

    await deleteDoc(verificationDoc.ref);

    return NextResponse.json(
      { message: "인증이 성공적으로 완료되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("인증 코드 확인 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
