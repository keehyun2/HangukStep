const fs = require('node:fs')
const path = require('node:path')

const sourcePath = process.argv[2]
const outputPath = process.argv[3]
const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r/g, '')
const dayPattern = /^# Day\s+(\d+)\s+—\s+(.+)$/gm
const matches = [...source.matchAll(dayPattern)]

const notesByDay = {
  1: [
    '~입니다 adalah bentuk formal dan sopan dari "adalah", digunakan setelah kata benda.',
    '~는 adalah partikel topik setelah kata berakhiran vokal. Setelah konsonan gunakan ~은.',
    '~씨 adalah sapaan sopan setelah nama, mirip Saudara/Bapak/Ibu sesuai konteks.',
  ],
  2: ['저분 adalah bentuk hormat dari 저 사람. Gunakan saat menyebut orang yang perlu dihormati.'],
  3: ['무겁다 berarti berat.', '천만에요 berarti sama-sama.'],
  4: ['시험 문제 berarti soal ujian. 시험 adalah ujian dan 문제 adalah soal/masalah.'],
  6: [
    '빵 berarti roti, 우유 berarti susu, dan 사과 berarti apel.',
    'Angka Korea asli: 하나, 둘, 셋, 넷, 다섯, 여섯, 일곱, 여덟, 아홉, 열.',
    'Di depan kata bantu bilangan 개, 하나/둘/셋/넷 berubah menjadi 한 개/두 개/세 개/네 개.',
  ],
  7: [
    '형: kakak laki-laki yang dipanggil oleh laki-laki.',
    '오빠: kakak laki-laki yang dipanggil oleh perempuan.',
    '누나: kakak perempuan yang dipanggil oleh laki-laki.',
    '언니: kakak perempuan yang dipanggil oleh perempuan.',
  ],
  8: ['아침 berarti pagi/sarapan, 점심 berarti siang/makan siang, 저녁 berarti malam/makan malam.'],
  11: ['~에서 menandai tempat berlangsungnya suatu tindakan, misalnya 교실에서 공부해요.'],
}

const lessons = matches.map((match, index) => {
  const day = Number(match[1])
  const title = match[2].trim()
  const start = match.index + match[0].length
  const end = matches[index + 1]?.index ?? source.length
  const block = source.slice(start, end)
  const conversationMatch = block.match(/^## 대화\s+\d+\s*:\s*(.+)$/m)
  const conversationTitle = conversationMatch?.[1].trim() ?? '대화 연습'
  const afterTitle = conversationMatch
    ? block.slice(conversationMatch.index + conversationMatch[0].length)
    : block
  const lines = afterTitle.split('\n').map((line) => line.trim()).filter(Boolean)
  const dialogue = []

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const speakerMatch = lines[lineIndex].match(/^([AB])\s*:\s*(.+)$/)
    if (!speakerMatch) continue

    const translation = lines[lineIndex + 1]
    if (!translation || /^[AB]\s*:/.test(translation) || translation.startsWith('#')) {
      throw new Error(`Day ${day}: translation missing after "${lines[lineIndex]}"`)
    }

    dialogue.push({
      speaker: speakerMatch[1],
      korean: speakerMatch[2].trim(),
      indonesian: translation.trim(),
    })
    lineIndex += 1
  }

  if (!dialogue.length) throw new Error(`Day ${day}: no dialogue parsed`)

  return {
    day,
    title,
    conversationTitle,
    dialogue,
    notes: notesByDay[day] ?? [],
  }
})

const expectedDays = Array.from({ length: 40 }, (_, index) => index + 1)
  .filter((day) => day % 5 !== 0)
const actualDays = lessons.map((lesson) => lesson.day)
const missingDays = expectedDays.filter((day) => !actualDays.includes(day))

if (lessons.length !== 32 || missingDays.length) {
  throw new Error(JSON.stringify({ lessonCount: lessons.length, missingDays }))
}

const output = `export interface DialogueLine {
  speaker: string
  korean: string
  indonesian: string
}

export interface ExtraStudyLesson {
  day: number
  title: string
  conversationTitle: string
  dialogue: DialogueLine[]
  notes: string[]
}

export const extraStudyLessons: ExtraStudyLesson[] = ${JSON.stringify(lessons, null, 2)}
`

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, output, 'utf8')

for (const lesson of lessons) {
  console.log(`Day ${lesson.day}: ${lesson.dialogue.length} lines - ${lesson.conversationTitle}`)
}
console.log(`Generated ${lessons.length} extra-study lessons.`)
