document.addEventListener("DOMContentLoaded", function () {
  const portfolio = document.querySelector(".portfolio, .portfolio-internal");
  const works = document.querySelectorAll(".work");

  // Function to check if work is spanning multiple columns
  function isSpanningMultipleColumns(work) {
    // Check if this is the first child (which spans multiple columns on mobile)
    return work === portfolio.firstElementChild;
  }

  // Function to update active states
  function updateActiveStates() {
    // Only run on mobile
    if (window.innerWidth > 600) {
      works.forEach((work) => work.classList.remove("active"));
      return;
    }

    works.forEach((work) => {
      if (isSpanningMultipleColumns(work)) {
        work.classList.add("active");
      } else {
        work.classList.remove("active");
      }
    });
  }

  // Initial check
  updateActiveStates();

  // Click to reorder on mobile
  works.forEach((work) => {
    work.addEventListener("click", function (e) {
      // Don't interfere with link clicks
      if (e.target.closest("a") || window.innerWidth > 600) return;

      // Move to first position
      if (work !== portfolio.firstElementChild) {
        portfolio.insertBefore(work, portfolio.firstElementChild);
        updateActiveStates();
      }
    });
  });

  // Update on resize
  window.addEventListener("resize", updateActiveStates);
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const header = document.getElementById("header-menu");
  const dropdown = document.querySelector(".dropdown-content");
  const isMobile = window.innerWidth <= 740;

  // Apply backdrop filter ONLY to a pseudo-element, not to the header itself
  if (
    isMobile ||
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    // Apply styles to header (but NOT backdrop-filter)
    header.style.background = "rgba(154, 149, 132, 0.6)";
    header.style.boxShadow = isMobile
      ? "0 4px 30px rgba(154, 149, 132, 0.3)"
      : "0 4px 30px rgba(154, 149, 132, 0.1)";
    header.style.position = "sticky";
    header.style.backdropFilter = "none"; // No backdrop filter on header

    // Create or update backdrop element for header
    let headerBackdrop = header.querySelector(".header-backdrop");
    if (!headerBackdrop) {
      headerBackdrop = document.createElement("div");
      headerBackdrop.className = "header-backdrop";
      header.style.position = "relative";
      header.appendChild(headerBackdrop);
    }
    headerBackdrop.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(2px);
      background-color: transparent;
      z-index: -1;
      pointer-events: none;
    `;

    // Apply the same backdrop filter to dropdown
    if (dropdown) {
      dropdown.style.backdropFilter = "blur(2px)";
      dropdown.style.zIndex = "10000";
    }
  } else {
    // Remove styles when not scrolled
    header.style.background = "transparent";
    header.style.position = "relative";
    header.style.boxShadow = "none";
    header.style.backdropFilter = "none";

    // Remove backdrop element
    const headerBackdrop = header.querySelector(".header-backdrop");
    if (headerBackdrop) {
      headerBackdrop.remove();
    }

    // Remove backdrop filter from dropdown when not needed
    if (dropdown && !isMobile) {
      dropdown.style.backdropFilter = "none";
    }
  }
}

// Update ensureDropdownBackdrop to always match header
function ensureDropdownBackdrop() {
  const header = document.getElementById("header-menu");
  const dropdown = document.querySelector(".dropdown-content");
  const isMobile = window.innerWidth <= 740;

  // Always match dropdown to header styling
  if (
    dropdown &&
    (isMobile ||
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400)
  ) {
    dropdown.style.backdropFilter = "blur(2px)";
    dropdown.style.zIndex = "10000";
  }
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function openMenu() {
  var x = document.getElementById("mob-menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
