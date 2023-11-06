'use client'


import { 
  IconDefinition,
  IconPrefix
} from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'



type IconPackage = 'fa-regular' | 'fa-solid'


export const iconPrefixes: Record<string, IconPrefix> = {
    far: 'far',
    fas: 'fas'
}

export const iconPackages: Record<string, IconPackage> = {
  'fa-regular': 'fa-regular',
  'fa-solid': 'fa-solid'
}

export const prefixPackageMap: Record<IconPackage, IconPrefix> = {
  'fa-regular': iconPrefixes.far,
  'fa-solid': iconPrefixes.fas
}

export const getIconShortName = (iconName: string): string => {
  const re = /[a-z]*-[a-z]* [a-z]*-([a-z-]*)/
  const match = iconName.match(re) as string []

  return match[1] as string
}

function loadFontAwesomeIcon(iconString: string): IconDefinition | null {

  const icons = {...far, ...fas}

  const re = /fa-([a-z]*) fa-([a-z-]*)/
  const match = iconString.match(re) as string []
  const [_, __, name] = match

  const iconNameCamel = `${name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())}`
  const iconProperty = `fa${iconNameCamel.charAt(0).toUpperCase()}${iconNameCamel.substring(1)}`

  return icons[iconProperty]
}

export default loadFontAwesomeIcon