// ============================
// 공통 레이아웃 로드 & 초기화
// ============================

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const { headerHtml, sidebarHtml } = await loadPartials(); // 별도 함수 사용

        // ===== 1. Header 삽입 =====
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.insertAdjacentHTML('beforebegin', headerHtml);
            headerPlaceholder.remove();
        }

        // ===== 2. Sidebar 삽입 =====
        const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
        if (sidebarPlaceholder) {
            sidebarPlaceholder.insertAdjacentHTML('beforebegin', sidebarHtml);
            sidebarPlaceholder.remove();
        }

        // 공통 이벤트 초기화
        initHeaderEvents();
        initSidebarEvents();
        handleResize();
        renderSubscriptions(subscriptionList);

        //window.addEventListener('resize', handleResize);
        initGlobalClickHandler(); // 외부 클릭 이벤트 (사이드바/프로필 메뉴/비디오 메뉴 닫기)
        initSearch();

        const params = new URLSearchParams(window.location.search);
        const keyword = params.get("search");

        if (keyword) {
            const input = document.querySelector(".search-form input");
            if (input) {
                input.value = keyword;
                if (typeof handleSearch === "function") {
                    handleSearch(keyword.toLowerCase());
                }
            }
        }

    } catch (err) {
        console.error("Layout load error:", err);
    }
});

// ============================
// Partial 로드 함수
// ============================
async function loadPartials() {
    const basePath = location.hostname.includes('github.io')
        ? '/youtube-clone-fe/'  // GitHub Pages
        : '../';                // 로컬

    const [headerRes, sidebarRes] = await Promise.all([
        fetch(`${basePath}partials/header.html`),
        fetch(`${basePath}partials/sidebar.html`)
    ]);

    if (!headerRes.ok || !sidebarRes.ok) {
        throw new Error('Failed to load partials');
    }

    return {
        headerHtml: await headerRes.text(),
        sidebarHtml: await sidebarRes.text()
    };
}

// ============================
// 전역 변수
// ============================
let sidebar = null;
let menuBtn = null;
let profileMenu = null;

// ============================
// Header 이벤트
// ============================
function initHeaderEvents() {
    const userIcon = document.querySelector('.user-icon');
    profileMenu = document.getElementById('profile-menu');

    if (!userIcon || !profileMenu) return;

    userIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('d-none');
    });
}

// ============================
// Sidebar 이벤트
// ============================
function initSidebarEvents() {
    menuBtn = document.getElementById('menu-toggle');
    sidebar = document.getElementById('side-bar');
    profileMenu = document.getElementById('profile-menu');

    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        const isMidSize = window.innerWidth <= 1450;
        const isOpen = sidebar.classList.contains('overlay') && sidebar.classList.contains('active');
        const isVideoDetailPage = document.body.classList.contains('video-detail-page'); // 🔥 추가

        if (isVideoDetailPage) {
            // 상세 페이지는 항상 모바일과 동일하게 동작
            if (isOpen) {
                sidebar.classList.remove('active', 'overlay', 'mobile-open', 'mid-open');
                sidebar.classList.add('d-none');
            } else {
                sidebar.classList.remove('d-none', 'collapsed');
                sidebar.classList.add('overlay', 'active', 'mobile-open');
            }
        } else {
            if (isMobile || isMidSize) {
                if (isOpen) {
                    sidebar.classList.remove('active', 'overlay', 'mobile-open', 'mid-open');
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
        }
    });
}

// ============================
// 외부 클릭 이벤트 (공통)
// ============================
function initGlobalClickHandler() {
    document.addEventListener('click', (e) => {
        // ===== 사이드바 닫기 =====
        const isOverlayOpen = sidebar?.classList.contains('overlay') && sidebar?.classList.contains('active');
        const clickedOutsideSidebar = !sidebar?.contains(e.target) && !menuBtn?.contains(e.target);
        const isVideoDetailPage = document.body.classList.contains('video-detail-page'); // 추가

        if (isOverlayOpen && clickedOutsideSidebar) {
            sidebar.classList.remove('active');

            const isMobile = window.innerWidth <= 768;
            const isMidSize = window.innerWidth <= 1450;

            if (isVideoDetailPage || isMobile) {
                sidebar.classList.remove('overlay');
                sidebar.classList.add('d-none');
            } else if (isMidSize) {
                sidebar.classList.remove('overlay');
                sidebar.classList.add('collapsed');
            }
        }

        // ===== 프로필 메뉴 닫기 =====
        if (profileMenu && !profileMenu.classList.contains('d-none') && !profileMenu.contains(e.target)) {
            profileMenu.classList.add('d-none');
        }

        // ===== 비디오 카드 메뉴 토글 =====
        document.querySelectorAll(".video-menu").forEach(menu => menu.classList.add("d-none"));

        if (e.target.closest(".menu-toggle")) {
            const wrapper = e.target.closest(".menu-wrapper");
            const menu = wrapper.querySelector(".video-menu");
            menu.classList.toggle("d-none");
        }
    });
}

// ============================
// 윈도우 리사이즈 시 사이드바 상태 초기화
// ============================
function handleResize() {
    if (!sidebar) return;

    const isMobile = window.innerWidth <= 768;
    const isMidSize = window.innerWidth <= 1450;

    const isVideoDetailPage = document.body.classList.contains('video-detail-page');

    sidebar.classList.remove('overlay', 'active', 'mobile-open', 'mid-open');

    if (isVideoDetailPage) {
        sidebar.classList.add('d-none');
        sidebar.classList.remove('collapsed', 'overlay', 'active');
    } else {
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
}

// ============================
// 구독 리스트 렌더링 (공통)
// ============================
function renderSubscriptions(list) {
    const container = document.getElementById("subscription-list");
    if (!container) return;

    container.innerHTML = "";
    list.forEach((channel, index) => {
        const li = document.createElement("li");

        li.className = "sidebar-item d-flex align-items-center gap-3 py-2 subscription-item extra-menu";

        if (index >= 7) li.classList.add("d-none");

        li.innerHTML = `
            <img src="${channel.profile}" alt="${channel.name}" class="sidebar-profile">
            <span class="subscription-name flex-grow-1">${channel.name}</span>
            <span class="sidebar-live-dot ${channel.isLive ? 'live' : ''}"></span>
        `;

        container.appendChild(li);
    });

    const toggleBtn = document.getElementById("toggle-subscription");

    if (!toggleBtn) return;

    let expanded = false;

    toggleBtn.addEventListener("click", () => {
        expanded = !expanded;

        document.querySelectorAll(".subscription-item").forEach((el, i) => {
            if (i >= 7) el.classList.toggle("d-none", !expanded);
        });

        toggleBtn.querySelector("i").className = expanded
            ? "bi bi-chevron-up fs-6"
            : "bi bi-chevron-down fs-6";
        toggleBtn.querySelector("span").textContent = expanded ? "간단히" : "더보기";
    });
}

// ============================
// 검색 기능 (공통)
// ============================
function initSearch() {
    const searchForm = document.querySelector(".search-form");
    const searchInput = searchForm?.querySelector("input");

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = searchInput.value.trim();

        if (keyword === "") return;

        // 현재 페이지 확인
        const isMainPage = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/");

        if (isMainPage) {
            // 메인 페이지라면 -> 직접 필터링
            handleSearch(keyword);
        } else {
            // 다른 페이지라면 -> index.html로 이동하면서 검색어 전달
            window.location.href = `index.html?search=${encodeURIComponent(keyword)}`;
        }
    });
}

