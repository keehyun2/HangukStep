const fs = require('fs')

const [sourcePath, outputPath] = process.argv.slice(2)
if (!sourcePath || !outputPath) {
  throw new Error('Usage: node convert-vocabulary.cjs <source.md> <output.json>')
}

const indonesianTitles = {
  8: 'Kata Kerja 1',
  9: 'Kata Kerja 2',
  10: 'Emosi',
  11: 'Perasaan dan Kondisi',
  12: 'Hewan',
  13: 'Penyakit dan Gejala',
  14: 'Kondisi Alami Tubuh',
  15: 'Cinta dan Hubungan',
  16: 'Dapur dan Ruang Tamu',
  17: 'Kamar Tidur dan Kamar Mandi',
  18: 'Jalan dan Arah',
  19: 'Transportasi',
  20: 'Perusahaan',
  21: 'Sekolah',
  22: 'Kantor Pos',
  23: 'Rumah Sakit',
  24: 'Apotek',
  25: 'Bank',
}

const lines = fs.readFileSync(sourcePath, 'utf8').split(/\r?\n/)
const topics = []
const headingIndexes = lines.flatMap((line, index) => /^# \d+강\s+/.test(line.trim()) ? [index] : [])

function cleanBold(value) {
  return value.replace(/^\*\*/, '').replace(/\*\*$/, '').trim()
}

function parseExpressions(sectionLines, topicId) {
  const expressions = []
  let pending = null

  for (const rawLine of sectionLines) {
    const line = rawLine.trim()
    if (!line || line === '---') continue

    if (line.includes('→') && !line.startsWith('→')) {
      const [korean, meaning] = line.split('→').map((value) => value.trim())
      expressions.push({ korean: cleanBold(korean), pronunciation: '', meaning })
      pending = null
      continue
    }

    if (line.startsWith('→') && pending) {
      expressions.push({ ...pending, meaning: line.replace(/^→\s*/, '') })
      pending = null
      continue
    }

    if (!pending) pending = { korean: cleanBold(line), pronunciation: '' }
    else pending.pronunciation = cleanBold(line)
  }

  return expressions.map((expression, index) => ({
    id: `${topicId}-expression-${String(index + 1).padStart(2, '0')}`,
    ...expression,
  }))
}

function parseQuestions(sectionLines, topicId) {
  const starts = sectionLines.flatMap((line, index) => /^(?:###\s*)?\d+\.\s*/.test(line.trim()) ? [index] : [])
  return starts.flatMap((start, index) => {
    const end = starts[index + 1] ?? sectionLines.length
    const block = sectionLines.slice(start, end).map((line) => line.trim()).filter((line) => line && line !== '---')
    const first = block[0].replace(/^(?:###\s*)?\d+\.\s*/, '').trim()
    let prompt = first
    if (!prompt) prompt = block.slice(1).find((line) => !/^\*\*Hint:/.test(line) && !/^[①②③④]/.test(line) && !/^\*\*정답:/.test(line)) || ''

    const hintIndex = block.findIndex((line) => /^\*\*Hint:/.test(line))
    let hint = ''
    if (hintIndex >= 0) {
      hint = block[hintIndex].replace(/^\*\*Hint:\*\*\s*/, '').trim()
      if (!hint) hint = block[hintIndex + 1] || ''
    }

    const answerLine = block.find((line) => /^\*\*정답:/.test(line)) || ''
    const answerMatch = answerLine.match(/[①②③④]/)
    const optionText = block
      .filter((line) => line.includes('①') && !/^\*\*정답:/.test(line) || /^[②③④]/.test(line))
      .join(' ')
    const options = [...optionText.matchAll(/([①②③④])\s*([^①②③④]+?)(?=\s*[①②③④]|$)/g)]
      .map((match) => match[2].trim())
    const symbols = ['①', '②', '③', '④']
    const correctIndex = answerMatch ? symbols.indexOf(answerMatch[0]) : -1

    if (!prompt || options.length !== 4 || correctIndex < 0) return []
    return [{
      id: `${topicId}-question-${String(index + 1).padStart(2, '0')}`,
      prompt,
      hint,
      options,
      correctIndex,
    }]
  })
}

for (let topicIndex = 0; topicIndex < headingIndexes.length; topicIndex += 1) {
  const start = headingIndexes[topicIndex]
  const end = headingIndexes[topicIndex + 1] ?? lines.findIndex((line, index) => index > start && line.startsWith('# 문제 번역 공통 원칙'))
  const chunk = lines.slice(start, end > start ? end : lines.length)
  const heading = chunk[0].trim().match(/^# (\d+)강\s+(.+?)(?:\s+—\s+(.+))?$/)
  if (!heading) continue

  const lessonNumber = Number(heading[1])
  const topicId = `topic-${String(lessonNumber).padStart(2, '0')}`
  const expressionIndex = chunk.findIndex((line) => /^##\s+(자주 쓰는 표현|자주 쓰는 문장|표현)/.test(line.trim()))
  const questionIndex = chunk.findIndex((line) => line.trim() === '## 문제')
  const topic = {
    id: topicId,
    lessonNumber,
    titleKorean: heading[2].trim(),
    titleIndonesian: heading[3]?.trim() || indonesianTitles[lessonNumber] || heading[2].trim(),
    words: [],
    expressions: parseExpressions(chunk.slice(expressionIndex + 1, questionIndex), topicId),
    questions: parseQuestions(chunk.slice(questionIndex + 1), topicId),
  }

  for (const line of chunk.slice(1, expressionIndex)) {
    if (!line.includes('|')) continue
    const columns = line.split('|').map((value) => value.trim()).filter(Boolean)
    if (columns.length < 3 || columns[0] === '한국어' || /^-+$/.test(columns[0])) continue
    const order = topic.words.length + 1
    topic.words.push({
      id: `${topic.id}-word-${String(order).padStart(3, '0')}`,
      korean: columns[0],
      pronunciation: columns[1],
      meaning: columns.slice(2).join(' | '),
    })
  }
  topics.push(topic)
}

fs.writeFileSync(outputPath, `${JSON.stringify(topics, null, 2)}\n`, 'utf8')
console.log(`Converted ${topics.length} topics, ${topics.reduce((sum, item) => sum + item.words.length, 0)} words, ${topics.reduce((sum, item) => sum + item.expressions.length, 0)} expressions, and ${topics.reduce((sum, item) => sum + item.questions.length, 0)} questions.`)
