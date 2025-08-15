// Clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// Open Apps
const appsContainer = document.getElementById('apps-container');
const icons = document.querySelectorAll('.icon, .dock-icon');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    openApp(icon.dataset.app);
  });
});

function openApp(name) {
  // Prevent multiple windows of same app
  if(document.getElementById(name)) return;

  const appWindow = document.createElement('div');
  appWindow.className = 'app-window';
  appWindow.id = name;

  // Header
  const header = document.createElement('div');
  header.className = 'app-header';
  header.innerHTML = `<span>${name}</span><button onclick="closeApp('${name}')">✖</button>`;
  appWindow.appendChild(header);

  // Content
  const content = document.createElement('div');
  content.className = 'app-content';
  content.innerHTML = getAppContent(name);
  appWindow.appendChild(content);

  appsContainer.appendChild(appWindow);

  // Make draggable
  dragElement(appWindow, header);
}

function closeApp(id) {
  const app = document.getElementById(id);
  if(app) app.remove();
}

function getAppContent(name) {
  switch(name){
    case 'Finder':
      return '<p>Welcome to Finder! This is your simulated file manager.</p>';
    case 'Calculator':
      return `<input type="text" id="calcInput" style="width:100%; font-size:18px; margin-bottom:10px;">
              <button onclick="calcAdd()">=</button>`;
    case 'Notes':
      const notes = localStorage.getItem('webMacOSNotes') || '';
      return `<textarea id="notesArea" style="width:100%; height:200px;">${notes}</textarea>
              <button onclick="saveNotes()">Save</button>`;
    default:
      return `<p>${name} content coming soon!</p>`;
  }
}

// Calculator Function
function calcAdd(){
  const input = document.getElementById('calcInput');
  try {
    input.value = eval(input.value);
  } catch(e){
    input.value = 'Error';
  }
}

// Notes Functions
function saveNotes(){
  const notes = document.getElementById('notesArea').value;
  localStorage.setItem('webMacOSNotes', notes);
  alert('Notes saved!');
}

// Drag Function
function dragElement(elmnt, header) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
