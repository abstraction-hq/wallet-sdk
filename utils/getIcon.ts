export const getFavicon = () => {
  const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
  if (links.length > 0) {
    return links[0].getAttribute("href");
  } else {
    // If no favicon is specified, return the default favicon location
    return "favicon.ico";
  }
}
