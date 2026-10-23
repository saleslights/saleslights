import { useId } from 'react';
import '../../app/art.css';

/* A curled porcelain shade, a paper-thin lip and a small pool of lemon light.
   Original static vector sculpture; no logo, product UI or external assets. */
export default function LampStudy({ className = '' }) {
  const id = `lamp-study-${useId().replace(/:/g, '')}`;
  const paint = (name) => `url(#${id}-${name})`;
  return (
    <svg className={`sl-lamp-study ${className}`} viewBox="0 0 880 760" width="880" height="760" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-face`} x1="270" y1="255" x2="540" y2="565" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEFDF8" />
          <stop offset=".28" stopColor="#F3F0E8" />
          <stop offset=".6" stopColor="#E4DECF" />
          <stop offset=".83" stopColor="#F4EFCF" />
          <stop offset="1" stopColor="#FBF9F0" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="320" y1="270" x2="540" y2="485" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8D0BF" />
          <stop offset=".36" stopColor="#B7AC97" />
          <stop offset=".7" stopColor="#E7DFC5" />
          <stop offset="1" stopColor="#D8CDA4" />
        </linearGradient>
        <linearGradient id={`${id}-inside`} x1="364" y1="220" x2="426" y2="562" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C6BBA5" />
          <stop offset=".45" stopColor="#E8E0CF" />
          <stop offset=".83" stopColor="#F1E9B4" />
          <stop offset="1" stopColor="#F8F5DD" />
        </linearGradient>
        <linearGradient id={`${id}-plinth`} x1="350" y1="565" x2="400" y2="629" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFEFA" />
          <stop offset=".52" stopColor="#F1EDE2" />
          <stop offset="1" stopColor="#D5CDBB" />
        </linearGradient>
        <linearGradient id={`${id}-lip`} x1="325" y1="559" x2="501" y2="603" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFBF4" />
          <stop offset=".52" stopColor="#F5F0D8" />
          <stop offset="1" stopColor="#C9BEA8" />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="34%" cy="27%" r="75%">
          <stop stopColor="#FFFEDE" />
          <stop offset=".48" stopColor="#F4EDA6" />
          <stop offset=".82" stopColor="#E7DB86" />
          <stop offset="1" stopColor="#C6BA77" />
        </radialGradient>
        <radialGradient id={`${id}-reflection`}>
          <stop stopColor="#F4EDA6" stopOpacity=".5" />
          <stop offset="1" stopColor="#F4EDA6" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-ground`} x="-40%" y="-180%" width="180%" height="460%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`${id}-contact`} x="-50%" y="-150%" width="200%" height="400%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* A grounded, uneven shadow rather than a halo around the silhouette. */}
      <ellipse cx="448" cy="626" rx="166" ry="19" fill="#4B3F29" opacity=".14" filter={paint('ground')} />
      <ellipse cx="431" cy="617" rx="110" ry="10" fill="#4B3F29" opacity=".12" filter={paint('contact')} />

      {/* Low oval foot. The rear rim stays visible through the open shade. */}
      <path d="M291 584C317 559 459 546 543 569C579 579 580 594 557 609C518 635 363 641 307 615C291 608 284 594 291 584Z" fill={paint('plinth')} />
      <path d="M291 584C316 561 459 548 543 569C574 577 579 589 557 600C515 622 361 625 309 603C296 598 290 592 291 584Z" fill="#F8F5EC" />
      <ellipse cx="437" cy="583" rx="108" ry="31" fill={paint('reflection')} />

      {/* Back and inner wall: displaced from the front to reveal thickness. */}
      <path d="M368 594C283 566 243 465 269 353C294 241 373 157 461 170C553 184 596 273 568 371C547 445 492 501 436 537L410 521C463 477 503 421 518 357C537 277 504 215 450 215C386 216 341 292 325 382C308 478 329 543 382 563Z" fill={paint('edge')} />
      <path d="M450 215C386 216 341 292 325 382C308 478 329 543 382 563L411 575C347 547 331 470 350 382C369 293 406 234 454 236C493 237 519 277 518 322C525 257 494 214 450 215Z" fill={paint('inside')} />

      {/* Broad ceramic face, softly lit from the upper left. */}
      <path d="M349 598C264 570 224 469 250 357C275 245 354 161 442 174C534 188 577 277 549 375C528 449 473 505 417 541L391 525C444 481 484 425 499 361C518 281 485 219 431 219C367 220 322 296 306 386C289 482 310 547 363 567Z" fill={paint('face')} />
      <path d="M349 598C264 570 224 469 250 357C275 245 354 161 442 174C496 182 534 218 550 264" fill="none" stroke="#FFFDF8" strokeWidth="1.7" strokeOpacity=".95" />
      <path d="M431 219C367 220 322 296 306 386C289 482 310 547 363 567" fill="none" stroke="#CFC6B4" strokeWidth="1" strokeOpacity=".65" />
      <path d="M417 541L436 537M349 598L368 594" fill="none" stroke="#B6AA91" strokeWidth=".8" />

      {/* The small lamp sits inside the curve, not in front of a logo. */}
      <ellipse cx="422" cy="567" rx="46" ry="10" fill="#756743" opacity=".16" filter={paint('contact')} />
      <circle cx="420" cy="523" r="43" fill={paint('light')} />
      <path d="M395 503C400 494 411 489 421 490" fill="none" stroke="#FFFFEC" strokeWidth="2.5" strokeLinecap="round" opacity=".7" />

      {/* A turned paper lip occludes the lamp's base and catches its reflection. */}
      <path d="M306 552C334 573 373 579 413 572C458 565 489 545 513 524C500 557 469 585 427 598C378 613 333 599 306 576Z" fill={paint('lip')} />
      <path d="M306 552C334 573 373 579 413 572C458 565 489 545 513 524" fill="none" stroke="#FFFEF2" strokeWidth="2" />
      <path d="M306 576C333 599 378 613 427 598C469 585 500 557 513 524" fill="none" stroke="#BCB198" strokeWidth=".65" strokeOpacity=".5" />
    </svg>
  );
}
