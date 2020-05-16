
const $body = document.body;
let currentTab;

init();
$body.addEventListener('click', onClick);

async function init() {
    currentTab = await getCurrentTab();
    const { names } = await messageTab({ popup: true });
    names.forEach(addButton);
}

function onClick(event) {
    messageTab({ button: event.target.value });
    window.close();
}

async function getCurrentTab() {
    const [tab] = await browser.tabs.query({ currentWindow: true, active: true });
    return tab;
}

async function messageTab(message) {
    return await browser.tabs.sendMessage(currentTab.id, message);
}

function addButton(name, index) {
    const $button = document.createElement('button');
    $button.textContent = name;
    $button.value = index;
    $body.appendChild($button);
}
