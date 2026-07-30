const initials = [
  'g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp',
  's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h',
]

const vowels = [
  'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o',
  'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu',
  'eu', 'ui', 'i',
]

const finals = [
  '', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm',
  'l', 'l', 'l', 'l', 'l', 'm', 'p', 'p', 't', 't', 'ng',
  't', 't', 'k', 't', 'p', 'h',
]

const wordOverrides: Record<string, string> = {
  씻다: 'ssit-tta',
  듣다: 'deut-tta',
  읽다: 'ik-tta',
  좋다: 'jota',
  괜찮다: 'gwaenchanta',
  낫다: 'nat-tta',
  같이: 'gachi',
}

function romanizeSyllable(character: string) {
  const code = character.charCodeAt(0) - 0xac00
  if (code < 0 || code > 11171) return character

  const initialIndex = Math.floor(code / 588)
  const vowelIndex = Math.floor((code % 588) / 28)
  const finalIndex = code % 28

  return `${initials[initialIndex]}${vowels[vowelIndex]}${finals[finalIndex]}`
}

export function romanizeKorean(value: string) {
  const override = wordOverrides[value]
  if (override) return override

  return Array.from(value)
    .map(romanizeSyllable)
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}
