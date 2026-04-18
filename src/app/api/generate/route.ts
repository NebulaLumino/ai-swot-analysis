import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { inputs } = await req.json();

    const prompt = `You are an expert strategic business analyst. Generate a comprehensive, professional SWOT Analysis for the following company:

Company: ${inputs.company_name || "Not specified"}
Industry: ${inputs.industry || "Not specified"}
Product/Service: ${inputs.product_description || "Not specified"}

Strengths (provided):
${inputs.strengths || "Not specified"}

Weaknesses (provided):
${inputs.weaknesses || "Not specified"}

Opportunities (provided):
${inputs.opportunities || "Not specified"}

Threats (provided):
${inputs.threats || "Not specified"}

Please generate a detailed SWOT Analysis with:
1. A 4-quadrant visual SWOT matrix with 5-7 bullet points each
2. Strategic implications for each quadrant (what it means for the business)
3. Overall strategic recommendations based on the SWOT cross-analysis

Format the output professionally with clear headings and bullet points. Be specific and actionable.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `API error: ${response.status} - ${err}` }, { status: response.status });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "No output generated.";
    return NextResponse.json({ result });
  } catch (err: unknown) {
    console.error("SWOT generation error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
