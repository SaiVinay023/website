// Utility functions for MyxoFlow application

// Date and Time Utilities
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(
    'en-US',
    options || {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  )
}

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date()
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

// String Utilities
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const truncate = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const camelToKebab = (text: string): string => {
  return text.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Number and Currency Utilities
export const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat('en-US', options).format(num)
}

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const abbreviateNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// Array and Object Utilities
export const groupBy = <T, K extends PropertyKey>(
  array: T[],
  key: (item: T) => K,
): Record<K, T[]> => {
  return array.reduce(
    (groups, item) => {
      const groupKey = key(item)
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
      return groups
    },
    {} as Record<K, T[]>,
  )
}

export const sortBy = <T>(
  array: T[],
  key: keyof T | ((item: T) => PropertyKey),
  direction: 'asc' | 'desc' = 'asc',
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = typeof key === 'function' ? key(a) : a[key]
    const bValue = typeof key === 'function' ? key(b) : b[key]

    const aComp = typeof aValue === 'symbol' ? aValue.toString() : aValue
    const bComp = typeof bValue === 'symbol' ? bValue.toString() : bValue

    if (aComp < bComp) return direction === 'asc' ? -1 : 1
    if (aComp > bComp) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export const unique = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) return [...new Set(array)]

  const seen = new Set()
  return array.filter((item) => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Validation Utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if we have at least 10 digits
  return digitsOnly.length >= 10;
}


export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateRequired = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return value !== null && value !== undefined
}

export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min
}

export const validateMaxLength = (value: string, max: number): boolean => {
  return value.length <= max
}

// DOM and Browser Utilities
export const scrollToElement = (elementId: string, offset = 0): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

export const getViewportWidth = (): number => {
  return window.innerWidth || document.documentElement.clientWidth
}

export const getViewportHeight = (): number => {
  return window.innerHeight || document.documentElement.clientHeight
}

export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= getViewportHeight() &&
    rect.right <= getViewportWidth()
  )
}

// Theme and Style Utilities
export const getCSSVariable = (variable: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

export const setCSSVariable = (variable: string, value: string): void => {
  document.documentElement.style.setProperty(variable, value)
}

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : null
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')}`
}

// Local Storage Utilities
export const getStorageItem = <T>(key: string, defaultValue: T | null = null): T | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch {
    return defaultValue
  }
}

export const setStorageItem = <T>(key: string, defaultValue: T | null = null): T | void => {
  try {
    localStorage.setItem(key, JSON.stringify(defaultValue))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error)
  }
}

// Debounce and Throttle
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// Error Handling
export const handleAsyncError = async <T>(
  promise: Promise<T>,
  errorMessage?: string,
): Promise<[T | null, Error | null]> => {
  try {
    const result = await promise
    return [result, null]
  } catch (error) {
    const err =
      error instanceof Error ? error : new Error(errorMessage || 'An unknown error occurred')
    return [null, err]
  }
}

export const createErrorHandler = (onError: (error: Error) => void) => {
  return <T extends (...args: unknown[]) => unknown>(func: T): T => {
    return ((...args: unknown[]) => {
      try {
        const result = func(...args)
        if (result instanceof Promise) {
          return result.catch(onError)
        }
        return result
      } catch (error) {
        onError(error instanceof Error ? error : new Error(String(error)))
      }
    }) as T
  }
}

// SEO and Meta Utilities
export const updatePageTitle = (title: string, siteName = 'MyxoFlow'): void => {
  document.title = `${title} - ${siteName}`
}

export const updateMetaDescription = (description: string): void => {
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
}

export const updateMetaKeywords = (keywords: string[]): void => {
  let meta = document.querySelector('meta[name="keywords"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'keywords')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', keywords.join(', '))
}

// Performance Utilities
export const measurePerformance = (name: string) => {
  const start = performance.now()
  return () => {
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return end - start
  }
}

export const lazy = <T>(factory: () => T): (() => T) => {
  let cached: T
  let hasValue = false
  return () => {
    if (!hasValue) {
      cached = factory()
      hasValue = true
    }
    return cached
  }
}

// Animation Utilities
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}
