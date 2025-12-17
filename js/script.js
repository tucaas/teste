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
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    document.getElementById("header-menu").style.background =
      "rgba(154, 149, 132, 0.6)";
    document.getElementById("header-menu").style.boxShadow =
      "0 4px 30px rgba(154, 149, 132, 0.1)";
    document.getElementById("header-menu").style.backdropFilter = "blur(2px)";
    document.getElementById("header-menu").style.position = "sticky";
  } else {
    document.getElementById("header-menu").style.background = "transparent";
    document.getElementById("header-menu").style.position = "relative";
    document.getElementById("header-menu").style.boxShadow = "none";
    document.getElementById("hero").style.marginTop = "0";
  }
}
