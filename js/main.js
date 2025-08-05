// ============================
// 카테고리 스크롤
// ============================
function initCategoryScrollEvents() {
    const categoryWrapper = document.getElementById('category-scroll');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');

    if (!categoryWrapper || !leftBtn || !rightBtn) return;

    function updateButtons() {
        leftBtn.classList.toggle("d-none", categoryWrapper.scrollLeft <= 0);
        rightBtn.classList.toggle(
            "d-none",
            categoryWrapper.scrollLeft + categoryWrapper.offsetWidth >= categoryWrapper.scrollWidth - 5
        );
    }

    rightBtn.addEventListener("click", () => categoryWrapper.scrollBy({ left: 200, behavior: "smooth" }));
    leftBtn.addEventListener("click", () => categoryWrapper.scrollBy({ left: -200, behavior: "smooth" }));
    categoryWrapper.addEventListener("scroll", updateButtons);

    window.addEventListener("resize", updateButtons);
    updateButtons();
}

// ============================
// 비디오 카드 렌더링 (메인 전용)
// ============================
function renderVideoCards(videoData) {
    const row = document.querySelector(".row");
    if (!row) return;

    row.innerHTML = "";
    const fragment = document.createDocumentFragment();

    const baseURL = window.location.hostname.includes("localhost")
        ? "pages/video.html"
        : "https://vocochoe.github.io/youtube-clone-fe/pages/video.html";

    videoData.forEach(video => {
        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 col-sm-12 mb-5";

        col.innerHTML = `
        <div class="video-card" data-id="${video.id}" role="button">
            <div class="thumbnail-wrapper position-relative mb-3">
                <img src="${video.thumbnail}" class="img-fluid thumbnail" alt="썸네일">
                <video class="preview-video position-absolute top-0 start-0 w-100 h-100" muted loop preload="metadata">
                    <source src="${video.preview}" type="video/mp4">
                </video>
                <div class="progress-bg"><div class="progress-fill"></div></div>
                <span class="video-duration badge bg-dark position-absolute bottom-0 end-0 m-1">${video.duration}</span>
            </div>
            <div class="d-flex mt-2 align-items-start mb-3">
                <img src="${video.profile}" class="channel-icon me-2" alt="채널 이미지">
                <div class="video-info flex-grow-1">
                    <p class="video-title text-white mb-1">${video.title}</p>
                    <p class="video-meta text-secondary small mb-0">${video.channel}</p>
                    <p class="video-meta text-secondary small mb-0">조회수 ${video.views} · ${video.uploaded}</p>
                </div>
                <div class="menu-wrapper position-relative">
                    <i class="bi bi-three-dots-vertical text-white fs-6 menu-toggle" role="button"></i>
                    <ul class="video-menu text-white p-2 rounded shadow-sm position-absolute d-none">
                        <li class="dropdown-item">현재 재생목록에 추가</li>
                        <li class="dropdown-item">나중에 볼 동영상에 저장</li>
                        <li class="dropdown-item">오프라인 저장</li>
                        <li class="dropdown-item">공유</li>
                        <li class="dropdown-item text-danger">신고</li>
                    </ul>
                </div>
            </div>
        </div>
        `;

        fragment.appendChild(col);


        col.querySelector(".video-card").addEventListener("click", () => {
            window.location.href = `${baseURL}?videoId=${video.id}`;
        });
    });

    row.appendChild(fragment);
    initThumbnailPreview();
}

// ============================
// 썸네일 미리보기 재생
// ============================
function initThumbnailPreview() {
    document.querySelectorAll(".video-card").forEach(card => {
        const video = card.querySelector(".preview-video");
        if (!video) return;

        card.addEventListener("mouseenter", () => {
            video.currentTime = 0;
            video.play();
        });

        card.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// ============================
// 카테고리 렌더링
// ============================
function renderCategoryBar(categories) {
    const wrapper = document.getElementById("category-scroll");
    if (!wrapper) return;

    wrapper.innerHTML = "";
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `btn px-3 py-1 ${cat.active ? "btn-light" : "btn-dark-grey text-white"} rounded`;
        btn.textContent = cat.name;
        wrapper.appendChild(btn);
    });
}

function handleSearch(keyword) {
    const row = document.querySelector(".row");

    const filtered = videoDataList.filter(video =>
        video.title.toLowerCase().includes(keyword) ||
        video.channel.toLowerCase().includes(keyword) ||
        video.description.toLowerCase().includes(keyword)
    );

    renderVideoCards(filtered);

    if (filtered.length === 0) {
        row.innerHTML = `
            <div class="col-12 text-center text-secondary mt-5">
                검색 결과가 없습니다.
            </div>
        `;
    }
}

// ============================
// 초기 실행 (메인 페이지 전용)
// ============================
window.addEventListener('DOMContentLoaded', () => {
    initCategoryScrollEvents();
    renderCategoryBar(categoryList);
    renderVideoCards(videoDataList);
});
