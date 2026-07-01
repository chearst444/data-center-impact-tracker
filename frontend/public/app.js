/* ============================================================
   Data Center Impact Tracker — interactive app
   Single-file vanilla JS, no build step.
   ============================================================ */

const $ = (id) => document.getElementById(id);
const fmt  = new Intl.NumberFormat('en-US');
const fmt1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const fmt2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const fmtMoney = (n) =>
  n >= 1e9 ? '$' + fmt1.format(n / 1e9) + 'B'
  : n >= 1e6 ? '$' + fmt1.format(n / 1e6) + 'M'
  : n >= 1e3 ? '$' + fmt1.format(n / 1e3) + 'K'
  : '$' + fmt.format(Math.round(n));

function download(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
}

/* ============= Module 1 — Electrical Burden ============= */
(function () {
  const rDc = $('r-dcMW'), rBase = $('r-baseMW'), rRp = $('r-ratepayers');
  if (!rDc) return;
  function compute() {
    const dc = +rDc.value, base = +rBase.value, rp = +rRp.value;
    $('dcMW').textContent = dc;
    $('baseMW').textContent = base;
    $('ratepayers').textContent = fmt.format(rp);
    const pct = (dc / base) * 100;
    const infra = dc * 1_250_000;
    const monthly = (infra / 20) / rp / 12;
    $('o-loadPct').textContent = fmt1.format(pct) + '%';
    $('o-infra').textContent = fmtMoney(infra);
    $('o-monthly').textContent = '$' + fmt2.format(monthly);
  }
  [rDc, rBase, rRp].forEach((el) => el.addEventListener('input', compute));
  compute();
})();

/* ============= Module 2 — Water ============= */
(function () {
  const rEvap = $('r-evapG'), rSeason = $('r-season');
  if (!rEvap) return;
  function compute() {
    const evap = +rEvap.value, season = +rSeason.value;
    const onsite = evap * season;
    const dcMW = (onsite / 0.04);
    const indirect = dcMW * 24 * 1000 * 0.47 / 1_000_000;
    const total = onsite + indirect;
    $('evapG').textContent = fmt1.format(evap);
    $('o-onsite').textContent = fmt2.format(onsite) + 'M gal/day';
    $('o-indirect').textContent = fmt2.format(indirect) + 'M gal/day';
    $('o-total').textContent = fmt2.format(total) + 'M gal/day';

    const house = 300, farm = 120_000, muni = 2_500_000, dc = total * 1_000_000;
    const max = Math.max(house, farm, muni, dc);
    const w = (v) => Math.max(2, (v / max) * 100) + '%';
    $('b-house').style.width = w(house);
    $('b-farm').style.width = w(farm);
    $('b-muni').style.width = w(muni);
    $('b-dc').style.width = w(dc);
    $('v-dc').textContent = fmt2.format(total) + 'M gal';
  }
  [rEvap, rSeason].forEach((el) => el.addEventListener('input', compute));
  compute();
})();

/* ============= Module 3 — Sound ============= */
(function () {
  const rDb = $('r-dB'), rDist = $('r-dist');
  if (!rDb) return;
  function compute() {
    const src = +rDb.value, dist = +rDist.value;
    $('dB').textContent = src;
    $('dist').textContent = dist;
    const refDist = 50;
    let atHome = src - 20 * Math.log10(dist / refDist) - (Math.max(0, dist - refDist) / 100) * 2;
    atHome = Math.max(0, atHome);
    const dbStr = fmt1.format(atHome) + ' dB(A)';
    $('o-atHome').textContent = dbStr;
    let msg, cls = 'v';
    if (atHome >= 55) { msg = 'Well above WHO 45 dB(A) night-time outdoor guideline. Strong likelihood of sleep disruption, audible hum indoors, and chronic stress responses.'; cls = 'v alert'; }
    else if (atHome >= 45) { msg = 'Above WHO 45 dB(A) night-time outdoor guideline. Sustained exposure linked to sleep fragmentation, elevated nocturnal cortisol, and self-reported anxiety.'; cls = 'v amber'; }
    else if (atHome >= 35) { msg = 'At or below WHO night-time guidance, but low-frequency components (20–120 Hz) may still penetrate walls and be perceived as a felt hum.'; }
    else { msg = 'Below typical night-time guidance. Continuous 24/7 exposure should still be monitored for low-frequency content.'; }
    $('o-atHome').className = cls;
    $('o-health').textContent = msg;
    const house = $('house');
    if (house) {
      const px = Math.min(380, 110 + (dist / 1500) * 270);
      house.setAttribute('transform', 'translate(' + px + ',140)');
    }
  }
  [rDb, rDist].forEach((el) => el.addEventListener('input', compute));
  compute();
})();

