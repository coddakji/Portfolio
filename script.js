const galleryItems = [
  {
    id: 1,
    category: "characters",
    type: "Character Sprite",
    title: "판타지 세계관 캐릭터 컨셉",
    description:
      "Aseprite 기반 캐릭터 컨셉과 플레이어블 도트 작업을 대표하는 섹션입니다.",
    specs: ["64 x 64", "8-direction concept", "Aseprite workflow"],
    artClass: "art-characters",
  },
  {
    id: 2,
    category: "animations",
    type: "Combat Animation",
    title: "캐릭터 이펙트 애니메이션",
    description:
      "전투 리듬과 타격감을 드러내는 캐릭터 이펙트 및 액션 애니메이션 영역입니다.",
    specs: ["12 frames", "Combat timing", "GIF / spritesheet"],
    artClass: "art-animations",
  },
  {
    id: 3,
    category: "environments",
    type: "Environment Tileset",
    title: "CARE-i 배경 소스 제작",
    description:
      "심리치료 게임 프로젝트에서 제작한 인게임 배경 소스와 환경 그래픽을 정리하는 자리입니다.",
    specs: ["BG source", "In-game asset", "Simulation tone"],
    artClass: "art-environments",
  },
  {
    id: 4,
    category: "ui",
    type: "UI Icon Set",
    title: "게임 UI 그래픽",
    description:
      "게임 플레이 흐름을 해치지 않도록 가독성과 도트 감성을 함께 살린 UI 작업입니다.",
    specs: ["HUD asset", "Readable icon", "Game-facing UI"],
    artClass: "art-ui",
  },
  {
    id: 5,
    category: "characters",
    type: "NPC Portrait",
    title: "몬스터 디자인",
    description:
      "판타지 세계관 몬스터 컨셉과 도트 스프라이트 설계를 보여주는 작업 분류입니다.",
    specs: ["Monster concept", "Sprite design", "Fantasy setting"],
    artClass: "art-characters",
  },
  {
    id: 6,
    category: "animations",
    type: "FX Animation",
    title: "횡스크롤 액션 연출",
    description:
      "Ninja RUN, 오늘도 평화롭게 같은 프로젝트에서 드러난 액션 연출 감각을 담는 영역입니다.",
    specs: ["Side-scroll action", "Cutscene motion", "Hyper casual pace"],
    artClass: "art-animations",
  },
];

const galleryGrid = document.querySelector("#galleryGrid");
const filterButtons = document.querySelectorAll(".filter-chip");
const lightbox = document.querySelector("#lightbox");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxArt = document.querySelector("#lightboxArt");
const lightboxType = document.querySelector("#lightboxType");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxDesc = document.querySelector("#lightboxDesc");
const lightboxSpecs = document.querySelector("#lightboxSpecs");

function renderGallery(filter = "all") {
  const items =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  galleryGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.innerHTML = `
      <div class="gallery-card__art ${item.artClass}" data-label="${item.type}"></div>
      <div class="gallery-card__body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(item));
    galleryGrid.appendChild(card);
  });
}

function openLightbox(item) {
  lightboxArt.className = `lightbox__art ${item.artClass}`;
  lightboxType.textContent = item.type;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description;
  lightboxSpecs.innerHTML = item.specs.map((spec) => `<li>${spec}</li>`).join("");
  lightbox.showModal();
}

function setActiveFilter(nextFilter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === nextFilter);
  });
  renderGallery(nextFilter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) {
    lightbox.close();
  }
});

renderGallery();
