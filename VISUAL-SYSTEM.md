# Brooktrails Fire visual system

October21 sticker alignment: moved the transparent CLICK HERE sticker from its own row into the masthead row beside the Fire Department brand, beneath the left side of the updates dropdown. Width104px desktop,88px phone and70px narrow phone. Existing click-to-open behavior retained. Cache20261021-2.

October20 resource transition: removed the faint section divider between the preparedness result image and the resource image stack. Existing section padding and image borders remain unchanged. Cache20261020-10.

October20 simple selected-panel separation: owner replaced the extra defensible-space header, left rail and shadow frame with a modest8px top padding below the existing12px selector margin. Native artwork, guidance destination, staggered glimmer and hover/focus remain. Supersedes the selected-step reward treatment below. Cache20261020-9.

October20 contact eyebrow correction: contact body-copy styling excludes `.eyebrow`, allowing the shared gold color and currentColor line to match every other section label. Body copy keeps its smoke color. Cache20261020-8.

October20 centered resource stack: removed the left promotional heading/description and obsolete two-column layout. All three resource image disclosures now span the centered page shell, retaining native contain-fit artwork and open/closed behavior. The section retains an accessible “Forms and resources” label. Cache20261020-7.

October20 selected-step reward treatment: the defensible-space result has a compact copper/gold header reading “For step01 / Your next step”, a gold left rail and a restrained raised glow. The numbered01/02/03 selectors remain visually separate from the selected result, including the phone stack. Header and image share one guidance link. Native artwork, selected-panel behavior and staggered reflection are retained. Cache20261020-6.

October20 defensible-space panel: supplied DefensibleSpace.jpg replaces the home-preparedness panel's vector/text card with one full-surface guidance link. The native1024:158 artwork scales proportionally without crop, an extra frame or duplicate visible copy. Panel identity, destination and accessible content remain; hover/focus/press feedback and staggered -1.4s image glimmer apply, with static reduced motion. Cache20261020-5.

October 20 completed resource headers: VolunteerApplications.jpg, BurnPermits1.jpg and TownshipForms.jpg replace all three resource disclosure summaries. One 1024:135 contain-fit role aligns complete artwork with no added outside frame and a minimum44px target. Shared glimmer, hover/focus lift, press feedback and reduced motion match the other image buttons. An inset minus covers the source plus when open; native details retains links and no-JS keyboard operation. The corrected volunteer source resolves the initial unrelated-thumbnail intake issue. Cache20261020-4 supersedes the initial two-image release20261020-3.

October 20 corrected dropdown artwork and staggered reflections: DropDownUp1.jpg/DropDownDown1.jpg replace the prior state images, preserving the complete original department caption. The temporary HTML caption overlay is removed. CSS negative delays offset nearby shimmer cycles without JavaScript: burn actions -.2/-1.8/-3.4s, volunteer contacts -1.1/-2.7s, preparedness images -.8/-2.1/-3.6s, resource headers -.5/-2/-3.5s, and incidents trigger -.3s. Each remains on a4.8s cycle; reduced motion disables all animated sweeps. Cache20261020-4.

October 20 AQMD contact actions: the burn-line phone and AQMD website links now reuse the volunteer contacts' copper metallic `.button` material, moving reflection, bevel, hover and focus. Both stack with the same compact 10px gap and OR marker. Existing telephone and external website destinations are preserved. Cache20261020-2.

October 20 banner correction: preparedness images own their visible frames; the extra metal-edge wrapper and selected perimeter are removed. All three use the updates banner's shared gold/ivory sweep, hover/focus lift and press compression, with a small inset selected light. Keyboard focus remains visible; reduced motion disables sweep and transforms. The updates source JPEGs contain an already clipped department caption, so a live, complete “Brooktrails Fire Department” footer replaces that baked line in both disclosure states. Its content-sized line stays within the trigger at every target viewport. Cache20261020-1.

Dropdown affordance and volunteer contact, October18: owner artwork remains unchanged. Scoped gold/ivory glimmer crosses only the updates trigger every4.8s; static bevel adds button depth. Fine-pointer hover and keyboard focus bulge to scale(1.012,1.06), with brighter gold lift; active press compresses to scale(.995,.98). Transforms do not consume layout space; overlay ignores pointer events. Reduced motion removes sheen and scaling while retaining the visible focus ring and static raised edge. Direct911 remains solid and unanimated. Hero reads “Volunteer With Us” and points to #volunteer; duplicate plain volunteer link is removed. The volunteer email action now reads “Email Questions About Volunteering”, followed by an “OR” separator and the call action in a compact vertical stack at every viewport. Cache20261018-4. Existing full-width phone row, nine-source menu and CSS-only open/closed artwork preserved; Township untouched.

