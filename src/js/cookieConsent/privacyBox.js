// src/js/privacyBox.js
import {
  createElement,
  setCookieConsent,
  setRejectedConsent,
  getConsentPreferences,
  setLocalConsentPreferences,
  toggleDisplay,
 } from './common';
import { executeScripts } from './scripts';

const PRIVACY_POLICY_URL = process.env.PRIVACY_POLICY_URL;

// Function to create the privacy-box container
export function createPrivacyBox(preferencesData) {
  window.privacyBox = {
    preferenceDisplay: 0
  };

  const privacyBox = createElement('div', {
    class: 'privacy-box',
  });

  const cookieHeader = createElement('p', {
    class: 'cookie-header',
  }, createCookieIcon() + '<span> We use Cookies</span>');

  // Custom cookie icon
  function createCookieIcon() {
    return `🍪`;
  }

  // Custom Privacy link
  function getPrivacyLink() {
    return PRIVACY_POLICY_URL;
  }

  function getPrivacyContent() {
    const privacyLink = getPrivacyLink();

    let content = `
      This website stores your data to improve the website's performance and enhance your browsing experience.
    `;

    if (privacyLink) {
      content += `
        Please review our <a href="${privacyLink}" target="_blank" rel="noopener noreferrer">Privacy Policy</a> before using the website.
      `;
    }

    return createElement('p', {
      class: 'body',
    }, content);
  }

  // Usage
  const bodyContent = getPrivacyContent();

  const toggleCheckbox = createElement('input', {
    type: 'checkbox',
    id: 'togglePreferences',
    class: 'toggle-checkbox',
  });

  const preferencesContainer = createElement('div', {
    class: 'preferences',
  });

  preferencesData.forEach((data) => {
    const preference = createPreferenceElement(
      data.number,
      data.topic,
      data.body,
      data.required
    );

    preferencesContainer.appendChild(preference);
  });

  const buttonsContainer = createElement('div', {
    class: 'privacy-buttons',
  });

  const acceptButton = createElement('a', {
    class: 'privacy-button positive',
    id: 'accept',
  }, 'Accept');

  const rejectButton = createElement('a', {
    class: 'privacy-button negative',
    id: 'reject',
  }, 'Reject All');

  acceptButton.addEventListener('click', function () {
    // Set a consent cookie with an expiration date (30 days)
    setCookieConsent();

    // Set consent preferences in localstorage
    const consents = getConsentPreferences();
    setLocalConsentPreferences(consents);

    // Execute scripts to initialize cookie-related activities
    // Temporary hard code for GTag
    // TODO: make this part more dynamic
    if (consents["consent-preference-2"]) {
      executeScripts();
    }

    // Hide the privacy-box container after consent is given
    privacyBox.style.display = 'none';
  });

  rejectButton.addEventListener('click', function () {
    // Set a flag in localStorage to mark consent as rejected
    setRejectedConsent();

    // Hide the privacy-box container after consent is rejected
    privacyBox.style.display = 'none';
  });

  const toggleLabel = createElement('label', {
    for: 'togglePreferences',
    class: 'privacy-button toggle-button',
  });

  const checkedSpan = createElement('span', {
    class: 'checked',
  }, 'Save Settings');

  const uncheckedSpan = createElement('span', {
    class: 'unchecked',
  }, 'Settings');

  toggleLabel.appendChild(checkedSpan);
  toggleLabel.appendChild(uncheckedSpan);

  buttonsContainer.appendChild(acceptButton);
  buttonsContainer.appendChild(rejectButton);
  buttonsContainer.appendChild(toggleLabel);

  privacyBox.appendChild(cookieHeader);
  privacyBox.appendChild(bodyContent);
  privacyBox.appendChild(toggleCheckbox);
  privacyBox.appendChild(preferencesContainer);
  privacyBox.appendChild(buttonsContainer);

  return privacyBox;
}

// Function to create a preference element
function createPreferenceElement(number, topic, body, required) {
  const preference = createElement('div', {
    class: 'preference',
  });

  let displayRadio = createElement('input', {
    type: 'radio',
    class: 'display-preference-content',
    name: 'preference-consent-options',
    value: number,
    id: `display-preference-content-${number}`,
  });

  // if (required) {
  //   displayRadio.setAttribute('checked', 'true');
  // }

  displayRadio.addEventListener('click', function () {
    if (displayRadio.value == window.privacyBox.preferenceDisplay) {
      displayRadio.checked = false;
      window.privacyBox.preferenceDisplay = 0;
    } else {
      window.privacyBox.preferenceDisplay = displayRadio.value
    }
  });

  const topicElement = createElement('div', {
    class: 'topic',
  });

  const heading = createElement('span', {
    class: 'heading',
  });

  const switchLabel = createElement('label', {
    class: `switch ${required ? 'required' : ''}`,
    for: `display-preference-content-${number}`,
  }, topic);

  // Create the consentCheckbox structure
  let consentCheckboxContainer;

  if (required) {
    consentCheckboxContainer = createElement('span', {
      class: 'required-consent',
    }, "Always active");

    const consentInput = createElement('input', {
      type: 'hidden',
      class: 'consent-preference',
      id: `consent-preference-${number}`,
      name: `consent-preference-${number}`,
      checked: 'checked',
    });

    consentCheckboxContainer.appendChild(consentInput)
  } else {
    consentCheckboxContainer = createElement('div', {
      class: 'toggle-checked',
    });

    const consentLabel = createElement('label', {
      class: 'switch',
      for: `consent-preference-${number}`,
    });

    const consentInput = createElement('input', {
      type: 'checkbox',
      class: 'consent-preference',
      id: `consent-preference-${number}`,
      name: `consent-preference-${number}`,
    });

    const slider = createElement('div', {
      class: 'slider round',
    });

    consentLabel.appendChild(consentInput);
    consentLabel.appendChild(slider);

    consentCheckboxContainer.appendChild(consentLabel)
  }

  const arrow = createElement('span', {}, '&#8963;');

  const arrowLabel = createElement('label', {
    class: 'arrow',
    for: `display-preference-content-${number}`,
  });
  arrowLabel.appendChild(arrow);

  heading.appendChild(switchLabel);
  heading.appendChild(consentCheckboxContainer);
  heading.appendChild(arrowLabel);

  preference.appendChild(displayRadio);
  preference.appendChild(topicElement);
  topicElement.appendChild(heading);

  // Add the content for the preference element
  const content = createElement('div', {
    class: 'content',
  }, body);

  preference.appendChild(content);

  return preference;
}

export async function togglePrivacyBoxDisplay(){
  const privacyBox = document.querySelector(".privacy-box");

  await toggleDisplay(privacyBox, 0.3);
}

