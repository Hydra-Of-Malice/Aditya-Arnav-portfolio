/**
 * One place that registers every GSAP plugin and the four custom eases the
 * reference site uses, so components import from here and never re-register.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { prefersReducedMotion } from './device';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, MorphSVGPlugin, CustomEase);

CustomEase.create('tooltip', '0.50, 0.00, 0.05, 1.00');
CustomEase.create('branding', '0.00, 0.00, 0.10, 1.00');
CustomEase.create('latestCase', '0.785, 0.135, 0.150, 0.860');
CustomEase.create('popup', '0.34, 0.00, 0.30, 1.00');

/**
 * Reduced motion: run the global timeline fast enough that every time-based
 * entrance lands on its end state immediately. Elements still arrive in their
 * final position — they just stop travelling to get there. Scroll-scrubbed
 * reveals are progress-driven, so they follow the scroll either way; the
 * louder sources of motion (the WebGL scenes, the looping canvases and every
 * CSS keyframe loop) are switched off at their own call sites instead.
 */
if (prefersReducedMotion()) gsap.globalTimeline.timeScale(200);

export { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin, MorphSVGPlugin };
