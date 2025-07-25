
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('side-bar').classList.toggle('collapsed');
});

function handleResize() {
    const sidebar = document.getElementById('side-bar');
    if (window.innerWidth <= 1450) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);
