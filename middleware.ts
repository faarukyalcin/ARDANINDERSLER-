import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
export async function middleware(req: NextRequest) {
 let res=NextResponse.next({request:req});
 const sb=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>req.cookies.getAll(),setAll(cs){cs.forEach(c=>req.cookies.set(c.name,c.value));res=NextResponse.next({request:req});cs.forEach(c=>res.cookies.set(c.name,c.value,c.options));}}});
 const {data:{user}}=await sb.auth.getUser(); const pub=req.nextUrl.pathname==="/login" || req.nextUrl.pathname==="/auth/callback";
 if(!user&&!pub){const u=req.nextUrl.clone();u.pathname="/login";u.searchParams.set("next",req.nextUrl.pathname);return NextResponse.redirect(u);}
 if(user&&pub){const u=req.nextUrl.clone();u.pathname="/";return NextResponse.redirect(u);} return res;
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};