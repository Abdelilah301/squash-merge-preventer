function isMasterBranch() {
  const target = document.querySelector(
    ".merge-branch-selector .css-truncate-target, " +
      ".commit-ref .css-truncate-target",
  );
  return target?.textContent.trim() === "master";
}

function isDevelopBranch() {
  const target = document.querySelector(
    ".merge-branch-selector .css-truncate-target, " +
      ".commit-ref .css-truncate-target",
  );
  return target?.textContent.trim() === "develop";
}

function disableMerge() {
  if (!isDevelopBranch()) return;

  const buttons = Array.from(document.querySelectorAll("button"));
  for (const btn of buttons) {
    const text = btn.innerText.trim();
    const aria = btn.getAttribute("aria-label") || "";
    if (text === "Merge pull request" || aria.includes("Merge pull request")) {
      btn.disabled = true;
      btn.style.opacity = "0.4";
      btn.title = "Blocked on develop branch";
    }
  }
}

function disableSquash() {
  if (!isMasterBranch()) return;

  const buttons = Array.from(document.querySelectorAll("button"));
  for (const btn of buttons) {
    const text = btn.innerText.trim();
    const aria = btn.getAttribute("aria-label") || "";
    if (text === "Squash and merge" || aria.includes("Squash and merge")) {
      btn.disabled = true;
      btn.style.opacity = "0.4";
      btn.title = "Blocked on master branch";
      location.reload();
    }
  }
}

const squashObserver = new MutationObserver(disableSquash);
squashObserver.observe(document.body, { childList: true, subtree: true });

const mergeObserver = new MutationObserver(disableMerge);
mergeObserver.observe(document.body, { childList: true, subtree: true });

disableSquash();
disableMerge();
