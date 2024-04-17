import data from "../data/data";

const url = "Linkedin";

function selectClassName() {
  const hostname = windows.location.hostname.toLowerCase();

  if (hostname.includes("linkedin")) {
    return ".job-card-container__primary-description";
  } else if (hostname.includes("indeed")) {
    return '[data-testid="company-name"]';
  } else {
    return;
  }
}

// Function to highlight matching elements
function highlightElements(sponsorData, highlightClassName) {
  const selectedData = document.querySelectorAll(highlightClassName);
  selectedData.forEach((element) => {
    const eleContent = element.textContent.trim().toLowerCase();
    const firstLetter = eleContent[0];

    if (sponsorData[firstLetter]) {
      sponsorData[firstLetter].forEach((target) => {
        if (eleContent.includes(target) || target.includes(eleContent)) {
          element.style.backgroundColor = "yellow";
        }
      });
    }
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

window.addEventListener("DOMContentLoaded", function () {
  highlightElements(data, selectClassName());
});

// Observe mutations to the document
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      debouncedHighlightElements(data, selectClassName());
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
