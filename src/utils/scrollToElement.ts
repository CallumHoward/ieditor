interface ScrollToElementArgs extends ScrollToOptions {
  element?: HTMLElement | null;
  offsetPx?: number;
  scrollableParent?: Element | Window | null;
}

/**
 * scrollToElement scrolls to an element with the ID provided in props.
 * Since the Airtasker navbar can overlap with content, use NAVBAR_OFFSET
 * to align the target element with the bottom of the navbar.
 *
 * It uses a polyfill for smooth scroll behaviour as it is not implemented in
 * iOS browsers and Safari
 * @example
 * scrollToElement({element: document.getElementById('target'), offsetPx: NAVBAR_OFFSET})
 */
const scrollToElement = ({
  element,
  offsetPx = 0,
  scrollableParent = window,
  ...scrollToOptions
}: ScrollToElementArgs): void => {
  if (!scrollableParent) {
    return;
  }

  if (element) {
    const positionToScroll = element.offsetTop + offsetPx;
    scrollableParent.scrollTo({
      behavior: "smooth",
      top: positionToScroll,
      ...scrollToOptions,
    });
  }
};

export { scrollToElement };
