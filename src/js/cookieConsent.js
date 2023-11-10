// src/js/main.js
import {
  createPrivacyBox,
  togglePrivacyBoxDisplay
} from './cookieConsent/privacyBox';
import {
  hasCookieConsent,
  isConsentRejected,
  removeAllCookies,
  getConsentPreferences,
} from './cookieConsent/common';
import { executeScripts } from './cookieConsent/scripts';

import '../styles.scss';

const preferencesData = [
  {
    number: 1,
    topic: 'Essential Cookies',
    body: 'This type of cookie helps you access information and navigate the website. For the website to function normally and securely, you cannot disable these cookies.',
    required: true
  },
  {
    number: 2,
    topic: 'Analytical Cookies',
    body: 'These cookies enhance service efficiency by collecting statistical data about interests and behaviors on the website. This data is used to improve and develop the website to be better quality and more relevant.',
    required: false
  },
  // {
  //   number: 3,
  //   topic: 'Functional Cookies',
  //   body: 'These cookies help the website remember various settings you have configured and adapt to user behavior and satisfaction to facilitate your return visits to the website.',
  //   required: false
  // },
  // {
  //   number: 4,
  //   topic: 'Advertising Cookies',
  //   body: 'These cookies are generated from third-party website links to collect data on usage and the links that you have followed or visited, to understand your needs and to use in the improvement and development of the website, as well as to tailor advertising to your interests.',
  //   required: false
  // },
];

async function initCookieConsent(preferencesData) {
  if (!hasCookieConsent() && !isConsentRejected()) {
    removeAllCookies();
    document.body.insertBefore(createPrivacyBox(preferencesData), document.body.firstChild);
  } else {

    // hard code for GTag
    // TODO: make this part more dynamic
    if (localStorage.getItem('consent_checkbox_consent-preference-2') === 'true') {
      executeScripts();
    }
  }
}

initCookieConsent(preferencesData);

// export functions to use in website.
window.hasCookieConsent = hasCookieConsent;
window.isConsentRejected = isConsentRejected;
window.getConsentPreferences = getConsentPreferences;
window.togglePrivacyBoxDisplay = togglePrivacyBoxDisplay;
