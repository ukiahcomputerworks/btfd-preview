# Fire banner corrections, October 20, 2026

Owner requested removal of the three preparedness buttons' extra outside borders, matching hover emphasis, and repair of the clipped department name in the incidents dropdown artwork. Scope is the authorized Fire preview at https://ukiahcomputerworks.github.io/btfd-preview/.

## Implementation

- Removed `metal-edge` wrappers and the selected outer perimeter from all three image tabs. Original artwork frames and JPEG bytes remain. A small inset light identifies the selected topic.
- Shared the updates trigger's actual 4.8-second gold/ivory glimmer, hover/focus scale(1.012,1.06), brightness/lift, and press compression with the three tabs. Keyboard focus remains visible. Reduced motion disables the glimmer and transforms.
- Both supplied updates JPEGs are 1024x84 and already clip the department caption. A live HTML department label replaces that incomplete line; a bounded background covers only the old caption, preserving the right-hand arrow artwork. Both open and closed states retain the complete label.
- Cache key `20261020-1`. No routes, destinations, forms, source images, or Township files changed.

## Local evidence

`tools/verify-refinement.cjs` passes at 320, 390, 768, 1080, and 1440px, including caption containment, no extra tab borders, actual hover expansion on each tab, selected panels, keyboard navigation, nine-source dropdown behavior, no overflow, no console errors, reduced motion, and no-JavaScript fallback. Desktop and phone banner/tab captures were visually inspected. Reports and full-page captures are under ignored `evidence/test-output/`.

Component density measurements from the previous committed CSS versus this release: banner remains 48px high at 320 and 390px; at 1440px it changes from 71.66 to 76.06px to fit the full caption. All three tab heights remain unchanged: 44px at 320, 52.53px at 390, and about 58.94px at 1440. No filler section or card height was added.

The 53-link/fragment guard and injected forbidden-link rejection, colophon check, web-development-system validator, and diff whitespace check pass. The only rendered route is `/`; its existing repeated-component matrix remains in VISUAL-SYSTEM.md.

## Release record

Rollback before this release: `1c5bb373277330b3dc477d791e807ca0c3ea3a41`. Published commit, successful Pages run, live asset identity, and post-release results are recorded in the owning coordination PROJECT.md and COM-469. Preview publication is authorized; Fire Chief/owner production and form decisions remain open.
