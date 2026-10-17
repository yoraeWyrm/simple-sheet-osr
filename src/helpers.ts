// Funções puras usadas pela seção de peso e pela imagem do personagem.

import type { DummySheetStats } from './types/sheet.type'

// Aceita vírgula ou ponto como separador decimal. Vazio, inválido ou negativo vale 0.
export function num(v: unknown): number {
  const n = parseFloat(String(v ?? '').trim().replace(',', '.'))
  return Number.isFinite(n) && n >= 0 ? n : 0
}

export function round(n: number): number {
  return Math.round(n * 1_000_000) / 1_000_000
}

export function fmt(n: number, locale?: string): string {
  return round(n).toLocaleString(locale, { maximumFractionDigits: 2 })
}

// Linha sem quantidade (por exemplo, importada de uma seção comum) conta como 1.
export function rowTotal(stat: DummySheetStats): number {
  const qty = stat.qty === undefined || stat.qty === null ? 1 : num(stat.qty)
  return qty * num(stat.value)
}

export function sectionTotal(stats: DummySheetStats[]): number {
  return round(stats.reduce((t, s) => t + rowTotal(s), 0))
}

// diff > 0: quanto passou do limite. diff < 0: quanto ainda cabe.
export function weightStatus(stats: DummySheetStats[], limitText: unknown) {
  const total = sectionTotal(stats)
  const limit = num(limitText)
  const diff = round(total - limit)
  return { total, limit, diff, over: limit > 0 && diff > 0 }
}

// Só aceita endereços http(s) para a imagem.
export function isHttpUrl(u: unknown): boolean {
  return typeof u === 'string' && /^https?:\/\/\S+$/i.test(u.trim())
}
