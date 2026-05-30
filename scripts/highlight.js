// Create the info 
(function () {
  // Create the banner element
  const banner = document.createElement("div");
  banner.id = "plugin-info";
  banner.style.cssText = `
    position: fixed;
    bottom: 5px;
    left: 5px;
    width: 300px;
    background-color: rgb(51, 51, 51);
    color: white;
    padding: 10px;
    box-shadow: 3px 7px 6px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-size: 12px;
    border-radius: 1rem;
    display: none;
  `;
  banner.innerHTML = `
      <b>Highlighter Info</b> <br> 
      <span>Welcome to use this highlighter plugin 😁 Here are some info you may want to know: <br><br>If the company registers different names in the <a style="color: #0bf0ff;" target="_blank" href="https://ind.nl/en/public-register-recognised-sponsors/public-register-regular-labour-and-highly-skilled-migrants">government list</a> and LinkedIn, it won’t be highlighted. The highlighted companies are very likely to provide VISAs, but others may also have some chances, especially large companies. <br>
      The source code is <a style="color: #0bf0ff;" target="_blank" href="https://github.com/wentungwen/dutch_sponsorship_companies_highlighter">here</a>. You may want to know the methodology.<br><br>
      Check carefully, and wish you good luck in job hunting 🥰🥰🥰</span>
  `;

  // Create the info text element
  const infoText = document.createElement("div");
  infoText.id = "info-text";
  infoText.style.cssText = `
    position: fixed;
    bottom: 5px;
    left: 5px;
    background-color: rgb(51, 51, 51);
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    z-index: 10000;
  `;
  infoText.innerText = `Info`;

  // Append elements to the body
  document.body.appendChild(infoText);
  document.body.appendChild(banner);

  infoText.addEventListener("mouseover", () => {
    banner.style.display = "block";
    infoText.style.display = "none";
  });

  banner.addEventListener("mouseleave", () => {
    banner.style.display = "none";
    infoText.style.display = "block";
  });
})();


function selectClassName() {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes("linkedin")) {
    return [
      ".job-card-list__entity-lockup .artdeco-entity-lockup__subtitle span",
      ".artdeco-entity-lockup__subtitle span",
      ".jobs-unified-top-card__company-name a",
      ".jobs-company__box .artdeco-entity-lockup__title",
    ].join(", ");
  } else if (hostname.includes("indeed")) {
    return '[data-testid="company-name"]';
  } else {
    return null;
  }
}

// Function to highlight matching elements
function highlightElements(sponsorData, highlightClassName) {
  const selectedData = document.querySelectorAll(highlightClassName);
  selectedData.forEach((element) => {
    const eleContent = element.textContent.trim().toLowerCase();
    if (!eleContent) return;

    const firstLetter = eleContent[0];
    if (!sponsorData[firstLetter]) return;

    sponsorData[firstLetter].forEach((sponsor) => {
      if (
        eleContent.includes(sponsor) ||
        sponsor.includes(eleContent) ||
        eleContent.includes("university")
      ) {
        element.style.backgroundColor = "yellow";
      }
    });
  });
}

function debounce(callback, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // execute the callback function after delay
      callback.apply(this, arguments);
    }, delay);
  };
}

const debouncedHighlightElements = debounce(highlightElements, 500);

function scheduleHighlight() {
  const className = selectClassName();
  if (className) {
    highlightElements(data, className);
  }
}

// Content scripts run at document_idle, after DOMContentLoaded — run immediately.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleHighlight);
} else {
  scheduleHighlight();
}

// Observe mutations to the document
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const className = selectClassName();
      if (className) {
        debouncedHighlightElements(data, className);
      }
      break;
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
