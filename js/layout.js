// ============================
// 공통 레이아웃 로드 & 초기화
// ============================
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [headerRes, sidebarRes] = await Promise.all([
            fetch("../partials/header.html"),   // 상대 경로 확인
            fetch("../partials/sidebar.html")
        ]);

        const headerHtml = await headerRes.text();
        const sidebarHtml = await sidebarRes.text();

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

        window.addEventListener('resize', handleResize);
        initGlobalClickHandler(); // 외부 클릭 이벤트 (사이드바/프로필 메뉴/비디오 메뉴 닫기)

    } catch (err) {
        console.error("Layout load error:", err);
    }
});

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

    // 햄버거 버튼 클릭
    menuBtn.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        const isMidSize = window.innerWidth <= 1450;
        const isOpen = sidebar.classList.contains('overlay') && sidebar.classList.contains('active');

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

        if (isOverlayOpen && clickedOutsideSidebar) {
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
