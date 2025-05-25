// This action is used to detect whether a click is made outside a specific dom node
// particularly useful for dropdowns, modals, or any component that should close when clicking outside of it.
// usage: <div use:clickOutside on:outsideclick={handleOutsideClick}>...</div>
export function clickOutside(node) {

    window.addEventListener('click', handleClick);

    function handleClick(e) {
        if (!node.contains(e.target)) {
            node.dispatchEvent(new CustomEvent('outsideclick'))
        }
    }

    return {
        destroy() {
            window.removeEventListener('click', handleClick)
        }
    };
} 