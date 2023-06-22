import { NextResponse } from "next/server";
import { ServerContainer } from "@/container/ServerContainer";
import { FrebaseAdminAuthManager } from "@/services/firebase/auth/admin/admin-auth-manager";

const adminManger = ServerContainer.resolve(FrebaseAdminAuthManager);

export async function GET(
  req: Request,
  { params: { uid } }: { params: { uid: string } }
) {
  try {
    if (!uid) return NextResponse.json({ admin: false });
    const isAdmin = await adminManger.isAdmin(uid);
    return NextResponse.json({ admin: uid ? isAdmin : false });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ admin: false });
  }
  // return NextResponse.json({ admin: false });
}
