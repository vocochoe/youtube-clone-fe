const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('side-bar');

menuBtn.addEventListener('click', function () {
    const isMobile = window.innerWidth <= 768;
    const isMidSize = window.innerWidth <= 1450;

    if (isMobile || isMidSize) {
        // 오버레이 열기: overlay & active 적용
        const isOpen = sidebar.classList.contains('overlay') && sidebar.classList.contains('active');

        if (isOpen) {
            sidebar.classList.remove('active');

            if (isMidSize && !isMobile) {
                sidebar.classList.remove('overlay');
                sidebar.classList.remove('mid-open');
                sidebar.classList.add('collapsed');
            } else if (isMobile) {
                sidebar.classList.remove('overlay');
                sidebar.classList.remove('mobile-open');
                sidebar.classList.add('d-none');
            }

        } else {
            // 열기 전에 hidden 상태 제거
            sidebar.classList.remove('d-none');
            sidebar.classList.add('overlay', 'active');
            sidebar.classList.remove('collapsed');

            if (isMobile) {
                sidebar.classList.add('mobile-open');
                sidebar.classList.remove('mid-open');
            } else if (isMidSize) {
                sidebar.classList.add('mid-open');
                sidebar.classList.remove('mobile-open');
            }
        }
    } else {
        // 데스크탑에서는 단순히 collapsed 토글
        sidebar.classList.toggle('collapsed');
    }
});

document.addEventListener('click', function (e) {
    const isOverlayOpen = sidebar.classList.contains('overlay') && sidebar.classList.contains('active');
    const clickedOutside = !sidebar.contains(e.target) && !menuBtn.contains(e.target);

    if (isOverlayOpen && clickedOutside) {
        sidebar.classList.remove('active');

        const isMobile = window.innerWidth <= 768;
        const isMidSize = window.innerWidth <= 1450;

        if (isMidSize && !isMobile) {
            sidebar.classList.add('collapsed');
        }

        if (isMobile) {
            // 모바일은 완전 숨김
            sidebar.classList.remove('overlay');
            sidebar.classList.add('d-none');
        } else if (isMidSize) {
            // 중간 사이즈는 축소 상태 유지
            sidebar.classList.remove('overlay');
            sidebar.classList.add('collapsed');
        }
    }
});

function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isMidSize = window.innerWidth <= 1450;

    // 항상 오버레이 관련 초기화
    sidebar.classList.remove('overlay', 'active');

    if (isMobile) {
        sidebar.classList.add('d-none');
        sidebar.classList.remove('collapsed');
    } else if (isMidSize) {
        sidebar.classList.remove('d-none');
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('d-none');
        sidebar.classList.remove('collapsed');
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);