// gtag.js

export function loadGTag(GTag) {

  // Create a new script element
  var script = document.createElement('script');

  // Set the script's source attribute to the URL of the script you want to load
  // Reference: https://developers.google.com/tag-platform/gtagjs/install
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTag}`;

  // Define a callback function to execute when the script has loaded
  script.onload = function () {
    // The script has loaded, you can now use its functionality
    // For example, you can call functions or set up configurations
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GTag);
    console.log("GA loaded");
  };

  // Append the script element to the <head> of the document
  document.head.appendChild(script);
}
