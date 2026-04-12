"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

// This route previously had a misplaced contact form.
// Since About is a section on the homepage, redirect there.
export default function AboutPage() {
    useEffect(() => {
        redirect("/#about");
    }, []);

    return null;
}
