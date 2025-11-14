document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');

    // Function to fetch and load content
    const loadContent = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404) {
                    contentContainer.innerHTML = `<div class="welcome-content"><h1>Chức năng đang được phát triển</h1><p>Nội dung cho mục này chưa có sẵn. Vui lòng quay lại sau.</p></div>`;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const html = await response.text();
                contentContainer.innerHTML = html;
            }
            
            contentContainer.classList.add('fade-in');
            setTimeout(() => {
                contentContainer.classList.remove('fade-in');
            }, 500);

        } catch (error) {
            contentContainer.innerHTML = `<p>Lỗi tải trang: ${error.message}.</p>`;
        }
    };

    // Load the welcome page by default
    loadContent('pages/welcome.html');

    // --- Event Delegation for sidebar ---
    const sidebar = document.getElementById('sidebar');
    sidebar.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;

        const parentLi = link.parentElement;

        // If it's a parent of a submenu
        if (parentLi.classList.contains('has-submenu')) {
            event.preventDefault();
            
            // Close other open submenus
            const currentlyOpen = sidebar.querySelector('.nav-item.has-submenu.open');
            if (currentlyOpen && currentlyOpen !== parentLi) {
                currentlyOpen.classList.remove('open');
            }
            
            // Toggle the clicked submenu
            parentLi.classList.toggle('open');
        } 
        // If it's a regular link with a page to load
        else if (link.dataset.page) {
            event.preventDefault();
            loadContent(link.dataset.page);
        }
    });
});
