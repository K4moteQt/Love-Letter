var PHOTO_SRC = "loml.jpg";
// Changed to your custom local audio file
var bgMusic = new Audio("Baby.mp3");
bgMusic.loop = true; bgMusic.volume = 0.4;

(function () {
  var placeholder = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#ffd9a0'/><stop offset='1' stop-color='#f2966b'/></linearGradient></defs><rect width='400' height='400' fill='url(#g)'/><circle cx='200' cy='340' r='160' fill='#fff3c9' opacity='.55'/><path d='M200 260c-62-42-92-72-92-108a46 46 0 0 1 92-10 46 46 0 0 1 92 10c0 36-30 66-92 108z' fill='#fff' opacity='.85'/><text x='200' y='370' text-anchor='middle' font-family='Georgia,serif' font-style='italic' font-size='22' fill='#fff'>your photo here</text></svg>";
  document.getElementById("photo").src = PHOTO_SRC || "data:image/svg+xml;charset=utf-8," + encodeURIComponent(placeholder);

  // Background Bokeh
  var bokeh = document.querySelector(".bokeh");
  for (var i = 0; i < 16; i++) {
    var b = document.createElement("i"), s = 30 + Math.random() * 90;
    b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${20+Math.random()*80}%;animation-duration:${14+Math.random()*16}s;animation-delay:-${Math.random()*20}s`;
    bokeh.appendChild(b);
  }

  // Falling Hearts
  function startFallingHearts() {
    var style = document.createElement('style');
    style.innerHTML = `@keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg) scale(1); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg) scale(0.5); opacity: 0; } }`;
    document.head.appendChild(style);
    var heartContainer = document.createElement("div");
    heartContainer.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;";
    document.body.appendChild(heartContainer);
    setInterval(function() {
      var heart = document.createElement("div"); heart.innerHTML = "❤";
      heart.style.cssText = `position:absolute; top:-10vh; left:${Math.random()*100}vw; font-size:${Math.random()*15+10}px; color:rgba(255,120,120,${Math.random()*0.4+0.3}); animation:fall ${Math.random()*4+5}s linear forwards;`;
      heartContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 9000);
    }, 600);
  }

  // Typewriter Effect
  var letterLines = [
    "Hi Lalove,",
    "Happy Anniversary! Today marks another year of our journey together, and I want to take a moment to express just how much you mean to me.",
    "Thankyou sa pagiging ikaw love ko, alam kung andami na din nating napagdaanan, pero sobrang worth it ng mga risk na ginawa natin sa isa't isa. Thank you tlaga love kasi never mo akong pinabayaan, kahit na anong hirap ng sitwasyon, andami na din nating napagdaanan pero sa bawat isa, mas lalo lang tayong naging matatag.",
    "I love you so much, and I can't wait to see what the future holds for us.",
    "Naaalala ko pa rin yung una tayong magkakilala, simpleng crim or criminal pa lang hahaha di ko ineexpect na magiging ganito tayo, pero sa bawat araw na lumilipas, mas lalo lang akong nahuhulog sa'yo. You are my best friend, my confidant, and the love of my life.",
    "Dahil din sayo parang nabuhayan akong labanan lahat ng mga pagsubok sa buhay, kasi alam kong andiyan ka palagi para sa'kin. I promise to always be there for you, to support you in your dreams, and to love you unconditionally.",
    "Thankyou tlaga love ko, sa pagiging ikaw at sa lahat ng mga bagay na ginagawa mo para sa'kin. I am so grateful to have you in my life, and I look forward to many more anniversaries together.",
    "Happy anniversary Love. Sobrang Blessed ako na meron akong ikaw! mwaa ❤"
  ];
  
  function typeLetter() {
    var container = document.getElementById("typewriter-container");
    var lineIndex = 0, charIndex = 0;
    var currentParagraph = document.createElement("p");
    if(lineIndex === 0) currentParagraph.className = "salute";
    container.appendChild(currentParagraph);

    function typeChar() {
      if (lineIndex < letterLines.length) {
        if (charIndex < letterLines[lineIndex].length) {
          currentParagraph.innerHTML = letterLines[lineIndex].substring(0, charIndex + 1) + '<span class="cursor"></span>';
          charIndex++;
          setTimeout(typeChar, 35); // Typing speed
        } else {
          currentParagraph.innerHTML = letterLines[lineIndex]; // Remove cursor from finished line
          lineIndex++; charIndex = 0;
          if (lineIndex < letterLines.length) {
            currentParagraph = document.createElement("p");
            container.appendChild(currentParagraph);
            setTimeout(typeChar, 500); // Pause between paragraphs
          } else {
            document.getElementById("sign-off").style.opacity = 1;
            document.getElementById("sign-off").style.transition = "opacity 2s ease";
          }
        }
      }
    }
    typeChar();
  }

  // Scratch-Off Logic
  function setupScratchOff() {
    var canvas = document.getElementById("scratch-pad"), ctx = canvas.getContext("2d");
    var img = document.getElementById("photo");
    canvas.width = img.offsetWidth; canvas.height = img.offsetHeight;
    
    // Updated to match the pink/purple theme!
    ctx.fillStyle = "#d8bce6"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Caveat, cursive"; ctx.fillStyle = "#4a245e"; ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal...", canvas.width/2, canvas.height/2);

    var isDrawing = false;
    function getMousePos(evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: (evt.clientX || evt.touches[0].clientX) - rect.left,
        y: (evt.clientY || evt.touches[0].clientY) - rect.top
      };
    }
    function startDrawing(e) { isDrawing = true; scratch(e); }
    function stopDrawing() { isDrawing = false; }
    function scratch(e) {
      if (!isDrawing) return;
      e.preventDefault();
      var pos = getMousePos(e);
      ctx.globalCompositeOperation = "destination-out"; // Erases the top layer
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 25, 0, Math.PI*2); ctx.fill();
    }
    canvas.addEventListener("mousedown", startDrawing); canvas.addEventListener("mousemove", scratch); canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing); canvas.addEventListener("touchmove", scratch); canvas.addEventListener("touchend", stopDrawing);
  }

  // Phase 1: The Choice
  var intro = document.getElementById("intro"), stage = document.getElementById("stage"), envelopeWrapper = document.getElementById("envelope-wrapper");
  var btnYes = document.getElementById("btn-yes"), btnNo = document.getElementById("btn-no");

  function moveNoButton() {
    var maxX = (window.innerWidth / 2) - btnNo.offsetWidth, maxY = (window.innerHeight / 2) - btnNo.offsetHeight;
    btnNo.style.transform = `translate(${(Math.random()*2-1)*maxX}px, ${(Math.random()*2-1)*maxY}px)`;
    btnNo.style.transition = "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)";
  }
  btnNo.addEventListener("mouseover", moveNoButton); btnNo.addEventListener("touchstart", function(e){ e.preventDefault(); moveNoButton(); });

  btnYes.addEventListener("click", function () {
    btnYes.disabled = true; intro.classList.add("leaving");
    // Removed music trigger from here
    setTimeout(function () {
      intro.hidden = true; envelopeWrapper.hidden = false;
      startFallingHearts();
    }, 900);
  });

  // Phase 2: Opening the Envelope
  var envelope = document.getElementById("envelope");
  envelope.addEventListener("click", function() {
    envelope.classList.add("open");
    
    // Music triggers right here when she clicks the envelope!
    bgMusic.play().catch(e => console.log("Audio blocked.", e));

    setTimeout(function() {
      envelopeWrapper.classList.add("hidden-fade");
      setTimeout(function() {
        envelopeWrapper.hidden = true; stage.hidden = false; window.scrollTo(0,0);
        document.querySelector(".reveal").classList.add("in"); // Reveal Title
        document.querySelector(".polaroid").classList.add("in"); // Reveal Photo border
        setupScratchOff(); 
        typeLetter();
      }, 1000);
    }, 1200);
  });
})();