Owner dropdown-state artwork, October 15: DropDownUp.jpg (right arrows) and DropDownDown.jpg (down arrows) copied unchanged to updates-collapsed.jpg and updates-expanded.jpg. Native details open state switches full-width contain-fit images, with no crop/stretch or duplicated visible text. Accessible summary name, visible focus, 48px minimum target and all nine destinations preserved. Phone layout gives artwork its own full-width row below911 to avoid squeezing lettering into a narrow column. CSS state switching works without JS. Cache20261015-11; follows removal of redundant header zone link in e72c935, successful Pages38829827636. Township untouched.

Header simplification, October 15: removed the redundant Be Ready / Know Your Zone command-strip link. Shared two-column 30/70 grid retains direct911 and the update-source dropdown at every viewport, with no empty third track. Genasys zone map remains in the dropdown; owner image preparedness links elsewhere remain unchanged. Cache20261015-10; Township untouched.

Update-source presentation, October 15: agency Facebook/X links lead the dropdown. Each of nine compact rows has a recognizable platform badge or purpose-drawn alert/map/bell/flame/lookout icon, separate agency/title and channel/purpose text, and an external arrow. These are interface symbols, not official agency seals. Shared 36px icon tiles and 56px-minimum rows preserve scan rhythm and touch access; bounded scrolling, focus, no-JS behavior, external destinations and authority/lag/sign-in caveats remain. Cache20261015-9; Fire only, Township untouched.

Fire-update dropdown, October15: the red command-strip incident link becomes a native details/summary quick-source chooser. Compact44px-minimum rows group four official map/alert links, four agency social links, and explicitly independent Watch Duty. 911 stays a separate direct action. The header does not grow when open; desktop anchored popup and bounded/scrollable phone overlay avoid overflow. Enter/Space, Tab, Escape/refocus, outside-click and focus departure supported; details works without JS. No embedded feeds, trackers or simulated live status. Social sign-in/lag and official evacuation guidance caveat retained. Source provenance: evidence/FIRE-UPDATE-SOURCES.md; cache20261015-8. Township untouched.

Preparedness image tabs, October 15: ProtectYourHome.jpg, KnowYourZone.jpg and GetTheWarning.jpg replace the three tab labels. Original JPEGs remain unedited; shared1024:147 frames contain full artwork without crop/stretch and keep equal widths/heights, desktop row edges and phone/tablet stack alignment. Real button/tab semantics, alt names, aria-selected/controls, roving focus, arrow/Home/End support, deep links and panel switching remain. Selected tab gets an overlaid gold perimeter/ember left rail without changing geometry.44px minimum touch targets preserved; stack below881px. Cache20261015-7; Township untouched. Geometry, all three clicks/selected highlights and keyboard switching tested locally/live at five viewport sizes.

Four owner pathway images, October 15: ProtectYourPlace.jpg, BeforeYouBurn.jpg, AnswerTheCall.jpg and TalkToFire.jpg replace the four original vector/text gateways. Original source bytes copied to assets with descriptive kebab-case names. Each complete image fits inside a shared1024:390 image frame using object-fit:contain, with no crop or stretch and equal geometry; differences in native proportions create at most a few pixels of dark inset. Two aligned desktop columns and a single phone stack retain shared spacing, metallic perimeter, visible focus, accessible image labels and original #prepare/#burn/#volunteer/#contact behavior (including home preparedness selection). Tests assert equal card sizes, row/column edges, full-art fit, destinations and focus. Cache20261015-6; Township untouched.

Banner alignment correction, October 15: independent native-height image links are superseded by one 6.2:1 shared frame with aligned top/bottom borders. Original JPEGs stay unchanged and uniformly scaled; centered CSS edge-trimming removes inconsistent baked-in outer frames while a shared double outline establishes one precise perimeter. Wording, department captions and arrows remain within tested safe bounds. Below 881px, the three banners stack so labels remain readable and targets remain at least44px. No stretching or new artwork; image-only composition is the owner's intentional layout reference. Cache20261015-5. Tests now assert equal widths/heights, desktop top/bottom alignment, and content-safe bounds.

Third owner quick-link image: AI/Media/Incoming/BTFD/BurnPermits.jpg (1024x208) replaces the Burn permits / Check Current Status card. All three hero quick actions now use the same action-image role: original unedited art, full column width, native proportional height, accessible alt, visible focus and unchanged authoritative destinations. Burn keeps the CAL FIRE current-burn-status URL, not a simulated current status. Cache 20261015-4; Township untouched.

Matching alerts banner: owner-provided AI/Media/Incoming/BTFD/SignUpForAlerts.jpg (1024x180) replaces only the alert quick action. Both supplied banners use the shared action-image role, full available width and automatic native-proportion height, with no crop/stretch/regenerated artwork. The alerts image keeps https://mendoready.org/plan-prepare/, accessible image text and visible focus. Cache 20261015-3. Township remains excluded.

October 15 banner replacement: the owner-provided FindYourZone.jpg replaces only the first hero quick-action card. The unchanged 1024x190 artwork scales to its existing column width with automatic proportional height, no crop/stretch, and no duplicate text or added metallic frame. The entire image remains the same accessible MendoReady link, with visible keyboard focus. Other quick actions keep their metallic finish. Source: AI/Media/Incoming/BTFD/FindYourZone.jpg; project asset assets/find-your-zone.jpg. Phone and desktop fit verified; Township excluded.

