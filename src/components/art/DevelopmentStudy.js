import { useId } from 'react';
import '../../app/services-art.css';

/* One span, two complementary pieces: a curved exploratory form meets a
   precise structural form at an exposed stepped joint. Light passes through
   the shared assembly. This is abstract artwork, not a product or team photo. */
export default function DevelopmentStudy({ className = '' }) {
  const id = `sl-development-${useId().replace(/:/g, '')}`;
  const paint = (name) => `url(#${id}-${name})`;
  return (
    <svg className={`sl-service-study sl-development-study ${className}`} viewBox="0 0 800 680" width="800" height="680" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-curve`} x1="225" y1="246" x2="419" y2="486" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset=".35" stopColor="#F6F3EB" />
          <stop offset=".72" stopColor="#EAE5D7" />
          <stop offset="1" stopColor="#D5CBB5" />
        </linearGradient>
        <linearGradient id={`${id}-structure`} x1="438" y1="303" x2="575" y2="494" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFBF2" />
          <stop offset=".48" stopColor="#F2EEDC" />
          <stop offset="1" stopColor="#D8CEB6" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="315" y1="210" x2="602" y2="481" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4CCBC" />
          <stop offset=".45" stopColor="#E8E0C9" />
          <stop offset="1" stopColor="#BAAE93" />
        </linearGradient>
        <linearGradient id={`${id}-inside`} x1="262" y1="306" x2="395" y2="482" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B5A88C" />
          <stop offset=".56" stopColor="#DED5B8" />
          <stop offset="1" stopColor="#F4EDA6" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="440" y1="280" x2="528" y2="303" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#F1EAD8" />
        </linearGradient>
        <linearGradient id={`${id}-foot`} x1="350" y1="514" x2="366" y2="574" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEFCF6" />
          <stop offset=".45" stopColor="#F4F0E5" />
          <stop offset="1" stopColor="#CEC4AF" />
        </linearGradient>
        <radialGradient id={`${id}-idea`} cx="32%" cy="24%" r="78%">
          <stop stopColor="#FFFEDE" />
          <stop offset=".45" stopColor="#F4EDA6" />
          <stop offset=".82" stopColor="#E4D982" />
          <stop offset="1" stopColor="#C7B970" />
        </radialGradient>
        <radialGradient id={`${id}-reflection`}>
          <stop stopColor="#F4EDA6" stopOpacity=".6" />
          <stop offset="1" stopColor="#F4EDA6" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-ground`} x="-35%" y="-200%" width="170%" height="500%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`${id}-contact`} x="-40%" y="-150%" width="180%" height="400%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <ellipse cx="412" cy="568" rx="231" ry="18" fill="#4B3F29" opacity=".14" filter={paint('ground')} />
      <ellipse cx="399" cy="553" rx="172" ry="10" fill="#4B3F29" opacity=".1" filter={paint('contact')} />
      <path d="M159 532C170 507 330 490 498 508C610 520 659 540 630 558C590 582 357 586 228 562C181 553 159 543 159 532Z" fill={paint('foot')} />
      <path d="M159 532C177 510 333 495 498 511C601 521 650 535 630 547C582 570 358 573 229 550C186 543 165 536 159 532Z" fill="#F8F5EC" />
      <ellipse cx="316" cy="518" rx="94" ry="28" fill={paint('reflection')} />

      {/* Continuous rear depth, then the two separately shaped front faces. */}
      <path d="M237 489V329C237 253 277 208 339 208C392 208 423 234 451 280H607V489H559V326H426L402 285C387 260 365 248 342 248C304 248 280 277 280 329V489Z" fill={paint('edge')} />
      <path d="M248 509L280 489V329C280 277 304 248 342 248C365 248 387 260 402 285L426 326L394 346L370 305C355 280 333 268 310 268C272 268 248 297 248 349Z" fill={paint('inside')} />
      <path d="M441 300L473 280H607L575 300Z" fill={paint('top')} />
      <path d="M575 300L607 280V489L575 509Z" fill={paint('edge')} />
      <path d="M527 346L559 326V489L527 509Z" fill={paint('inside')} />

      {/* A stepped joint is intentional and visible, not two unrelated icons. */}
      <path d="M441 300H575V509H527V346H451V328H424V312H441Z" fill={paint('structure')} />
      <path d="M205 509V349C205 273 245 228 307 228C360 228 391 254 419 300H441V312H424V328H451V346H394L370 305C355 280 333 268 310 268C272 268 248 297 248 349V509Z" fill={paint('curve')} />
      <path d="M205 509V349C205 273 245 228 307 228C360 228 391 254 419 300H441" fill="none" stroke="#FFFDF8" strokeWidth="1.7" />
      <path d="M307 228L339 208" fill="none" stroke="#FFFDF8" strokeWidth=".8" strokeOpacity=".7" />
      <path d="M441 300V312H424V328H451V346" fill="none" stroke="#9E9277" strokeWidth="1" />
      <path d="M443 301V310H426" fill="none" stroke="#FFFEF3" strokeWidth=".9" />
      <path d="M248 509V349C248 297 272 268 310 268C333 268 355 280 370 305L394 346" fill="none" stroke="#BEB298" strokeWidth=".8" />
      <path d="M451 346H527V509" fill="none" stroke="#C6BAA0" strokeWidth=".8" />
      <path d="M441 300H575V509" fill="none" stroke="#FFFDF5" strokeWidth="1.2" />

      {/* Light lives inside the assembly and becomes an embedded working seam. */}
      <path d="M283 292C312 276 342 285 358 309L380 344" fill="none" stroke="#F4EDA6" strokeWidth="2" opacity=".72" />
      <path d="M455 336H538V493" fill="none" stroke="#9F9169" strokeWidth="3.6" />
      <path d="M455 335H539V492" fill="none" stroke="#F4EDA6" strokeWidth="2.3" />
      <path d="M455 334H540" fill="none" stroke="#FFFCE0" strokeWidth=".75" />
      <ellipse cx="321" cy="513" rx="43" ry="8" fill="#756743" opacity=".17" filter={paint('contact')} />
      <circle cx="316" cy="471" r="40" fill={paint('idea')} />
      <path d="M293 452C298 444 309 439 319 440" fill="none" stroke="#FFFFE9" strokeWidth="2.3" strokeLinecap="round" opacity=".8" />

      {/* Small contact edges keep both pieces visibly on the same foundation. */}
      <path d="M205 509L248 509L280 489M527 509H575L607 489" fill="none" stroke="#A99B80" strokeWidth=".8" />
    </svg>
  );
}
