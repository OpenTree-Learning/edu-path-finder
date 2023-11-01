import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'



export interface IconsState {
    icons: Record<string, IconDefinition>
}

const initialState: IconsState = {
    icons: {}
}

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    loadIcons: (state: IconsState, action: PayloadAction<void>) => {
        let allIcons = {...fas, ...far}

        console.log({allIcons})

        state.icons = allIcons 
    }
  }
})

export const {
    loadIcons
} = icons.actions

export default icons.reducer