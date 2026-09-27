import type { ReactNode } from 'react'
import { cx } from '../lib/format'

export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cx(
        'rounded-[var(--radius-xl2)] border border-emerald-900/10 bg-white card-shadow',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function PageHeader({
  kicker,
  title,
  description,
  icon,
  actions,
}: {
  kicker?: string
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-leaf-600 to-leaf-800 text-white shadow-lg shadow-leaf-700/25">
            {icon}
          </div>
        )}
        <div>
          {kicker && (
            <div className="text-xs font-semibold uppercase tracking-wider text-leaf-700">
              {kicker}
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-emerald-900/60">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

const toneMap: Record<string, string> = {
  leaf: 'bg-leaf-50 text-leaf-800 ring-leaf-700/20',
  solar: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  water: 'bg-cyan-50 text-cyan-800 ring-cyan-600/20',
  sand: 'bg-orange-50 text-orange-800 ring-orange-600/20',
  amber: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  rose: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  slate: 'bg-stone-100 text-stone-600 ring-stone-500/20',
}

export function Badge({
  children,
  tone = 'slate',
  className,
}: {
  children: ReactNode
  tone?: keyof typeof toneMap
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Button({
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  size = 'md',
}: {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline' | 'solar'
  size?: 'sm' | 'md'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const variants: Record<string, string> = {
    primary:
      'bg-leaf-700 text-white hover:bg-leaf-800 shadow-sm shadow-leaf-800/25',
    solar: 'bg-solar-500 text-emerald-950 hover:bg-solar-400 shadow-sm',
    outline:
      'border border-emerald-900/15 bg-white text-emerald-900 hover:bg-leaf-50',
    ghost: 'text-emerald-800 hover:bg-leaf-50',
  }
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Progress({
  value,
  tone = 'leaf',
  className,
}: {
  value: number
  tone?: 'leaf' | 'solar' | 'water'
  className?: string
}) {
  const bar: Record<string, string> = {
    leaf: 'bg-leaf-600',
    solar: 'bg-solar-500',
    water: 'bg-water-500',
  }
  return (
    <div className={cx('h-2 w-full overflow-hidden rounded-full bg-stone-100', className)}>
      <div
        className={cx('h-full rounded-full', bar[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function Sparkline({
  data,
  color = '#16a34a',
  width = 120,
  height = 36,
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const points = data
    .map((d, i) => `${i * step},${height - ((d - min) / range) * (height - 4) - 2}`)
    .join(' ')
  const areaPoints = `0,${height} ${points} ${width},${height}`
  const id = `sp-${color.replace('#', '')}`
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
