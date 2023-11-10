// src/js/common.js

// Function to create an element with specified attributes and content
export function createElement(tag, attributes, content) {
  const element = document.createElement(tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  if (content) {
    element.innerHTML = content;
  }
  return element;
}

// Check if the user has already provided consent via a cookie
export function hasCookieConsent() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'cookie_consent' && value === 'accepted') {
      return true;
    }
  }
  return false;
}

// Function to set the cookie_consent cookie when the user clicks "Accept"
export function setCookieConsent() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 180); // Expires in 180 days
  document.cookie = 'cookie_consent=accepted; expires=' + expirationDate.toUTCString() + '; path=/; SameSite=Strict';
}

// Function to set a flag in localStorage to mark consent as rejected
export function setRejectedConsent() {
  localStorage.setItem('cookie_consent', 'rejected');
}

// Function to check if consent has been rejected
export function isConsentRejected() {
  return localStorage.getItem('cookie_consent') === 'rejected';
}

// Set cookie expiration date to force remove
export function removeAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

// Get values from consent preferences checkboxes
export function getConsentPreferences() {
  const checkboxes = document.querySelectorAll('.consent-preference');
  const consents = {};

  checkboxes.forEach((checkbox) => {
    consents[checkbox.name] = checkbox.checked;
  });

  return consents;
}

// Set consent preferences in localstorage
// const consents =  {
//  "consent-preference-1": true,
//  "consent-preference-2": false,
//  ...
// }
export function setLocalConsentPreferences(consents) {
  const prefix = 'consent_checkbox_';

  for (const key in consents) {
    if (consents.hasOwnProperty(key)) {
      const localStorageKey = prefix + key;
      const localStorageValue = consents[key];
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageValue));
    }
  }
}

// Toggle display of element
export async function toggleDisplay(element, duration) {
  const currentDisplay = window.getComputedStyle(element).getPropertyValue('display');

  if (currentDisplay === 'none') {
    element.style.transition = `opacity ${duration}s`;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.opacity = '1';
    }, 0);
  } else {
    element.style.transition = `opacity ${duration}s`;
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.display = 'none';
    }, duration * 1000);
  }
}
