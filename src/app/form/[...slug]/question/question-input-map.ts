import { InputType } from '../../../../types/question'

import { Text, Number, Email } from './inputs/basic'
import Slider from './inputs/slider'
import Single from './inputs/single'
import Multi from './inputs/multi'
import SingleSuggestion from './inputs/single-suggestion'
import MultiSuggestion from './inputs/multi-suggestion/muti-suggestion'


export type InputTypeComponentMap = {
  [key in InputType]: React.ComponentType<any>
}

const inputTypeComponentMap: InputTypeComponentMap = {
  'text': Text,
  'number': Number,
  'email': Email,
  'slider': Slider,
  'single': Single,
  'single-suggestion': SingleSuggestion,
  'multi': Multi,
  'multi-suggestion': MultiSuggestion,
}

export default inputTypeComponentMap