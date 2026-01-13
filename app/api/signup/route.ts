import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    // In a real application, you would:
    // 1. Validate the input data
    // 2. Check if the email is already registered
    // 3. Hash the password
    // 4. Store the user in your database
    // 5. Return the created user (without password)

    // For demo purposes, we'll just return a success response
    return NextResponse.json({
      success: true,
      user: {
        id: "user123",
        email,
        name,
        role,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create account" }, { status: 400 })
  }
}
