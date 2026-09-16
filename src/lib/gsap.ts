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

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, MorphSVGPlugin, CustomEase);

CustomEase.create('tooltip', '0.50, 0.00, 0.05, 1.00');
CustomEase.create('branding', '0.00, 0.00, 0.10, 1.00');
CustomEase.create('latestCase', '0.785, 0.135, 0.150, 0.860');
CustomEase.create('popup', '0.34, 0.00, 0.30, 1.00');

export { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin, MorphSVGPlugin };
