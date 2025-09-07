// netlify/functions/medium-latest.js
// Fetches the newest Medium post for @MEDIUM_USERNAME from the RSS feed.
// Works on Netlify (no CORS issues) and returns JSON: { title, link }

const USERNAME = process.env.MEDIUM_USERNAME || "aryansingh19461";

function extractFirstItem(xml) {
  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
  return itemMatch ? itemMatch[1] : null;
}

function extractTitle(item) {
  // Prefer CDATA, fallback to plain <title>
  const m =
    item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
    item.match(/<title>([^<]+)<\/title>/);
  return (m && (m[1] || m[2])) || null;
}

function extractLink(item) {
  // Medium RSS may include <link> to /p/{id} or full article URL
  const linkMatch = item.match(/<link>([^<]+)<\/link>/);
  const guidMatch = item.match(/<guid[^>]*>([^<]+)<\/guid>/);
  return (linkMatch && linkMatch[1]) || (guidMatch && guidMatch[1]) || null;
}

function normalizeMediumLink(link) {
  try {
    const u = new URL(link);
    // If it's the short /p/{id} form, convert to canonical author URL
    // e.g., https://medium.com/p/abcdef => https://medium.com/@username/abcdef
    if (u.hostname.includes("medium.com") && u.pathname.startsWith("/p/")) {
      const id = u.pathname.split("/").pop();
      return `https://medium.com/@${USERNAME}/${id}?source=rss`;
    }
    return link;
  } catch {
    return link;
  }
}

export async function handler() {
  try {
    const feed = `https://medium.com/feed/@${USERNAME}`;
    const res = await fetch(feed, { headers: { Accept: "application/rss+xml" } });
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: "Feed unavailable" }) };
    }
    const xml = await res.text();
    const item = extractFirstItem(xml);
    if (!item) {
      return { statusCode: 200, body: JSON.stringify({ title: null, link: null }) };
    }
    const title = extractTitle(item) || "Latest on Medium";
    const rawLink = extractLink(item);
    const link = rawLink ? normalizeMediumLink(rawLink) : null;

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        // Cache on Netlify CDN (15 min) so you don’t hit Medium every view
        "cache-control": "public, max-age=900, s-maxage=900, must-revalidate",
      },
      body: JSON.stringify({ title, link }),
    };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ title: null, link: null }) };
  }
}
