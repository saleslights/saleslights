import { useId } from 'react';
import '../../app/services-art.css';

/* Open knowledge becomes connected work: a lit, folded porcelain folio,
   with its binding continuing through three low material planes.
   Original static sculpture. Explanatory copy belongs in the page's HTML. */
export default function AITrainingStudy({ className = '' }) {
  const id = `sl-training-${useId().replace(/:/g, '')}`;
  const paint = (name) => `url(#${id}-${name})`;
  return (
    <svg className={`sl-service-study sl-training-study ${className}`} viewBox="0 0 800 680" width="800" height="680" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-left`} x1="184" y1="234" x2="412" y2="471" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset=".46" stopColor="#F5F2EA" />
          <stop offset=".8" stopColor="#E5DFD0" />
          <stop offset="1" stopColor="#C9BEA3" />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="409" y1="361" x2="574" y2="333" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BDB298" />
          <stop offset=".16" stopColor="#E7DEC1" />
          <stop offset=".48" stopColor="#F7F2D7" />
          <stop offset="1" stopColor="#FFFEF8" />
        </linearGradient>
        <linearGradient id={`${id}-back`} x1="299" y1="167" x2="428" y2="435" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset=".57" stopColor="#E9E3D5" />
          <stop offset="1" stopColor="#C6BA9F" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="200" y1="260" x2="439" y2="534" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DBD3C3" />
          <stop offset=".6" stopColor="#B4A78D" />
          <stop offset="1" stopColor="#DED3AE" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="383" y1="221" x2="434" y2="510" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDE3" />
          <stop offset=".38" stopColor="#F4EDA6" />
          <stop offset="1" stopColor="#E5D87B" />
        </linearGradient>
        <linearGradient id={`${id}-plane`} x1="360" y1="459" x2="565" y2="558" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF6" />
          <stop offset=".5" stopColor="#F7F3E0" />
          <stop offset="1" stopColor="#E6DECB" />
        </linearGradient>
        <linearGradient id={`${id}-foot`} x1="350" y1="535" x2="365" y2="580" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBF9F0" />
          <stop offset="1" stopColor="#CEC4B0" />
        </linearGradient>
        <radialGradient id={`${id}-reflection`}>
          <stop stopColor="#F4EDA6" stopOpacity=".56" />
          <stop offset="1" stopColor="#F4EDA6" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-ground`} x="-35%" y="-200%" width="170%" height="500%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`${id}-contact`} x="-30%" y="-160%" width="160%" height="420%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Offset shadows anchor the object, leaving the upper field quiet. */}
      <ellipse cx="429" cy="575" rx="213" ry="18" fill="#4B3F29" opacity=".13" filter={paint('ground')} />
      <ellipse cx="409" cy="561" rx="153" ry="10" fill="#4B3F29" opacity=".13" filter={paint('contact')} />
      <path d="M221 541C243 519 368 508 483 524C563 535 597 552 572 566C533 589 354 589 264 569C235 562 220 553 221 541Z" fill={paint('foot')} />
      <path d="M221 541C247 520 371 512 484 526C554 535 590 547 571 556C528 575 357 577 267 558C240 552 224 546 221 541Z" fill="#F8F5EC" />
      <ellipse cx="424" cy="541" rx="133" ry="24" fill={paint('reflection')} />

      {/* A lifted rear leaf shows the thickness and the luminous binding. */}
      <path d="M290 165C334 178 365 202 391 238L433 501L408 528L296 446Z" fill={paint('edge')} />
      <path d="M281 164C326 175 358 200 383 237L425 500L400 526L287 446Z" fill={paint('back')} />
      <path d="M281 164C326 175 358 200 383 237" fill="none" stroke="#FFFDF8" strokeWidth="1.6" />
      <path d="M383 237L394 236L438 499L425 516Z" fill={paint('light')} />
      <path d="M385 238L428 500" fill="none" stroke="#FFFEEA" strokeWidth="2" />

      {/* Two asymmetric leaves unfold into an open, light-catching valley. */}
      <path d="M195 239C261 240 336 274 385 322L421 526C353 485 291 486 224 483Z" fill={paint('edge')} />
      <path d="M184 238C251 239 326 273 375 321L411 529C343 489 280 490 213 486Z" fill={paint('left')} />
      <path d="M184 238C251 239 326 273 375 321" fill="none" stroke="#FFFDF8" strokeWidth="1.7" />
      <path d="M213 486C280 490 343 489 411 529L421 526" fill="none" stroke="#B8AB93" strokeWidth=".8" />
      <path d="M411 529L375 321C427 271 488 244 557 242L574 443C509 451 461 481 426 530Z" fill={paint('edge')} />
      <path d="M411 520L375 321C424 268 483 239 550 232L566 433C507 445 456 475 419 521Z" fill={paint('right')} />
      <path d="M375 321C424 268 483 239 550 232" fill="none" stroke="#FFFDF1" strokeWidth="1.7" />
      <path d="M550 232L566 433C507 445 456 475 419 521" fill="none" stroke="#CEC5B0" strokeWidth=".7" />
      <path d="M378 325L413 518" fill="none" stroke="#F4EDA6" strokeWidth="4" opacity=".7" />
      <path d="M375 322L411 520" fill="none" stroke="#FFFADE" strokeWidth="1.2" />

      {/* The binding carries outward into a small, connected sequence. */}
      <path d="M415 526C456 541 482 529 499 509S541 484 571 490S611 488 637 464" fill="none" stroke="#8D8054" strokeWidth="1" />
      <path d="M415 524C456 539 482 527 499 507S541 482 571 488S611 486 637 462" fill="none" stroke="#F4EDA6" strokeWidth="3" />
      <path d="M456 502L500 485L537 504L494 523L456 510Z" fill={paint('edge')} />
      <path d="M456 502L500 485L537 504L494 515Z" fill={paint('plane')} />
      <path d="M456 502L494 515L537 504" fill="none" stroke="#FFFDF3" strokeWidth="1" />
      <path d="M548 471L589 456L622 472L582 491L548 479Z" fill={paint('edge')} />
      <path d="M548 471L589 456L622 472L582 483Z" fill={paint('plane')} />
      <path d="M548 471L582 483L622 472" fill="none" stroke="#FFFDF3" strokeWidth="1" />
      <path d="M621 440L651 429L676 442L647 456L621 447Z" fill={paint('edge')} />
      <path d="M621 440L651 429L676 442L647 449Z" fill={paint('plane')} />
      <path d="M621 440L647 449L676 442" fill="none" stroke="#FFFDF3" strokeWidth="1" />
    </svg>
  );
}
