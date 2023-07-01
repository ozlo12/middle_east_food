import { NextResponse } from "next/server";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import { credential } from "firebase-admin";

async function isAdmin(uid: string) {
  const stringServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!stringServiceAccount)
    throw new Error("Service account variable not exist!");

  const serviceAccount = JSON.parse(stringServiceAccount);

  const app =
    getApps()[0] ||
    initializeApp({
      // credential: applicationDefault(),
      credential: credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    });

  const auth = getAuth(app);
  const user = await auth.getUser(uid);

  if (!user) return false;

  if (user.customClaims?.["admin"]) return true;

  const db = getDatabase(app);

  const adminRef = db.ref("/admins/" + uid);

  const isAdmin = (await adminRef.get()).exists();

  if (isAdmin) {
    auth.setCustomUserClaims(uid, { admin: true });
    return true;
  }

  return false;
}

export async function GET(
  req: Request,
  { params: { uid } }: { params: { uid: string } }
) {
  try {
    const result = await isAdmin(uid);
    return NextResponse.json({ isAdmin: result }, { status: 200 });
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : err },
      { status: 401 }
    );
  }
}
