// Fonction pour détecter si la branche cible est "master"
function isMasterBranch() {
  // GitHub met souvent le nom de la branche cible dans un <span class="css-truncate-target">
  const target = document.querySelector(
    ".merge-branch-selector .css-truncate-target, " +
      ".commit-ref .css-truncate-target",
  );
  return target?.textContent.trim() === "master";
}

// Désactive tous les boutons "Squash and merge"
function disableSquash() {
  if (!isMasterBranch()) return;

  // Parcourt tous les boutons et cible ceux qui correspondent
  const buttons = Array.from(document.querySelectorAll("button"));
  for (const btn of buttons) {
    const text = btn.innerText.trim();
    const aria = btn.getAttribute("aria-label") || "";
    if (text === "Squash and merge" || aria.includes("Squash and merge")) {
      btn.disabled = true;
      btn.style.opacity = "0.4";
      btn.title = "Blocked on master branch";
    }
  }
}

// Observe les changements du DOM pour gérer les chargements dynamiques
const observer = new MutationObserver(disableSquash);
observer.observe(document.body, { childList: true, subtree: true });

// Exécution initiale
disableSquash();
