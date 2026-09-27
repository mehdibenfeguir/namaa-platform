export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function sar(n: number, compact = false): string {
  if (compact && Math.abs(n) >= 1000) {
    if (Math.abs(n) >= 1e9) return `SAR ${(n / 1e9).toFixed(1)}B`
    if (Math.abs(n) >= 1e6) return `SAR ${(n / 1e6).toFixed(1)}M`
    return `SAR ${(n / 1e3).toFixed(1)}K`
  }
  return `SAR ${n.toLocaleString('en-US')}`
}

export function num(n: number, digits = 0): string {
  return n.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
}
