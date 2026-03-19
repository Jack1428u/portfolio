/**
 * Utilidades de scroll para Client Components.
 * Siempre se invoca desde event handlers o useEffect — nunca en el cuerpo de un Server Component.
 */

export function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
