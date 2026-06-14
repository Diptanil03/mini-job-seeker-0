import { SKILL_DICTIONARY } from '../constants/skills';

export const analyzeJob = async (string) => {
  const lowerCaseText = string.toLowerCase()
  let matchSkills = {}

  SKILL_DICTIONARY.forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, 'g')
    const matches = lowerCaseText.match(regex)
    if (matches) {
      matchSkills[skill] = matches.length
    }
  })

  const sortedList = Object.entries(matchSkills).sort((a, b) => b[1] - a[1])
  return Object.fromEntries(sortedList)
}