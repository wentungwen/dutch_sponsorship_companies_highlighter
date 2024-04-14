import data from "../data/data.json";

const highlightClassName = ".job-card-container__primary-description";

// Function to highlight matching elements
function highlightElements(sponsorData) {
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
  highlightElements(data);
});

// Observe mutations to the document
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      debouncedHighlightElements(data);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

