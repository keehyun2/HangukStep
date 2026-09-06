const fs = require('fs')
const path = require('path')

const [sourceDirectory, outputPath] = process.argv.slice(2)
if (!sourceDirectory || !outputPath) {
  throw new Error('Usage: node convert-grammar.cjs <source-directory> <output.json>')
}

function cleanMarkdown(value) {
  return value
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^[-*]\s+/, '')
    .trim()
}

function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return match ? match[1].replace(/^['"]|['"]$/g, '').trim() : ''
}

function parseExamples(lines) {
  const examples = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = cleanMarkdown(lines[index])
    if (!line) continue

    if (line.includes('→')) {
      const [korean, indonesian] = line.split('→').map((value) => value.trim())
      if (/[가-힣]/.test(korean) && indonesian) examples.push({ korean, indonesian })
      continue
    }

    const next = cleanMarkdown(lines[index + 1] || '')
    if (/[가-힣]/.test(line) && next.startsWith('→')) {
      examples.push({ korean: line, indonesian: next.replace(/^→\s*/, '') })
      index += 1
    }
  }
  return examples
}

const files = fs.readdirSync(sourceDirectory)
  .filter((name) => /^\d{2}-.*\.md$/i.test(name))
  .sort((a, b) => a.localeCompare(b, 'ko'))

const grammarItems = files.map((name) => {
  const content = fs.readFileSync(path.join(sourceDirectory, name), 'utf8')
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
  const frontmatter = frontmatterMatch?.[1] || ''
  const body = content.slice(frontmatterMatch?.[0].length || 0)
  const relevantBody = body.split('\n## TOPIK 기출 이력')[0]
  const koreanMarker = relevantBody.indexOf('**한국어 설명**')
  const indonesianMarker = relevantBody.indexOf('**Penjelasan Bahasa Indonesia**')
  const koreanBlock = relevantBody.slice(koreanMarker + '**한국어 설명**'.length, indonesianMarker).trim()
  const indonesianBlock = relevantBody.slice(indonesianMarker + '**Penjelasan Bahasa Indonesia**'.length).trim()
  const koreanLines = koreanBlock.split(/\r?\n/)
  const indonesianLines = indonesianBlock.split(/\r?\n/)
  const koreanExplanation = koreanLines
    .slice(0, Math.max(0, koreanLines.findIndex((line) => line.trim() === '예:')) || koreanLines.length)
    .map(cleanMarkdown).filter(Boolean).join('\n')
  const exampleStart = indonesianLines.findIndex((line, index) => {
    const current = cleanMarkdown(line)
    const next = cleanMarkdown(indonesianLines[index + 1] || '')
    return current.includes('→') || (/[가-힣]/.test(current) && next.startsWith('→'))
  })
  const explanationLines = exampleStart >= 0 ? indonesianLines.slice(0, exampleStart) : indonesianLines
  const explanation = explanationLines.map(cleanMarkdown).filter((line) => line && line !== 'Contoh:').join('\n\n')
  const title = frontmatterValue(frontmatter, 'title')
  const sequence = Number(frontmatterValue(frontmatter, 'sequence'))
  const epsLesson = Number(frontmatterValue(frontmatter, 'lesson'))

  const indonesianExamples = parseExamples(indonesianLines)
  const koreanExampleMarker = koreanLines.findIndex((line) => line.trim() === '예:')
  const koreanOnlyExamples = koreanExampleMarker >= 0
    ? koreanLines.slice(koreanExampleMarker + 1).map(cleanMarkdown).filter((line) => /[가-힣]/.test(line))
    : []
  const examples = [...indonesianExamples]
  for (const korean of koreanOnlyExamples) {
    if (!examples.some((example) => example.korean === korean)) examples.push({ korean, indonesian: '' })
  }

  return {
    id: `eps-grammar-${String(sequence).padStart(3, '0')}`,
    title,
    summary: explanation.split(/(?<=[.!?])\s+/)[0] || title,
    explanation,
    koreanExplanation,
    level: sequence <= 30 ? 'beginner' : 'intermediate',
    category: 'eps-topik',
    keywords: [title, 'EPS-TOPIK', `${epsLesson}과`],
    examples,
    epsLesson,
    sourceSequence: sequence,
    courseTags: ['eps-topik'],
  }
})

fs.writeFileSync(outputPath, `${JSON.stringify(grammarItems, null, 2)}\n`, 'utf8')
console.log(`Converted ${grammarItems.length} grammar entries.`)
