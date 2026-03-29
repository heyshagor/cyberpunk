// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';

        const colors = ['#0ff', '#f0f', '#ff0', '#0f0'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        particlesContainer.appendChild(particle);
    }
}

// Terminal typing effect
const terminalCommands = [
    { prompt: 'user@cyberdeck:~$', command: 'sudo whoami', delay: 500 },
    { output: 'ACCESS GRANTED: NEURAL_ADMIN', delay: 1500 },
    { prompt: 'user@cyberdeck:~$', command: 'ls -la /neural/core', delay: 3000 },
    { output: 'total 4096', delay: 500 },
    { output: 'drwxr-xr-x  2 user neural   4096 Mar 29 2077  memories', delay: 300 },
    { output: 'drwxr-xr-x  5 user neural   4096 Mar 29 2077  connections', delay: 300 },
    { output: 'drwxr-xr-x  3 user neural   4096 Mar 29 2077  upgrades', delay: 300 },
    { output: 'drwxr-x--- 10 user neural   4096 Mar 29 2077  encrypted_data', delay: 300 },
    { prompt: 'user@cyberdeck:~$', command: './initiate_protocol.sh --secure', delay: 4000 },
    { output: '> Initializing neural handshake...', delay: 800 },
    { output: '> Establishing quantum tunnel...', delay: 800 },
    { output: '> Handshake verified. Welcome to the grid.', delay: 1000 },
    { prompt: 'user@cyberdeck:~$', command: '', delay: 2000 }
];

function typeTerminal() {
    const terminal = document.getElementById('terminal-content');
    let currentLine = 0;
    let charIndex = 0;
    let isTyping = false;
    let currentText = '';

    function addLine(line, type) {
        const div = document.createElement('div');
        div.className = `terminal-line ${type}`;
        div.textContent = line;
        terminal.appendChild(div);
    }

    function typeCommand() {
        if (currentLine >= terminalCommands.length) {
            // Reset and loop
            setTimeout(() => {
                terminal.innerHTML = '';
                currentLine = 0;
                typeTerminal();
            }, 5000);
            return;
        }

        const item = terminalCommands[currentLine];

        if (item.prompt) {
            addLine(item.prompt, 'prompt');
        }

        if (item.command) {
            isTyping = true;
            currentText = '';
            const commandDiv = document.createElement('div');
            commandDiv.className = 'terminal-line command';
            terminal.appendChild(commandDiv);

            function typeChar() {
                if (charIndex < item.command.length) {
                    commandDiv.textContent = item.command.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeChar, 30);
                } else {
                    isTyping = false;
                    charIndex = 0;
                    currentLine++;
                    setTimeout(typeCommand, item.delay);
                }
            }
            typeChar();
        } else if (item.output) {
            addLine(item.output, 'output');
            currentLine++;
            setTimeout(typeCommand, item.delay);
        }
    }

    typeCommand();
}

// Smooth scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setTimeout(typeTerminal, 1000);
});