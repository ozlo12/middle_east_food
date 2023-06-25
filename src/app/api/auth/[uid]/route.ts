import { NextResponse } from "next/server";
import { adminModule } from "@/container/ServerContainer";
export async function GET(
  req: Request,
  { params: { uid } }: { params: { uid: string } }
) {
  const { authManager } = adminModule;

  try {
    const result = await authManager.authAdmin(uid);
    return NextResponse.json({ admin: result }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 401 });
  }
}
