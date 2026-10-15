"""Reject old district fallbacks, empty links and missing local destinations."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

ROOT = Path(__file__).resolve().parents[1]
class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids = [], set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))

def failures(parser, root, blocked):
    errors = []
    for href in parser.links:
        url = urlsplit(href)
        if url.hostname and url.hostname.lower() in blocked:
            errors.append('forbidden legacy-site link: ' + href)
        elif not href.strip() or href == '#' or url.scheme in {'javascript', 'data'}:
            errors.append('placeholder link: ' + href)
        elif not url.scheme and not url.netloc:
            target = (root / unquote(url.path)).resolve() if url.path else root / 'index.html'
            if target.is_dir():
                target /= 'index.html'
            if not target.is_file():
                errors.append('missing destination: ' + href)
            elif url.fragment and target == root / 'index.html' and unquote(url.fragment) not in parser.ids:
                errors.append('missing fragment: ' + href)
    return errors

blocked = set(json.loads((ROOT / 'site-link-policy.json').read_text())['blockedLegacyHosts'])
parser = Links()
parser.feed((ROOT / 'index.html').read_text(encoding='utf-8-sig'))
errors = failures(parser, ROOT, blocked)
if '--self-test' in sys.argv:
    injected = Links()
    injected.feed('<a href="https://www.btcsd.org/old-page">Legacy fallback</a>')
    assert any('forbidden legacy-site' in e for e in failures(injected, ROOT, blocked))
    print('PASS injected forbidden legacy link rejected')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS {len(parser.links)} links and fragments')
