#!/usr/bin/env python3
"""
Tiny static-site builder for Drexler Glass Co.

Each page in pages/*.html holds only its <main> content plus a front-matter
comment. This script wraps it with the shared header/footer and writes the
finished, plain-HTML file to the repo root.

    python3 tools/build.py
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ROOT / "pages"
PARTIALS = ROOT / "partials"

NAV = [
    ("residential.html", "Residential"),
    ("commercial.html", "Commercial"),
    ("our-story.html", "Our Story"),
    ("process.html", "Process & FAQ"),
    ("gallery.html", "Gallery"),
]


def meta(src: str) -> dict:
    m = re.search(r"<!--\s*(.*?)-->", src, re.S)
    out = {}
    if m:
        for line in m.group(1).strip().splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                out[k.strip()] = v.strip()
    return out


def build():
    head = (PARTIALS / "head.html").read_text()
    header = (PARTIALS / "header.html").read_text()
    footer = (PARTIALS / "footer.html").read_text()

    for page in sorted(PAGES.glob("*.html")):
        src = page.read_text()
        info = meta(src)
        body = re.sub(r"^\s*<!--.*?-->\s*", "", src, count=1, flags=re.S)

        nav_header = header
        for href, _label in NAV:
            current = ' aria-current="page"' if href == page.name else ""
            nav_header = nav_header.replace(f'href="{href}" class="nav__link"', f'href="{href}" class="nav__link"{current}')

        html = (
            head.replace("{{title}}", info.get("title", "Drexler Glass Co."))
                .replace("{{description}}", info.get("description", ""))
                .replace("{{page}}", page.name)
            + nav_header
            + '<main id="main">\n' + body.strip() + "\n</main>\n"
            + footer
        )
        (ROOT / page.name).write_text(html)
        print("built", page.name)


if __name__ == "__main__":
    build()
