document.addEventListener("DOMContentLoaded", async () => {
    try {

        const [headerRes, sidebarRes] = await Promise.all([
            fetch("../partials/header.html"),
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

        initHeaderEvents();

        // ===== 2. Sidebar 삽입 =====
        const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

        if (sidebarPlaceholder) {
            sidebarPlaceholder.insertAdjacentHTML('beforebegin', sidebarHtml);
            sidebarPlaceholder.remove();
        }

        initSidebarAfterLoad(); // sidebar 이벤트, 구독, 리사이즈 초기화

    } catch (err) {
        console.error("❌ Layout load error:", err);
    }
});