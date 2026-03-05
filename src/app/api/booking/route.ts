import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || 'fake_api_key_for_dev');

const bookingSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    projectType: z.string().min(2, "Project type is required"),
    dates: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters long"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = bookingSchema.parse(body);

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Booking Form <onboarding@resend.dev>',
            to: ['delivered@resend.dev'], // Use tested email or verified domain
            subject: `New Booking Request: ${validatedData.projectType} from ${validatedData.name}`,
            text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nProject Type: ${validatedData.projectType}\nDates: ${validatedData.dates || 'Not specified'}\nBudget: ${validatedData.budget || 'Not specified'}\n\nMessage:\n${validatedData.message}`,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Validation Failed", details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
