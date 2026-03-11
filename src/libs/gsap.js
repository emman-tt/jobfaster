import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { CSSPlugin } from 'gsap/CSSPlugin'


gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText, CSSPlugin)

export { gsap, ScrollToPlugin, ScrollTrigger, SplitText }
