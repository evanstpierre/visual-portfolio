import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import info from '@/lib/info.json'; 


const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Replace with your secret

const sampleHomeData = {

    name: "Carrie Bradshaw",
    footer: "New York, NY",
    contact:{
        title:"Contact",
        address:"evanlstpierre@gmail.com",
        subject:"I couldn’t help but wonder…"
    },
    resume:{
        title:"Resume",
        href:"" 
        
    },

}

export async function GET(req: NextRequest) {
    const data =sampleHomeData;
    return NextResponse.json({data});
}