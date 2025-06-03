import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"
import fs from "fs/promises"

// Allow longer execution time for AI processing
export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Generate unique ID for this request
    const requestId = Date.now().toString()

    // Create input file for Python script
    const inputPath = path.join(process.cwd(), "python_backend", "input", `${requestId}.json`)
    const outputPath = path.join(process.cwd(), "python_backend", "output", `${requestId}.json`)

    // Ensure directories exist
    await fs.mkdir(path.dirname(inputPath), { recursive: true })
    await fs.mkdir(path.dirname(outputPath), { recursive: true })

    // Write input data
    await fs.writeFile(
      inputPath,
      JSON.stringify({
        id: requestId,
        message: message,
        timestamp: new Date().toISOString(),
      }),
    )

    // Execute Python chatbot script
    const pythonProcess = spawn("python", [path.join(process.cwd(), "python_backend", "chatbot_api.py"), requestId])

    // Wait for Python script to complete
    await new Promise((resolve, reject) => {
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          resolve(code)
        } else {
          reject(new Error(`Python process exited with code ${code}`))
        }
      })

      pythonProcess.on("error", reject)

      // Timeout after 25 seconds
      setTimeout(() => {
        pythonProcess.kill()
        reject(new Error("Python process timeout"))
      }, 25000)
    })

    // Read the output
    const outputData = await fs.readFile(outputPath, "utf-8")
    const result = JSON.parse(outputData)

    // Clean up files
    await fs.unlink(inputPath).catch(() => {})
    await fs.unlink(outputPath).catch(() => {})

    return NextResponse.json({
      response: result.response,
      confidence: result.confidence || 0.8,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
