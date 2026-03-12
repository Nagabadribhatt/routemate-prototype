import { renderNavbar } from './components/Navbar.js';
import { renderHome } from './pages/Home.js';
import { renderDashboard } from './pages/Dashboard.js';
import { renderFindRide } from './pages/FindRide.js';
import { renderOfferRide } from './pages/OfferRide.js';
import { renderWallet } from './pages/Wallet.js';
import { renderTrips } from './pages/Trips.js';
import { renderLogin } from './pages/Login.js';
import { state } from './state.js';

const app = document.getElementById('app');

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/dashboard': renderDashboard,
    '/find-ride': renderFindRide,
    '/offer-ride': renderOfferRide,
    '/wallet': renderWallet,
    '/trips': renderTrips
};

function router() {
    const hash = window.location.hash.slice(1) || '/';
    const renderFn = routes[hash] || renderHome;

    // Clear app
    app.innerHTML = '';

    // Render structure
    app.appendChild(renderNavbar());

    const main = document.createElement('main');
    main.className = 'main-content';

    const view = renderFn();
    if (view) {
        main.appendChild(view);
    }

    app.appendChild(main);

    // Re-initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    state.load(); // Load mocked state
    router();
});

// Expose navigation for programmatic routing
window.navigateTo = (path) => {
    window.location.hash = path;
};
