const galleryItems = [
  {
    id: 1,
    category: "characters",
    type: "Character Sprite",
    title: "판타지 캐릭터 도트 컨셉",
    description:
      "플레이어블 캐릭터와 주요 NPC에 적용할 수 있는 도트 컨셉과 실루엣 설계 중심 작업입니다.",
    specs: ["Aseprite", "캐릭터 컨셉", "플레이어블 스프라이트"],
    artClass: "art-characters",
  },
  {
    id: 2,
    category: "characters",
    type: "Monster Design",
    title: "몬스터 컨셉과 전투용 스프라이트",
    description:
      "판타지 세계관 속 몬스터의 성격을 도트로 정리하고, 전투에서 읽히는 움직임까지 고려한 작업입니다.",
    specs: ["몬스터 디자인", "전투 가독성", "도트 개성"],
    artClass: "art-characters",
  },
  {
    id: 3,
    category: "animations",
    type: "Combat Animation",
    title: "캐릭터 이펙트 애니메이션",
    description:
      "타격감과 리듬을 드러내는 액션용 도트 애니메이션. 게임 플레이 속도에 맞춘 프레임 설계를 강조합니다.",
    specs: ["전투 리듬", "이펙트 연출", "프레임 타이밍"],
    artClass: "art-animations",
  },
  {
    id: 4,
    category: "animations",
    type: "Cutscene Motion",
    title: "횡스크롤 컷신과 액션 연출",
    description:
      "게임잼과 학생 프로젝트에서 쌓은 컷신, 런 액션, 사이드뷰 연출 감각을 담는 구역입니다.",
    specs: ["사이드뷰 연출", "컷신 모션", "하이퍼캐주얼 템포"],
    artClass: "art-animations",
  },
  {
    id: 5,
    category: "environments",
    type: "Background Source",
    title: "CARE-i 배경 소스 제작",
    description:
      "심리치료 게임의 분위기를 해치지 않도록 차분한 색감과 정보량을 조절한 배경 작업입니다.",
    specs: ["배경 소스", "정서적 톤", "인게임 사용"],
    artClass: "art-environments",
  },
  {
    id: 6,
    category: "ui",
    type: "UI Graphic",
    title: "게임 UI와 아이콘 그래픽",
    description:
      "플레이 흐름을 끊지 않도록 읽히는 UI를 만들면서도, 도트 감각이 살아 있도록 정리한 작업 분류입니다.",
    specs: ["가독성", "HUD 그래픽", "아이콘 세트"],
    artClass: "art-ui",
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
    card.className = "portfolio-card";
    card.innerHTML = `
      <div class="portfolio-card__art ${item.artClass}" data-label="${item.type}"></div>
      <div class="portfolio-card__body">
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
