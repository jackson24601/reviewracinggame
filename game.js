(() => {
  "use strict";

  const VGA = {
    black: "#000000",
    blue: "#0000AA",
    green: "#00AA00",
    cyan: "#00AAAA",
    red: "#AA0000",
    magenta: "#AA00AA",
    brown: "#AA5500",
    light: "#AAAAAA",
    dark: "#555555",
    bblue: "#5555FF",
    bgreen: "#55FF55",
    bcyan: "#55FFFF",
    bred: "#FF5555",
    bmagenta: "#FF55FF",
    yellow: "#FFFF55",
    white: "#FFFFFF",
    navy: "#000055",
  };

  const TEAMS = [
    { name: "RED", color: VGA.bred, dark: VGA.red, ink: VGA.white },
    { name: "BLUE", color: VGA.bblue, dark: VGA.blue, ink: VGA.white },
    { name: "GREEN", color: VGA.bgreen, dark: VGA.green, ink: VGA.black },
    { name: "YELLOW", color: VGA.yellow, dark: VGA.brown, ink: VGA.black },
    { name: "PINK", color: VGA.bmagenta, dark: VGA.magenta, ink: VGA.black },
    { name: "CYAN", color: VGA.bcyan, dark: VGA.cyan, ink: VGA.black },
    { name: "WHITE", color: VGA.white, dark: VGA.light, ink: VGA.black },
    { name: "ORANGE", color: VGA.brown, dark: "#7A3300", ink: VGA.white },
    { name: "PURPLE", color: VGA.magenta, dark: "#550055", ink: VGA.white },
    { name: "TEAL", color: VGA.cyan, dark: "#005555", ink: VGA.white },
  ];

  const W = 640;
  const H = 400;
  const CX = 320;
  const CY = 198;
  const RX_OUT = 292;
  const RY_OUT = 148;
  const RX_IN = 168;
  const RY_IN = 78;
  const START_ANGLE = Math.PI / 2;
  const LAP = Math.PI * 2;
  const BASE_SPEED = 0.038;
  const SPEED_PER_POINT = 0.055;
  const MAX_SPEED = 1.35;
  const HORSE_PX = 2;
  const HORSE_FRAMES = [
    [
      ".........CC...........",
      "........CEFC..........",
      "........FJ...HHHH.....",
      "MM.....JJP.HHHHHHH....",
      "MM.....JP.HHHHHHHH....",
      ".M.....P.HHHHHHHHH....",
      ".TT.....HHHHHHHHHH....",
      "..T....HHHHDDHHHHH....",
      ".......HHH..HH..HH....",
      ".......HH...HH..HH....",
      ".......H....H....H....",
      ".......K....K....K....",
    ],
    [
      ".........CC...........",
      "........CEFC..........",
      "........FJ...HHHH.....",
      "MM.....JJP.HHHHHHH....",
      ".M.....JP.HHHHHHHH....",
      ".......P.HHHHHHHHH....",
      ".T......HHHHHHHHHH....",
      ".TT....HHHHDDHHHHH....",
      ".......HH..HH.HH......",
      ".......H...H...H......",
      "......H...H.....H.....",
      "......K...K.....K.....",
    ],
    [
      ".........CC...........",
      "........CEFC..........",
      "........FJ...HHHH.....",
      "MMM....JJP.HHHHHHH....",
      ".M.....JP.HHHHHHHH....",
      ".......P.HHHHHHHHH....",
      "..T.....HHHHHHHHHH....",
      "..TT...HHHHDDHHHHH....",
      ".......HHH.HH..HH.....",
      "......HH...HH..HH.....",
      "......H....H....H.....",
      "......K....K....K.....",
    ],
    [
      ".........CC...........",
      "........CEFC..........",
      "........FJ...HHHH.....",
      "MM.....JJP.HHHHHHH....",
      "MM.....JP.HHHHHHHH....",
      ".M.....P.HHHHHHHHH....",
      "TT......HHHHHHHHHH....",
      ".T.....HHHHDDHHHHH....",
      ".......HH...HH.HH.....",
      "........H...H...H.....",
      ".........H.H...H......",
      ".........K.K...K......",
    ],
  ];

  const FONT = {
    " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["01110", "10001", "00001", "00110", "00001", "10001", "01110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
    "6": ["01110", "10000", "11110", "10001", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
    D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    G: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
    H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
    J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
    K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
    X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
    "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
    ":": ["00000", "00100", "00100", "00000", "00100", "00100", "00000"],
    "!": ["00100", "00100", "00100", "00100", "00100", "00000", "00100"],
    "?": ["01110", "10001", "00001", "00010", "00100", "00000", "00100"],
    ".": ["00000", "00000", "00000", "00000", "00000", "00000", "00100"],
    ",": ["00000", "00000", "00000", "00000", "00100", "00100", "01000"],
    "'": ["00100", "00100", "00000", "00000", "00000", "00000", "00000"],
    "*": ["00000", "10101", "01110", "11111", "01110", "10101", "00000"],
    "/": ["00001", "00010", "00010", "00100", "01000", "01000", "10000"],
  };

  const setupEl = document.getElementById("setup");
  const raceEl = document.getElementById("race");
  const countButtons = document.getElementById("count-buttons");
  const controlsEl = document.getElementById("controls");
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const newRaceBtn = document.getElementById("new-race");
  const fullscreenBtn = document.getElementById("fullscreen");
  const muteBtn = document.getElementById("mute");
  const stageEl = document.getElementById("stage");

  const bg = document.createElement("canvas");
  bg.width = W;
  bg.height = H;
  const bgx = bg.getContext("2d");

  const frontRail = document.createElement("canvas");
  frontRail.width = W;
  frontRail.height = H;
  const frx = frontRail.getContext("2d");

  let audioCtx = null;
  let muted = false;
  let horses = [];
  let running = false;
  let countdown = 3;
  let countdownLeft = 0;
  let lastTs = 0;
  let pops = [];
  let spectators = [];

  function hash(x, y) {
    return ((x * 374761393 + y * 668265263) >>> 0) % 100;
  }

  function drawText(target, text, x, y, color, scale, align) {
    const str = String(text).toUpperCase();
    const gw = 6 * scale;
    let px = x;
    if (align === "center") px = Math.round(x - (str.length * gw) / 2);
    if (align === "right") px = Math.round(x - str.length * gw);
    target.fillStyle = color;
    for (const ch of str) {
      const glyph = FONT[ch] || FONT["?"];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (glyph[row][col] === "1") {
            target.fillRect(px + col * scale, y + row * scale, scale, scale);
          }
        }
      }
      px += gw;
    }
  }

  function ellipsePoint(rx, ry, angle) {
    return {
      x: CX + rx * Math.cos(angle),
      y: CY + ry * Math.sin(angle),
    };
  }

  function tangent(rx, ry, angle) {
    return Math.atan2(ry * Math.cos(angle), -rx * Math.sin(angle));
  }

  function inTrackBand(x, y) {
    const dx = (x - CX) / RX_OUT;
    const dy = (y - CY) / RY_OUT;
    const outer = dx * dx + dy * dy;
    const ix = (x - CX) / RX_IN;
    const iy = (y - CY) / RY_IN;
    const inner = ix * ix + iy * iy;
    return outer <= 1 && inner >= 1;
  }

  function buildSpectators() {
    spectators = [];
    const palette = [
      VGA.bred, VGA.bblue, VGA.bgreen, VGA.yellow, VGA.bmagenta,
      VGA.bcyan, VGA.white, VGA.brown, VGA.magenta, VGA.cyan, VGA.light,
    ];
    for (let i = 0; i < 90; i++) {
      spectators.push({
        x: 70 + (i % 30) * 16 + (i % 2) * 3,
        y: 18 + Math.floor(i / 30) * 8,
        color: palette[i % palette.length],
      });
    }
  }

  function prerenderTrack() {
    bgx.fillStyle = VGA.navy;
    bgx.fillRect(0, 0, W, H);
    for (let y = 0; y < 92; y++) {
      for (let x = 0; x < W; x++) {
        if (((x >> 1) + y) % 4 === 0) {
          bgx.fillStyle = VGA.blue;
          bgx.fillRect(x, y, 1, 1);
        }
      }
    }

    bgx.fillStyle = VGA.yellow;
    bgx.fillRect(572, 8, 16, 16);
    bgx.fillStyle = VGA.brown;
    bgx.fillRect(577, 13, 6, 6);

    bgx.fillStyle = VGA.dark;
    bgx.fillRect(84, 8, 472, 42);
    bgx.fillStyle = VGA.light;
    bgx.fillRect(88, 12, 464, 8);
    for (const spec of spectators) {
      bgx.fillStyle = spec.color;
      bgx.fillRect(spec.x, spec.y, 3, 5);
      bgx.fillStyle = VGA.black;
      bgx.fillRect(spec.x + 1, spec.y, 1, 1);
    }
    bgx.fillStyle = VGA.red;
    bgx.fillRect(96, 2, 4, 18);
    bgx.fillStyle = VGA.yellow;
    bgx.fillRect(100, 2, 14, 10);
    bgx.fillStyle = VGA.bblue;
    bgx.fillRect(520, 2, 4, 18);
    bgx.fillStyle = VGA.white;
    bgx.fillRect(524, 2, 14, 10);

    bgx.fillStyle = VGA.green;
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_OUT + 18, RY_OUT + 16, 0, 0, Math.PI * 2);
    bgx.fill();
    for (let i = 0; i < 1400; i++) {
      const x = (i * 47) % W;
      const y = 70 + ((i * 91) % (H - 70));
      if (hash(x, y) < 12) {
        const dx = (x - CX) / (RX_OUT + 18);
        const dy = (y - CY) / (RY_OUT + 16);
        if (dx * dx + dy * dy <= 1) {
          bgx.fillStyle = hash(x, y) < 6 ? VGA.bgreen : "#007000";
          bgx.fillRect(x, y, 2, 2);
        }
      }
    }

    bgx.fillStyle = VGA.brown;
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_OUT, RY_OUT, 0, 0, Math.PI * 2);
    bgx.ellipse(CX, CY, RX_IN, RY_IN, 0, 0, Math.PI * 2);
    bgx.fill("evenodd");

    for (let y = CY - RY_OUT; y <= CY + RY_OUT; y++) {
      for (let x = CX - RX_OUT; x <= CX + RX_OUT; x++) {
        if (inTrackBand(x, y) && hash(x, y) < 18) {
          bgx.fillStyle = hash(x + 3, y) < 9 ? VGA.red : VGA.yellow;
          bgx.fillRect(x, y, 1, 1);
        }
      }
    }

    bgx.strokeStyle = VGA.white;
    bgx.lineWidth = 3;
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_OUT, RY_OUT, 0, 0, Math.PI * 2);
    bgx.stroke();
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_IN, RY_IN, 0, 0, Math.PI * 2);
    bgx.stroke();
    bgx.strokeStyle = VGA.dark;
    bgx.lineWidth = 1;
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_OUT - 4, RY_OUT - 3, 0, 0, Math.PI * 2);
    bgx.stroke();
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_IN + 4, RY_IN + 3, 0, 0, Math.PI * 2);
    bgx.stroke();

    const a0 = START_ANGLE;
    for (let i = 0; i < 18; i++) {
      const u0 = i / 18;
      const u1 = (i + 1) / 18;
      const rx0 = RX_IN + (RX_OUT - RX_IN) * u0;
      const ry0 = RY_IN + (RY_OUT - RY_IN) * u0;
      const rx1 = RX_IN + (RX_OUT - RX_IN) * u1;
      const ry1 = RY_IN + (RY_OUT - RY_IN) * u1;
      const p0 = ellipsePoint(rx0, ry0, a0);
      const p1 = ellipsePoint(rx1, ry1, a0);
      bgx.strokeStyle = i % 2 === 0 ? VGA.white : VGA.black;
      bgx.lineWidth = 4;
      bgx.beginPath();
      bgx.moveTo(p0.x, p0.y);
      bgx.lineTo(p1.x, p1.y);
      bgx.stroke();
    }

    bgx.fillStyle = VGA.green;
    bgx.beginPath();
    bgx.ellipse(CX, CY, RX_IN - 6, RY_IN - 6, 0, 0, Math.PI * 2);
    bgx.fill();

    bgx.fillStyle = VGA.bcyan;
    bgx.beginPath();
    bgx.ellipse(CX - 48, CY + 8, 28, 12, 0, 0, Math.PI * 2);
    bgx.fill();
    bgx.fillStyle = VGA.cyan;
    bgx.beginPath();
    bgx.ellipse(CX - 48, CY + 10, 22, 8, 0, 0, Math.PI * 2);
    bgx.fill();

    bgx.fillStyle = VGA.brown;
    bgx.fillRect(CX + 58, CY + 10, 5, 22);
    bgx.fillStyle = VGA.yellow;
    bgx.fillRect(CX + 63, CY + 8, 40, 14);
    drawText(bgx, "DERBY", CX + 67, CY + 11, VGA.red, 1, "left");

    frx.clearRect(0, 0, W, H);
    frx.strokeStyle = VGA.white;
    frx.lineWidth = 3;
    frx.beginPath();
    frx.ellipse(CX, CY, RX_OUT, RY_OUT, 0, 0, Math.PI);
    frx.stroke();
    for (let i = 0; i < 11; i++) {
      const ang = (i / 10) * Math.PI;
      const p = ellipsePoint(RX_OUT, RY_OUT, ang);
      frx.fillStyle = VGA.white;
      frx.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 4, 2, 8);
    }
  }

  function horsePixelColor(ch, body, dark) {
    switch (ch) {
      case "H":
        return body;
      case "D":
        return dark;
      case "J":
        return body;
      case "P":
        return VGA.white;
      case "C":
        return body === VGA.white ? VGA.bred : VGA.white;
      case "E":
        return VGA.white;
      case "F":
        return VGA.brown;
      case "M":
      case "T":
      case "K":
        return VGA.black;
      default:
        return null;
    }
  }

  function blitHorse(x, y, angle, frame, body, dark) {
    const rows = HORSE_FRAMES[((frame % 4) + 4) % 4];
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const ox = 12;
    const oy = 10;
    const s = HORSE_PX;
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(Math.round(x - 10), Math.round(y - 1), 20, 3);

    const plot = (sx, sy, color) => {
      const dx = sx - ox;
      const dy = sy - oy;
      const rx = Math.round(x + (dx * cos - dy * sin) * s);
      const ry = Math.round(y + (dx * sin + dy * cos) * s);
      ctx.fillStyle = color;
      ctx.fillRect(rx, ry, s, s);
    };

    for (let sy = 0; sy < rows.length; sy++) {
      for (let sx = 0; sx < rows[sy].length; sx++) {
        if (rows[sy][sx] === ".") continue;
        for (let oy2 = -1; oy2 <= 1; oy2++) {
          for (let ox2 = -1; ox2 <= 1; ox2++) {
            if (ox2 === 0 && oy2 === 0) continue;
            plot(sx + ox2, sy + oy2, VGA.black);
          }
        }
      }
    }
    for (let sy = 0; sy < rows.length; sy++) {
      for (let sx = 0; sx < rows[sy].length; sx++) {
        const color = horsePixelColor(rows[sy][sx], body, dark);
        if (!color) continue;
        plot(sx, sy, color);
      }
    }
    plot(10, 1, VGA.black);
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function beep(freq, dur, type) {
    if (muted || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  }

  function layoutCanvas() {
    const rect = stageEl.getBoundingClientRect();
    const scale = Math.max(0.5, Math.min(rect.width / W, rect.height / H));
    canvas.style.width = `${Math.floor(W * scale)}px`;
    canvas.style.height = `${Math.floor(H * scale)}px`;
  }

  function speedOf(horse) {
    return Math.min(MAX_SPEED, BASE_SPEED + horse.boost * SPEED_PER_POINT);
  }

  function award(index) {
    const horse = horses[index];
    if (!horse) return;
    horse.boost += 1;
    horse.flash = 0.22;
    if (horse.padEl) {
      horse.padEl.classList.add("flash");
      setTimeout(() => horse.padEl.classList.remove("flash"), 140);
    }
    updatePads();
    beep(220 + index * 40, 0.07);
  }

  function updatePads() {
    horses.forEach((horse) => {
      if (!horse.statsEl) return;
      horse.statsEl.innerHTML =
        `<span class="laps">LAPS ${horse.laps}</span><br>` +
        `<span class="boost">AWARDED ${horse.boost}</span>`;
    });
  }

  function ranked() {
    return horses
      .map((h, i) => ({ i, score: h.laps + (h.distance % LAP) / LAP }))
      .sort((a, b) => b.score - a.score);
  }

  function startRace(count) {
    ensureAudio();
    horses = [];
    pops = [];
    const n = count;
    for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n;
      const lane = 0.16 + 0.68 * u;
      horses.push({
        team: TEAMS[i],
        lane,
        distance: 0,
        laps: 0,
        boost: 0,
        anim: i * 0.4,
        flash: 0,
      });
    }

    controlsEl.innerHTML = "";
    horses.forEach((horse, i) => {
      const pad = document.createElement("div");
      pad.className = "team-pad";
      pad.innerHTML = `
        <div class="team-name" style="color:${horse.team.color}">${horse.team.name}</div>
        <button type="button" class="team-plus" style="background:${horse.team.color};color:${horse.team.ink}" aria-label="Award point to ${horse.team.name}">+</button>
        <div class="team-stats"></div>
      `;
      pad.querySelector(".team-plus").addEventListener("click", () => award(i));
      pad.querySelector(".team-plus").addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (horse.boost > 0) {
          horse.boost -= 1;
          updatePads();
          beep(160, 0.05);
        }
      });
      pad.querySelector(".team-plus").addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch") e.preventDefault();
      });
      horse.padEl = pad;
      horse.statsEl = pad.querySelector(".team-stats");
      controlsEl.appendChild(pad);
    });
    updatePads();

    countdown = 3;
    countdownLeft = 1;
    running = false;
    lastTs = 0;
    setupEl.classList.add("hidden");
    raceEl.classList.remove("hidden");
    layoutCanvas();
    beep(392, 0.18);
  }

  function horseWorld(horse) {
    const angle = START_ANGLE + horse.distance;
    const rx = RX_IN + (RX_OUT - RX_IN) * horse.lane;
    const ry = RY_IN + (RY_OUT - RY_IN) * horse.lane;
    const pos = ellipsePoint(rx, ry, angle);
    return { angle, rx, ry, pos, heading: tangent(rx, ry, angle) };
  }

  function completeLap(horse, index) {
    horse.laps += 1;
    const { pos } = horseWorld(horse);
    pops.push({
      text: "+1 LAP",
      color: horse.team.color,
      x: pos.x,
      y: pos.y - 18,
      life: 1.2,
      team: index,
    });
    updatePads();
    beep(660, 0.12);
    beep(880, 0.16);
  }

  function drawHud() {
    ctx.fillStyle = VGA.black;
    ctx.fillRect(0, 0, W, 16);
    ctx.fillStyle = VGA.blue;
    ctx.fillRect(0, 0, W, 14);
    drawText(ctx, "REVIEW RACE", 6, 3, VGA.yellow, 1, "left");

    const order = ranked();
    if (order.length) {
      const lead = horses[order[0].i];
      drawText(ctx, `LEAD ${lead.team.name}  LAP ${lead.laps}`, W - 6, 3, lead.team.color, 1, "right");
    }

    const cols = horses.length > 5 ? 2 : 1;
    const rowsPerCol = Math.ceil(horses.length / cols);
    const boardW = cols === 1 ? 118 : 220;
    const boardX = CX - Math.floor(boardW / 2);
    const boardY = CY - 50;
    const bh = 14 + rowsPerCol * 9;
    ctx.fillStyle = VGA.black;
    ctx.fillRect(boardX - 2, boardY - 2, boardW + 4, bh + 4);
    ctx.fillStyle = VGA.brown;
    ctx.fillRect(boardX, boardY, boardW, bh);
    ctx.fillStyle = VGA.yellow;
    ctx.fillRect(boardX + 2, boardY + 2, boardW - 4, 9);
    drawText(ctx, "LAPS / PTS", boardX + Math.floor(boardW / 2), boardY + 3, VGA.red, 1, "center");
    order.forEach((row, place) => {
      const horse = horses[row.i];
      const col = Math.floor(place / rowsPerCol);
      const rowi = place % rowsPerCol;
      const x = boardX + 4 + col * 110;
      const y = boardY + 14 + rowi * 9;
      drawText(ctx, `${place + 1} ${horse.team.name}`.slice(0, 8), x, y, horse.team.color, 1, "left");
      drawText(
        ctx,
        `${String(horse.laps).padStart(2, "0")}/${String(horse.boost).padStart(2, "0")}`,
        x + 104,
        y,
        VGA.white,
        1,
        "right"
      );
    });
  }

  function drawCountdown() {
    if (countdown <= 0 && running) return;
    const label = countdown > 0 ? String(countdown) : "GO!";
    const color = countdown > 0 ? VGA.yellow : VGA.bgreen;
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(220, 140, 200, 90);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(220, 140, 200, 90);
    drawText(ctx, label, CX, 158, color, countdown > 0 ? 8 : 5, "center");
  }

  function step(dt) {
    if (countdownLeft > 0) {
      countdownLeft -= dt;
      if (countdownLeft <= 0) {
        if (countdown > 1) {
          countdown -= 1;
          countdownLeft = 1;
          beep(392, 0.18);
        } else if (countdown === 1) {
          countdown = 0;
          countdownLeft = 0.55;
          running = true;
          beep(784, 0.32);
        } else {
          countdownLeft = 0;
        }
      }
    }

    if (running) {
      horses.forEach((horse, i) => {
        const spd = speedOf(horse);
        const before = Math.floor(horse.distance / LAP);
        horse.distance += spd * dt;
        const after = Math.floor(horse.distance / LAP);
        if (after > before) completeLap(horse, i);
        horse.anim += (0.6 + spd * 4.2) * dt;
        horse.flash = Math.max(0, horse.flash - dt);
      });
    }

    pops = pops.filter((p) => {
      p.life -= dt;
      p.y -= 22 * dt;
      return p.life > 0;
    });
  }

  function render() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bg, 0, 0);
    drawHud();

    const sprites = horses.map((horse) => {
      const world = horseWorld(horse);
      return { horse, angle: world.angle, pos: world.pos, heading: world.heading };
    });
    sprites.sort((a, b) => a.pos.y - b.pos.y);

    for (const s of sprites) {
      const frame = Math.floor(s.horse.anim) % 4;
      const body = s.horse.flash > 0 ? VGA.white : s.horse.team.color;
      blitHorse(s.pos.x, s.pos.y, s.heading, frame, body, s.horse.team.dark);
    }

    for (const pop of pops) {
      drawText(ctx, pop.text, pop.x, pop.y, pop.color, 2, "center");
    }

    if (countdownLeft > 0 || !running) drawCountdown();
  }

  function loop(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;
    if (!raceEl.classList.contains("hidden")) {
      step(dt);
      render();
    }
    requestAnimationFrame(loop);
  }

  function buildSetup() {
    countButtons.innerHTML = "";
    for (let n = 2; n <= 10; n++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "count-btn";
      btn.textContent = String(n);
      btn.addEventListener("click", () => startRace(n));
      countButtons.appendChild(btn);
    }
  }

  newRaceBtn.addEventListener("click", () => {
    raceEl.classList.add("hidden");
    setupEl.classList.remove("hidden");
    running = false;
  });

  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.textContent = muted ? "SOUND: OFF" : "SOUND: ON";
    if (!muted) ensureAudio();
  });

  document.addEventListener("keydown", (e) => {
    if (raceEl.classList.contains("hidden")) return;
    if (e.key >= "1" && e.key <= "9") {
      award(Number(e.key) - 1);
    } else if (e.key === "0") {
      award(9);
    }
  });

  window.addEventListener("resize", layoutCanvas);

  buildSpectators();
  prerenderTrack();
  buildSetup();
  layoutCanvas();
  requestAnimationFrame(loop);
})();
