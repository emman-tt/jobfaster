import Default from './Default'
import LeftAligned from './LeftAlligned'
import TwoColumn from './TwoColumn'
import SkillsFirst from './SkillsFirst'
import Divided from './Divided'

export const TEMPLATES = {
  1: Default,
  2: LeftAligned,
  3: TwoColumn,
  4: SkillsFirst,
  5: Divided
}

export const LAYOUTS = [
  { id: 1, name: 'Chronological Standard', component: Default },
  { id: 2, name: 'Left-Aligned Distinctive', component: LeftAligned },
  { id: 3, name: 'Two-Column Compact', component: TwoColumn },
  { id: 4, name: 'Skills-First Layout', component: SkillsFirst },
  { id: 5, name: 'Section-Divided Format', component: Divided }
]