## Sibling relationship

## October 15, 2026: Township-caliber Fire refinement

Township is the read-only model, not a recipient. Only btfd-preview is changed. Its approved forest/topographic setting now carries shared-quality material, search, progressive disclosure, compact utility rows and deliberate visual rewards. Copper/ember/gold replaces Township's green-metal finish; the Fire shield and station image remain distinct.

| Repeated role | Reference and implementation |
|---|---|
| Display title | Fire's existing sans stack/850, responsive named hero size; copper accent line |
| Section title/body | Shared h2 clamp and 1.65 body rhythm, no page-specific font shrinking |
| Ordinary action | Seven-band 105-degree copper metal, bright bevel, actual 4.8-second reflection sweep, dark ink |
| Emergency action | Solid red, direct tel:911, no sweep or delayed reveal |
| Clickable field | Shared metal-edge perimeter, animated glint, visible gold focus; used on four gateways, quick actions, tabs, resource disclosures/rows and contact anchors |
| Informational field | Plain forest surface; no hover lift or false clickable border |
| Word link | Cream with flame underline, gold hover; separate from buttons |
| Navigation | Current section gold, no active styling on unrelated links; full mobile labels, Escape dismissal |
| Graphics | Original inline vector shield/home, flame/check, helmet and station gateways; constrained station photograph with preserved source aspect/crop |
| Preparedness | Native readable article fallback; enhanced accessible three-topic tabs with single focused reward, keyboard arrows/Home/End and exact deep links |
| Directories | Native collapsed resource groups and compact full-surface contact/resource links |
| Search | Local in-memory intent index; local Fire results and labeled external Township links, no LLM, external search service or query persistence |
| Motion | Hover/focus icon cues, panel entry, metal sweep/glint; static under reduced-motion preference |

Route/component matrix: the single index.html route and retained #top, #about, #services, #prepare, #burn and #contact anchors use this system; #fire-paths, #resources, #volunteer, #ready-home, #ready-zone, #ready-alerts and three resource disclosures are added. No former anchors are removed. All titles, buttons, word links, contacts and graphics checked at 320, 390, 768, 1080 (583 high), and 1440 pixels. Top, middle, bottom, expanded/search/selected states inspected; focus, overflow, images and reduced-motion tests pass. Print exposes all preparedness articles. One existing footer/colophon retained.

Measured density at 390x844: total page 7,119 to 6,041px (15% shorter despite four new illustrated gateways/search/resources). At 1440x1000: 4,703 to 3,407px (28% shorter). Section padding becomes 16px instead of 58px mobile/96px desktop. Contact links measure 65–90px, determined by content. No fixed/minimum promotional card or hero heights. Representative screenshots and test reports are generated by tools/verify-refinement.cjs.

The Fire and Township sites belong to the same Brooktrails family without being copies. They share redwood and topographic geometry, bounded hubs, progressive disclosure, high-visibility actions, mobile-first behavior, and the Draw → Hook → Reward interaction rhythm. Fire translates that system into ember red, flame orange, safety gold, deep forest, and smoke colors.

## Component profile

| Role | Fire treatment |
|---|---|
| Primary title | Inter/system sans, 850, uppercase, 2.65–5.65 rem, 1.02 line height |
| Section title | Inter/system sans, 850, 2.2–4.25 rem, 1.02 line height |
| Body | Inter/system sans, 1–1.22 rem by role, at least 1.65 line height, smoke on dark forest |
| Eyebrow | Uppercase, 900, .7 rem, .2 em tracking, flame or safety gold with lead line |
| Word link | Cream with mint underline; mint with gold underline on hover |
| Button | Uppercase, angled field shape, minimum 50 px height; ember, gold, or mint state by role |
| Navigation | Smoke default, cream hover, ember wash, circular mint mobile trigger |
| Hub/action | Dark forest field, thin mint border, ember ignition rail, lift reward on hover/focus |
| Card | Deep forest gradient, clipped upper-right corner, role-specific ember/gold/mint signal |
| Graphic | Real station photography with controlled crop, subdued saturation, dark safety overlay |
| Header | Dark forest glass, safety command strip above, compact shield and uppercase identity |

## Responsive targets

- Desktop reference: 1440 px wide.
- Phone reference: 390 px wide.
- Short laptop: hero height is capped against the viewport and remains readable without clipping.
- Reduced motion: every transition collapses to an immediate state.

## Intentional differences from Township

- Fire reserves ember red for emergency and action hierarchy.
- Safety gold signals authority, verification, and burn status.
- The Fire site uses station and readiness imagery rather than civic records and recreation metaphors.
- Fire tasks remain emergency, preparedness, volunteer, permit, and station focused. District tasks hand off to the Township site.