/* ============= Module 7 — Air Quality ============= */
(function () {
  const rG = $('r-gens'), rD = $('r-dur');
  if (!rG) return;
  function compute() {
    const g = +rG.value, d = +rD.value;
    $('gens').textContent = g;
    $('dur').textContent = d;
    const fuel = g * d * 2;
    const nox = fuel * 0.064;
    const pm = fuel * 0.0025;
    $('o-fuel').textContent = fmt.format(Math.round(fuel)) + ' gal/wk';
    $('o-nox').textContent = '≈ ' + fmt.format(Math.round(nox)) + ' lb';
    $('o-pm').textContent = '≈ ' + fmt.format(Math.round(pm)) + ' lb';
  }
  [rG, rD].forEach((el) => el.addEventListener('input', compute));
  compute();
})();

/* ============= Module 9 — Stranded Asset ============= */
(function () {
  const rE = $('r-effPct'), rA = $('r-aiPct'), rL = $('r-life');
  if (!rE) return;
  function compute() {
    const eff = +rE.value / 100, ai = +rA.value / 100, life = +rL.value;
    $('effPct').textContent = rE.value;
    $('aiPct').textContent = rA.value;
    $('life').textContent = life;
    const combined = (1 + eff) * (1 + ai) - 1;
    const halfYears = Math.log(2) / Math.log(1 + combined);
    const obsolescence = (1 - 1 / Math.pow(1 + combined, life)) * 100;
    $('o-half').textContent = fmt1.format(halfYears) + ' yr';
    $('o-strand').textContent = fmt1.format(obsolescence) + '%';
    let cls = 'Low — Repurposable', tag = '';
    if (obsolescence > 60) cls = 'Moderate — Repurposing costly';
    if (obsolescence > 80) cls = 'High — Digital blight likely';
    if (obsolescence > 92) cls = 'Severe — Stranded concrete';
    $('o-blight').textContent = cls;
    const tagEl = $('o-blight-tag');
    if (obsolescence > 80) { tagEl.className = 'tag amber'; }
    else { tagEl.className = 'tag'; }
  }
  [rE, rA, rL].forEach((el) => el.addEventListener('input', compute));
  compute();
})();

/* ============= Downloads — RTK + Ordinance ============= */
const RTK_TEXT = `RIGHT TO KNOW — CITIZEN DISCLOSURE CHECKLIST
Before any rezoning, annexation, or special-use permit involving a data center,
the undersigned hereby requests written, public disclosure of the following:

[ ]  Disclose the actual parent company behind any LLC or shell entity applying
     for zoning, annexation, or utility service.
[ ]  Publish the projected continuous and peak megawatt load before any
     rezoning vote.
[ ]  Publish the projected daily and peak water demand, in gallons, with
     seasonal breakdowns.
[ ]  Disclose all NDAs signed by any city or county official, staff member,
     or board.
[ ]  Publish all developer-paid economic-impact studies and allow a 60-day
     public comment window before the vote.
[ ]  Require a written, signed sound-budget commitment with a verifiable
     nighttime dB(A) cap at the residential property line.
[ ]  Require a written, signed water-curtailment plan with binding drought
     triggers.
[ ]  Require a written commitment that the developer — not residential
     ratepayers — bears 100% of dedicated transmission, substation, and
     water-treatment costs.

Signed: __________________________________________  Date: _______________

Submitted in the public interest, pursuant to the right of citizens to
petition their government.
`;

const ORDINANCE_TEXT = `MUNICIPAL ZONING AMENDMENT — CODE TITLE 11 AMENDMENTS
(Starter template. Adapt with local counsel before adoption.)

Prepared for consideration by the Johnson City Regional Planning Commission
and Board of Commissioners.

Pursuant to Tennessee Code Annotated (T.C.A.) provisions governing municipal
land-use controls, noise abatement standards, and industrial district setbacks.

SECTION 1. PURPOSE
The Commission finds that hyperscale data centers represent a unique land-use
category with infrastructure, environmental, and fiscal characteristics
materially different from general industrial uses. This ordinance establishes
a distinct classification ("Hyperscale Data Center" / HDC) and the conditions
under which any such use may be approved.

SECTION 2. DEFINITION
"Hyperscale Data Center" means any facility, or campus of co-located facilities,
whose primary use is the operation of computing servers or related digital
infrastructure and whose continuous electrical load is reasonably expected to
equal or exceed 25 MW (twenty-five megawatts).

SECTION 3. ZONING TREATMENT
HDC uses are not permitted by-right in any zoning district. HDC uses may be
considered only through a Special-Use Permit process, subject to the
performance standards in Section 4 and the disclosure requirements in
Section 5.

SECTION 4. PERFORMANCE STANDARDS
4.1  Minimum 2,000-foot buffer between any HDC structure and the nearest
     residential property line.
4.2  Sound budget: continuous outdoor sound at the nearest residential
     property line shall not exceed 45 dB(A) between 10:00 p.m. and 7:00 a.m.,
     measured to include low-frequency (dB-C) and tonal-penalty components.
4.3  Water-availability finding: prior to site-plan approval, the applicant
     shall submit a peer-reviewed water-availability and drought-curtailment
     plan binding the facility to mandatory reductions when municipal water
     supply enters defined drought stages.
4.4  Air-quality plan: all on-site diesel or natural-gas backup generators
     shall be inventoried, permitted, and limited to a documented testing
     schedule; emergency-engine exemptions shall not be used to evade
     local air-quality limits.

SECTION 5. DISCLOSURE & RATEPAYER PROTECTION
5.1  No NDA signed by any City employee, official, board member, or contractor
     shall delay the public disclosure of any HDC application beyond thirty
     (30) days following pre-application meetings.
5.2  Applicant shall disclose the ultimate parent entity and all corporate
     affiliates of any LLC or shell applicant.
5.3  Applicant shall fund 100% of dedicated transmission, substation,
     water-treatment, and stormwater infrastructure required to serve the
     facility. No portion of such cost shall be recovered through residential
     rates without an affirmative two-thirds vote of the Commission and a
     finding of public necessity.

SECTION 6. JOB CREATION AND CLAW-BACKS
Any tax abatement or PILOT agreement granted to an HDC facility shall be
conditioned on permanent local job creation of not fewer than one (1)
full-time job per two (2) megawatts of continuous load, with claw-back
provisions enforceable upon failure to meet such thresholds within
twenty-four (24) months of commencement of operations.

SECTION 7. SEVERABILITY & EFFECTIVE DATE
The provisions of this ordinance are severable. This ordinance shall take
effect upon adoption.
`;

