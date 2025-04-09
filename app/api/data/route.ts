import { NextRequest, NextResponse } from "next/server";
import info from '@/lib/info.json'; 


export async function GET(req: NextRequest) {
    const data =info;
    return NextResponse.json({data});
}