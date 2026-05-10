const galleryItems = [
  {
    id: 1,
    category: "characters",
    type: "Character Sprite",
    title: "Frontline Duelist",
    description:
      "플레이어블 캐릭터의 기본 이동, 대기, 공격 감각을 보여주는 대표 슬롯입니다.",
    specs: ["64 x 64", "8-direction concept", "Aseprite workflow"],
    artClass: "art-characters",
  },
  {
    id: 2,
    category: "animations",
    type: "Combat Animation",
    title: "Heavy Slash Sequence",
    description:
      "프레임 타이밍과 타격 연출을 강조하는 전투 애니메이션 샘플 자리입니다.",
    specs: ["12 frames", "Impact timing", "GIF or spritesheet"],
    artClass: "art-animations",
  },
  {
    id: 3,
    category: "environments",
    type: "Environment Tileset",
    title: "Forest Ruin Kit",
    description:
      "맵 구성력과 반복 타일 처리 감각을 보여주는 환경 아트 섹션용 샘플입니다.",
    specs: ["32 x 32 tiles", "Modular kit", "Top-down map use"],
    artClass: "art-environments",
  },
  {
    id: 4,
    category: "ui",
    type: "UI Icon Set",
    title: "Battle HUD Icons",
    description:
      "가독성을 유지하면서 도트 감성을 살린 UI 아이콘 세트 위치입니다.",
    specs: ["24 icons", "Status readability", "In-game HUD"],
    artClass: "art-ui",
  },
  {
    id: 5,
    category: "characters",
    type: "NPC Portrait",
    title: "Guild Keeper",
    description:
      "픽셀 인물성과 표정 설계 능력을 보여줄 수 있는 보조 캐릭터 슬롯입니다.",
    specs: ["Portrait crop", "Dialogue-ready", "Warm palette"],
    artClass: "art-characters",
  },
  {
    id: 6,
    category: "animations",
    type: "FX Animation",
    title: "Arcane Burst",
    description:
      "이펙트 밀도와 색감 설계를 보여주기 좋은 마법 연출용 더미 카드입니다.",
    specs: ["Looping FX", "Additive feel", "Skill VFX sample"],
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