document.querySelectorAll('[data-dl="rtk"]').forEach((b) =>
  b.addEventListener('click', () => download('right-to-know-checklist.txt', RTK_TEXT)));
document.querySelectorAll('[data-dl="ordinance"]').forEach((b) =>
  b.addEventListener('click', () => download('municipal-zoning-amendment-title-11.txt', ORDINANCE_TEXT)));

/* ============= Module 10 — Comment + Survey ============= */
(function () {
  const btnPrev = document.querySelector('[data-testid="generate-comment"]');
  if (!btnPrev) return;

  function buildComment() {
    const name = ($('c-name').value || 'A resident of Johnson City').trim();
    const hood = ($('c-hood').value || 'this community').trim();
    const topic = $('c-topic').value;
    const personal = $('c-personal').value.trim();
    const ask = $('c-ask').value;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const lines = [
      'Mayor and members of the Commission, good evening.',
      '',
      'My name is ' + name + ' and I live in ' + hood + '. I am here tonight to speak respectfully on ' + topic.toLowerCase().replace(/ —.*/, '') + '.'
    ];
    if (personal) { lines.push(''); lines.push(personal); }
    lines.push('');
    lines.push('This is not a matter of being against progress. It is a matter of asking that our progress be measured by what it preserves, not only by what it builds. Continuous noise, water draw, diesel exhaust, and quietly rising utility bills are not abstractions to the families on my street. They are the texture of our daily lives.');
    lines.push('');
    lines.push('My ask is simple. ' + ask);
    lines.push('');
    lines.push('Thank you for your time, and thank you for your service to this community.');
    lines.push('');
    lines.push('— ' + name + ' · ' + today);
    return lines.join('\n');
  }

  btnPrev.addEventListener('click', () => { $('commentPreview').textContent = buildComment(); });
  document.querySelector('[data-testid="download-comment"]').addEventListener('click', () => {
    download('public-comment-draft.txt', buildComment());
  });

  const rSDb = $('r-sDb');
  rSDb.addEventListener('input', () => { $('s-dbVal').textContent = rSDb.value; });

  document.querySelector('[data-testid="download-survey"]').addEventListener('click', () => {
    const row = [
      ($('s-addr').value || '').replace(/"/g, '""'),
      ($('s-when').value || new Date().toISOString()).replace(/"/g, '""'),
      rSDb.value,
      $('s-vib').value.replace(/"/g, '""'),
      ($('s-notes').value || '').replace(/"/g, '""')
    ].map((v) => '"' + v + '"').join(',');
    const csv = 'address,datetime,dBA,low_frequency_vibration,notes\n' + row + '\n';
    download('acoustic-survey-' + Date.now() + '.csv', csv);
  });
})();

/* ============= Sidebar scrollspy ============= */
(function () {
  const links = document.querySelectorAll('.rail a[href^="#"]');
  const sections = Array.from(links).map((a) => {
    const id = a.getAttribute('href').slice(1);
    return { id, el: document.getElementById(id), link: a };
  }).filter((s) => s.el);
  function onScroll() {
    const y = window.scrollY + 120;
    let active = sections[0];
    for (const s of sections) {
      if (s.el.offsetTop <= y) active = s;
    }
    links.forEach((l) => l.classList.remove('active'));
    if (active) active.link.classList.add('active');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
