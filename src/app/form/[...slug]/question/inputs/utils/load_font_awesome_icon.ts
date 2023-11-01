'use client'


import { 
  IconDefinition,
  IconPrefix
} from '@fortawesome/fontawesome-svg-core';

import { store } from 'store';
import { loadIcons } from 'store/features/icons'



type IconPackage = 'fa-regular' | 'fa-solid'


export const iconPrefixes: Record<string, IconPrefix> = {
    far: 'far',
    fas: 'fas'
}

export const iconPackages: Record<string, IconPackage> = {
  'fa-regular': 'fa-regular',
  'fa-solid': 'fa-solid'
}

// @ts-ignore
export const prefixPackageMap: Record<IconPackage, IconPrefix> = {
  [iconPackages['fa-regular']]: iconPrefixes.far,
  [iconPackages['fa-solid']]: iconPrefixes.fas
}

export const getIconShortName = (iconName: string): string => {
  const re = /[a-z]*-[a-z]* [a-z]*-([a-z-]*)/
  const match = iconName.match(re) as string []


  return match[1] as string
}

async function loadFontAwesomeIcon(iconString: string): Promise<IconDefinition | null> {

  const state = store.getState()
  const icons = state.persistedIconsReducer.icons

  if (Object.keys(icons).length == 0) {
    store.dispatch(loadIcons())
  }

  const re = /fa-([a-z]*) fa-([a-z-]*)/
  const match = iconString.match(re) as string []
  const [_, __, name] = match

  const iconNameCamel = `${name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())}`
  const iconProperty = `fa${iconNameCamel.charAt(0).toUpperCase()}${iconNameCamel.substring(1)}`

  return icons[iconProperty]

}

export default loadFontAwesomeIcon