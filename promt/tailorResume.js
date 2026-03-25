export function tailorPrompt (data) {
  const prompt = `
  Optimize this resume content for the job:

  JOB: ${data.jobDescription}
  RESUME:
  Name: ${data.name}
  Title: ${data.jobTitle}
  ${data.showSummary ? `Summary: ${data.summary}` : ''}
Experience:${data
    .map(
      exp => `
  Company: ${exp.company}
  Role: ${exp.jobTitle}
  Location: ${exp.location || 'Not specified'} 
  Dates: ${exp.startYear || '?'} - ${exp.endYear || 'Present'}
  Bullets: ${exp.points.map(p => `- ${p}`).join('\n')}
`
    )
    .join('\n')}
  Skills: ${data.skills.join(', ')}
  INSTRUCTIONS:
  1. Add metrics to achievements where possible
  2. Use stronger action verbs
  3. Highlight skills matching the job
  4. Keep the exact same structure
  5. Return ONLY the optimized content in JSON format
`

  return prompt
}
