// ============================
// 사이드바 toggle 버튼
// ============================
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('side-bar');

menuBtn.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    const isMidSize = window.innerWidth <= 1450;
    const isOpen = sidebar.classList.contains('overlay') && sidebar.classList.contains('active');

    if (isMobile || isMidSize) {
        if (isOpen) {
            sidebar.classList.remove('active');
            sidebar.classList.remove('overlay');
            sidebar.classList.remove('mobile-open', 'mid-open');
            sidebar.classList.toggle('d-none', isMobile);
            sidebar.classList.toggle('collapsed', isMidSize && !isMobile);
        } else {
            sidebar.classList.remove('d-none', 'collapsed');
            sidebar.classList.add('overlay', 'active');
            sidebar.classList.toggle('mobile-open', isMobile);
            sidebar.classList.toggle('mid-open', isMidSize && !isMobile);
        }
    } else {
        sidebar.classList.toggle('collapsed');
    }
});

// ============================
// 카테고리 스크롤 관련
// ============================
const categoryBar = document.querySelector('.category-bar');
const categoryWrapper = document.getElementById('category-scroll');
const leftBtn = document.getElementById('scroll-left');
const rightBtn = document.getElementById('scroll-right');

function updateButtons() {
    leftBtn.classList.toggle("d-none", categoryWrapper.scrollLeft <= 0);
    rightBtn.classList.toggle("d-none", categoryWrapper.scrollLeft + categoryWrapper.offsetWidth >= categoryWrapper.scrollWidth - 5);
}

function initCategoryScrollEvents() {
    if (!categoryWrapper) return;
    rightBtn.addEventListener("click", () => categoryWrapper.scrollBy({ left: 200, behavior: "smooth" }));
    leftBtn.addEventListener("click", () => categoryWrapper.scrollBy({ left: -200, behavior: "smooth" }));
    categoryWrapper.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
}

// ============================
// 윈도우 리사이즈 시 사이드바 상태 초기화
// ============================
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isMidSize = window.innerWidth <= 1450;

    sidebar.classList.remove('overlay', 'active', 'mobile-open', 'mid-open');

    if (isMobile) {
        sidebar.classList.add('d-none');
        sidebar.classList.remove('collapsed');
    } else if (isMidSize) {
        sidebar.classList.remove('d-none');
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('d-none', 'collapsed');
    }
}

// ============================
// 비디오 카드 메뉴 열기/닫기
// ============================
document.addEventListener('click', function (e) {
    const isOverlayOpen = sidebar.classList.contains('overlay') && sidebar.classList.contains('active');
    const clickedOutside = !sidebar.contains(e.target) && !menuBtn.contains(e.target);

    // 사이드바 외부 클릭 시 닫기
    if (isOverlayOpen && clickedOutside) {
        sidebar.classList.remove('active');
        const isMobile = window.innerWidth <= 768;
        const isMidSize = window.innerWidth <= 1450;

        if (isMobile) {
            sidebar.classList.remove('overlay');
            sidebar.classList.add('d-none');
        } else if (isMidSize) {
            sidebar.classList.remove('overlay');
            sidebar.classList.add('collapsed');
        }
    }

    // 모든 비디오 메뉴 닫기
    document.querySelectorAll(".video-menu").forEach(menu => menu.classList.add("d-none"));

    // 해당 카드 메뉴 토글
    if (e.target.closest(".menu-toggle")) {
        const wrapper = e.target.closest(".menu-wrapper");
        const menu = wrapper.querySelector(".video-menu");
        menu.classList.toggle("d-none");
    }
});

// ============================
// 비디오 카드 동적 생성
// ============================
function renderVideoCards(videoData) {
    const row = document.querySelector(".row");
    if (!row) return;

    videoData.forEach(video => {
        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 col-sm-12 mb-5";

        col.innerHTML = `
        <div class="video-card">
            <div class="thumbnail-wrapper position-relative mb-3">
                <img src="${video.thumbnail}" class="img-fluid thumbnail" alt="썸네일">
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

        row.appendChild(col);
    });
}

// ============================
// 초기 실행
// ============================
window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', () => {
    handleResize();
    initCategoryScrollEvents();

    // ✅ 동영상 카드 렌더링
    renderVideoCards(videoDataList);
});