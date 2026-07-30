const fs = require('node:fs')
const path = require('node:path')

const sourcePath = process.argv[2]
const outputPath = process.argv[3]
const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r/g, '')
const dayPattern = /Day\s+(\d+)\s+—/g
const matches = [...source.matchAll(dayPattern)]
const days = []

for (let index = 0; index < matches.length; index += 1) {
  const day = Number(matches[index][1])
  const start = matches[index].index + matches[index][0].length
  const end = matches[index + 1]?.index ?? source.length
  const block = source.slice(start, end).trim()
  const isReview = day % 5 === 0
  const titleEnd = block.search(isReview ? /Day\s+\d|의\s/ : /\s+번호\s+한국어/)
  const title = (titleEnd >= 0 ? block.slice(0, titleEnd) : block).trim()
  const entries = []

  if (!isReview) {
    const content = block.replace(/^.*?\s+번호\s+한국어\s+인도네시아어\s*/s, '')
    const entryPattern = /(?:^|\s)(\d{1,3})\s*(.+?)(?=\s+\d{1,3}\s*|$)/gs

    for (const match of content.matchAll(entryPattern)) {
      const number = Number(match[1])
      let value = match[2].trim().replace(/^—\s*/, '')
      const meaningStart = value.search(/[A-Za-z]/)

      if (meaningStart < 0) {
        throw new Error(`Day ${day}, word ${number}: Indonesian meaning not found in "${value}"`)
      }

      let korean = value.slice(0, meaningStart).trim().replace(/\s+—$/, '')
      let meaning = value.slice(meaningStart).trim()

      if (number === 173) {
        korean = '주다'
        meaning = 'memberi'
      }

      entries.push({ number, korean, meaning })
    }
  }

  days.push({ day, title, isReview, words: entries })
}

const allWords = days.flatMap((day) => day.words)
const numbers = allWords.map((word) => word.number)
const missing = Array.from({ length: 400 }, (_, index) => index + 1).filter((number) => !numbers.includes(number))
const duplicates = numbers.filter((number, index) => numbers.indexOf(number) !== index)

if (days.length !== 40 || allWords.length !== 400 || missing.length || duplicates.length) {
  throw new Error(JSON.stringify({ dayCount: days.length, wordCount: allWords.length, missing, duplicates }))
}

const output = `export interface VocabularyWord {
  number: number
  korean: string
  meaning: string
}

export interface CurriculumDay {
  day: number
  title: string
  isReview: boolean
  words: VocabularyWord[]
}

export const curriculum: CurriculumDay[] = ${JSON.stringify(days, null, 2)}

export function getWordsForDay(day: number): VocabularyWord[] {
  const lesson = curriculum.find((item) => item.day === day)
  if (!lesson) return []
  if (!lesson.isReview) return lesson.words

  const firstDay = day === 20 || day === 40 ? 1 : day - 4
  return curriculum
    .filter((item) => item.day >= firstDay && item.day < day && !item.isReview)
    .flatMap((item) => item.words)
}
`

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, output, 'utf8')

for (const day of days) {
  console.log(`Day ${day.day}: ${day.isReview ? 'review' : day.words.length} - ${day.title}`)
}
console.log(`Generated ${allWords.length} words across ${days.length} days.`)
