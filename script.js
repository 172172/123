document.addEventListener('DOMContentLoaded', function() {
    // Lösningen är att deklarera mainMachines och machines i samma scope
    // Och definiera machines INNAN mainMachines används i funktionerna

    // VIKTIGT: Flytta machines-deklarationen före alla funktionsanrop
    const machines = [
        {
            id: 1,
            name: 'Tappen',
            description: 'Huvudfyllningsmaskinen för ölburkar och flaskor',
            tasks: [
                { 
                    id: 101, 
                    title: 'Justera fyllningshöjd', 
                    description: 'Ställ in rätt fyllningshöjd enligt produktspecifikation', 
                    completed: false,
                    moreInfo: `<h4>Justering av fyllningshöjd</h4>
                    <p>Fyllningshöjden är kritisk för att säkerställa rätt mängd produkt i varje förpackning. För låg nivå kan leda till missnöjda kunder, medan för hög nivå kan orsaka spill och felaktig förslutning.</p>
                    <ol>
                        <li>Lokalisera justeringsskruven på fyllningscylindern</li>
                        <li>Använd lämplig skruvnyckel för att justera höjden</li>
                        <li>Medurs rotation ökar fyllningshöjden</li>
                        <li>Moturs rotation minskar fyllningshöjden</li>
                        <li>Testa med 5-10 burkar och mät nivån</li>
                    </ol>
                    <p>Kom ihåg att olika produkter kan kräva olika fyllningshöjder enligt receptspecifikationen.</p>`,
                    image: 'images/fyllningshoejd.jpg'
                },
                { 
                    id: 102, 
                    title: 'Byta produkttryck', 
                    description: 'Justera produkttrycket till korrekt nivå enligt recept', 
                    completed: false,
                    moreInfo: `<h4>Justering av produkttryck</h4>
                    <p>Produkttrycket påverkar fyllningshastigheten och mängden skum som bildas under fyllningsprocessen. Det behöver anpassas efter produktens typ och temperatur.</p>
                    <p>Normala tryckintervaller:</p>
                    <ul>
                        <li>Lager: 1.2-1.5 bar</li>
                        <li>Stout: 1.5-1.8 bar</li>
                        <li>Alkoholfri: 0.9-1.2 bar</li>
                    </ul>
                    <p><strong>OBS!</strong> Använd alltid tryckmätare för att verifiera inställningen.</p>`,
                    image: 'images/produkttryck.jpg'
                },
                { id: 103, title: 'Rengöra fyllningsventiler', description: 'Rengör alla ventiler med desinfektionsmedel', completed: false },
                { id: 104, title: 'Kontrollera CO₂-nivåer', description: 'Säkerställ att CO₂-nivåerna är inom specifikationen', completed: false },
                { id: 105, title: 'Justera sköljare', description: 'Kalibrera sköljarens positioner för aktuell förpackningstyp', completed: false }
            ]
        },
        {
            id: 2,
            name: 'Fals',
            description: 'Försluter burkarna efter fyllning',
            tasks: [
                { id: 201, title: 'Justera falshjul', description: 'Ställ in falshjulen för korrekt förslutning', completed: false },
                { id: 202, title: 'Kalibrera falsrullar', description: 'Justera falsrullarnas tryck enligt burktypens specifikation', completed: false },
                { id: 203, title: 'Kontrollera falsmått', description: 'Mät falsmåtten enligt kvalitetsstandard och produkt', completed: false },
                { id: 204, title: 'Rengöra falsstationer', description: 'Rengör alla falsstationer och komponenter', completed: false },
                { id: 205, title: 'Byta format', description: 'Ställ om maskinen till rätt burkformat', completed: false }
            ]
        },
        {
            id: 3,
            name: 'Banor',
            description: 'Transportband och övergångar mellan maskiner',
            tasks: [
                { id: 301, title: 'Justera bandbredd', description: 'Ställ in rätt bredd för den aktuella förpackningstypen', completed: false },
                { id: 302, title: 'Kontrollera bandhastighet', description: 'Justera hastigheten för optimal produktion', completed: false },
                { id: 303, title: 'Smörja glidytor', description: 'Smörj alla glidytor för minskad friktion', completed: false },
                { id: 304, title: 'Kontrollera övergångar', description: 'Säkerställ att alla övergångar mellan band är jämna', completed: false },
                { id: 305, title: 'Rengöra spårning', description: 'Rengör och justera banornas spårningssystem', completed: false }
            ]
        },
        {
            id: 4,
            name: 'Kister',
            description: 'Förpackar burkar/flaskor i lådor/backar',
            tasks: [
                { 
                    id: 401, 
                    title: 'Ändra format', 
                    description: 'Justera för rätt förpackningsformat och antal', 
                    completed: false,
                    moreInfo: `<h4>Formatbyte för kister</h4>
                    <p>Vid formatbyte behöver du justera flera komponenter för att anpassa maskinen till den nya förpackningsstorleken:</p>
                    <ol>
                        <li>Kontrollera att rätt format är valt i HMI-panelen</li>
                        <li>Justera sidoguiderna med handhjulen</li>
                        <li>Ändra höjden på transportbandet med korrekt inställning</li>
                        <li>Justera packningshuvudet för det nya antalet</li>
                        <li>Kör ett testförpackning i låg hastighet före produktion</li>
                    </ol>
                    <p>För specifika formatinställningar, se formatboken som finns vid maskinen.</p>`,
                    image: 'images/kister_format.jpg'
                },
                { id: 402, title: 'Kontrollera separatorer', description: 'Säkerställ att separatorerna fungerar korrekt', completed: false },
                { id: 403, title: 'Justera pusher', description: 'Kalibrera pusherns position och tryck', completed: false },
                { id: 404, title: 'Kontrollera lådinmatning', description: 'Verifiera att lådorna matas in korrekt', completed: false },
                { id: 405, title: 'Rengöra sensorer', description: 'Rengör alla optiska sensorer och reflektorer', completed: false }
            ]
        },
        {
            id: 5,
            name: 'OCME',
            description: 'Kartongpackare för sekundär förpackning',
            tasks: [
                { id: 501, title: 'Ställa om kartongmagasin', description: 'Justera magasinet för rätt kartongstorlek', completed: false },
                { id: 502, title: 'Byta lim', description: 'Kontrollera och fyll på rätt typ av lim', completed: false },
                { id: 503, title: 'Justera vakuumsugkoppar', description: 'Ställ in sugkopparnas position för aktuell kartong', completed: false },
                { id: 504, title: 'Kalibrera vikmekanism', description: 'Justera vikarna för korrekt förslutning av kartong', completed: false },
                { id: 505, title: 'Kontrollera tryckluftsystem', description: 'Verifiera att tryckluftsystemet fungerar korrekt', completed: false }
            ]
        },
        {
            id: 6,
            name: 'Jones',
            description: 'Automatisk kartongförslutare',
            tasks: [
                { id: 601, title: 'Byta tejprulle', description: 'Installera ny tejprulle med rätt bredd', completed: false },
                { id: 602, title: 'Justera bandbredd', description: 'Ställ in rätt bandbredd för aktuell förpackning', completed: false },
                { id: 603, title: 'Kalibrera bandhöjd', description: 'Justera bandhöjden enligt kartongstorlek', completed: false },
                { id: 604, title: 'Kontrollera tejpsträckning', description: 'Säkerställ korrekt sträckning av tejpen', completed: false },
                { id: 605, title: 'Rengöra skärblad', description: 'Rengör och kontrollera skärbladens skick', completed: false }
            ]
        },
        {
          
            id: 8,
            name: 'Pallastaren',
            description: 'Staplare för färdiga produkter på pall',
            tasks: [
                { id: 801, title: 'Justera pallmönster', description: 'Ställ in rätt pallmönster enligt specifikation', completed: false },
                { id: 802, title: 'Kontrollera pneumatik', description: 'Verifiera att pneumatiksystemet fungerar korrekt', completed: false },
                { id: 803, title: 'Kalibrera lyfthöjder', description: 'Justera lyfthöjder för korrekt pallstapling', completed: false },
                { id: 804, title: 'Kontrollera pallinmatning', description: 'Säkerställ att nya pallar matas in korrekt', completed: false },
                { id: 805, title: 'Byta sträckfilm', description: 'Installera ny sträckfilm om nödvändigt', completed: false },
                { id: 806, title: 'Rengöra sensorer', description: 'Rengör alla optiska sensorer och reflektorer', completed: false }
            ]
        },
        // Nya maskiner
        {
            id: 21,
            name: 'Banor',
            description: 'Transportbanor för Depalleteraren',
            tasks: [
                { id: 2101, title: 'Justera bandbredd', description: 'Ställ in rätt bredd för den aktuella förpackningstypen', completed: false },
                { id: 2102, title: 'Kontrollera bandhastighet', description: 'Justera hastigheten för optimal produktion', completed: false },
                { id: 2103, title: 'Smörja glidytor', description: 'Smörj alla glidytor för minskad friktion', completed: false },
                { id: 2104, title: 'Kontrollera övergångar', description: 'Säkerställ att alla övergångar mellan band är jämna', completed: false },
                { id: 2105, title: 'Rengöra spårning', description: 'Rengör och justera banornas spårningssystem', completed: false }
            ]
        },
        {
            id: 22,
            name: 'Heuftar',
            description: 'Hanterar flaskhanteringen i tappen',
            tasks: [
                { id: 2201, title: 'Justera gripdon', description: 'Anpassa gripdonen för aktuell flasktyp', completed: false },
                { id: 2202, title: 'Kontrollera pneumatik', description: 'Säkerställ att pneumatiksystemet fungerar korrekt', completed: false },
                { id: 2203, title: 'Kalibrera positionering', description: 'Kalibrera positioneringen för optimal hantering', completed: false },
                { id: 2204, title: 'Rengöra komponenter', description: 'Rengör alla komponenter enligt hygienkrav', completed: false },
                { id: 2205, title: 'Kontrollera slitage', description: 'Kontrollera slitage på kritiska delar', completed: false }
            ]
        },
        {
            id: 23,
            name: 'Blåsen',
            description: 'Rengör förpackningarna med tryckluft före fyllning',
            tasks: [
                { id: 2301, title: 'Kontrollera lufttryck', description: 'Verifiera att lufttrycket är korrekt inställt', completed: false },
                { id: 2302, title: 'Rengöra munstycken', description: 'Rengör alla munstycken från smuts och partiklar', completed: false },
                { id: 2303, title: 'Justera position', description: 'Justera munstyckenas position för aktuell förpackningstyp', completed: false },
                { id: 2304, title: 'Kontrollera filter', description: 'Kontrollera och byt filter vid behov', completed: false },
                { id: 2305, title: 'Testa funktion', description: 'Testa att blåsfunktionen fungerar korrekt på alla stationer', completed: false }
            ]
        },
        {
            id: 24,
            name: 'Banor',
            description: 'Transportbanor för Packmaskinerna',
            tasks: [
                { id: 2401, title: 'Justera bandbredd', description: 'Ställ in rätt bredd för den aktuella förpackningstypen', completed: false },
                { id: 2402, title: 'Kontrollera bandhastighet', description: 'Justera hastigheten för optimal produktion', completed: false },
                { id: 2403, title: 'Smörja glidytor', description: 'Smörj alla glidytor för minskad friktion', completed: false },
                { id: 2404, title: 'Kontrollera övergångar', description: 'Säkerställ att alla övergångar mellan band är jämna', completed: false },
                { id: 2405, title: 'Rengöra spårning', description: 'Rengör och justera banornas spårningssystem', completed: false }
            ]
        },
        {
            id: 25,
            name: 'Handtagsapplikator',
            description: 'Applicerar handtag på förpackningar',
            tasks: [
                { id: 2501, title: 'Ladda handtagsmaterial', description: 'Fyll på med rätt typ av handtagsmaterial', completed: false },
                { id: 2502, title: 'Justera applikatorposition', description: 'Ställ in rätt position för handtagsapplicering', completed: false },
                { id: 2503, title: 'Kontrollera limtemperatur', description: 'Säkerställ att limmet har rätt temperatur', completed: false },
                { id: 2504, title: 'Kalibrera sensorer', description: 'Kalibrera sensorerna för korrekt förpackningsdetektering', completed: false },
                { id: 2505, title: 'Testa funktion', description: 'Testa applikatorn med några förpackningar', completed: false }
            ]
        },
        {
            id: 26,
            name: 'Divider',
            description: 'Separerar och riktar förpackningar',
            tasks: [
                { id: 2601, title: 'Justera avstånd', description: 'Ställ in korrekt avstånd mellan guideskenor', completed: false },
                { id: 2602, title: 'Kontrollera delningsfunktion', description: 'Säkerställ att förpackningarna delas korrekt', completed: false },
                { id: 2603, title: 'Smörja mekanismer', description: 'Smörj rörliga delar för optimal funktion', completed: false },
                { id: 2604, title: 'Rengöra guideytor', description: 'Rengör alla guideytor från smuts och skräp', completed: false },
                { id: 2605, title: 'Kalibrera hastighet', description: 'Ställ in hastigheten för optimal produktion', completed: false }
            ]
        },
        {
            id: 27,
            name: 'Banor',
            description: 'Transportbanor för Pallastaren',
            tasks: [
                { id: 2701, title: 'Justera bandbredd', description: 'Ställ in rätt bredd för den aktuella förpackningstypen', completed: false },
                { id: 2702, title: 'Kontrollera bandhastighet', description: 'Justera hastigheten för optimal produktion', completed: false },
                { id: 2703, title: 'Smörja glidytor', description: 'Smörj alla glidytor för minskad friktion', completed: false },
                { id: 2704, title: 'Kontrollera övergångar', description: 'Säkerställ att alla övergångar mellan band är jämna', completed: false },
                { id: 2705, title: 'Rengöra spårning', description: 'Rengör och justera banornas spårningssystem', completed: false }
            ]
        },
        {
            id: 28,
            name: 'Pallastare 1/2',
            description: 'Staplar förpackningar på pallar',
            tasks: [
                { id: 2801, title: 'Justera pallmönster', description: 'Ställ in rätt pallmönster enligt specifikation', completed: false },
                { id: 2802, title: 'Kontrollera gripdon', description: 'Säkerställ att gripdonen fungerar korrekt', completed: false },
                { id: 2803, title: 'Kalibrera sensorer', description: 'Justera sensorer för korrekt förpackningsdetektering', completed: false },
                { id: 2804, title: 'Kontrollera pallinmatning', description: 'Säkerställ att nya pallar matas in korrekt', completed: false },
                { id: 2805, title: 'Rengöra grippytor', description: 'Rengör alla grippytor för optimal funktion', completed: false }
            ]
        },
        {
            id: 29,
            name: 'Hiss',
            description: 'Hissmekanismen för Depalleteraren',
            tasks: [
                { id: 2901, title: 'Kontrollera lyftmekanism', description: 'Säkerställ att lyftmekanismen fungerar korrekt', completed: false },
                { id: 2902, title: 'Justera lyfthöjd', description: 'Kalibrera lyfthöjden för optimal funktion', completed: false },
                { id: 2903, title: 'Smörja kedjetransmission', description: 'Smörj kedjor och kugghjul', completed: false },
                { id: 2904, title: 'Kontrollera säkerhetsspärrar', description: 'Verifiera att alla säkerhetsspärrar fungerar', completed: false },
                { id: 2905, title: 'Rengöra guideskenor', description: 'Rengör alla guideskenor från smuts och skräp', completed: false }
            ]
        }
    ];

    // Nu kan mainMachines använda machines-arrayen
    const mainMachines = [
        {
            id: 1,
            name: 'Depalleteraren',
            description: 'Avlastare för tomma burkar/flaskor',
            submachines: [29, 21] // Referenser till Depall, Hiss och Banor
        },
        {
            id: 2,
            name: 'Tappen',
            description: 'Fyllning och förslutning av burkar/flaskor',
            submachines: [1, 2, 3, 22, 23] // Referenser till Tapp, Fals, Banor, Heuftar och Blåsen
        },
        {
            id: 3,
            name: 'Packmaskinerna',
            description: 'Paketeringsmaskiner för färdiga produkter',
            submachines: [4, 5, 6, 24, 25, 26] // Referenser till Kister, OCME, Jones, Banor, Handtagsapplikator och Divider
        },
        {
            id: 4,
            name: 'Pallastaren',
            description: 'Staplare för färdiga produkter på pall',
            submachines: [8, 28, 27] // Referenser till Pallastaren, Pallastare 1/2 och Banor
        }
    ];

    const machineList = document.getElementById('machine-list');
    const machineDetails = document.getElementById('machine-details');
    const machineNameElement = document.getElementById('machine-name');
    const taskList = document.getElementById('task-list');
    const backButton = document.getElementById('back-to-list');
    const themeToggle = document.querySelector('.theme-toggle');
    const markAllCompleteButton = document.getElementById('mark-all-complete');
    
    let currentMachine = null;
    let currentMainMachine = null;

    // Ladda sparad status från localStorage
    const savedTasks = JSON.parse(localStorage.getItem('taskStatus')) || {};
    
    // Uppdatera task status från sparad data
    machines.forEach(machine => {
        machine.tasks.forEach(task => {
            if (savedTasks[task.id] !== undefined) {
                task.completed = savedTasks[task.id];
            }
        });
    });
    
    // Ladda sparad temainställning
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Rendera huvudmaskinlistan
    function renderMainMachineList() {
        machineList.innerHTML = '';
        mainMachines.forEach(mainMachine => {
            // Beräkna total framsteg för alla undermaskiner
            let totalTasks = 0;
            let completedTasks = 0;
            
            mainMachine.submachines.forEach(submachineId => {
                const submachine = machines.find(m => m.id === submachineId);
                if (submachine) {
                    totalTasks += submachine.tasks.length;
                    completedTasks += submachine.tasks.filter(task => task.completed).length;
                }
            });
            
            const progressPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            const card = document.createElement('div');
            card.className = 'machine-card';
            card.dataset.id = mainMachine.id;
            
            let statusLabel = '';
            let statusClass = ''; 
            
            if (progressPercentage === 100) {
                statusLabel = 'Klar';
                statusClass = 'status-complete';
            } else if (progressPercentage > 0) {
                statusLabel = 'Pågående';
                statusClass = 'status-progress';
            } else {
                statusLabel = 'Ej påbörjad';
                statusClass = 'status-not-started';
            }
            
            card.innerHTML = `
                <h3>${mainMachine.name}</h3>
                <p>${mainMachine.description}</p>
                <div class="progress-indicator">
                    <div class="progress-value" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="card-footer">
                    <span>${completedTasks} av ${totalTasks} uppgifter klara</span>
                    <span class="status-label ${statusClass}">${statusLabel}</span>
                </div>
            `;
            
            card.addEventListener('click', () => showSubmachineList(mainMachine));
            machineList.appendChild(card);
        });
    }

    // Visa lista med undermaskiner
    function showSubmachineList(mainMachine) {
        currentMainMachine = mainMachine;
        machineNameElement.textContent = mainMachine.name;
        
        // Skapa och visa lista med undermaskiner
        taskList.innerHTML = '';
        
        // Lägg till loggning för debugging
        console.log("Visar submaskiner för:", mainMachine.name);
        console.log("Submaskiner IDs:", mainMachine.submachines);
        
        // *** VIKTIG FIX HÄR: Loopa igenom submachines och hitta motsvarande i machines-arrayen ***
        if (mainMachine.submachines && mainMachine.submachines.length > 0) {
            mainMachine.submachines.forEach(submachineId => {
                const submachine = machines.find(m => m.id === submachineId);
                if (submachine) {
                    // Resten av koden för att rendera submachines...
                    const completedTasks = submachine.tasks.filter(task => task.completed).length;
                    const totalTasks = submachine.tasks.length;
                    const progressPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
                    
                    const submachineElement = document.createElement('div');
                    submachineElement.className = 'submachine-item';
                    
                    // Bestäm status-klass och text baserat på progress
                    let statusClass = '';
                    let statusLabel = '';
                    
                    if (progressPercentage === 100) {
                        statusClass = 'status-complete';
                        statusLabel = 'Klar';
                    } else if (progressPercentage > 0) {
                        statusClass = 'status-progress';
                        statusLabel = 'Pågående';
                    } else {
                        statusClass = 'status-not-started';
                        statusLabel = 'Ej påbörjad';
                    }
                    
                    submachineElement.innerHTML = `
                        <div class="submachine-content">
                            <div class="submachine-header">
                                <div class="submachine-title">${submachine.name}</div>
                            </div>
                            <div class="submachine-description">${submachine.description}</div>
                            <div class="progress-indicator small">
                                <div class="progress-value ${statusClass}" style="width: ${progressPercentage}%"></div>
                            </div>
                            <div class="card-footer">
                                <span class="task-count">${completedTasks} av ${totalTasks} uppgifter klara</span>
                                <span class="status-label ${statusClass}">${statusLabel}</span>
                            </div>
                        </div>
                    `;
                    
                    submachineElement.addEventListener('click', () => showMachineDetails(submachine));
                    taskList.appendChild(submachineElement);
                } else {
                    console.error(`Kunde inte hitta maskin med ID: ${submachineId}`);
                }
            });
        } else {
            // Visa ett meddelande om det inte finns några undermaskiner
            taskList.innerHTML = '<p class="no-submachines">Inga undermaskiner hittades för denna maskin.</p>';
            console.error("Inga submachines för:", mainMachine.name);
        }
        
        // Uppdatera UI för undermaskinsläge
        machineList.style.display = 'none';
        machineDetails.style.display = 'block';
        document.getElementById('progress-bar').parentElement.style.display = 'block';
        
        // Ändra tillbaka-knappens text
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Tillbaka till huvudmaskiner';
        
        // Dölj "Markera alla som klara" knappen i detta läge
        markAllCompleteButton.style.display = 'none';
        
        // Animera in detaljer
        machineDetails.style.opacity = 0;
        machineDetails.style.transform = 'translateY(20px)';
        setTimeout(() => {
            machineDetails.style.opacity = 1;
            machineDetails.style.transform = 'translateY(0)';
        }, 10);
    }

    // Visa detaljer för en specifik maskin
    function showMachineDetails(machine) {
        currentMachine = machine;
        machineNameElement.textContent = machine.name;
        renderTaskList();
        updateProgressBar();
        
        document.getElementById('machine-tasks-container').style.display = 'block';
        document.getElementById('progress-container').style.display = 'block';
        
        // Ändra tillbaka-knappens text baserat på om vi kom från huvudmaskinlistan eller en undermaskinlista
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Tillbaka till ' + currentMainMachine.name;
        
        // Visa "Markera alla som klara" knappen i detta läge
        markAllCompleteButton.style.display = 'block';
    }

    // Händelselyssnare för tillbaka-knappen - modifierad för att hantera hierarkin
    backButton.addEventListener('click', () => {
        if (currentMachine) {
            // Gå tillbaka till undermaskinlistan
            currentMachine = null;
            showSubmachineList(currentMainMachine);
        } else if (currentMainMachine) {
            // Gå tillbaka till huvudmaskinlistan
            currentMainMachine = null;
            machineDetails.style.display = 'none';
            machineList.style.display = 'grid';
        }
    });

    // Rendera tasklistan
    function renderTaskList() {
        taskList.innerHTML = '';
        currentMachine.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            // Lägg till mer information för vissa uppgifter
            const hasMoreInfo = task.moreInfo || task.image; // Om uppgiften har mer info eller en bild
            const infoButton = hasMoreInfo ? 
                `<button class="info-button" data-id="${task.id}"><i class="fas fa-info-circle"></i></button>` : '';
            
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                </div>
                ${infoButton}
            `;
            
            const checkbox = taskElement.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                taskElement.classList.toggle('completed', checkbox.checked);
                updateProgressBar();
                saveTaskStatus();
                renderMainMachineList(); // Uppdatera även huvudmaskinlistan
            });
            
            // Lägg till eventlyssnare för info-knappen om den finns
            const infoBtnElement = taskElement.querySelector('.info-button');
            if (infoBtnElement) {
                infoBtnElement.addEventListener('click', (e) => {
                    e.stopPropagation(); // Förhindra att klicket påverkar andra element
                    showTaskDetails(task);
                });
            }
            
            taskList.appendChild(taskElement);
        });
    }

    // Lägg till en ny funktion för att visa detaljerad information om en uppgift
    function showTaskDetails(task) {
        // Skapa en modal för att visa mer information
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Bestäm innehållet baserat på tillgänglig information
        let imageHTML = '';
        if (task.image) {
            imageHTML = `<div class="modal-image"><img src="${task.image}" alt="${task.title}"></div>`;
        }
        
        let detailedInfoHTML = '';
        if (task.moreInfo) {
            detailedInfoHTML = `<div class="modal-detailed-info">${task.moreInfo}</div>`;
        }
        
        // Skapa modalen med innehållet
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${task.title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    ${imageHTML}
                    <p class="modal-description">${task.description}</p>
                    ${detailedInfoHTML}
                </div>
            </div>
        `;
        
        // Lägg till modalen i body
        document.body.appendChild(modal);
        
        // Visa modalen med animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Lägg till eventlyssnare för att stänga modalen
        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Stäng modalen om man klickar utanför innehållet
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }

    // Uppdatera progressbaren
    function updateProgressBar() {
        const completedTasks = currentMachine.tasks.filter(task => task.completed).length;
        const totalTasks = currentMachine.tasks.length;
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
        
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        // Skapa fyllningen om den inte redan finns
        let fill = progressBar.querySelector('.fill');
        if (!fill) {
            fill = document.createElement('div');
            fill.className = 'fill';
            progressBar.appendChild(fill);
        }
        
        fill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% klar`;
    }

    // Spara uppgiftsstatus i localStorage
    function saveTaskStatus() {
        const taskStatus = {};
        machines.forEach(machine => {
            machine.tasks.forEach(task => {
                taskStatus[task.id] = task.completed;
            });
        });
        localStorage.setItem('taskStatus', JSON.stringify(taskStatus));
    }

    // Byt tema (mörkt/ljust)
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkTheme', isDarkTheme);
    });
    
    // Markera alla uppgifter som klara
    markAllCompleteButton.addEventListener('click', () => {
        currentMachine.tasks.forEach(task => {
            task.completed = true;
        });
        renderTaskList();
        updateProgressBar();
        saveTaskStatus();
        renderMainMachineList();
    });

    // Initiera app
    renderMainMachineList();

    // Administration functionality
    let adminMode = false;
    let keySequence = '';
    let selectedMachine = null;
    
    // Elements
    const adminBtn = document.getElementById('admin-btn');
    const adminPanel = document.getElementById('admin-panel');
    const closeAdminBtn = document.getElementById('close-admin');
    const reorderMachinesBtn = document.getElementById('reorder-machines');
    const addMachineBtn = document.getElementById('add-machine');
    const editSelectedBtn = document.getElementById('edit-selected');
    const deleteSelectedBtn = document.getElementById('delete-selected');
    const addTaskBtn = document.getElementById('add-task');
    const importExportBtn = document.getElementById('import-export');
    const adminLogoutBtn = document.getElementById('admin-logout');
    
    // Osynlig inloggning med tangenttryckningar
    document.addEventListener('keydown', function(e) {
        // Om redan inloggad eller i detalj-vy, avbryt
        if (adminMode || machineDetails.style.display === 'block') return;
        
        // Lagra endast siffertangenter
        if (e.key >= '0' && e.key <= '9') {
            keySequence += e.key;
            
            // Kontrollera om lösenordskoden (1234) har matats in
            if (keySequence.endsWith('1234')) {
                enableAdminMode();
                keySequence = ''; // Rensa koden
            }
            
            // Begränsa längden för att undvika minnesproblem
            if (keySequence.length > 20) {
                keySequence = keySequence.substring(keySequence.length - 10);
            }
        }
    });
    
    // Aktivera adminläge
    function enableAdminMode() {
        adminMode = true;
        adminBtn.style.display = 'flex';
        
        // Visa admin-meddelande
        showNotification('Administratörsläge aktiverat');
        
        // Markera adminstatus i localStorage
        localStorage.setItem('adminMode', 'true');
    }
    
    // Visa/dölj admin-panelen
    adminBtn.addEventListener('click', function() {
        adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
        
        if (adminPanel.style.display === 'block') {
            // Avmarkera alla valda maskiner när panelen öppnas
            document.querySelectorAll('.machine-card.selected').forEach(card => {
                card.classList.remove('selected');
            });
            selectedMachine = null;
            addTaskBtn.disabled = true;
            editSelectedBtn.disabled = true;
            deleteSelectedBtn.disabled = true;
        }
    });
    
    // Stäng admin-panelen
    closeAdminBtn.addEventListener('click', function() {
        adminPanel.style.display = 'none';
    });
    
    // Logga ut från admin-läge
    adminLogoutBtn.addEventListener('click', function() {
        adminMode = false;
        adminBtn.style.display = 'none';
        adminPanel.style.display = 'none';
        document.body.classList.remove('admin-active');
        
        // Rensa admin-relaterade variabler
        selectedMachine = null;
        localStorage.removeItem('adminMode');
        
        // Uppdatera UI för normal visning
        renderMainMachineList();
        showNotification('Utloggad från administratörsläge');
    });
    
    // Kontrollera om admin-läget var aktivt tidigare i sessionen
    if (localStorage.getItem('adminMode') === 'true') {
        enableAdminMode();
    }
    
    // Funktionalitet för att ändra maskinordning
    reorderMachinesBtn.addEventListener('click', function() {
        // Växla admin-aktivt tillstånd
        document.body.classList.toggle('admin-active');
        
        if (document.body.classList.contains('admin-active')) {
            // Återrendera listan med drag-handtag
            renderMainMachineList(true);
            adminPanel.style.display = 'none'; // Dölj admin-panelen
            initDragAndDrop();
            showNotification('Dra maskinerna för att ändra ordning');
        } else {
            renderMainMachineList();
            showNotification('Ny ordning sparad');
        }
    });
    
    // Initiera drag-and-drop funktionalitet
    function initDragAndDrop() {
        const cards = document.querySelectorAll('.machine-card');
        
        cards.forEach(card => {
            card.setAttribute('draggable', 'true');
            
            card.addEventListener('dragstart', function() {
                this.classList.add('dragging');
            });
            
            card.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                saveMachineOrder();
            });
            
            // Klickhändelse för att välja maskin
            card.addEventListener('click', function(e) {
                if (document.body.classList.contains('admin-active')) {
                    e.stopPropagation(); // Förhindra normal maskinklickning
                    
                    // Om en drag-handtag trycktes, hoppa över
                    if (e.target.classList.contains('drag-handle') || 
                        e.target.parentElement.classList.contains('drag-handle')) {
                        return;
                    }
                    
                    // Avmarkera alla andra maskiner
                    document.querySelectorAll('.machine-card.selected').forEach(card => {
                        if (card !== this) card.classList.remove('selected');
                    });
                    
                    // Växla vald status
                    this.classList.toggle('selected');
                    
                    // Uppdatera vald maskin
                    if (this.classList.contains('selected')) {
                        selectedMachine = machines.find(m => m.id === parseInt(this.dataset.id));
                        addTaskBtn.disabled = false;
                        editSelectedBtn.disabled = false;
                        deleteSelectedBtn.disabled = false;
                    } else {
                        selectedMachine = null;
                        addTaskBtn.disabled = true;
                        editSelectedBtn.disabled = true;
                        deleteSelectedBtn.disabled = true;
                    }
                }
            });
        });
        
        // Händelser för dragmål (drop zone)
        const container = document.getElementById('machine-list');
        
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(container, e.clientY);
            
            if (afterElement) {
                container.insertBefore(draggingCard, afterElement);
            } else {
                container.appendChild(draggingCard);
            }
        });
    }
    
    // Hjälpfunktion för att hitta elementet att placera efter
    function getDragAfterElement(container, y) {
        const cards = [...container.querySelectorAll('.machine-card:not(.dragging)')];
        
        return cards.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    // Spara den nya maskinordningen
    function saveMachineOrder() {
        const cards = document.querySelectorAll('.machine-card');
        const newOrder = [];
        
        cards.forEach(card => {
            const machineId = parseInt(card.dataset.id);
            const machine = machines.find(m => m.id === machineId);
            if (machine) newOrder.push(machine);
        });
        
        // Uppdatera machines-arrayen med den nya ordningen
        machines.splice(0, machines.length, ...newOrder);
        
        // Spara den nya ordningen i localStorage
        saveMachineData();
    }
    
    // Visa ett meddelande/notifikation
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Visa notifikationen med animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ta bort efter en stund
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Lägg till en ny maskin
    addMachineBtn.addEventListener('click', function() {
        showMachineForm();
    });
    
    // Redigera vald maskin
    editSelectedBtn.addEventListener('click', function() {
        if (selectedMachine) {
            showMachineForm(selectedMachine);
        }
    });
    
    // Ta bort vald maskin
    deleteSelectedBtn.addEventListener('click', function() {
        if (selectedMachine) {
            if (confirm(`Är du säker på att du vill ta bort maskinen "${selectedMachine.name}"?`)) {
                // Ta bort från machines-arrayen
                const index = machines.findIndex(m => m.id === selectedMachine.id);
                if (index !== -1) {
                    machines.splice(index, 1);
                }
                
                // Uppdatera UI och spara
                renderMainMachineList();
                saveMachineData();
                selectedMachine = null;
                addTaskBtn.disabled = true;
                editSelectedBtn.disabled = true;
                deleteSelectedBtn.disabled = true;
                showNotification('Maskin borttagen', 'success');
            }
        }
    });
    
    // Lägg till ny uppgift till vald maskin
    addTaskBtn.addEventListener('click', function() {
        if (selectedMachine) {
            showTaskForm();
        }
    });
    
    // Import/Export-funktionalitet
    importExportBtn.addEventListener('click', function() {
        showImportExportDialog();
    });
    
    // Visa formulär för att lägga till/redigera maskiner
    function showMachineForm(machine = null) {
        const isEdit = machine !== null;
        const form = document.createElement('div');
        form.className = 'admin-form';
        
        form.innerHTML = `
            <div class="admin-form-header">
                <h3>${isEdit ? 'Redigera maskin' : 'Lägg till maskin'}</h3>
                <button class="close-btn form-close"><i class="fas fa-times"></i></button>
            </div>
            <form id="machine-form">
                <div class="form-group">
                    <label for="machine-name">Maskinnamn:</label>
                    <input type="text" id="machine-name-input" required value="${isEdit ? machine.name : ''}">
                </div>
                <div class="form-group">
                    <label for="machine-description">Beskrivning:</label>
                    <textarea id="machine-description-input" required>${isEdit ? machine.description : ''}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="admin-action-btn form-close">Avbryt</button>
                    <button type="submit" class="admin-action-btn">${isEdit ? 'Spara ändringar' : 'Lägg till'}</button>
                </div>
            </form>
        `;
        
        document.body.appendChild(form);
        
        // Visa formuläret med animation
        setTimeout(() => {
            form.classList.add('show');
        }, 10);
        
        // Stäng-knappar
        form.querySelectorAll('.form-close').forEach(btn => {
            btn.addEventListener('click', () => {
                form.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(form);
                }, 300);
            });
        });
        
        // Hantera formulärsubmit
        const machineForm = form.querySelector('#machine-form');
        machineForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('machine-name-input');
            const descriptionInput = document.getElementById('machine-description-input');
            
            if (isEdit) {
                // Uppdatera befintlig maskin
                machine.name = nameInput.value;
                machine.description = descriptionInput.value;
                showNotification('Maskin uppdaterad', 'success');
            } else {
                // Skapa en ny maskin
                const newId = Math.max(...machines.map(m => m.id), 0) + 1;
                const newMachine = {
                    id: newId,
                    name: nameInput.value,
                    description: descriptionInput.value,
                    tasks: []
                };
                machines.push(newMachine);
                showNotification('Ny maskin tillagd', 'success');
            }
            
            // Uppdatera UI och spara
            renderMainMachineList();
            saveMachineData();
            
            // Stäng formuläret
            form.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(form);
            }, 300);
        });
    }
    
    // Visa formulär för att lägga till uppgifter
    function showTaskForm(task = null) {
        const isEdit = task !== null;
        const form = document.createElement('div');
        form.className = 'admin-form';
        
        form.innerHTML = `
            <div class="admin-form-header">
                <h3>${isEdit ? 'Redigera uppgift' : 'Lägg till uppgift'}</h3>
                <button class="close-btn form-close"><i class="fas fa-times"></i></button>
            </div>
            <form id="task-form">
                <div class="form-group">
                    <label for="task-title">Titel:</label>
                    <input type="text" id="task-title-input" required value="${isEdit ? task.title : ''}">
                </div>
                <div class="form-group">
                    <label for="task-description">Beskrivning:</label>
                    <textarea id="task-description-input" required>${isEdit ? task.description : ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="task-more-info">Mer information (valfritt, HTML tillåtet):</label>
                    <textarea id="task-more-info-input">${isEdit && task.moreInfo ? task.moreInfo : ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="task-image">Bild URL (valfritt):</label>
                    <input type="text" id="task-image-input" value="${isEdit && task.image ? task.image : ''}">
                </div>
                <div class="form-actions">
                    <button type="button" class="admin-action-btn form-close">Avbryt</button>
                    <button type="submit" class="admin-action-btn">${isEdit ? 'Spara ändringar' : 'Lägg till'}</button>
                </div>
            </form>
        `;
        
        document.body.appendChild(form);
        
        // Visa formuläret med animation
        setTimeout(() => {
            form.classList.add('show');
        }, 10);
        
        // Stäng-knappar
        form.querySelectorAll('.form-close').forEach(btn => {
            btn.addEventListener('click', () => {
                form.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(form);
                }, 300);
            });
        });
        
        // Hantera formulärsubmit
        const taskForm = form.querySelector('#task-form');
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const titleInput = document.getElementById('task-title-input');
            const descriptionInput = document.getElementById('task-description-input');
            const moreInfoInput = document.getElementById('task-more-info-input');
            const imageInput = document.getElementById('task-image-input');
            
            if (isEdit) {
                // Uppdatera befintlig uppgift
                task.title = titleInput.value;
                task.description = descriptionInput.value;
                task.moreInfo = moreInfoInput.value || null;
                task.image = imageInput.value || null;
                showNotification('Uppgift uppdaterad', 'success');
            } else {
                // Använd rätt maskin beroende på var vi är (detaljvyn eller admin)
                const targetMachine = machineDetails.style.display === 'block' ? currentMachine : selectedMachine;
                
                if (!targetMachine) {
                    showNotification('Ingen maskin vald', 'error');
                    return;
                }
                
                // Skapa en ny uppgift
                const newId = Math.max(...targetMachine.tasks.map(t => t.id), 0) + 1;
                const newTask = {
                    id: newId,
                    title: titleInput.value,
                    description: descriptionInput.value,
                    completed: false
                };
                
                if (moreInfoInput.value) newTask.moreInfo = moreInfoInput.value;
                if (imageInput.value) newTask.image = imageInput.value;
                
                targetMachine.tasks.push(newTask);
                showNotification('Ny uppgift tillagd', 'success');
            }
            
            // Uppdatera UI och spara
            if (machineDetails.style.display === 'block') {
                renderTaskList();
                updateProgressBar();
            }
            renderMainMachineList();
            saveMachineData();
            
            // Stäng formuläret
            form.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(form);
            }, 300);
        });
    }
    
    // Visa import/export-dialog
    function showImportExportDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'admin-form';
        
        dialog.innerHTML = `
            <div class="admin-form-header">
                <h3>Importera/Exportera Data</h3>
                <button class="close-btn form-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="form-group">
                <label for="export-data">Data (JSON-format):</label>
                <textarea id="export-data" rows="10">${JSON.stringify(machines, null, 2)}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="admin-action-btn form-close">Avbryt</button>
                <button type="button" id="import-btn" class="admin-action-btn">Importera</button>
                <button type="button" id="copy-btn" class="admin-action-btn">Kopiera</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Visa dialogrutan med animation
        setTimeout(() => {
            dialog.classList.add('show');
        }, 10);
        
        // Stäng-knappar
        dialog.querySelectorAll('.form-close').forEach(btn => {
            btn.addEventListener('click', () => {
                dialog.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(dialog);
                }, 300);
            });
        });
        
        // Importera data
        const importBtn = dialog.querySelector('#import-btn');
        importBtn.addEventListener('click', () => {
            const dataTextarea = document.getElementById('export-data');
            try {
                const importedData = JSON.parse(dataTextarea.value);
                
                // Validera grundläggande struktur
                if (Array.isArray(importedData) && importedData.length > 0) {
                    // Ersätt nuvarande data
                    machines.splice(0, machines.length, ...importedData);
                    
                    // Uppdatera UI och spara
                    renderMainMachineList();
                    saveMachineData();
                    
                    showNotification('Data importerad framgångsrikt', 'success');
                    
                    // Stäng dialogen
                    dialog.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(dialog);
                    }, 300);
                } else {
                    showNotification('Ogiltig datastruktur', 'error');
                }
            } catch (error) {
                showNotification('Ogiltigt JSON-format', 'error');
            }
        });
        
        // Kopiera data
        const copyBtn = dialog.querySelector('#copy-btn');
        copyBtn.addEventListener('click', () => {
            const dataTextarea = document.getElementById('export-data');
            dataTextarea.select();
            document.execCommand('copy');
            showNotification('Data kopierad till urklipp', 'success');
        });
    }
    
    // Spara all maskindata, inklusive uppgifter
    function saveMachineData() {
        localStorage.setItem('machineData', JSON.stringify(machines));
        
        // Uppdatera även taskStatus
        const taskStatus = {};
        machines.forEach(machine => {
            machine.tasks.forEach(task => {
                taskStatus[task.id] = task.completed;
            });
        });
        localStorage.setItem('taskStatus', JSON.stringify(taskStatus));
    }
    
    // Ladda maskindata om den finns i localStorage
    function loadMachineData() {
        const savedData = localStorage.getItem('machineData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                // Kontrollera om parsedData innehåller de nya maskinerna
                // Om inte, behåll de ursprungliga maskinerna (21-29) också
                const highestId = Math.max(...parsedData.map(m => m.id));
                
                // Om de högre ID:na inte finns i sparad data, behåll dem
                if (highestId < 20) {
                    // Filtrera machines-array för att bara få id 1-20
                    const originalMachines = machines.filter(m => m.id <= 20);
                    // Filtrera för att få de nya maskinerna 21-29
                    const newMachines = machines.filter(m => m.id > 20);
                    // Kombinera sparad data med nya maskiner
                    machines.splice(0, machines.length, ...parsedData, ...newMachines);
                } else {
                    // Annars använd bara sparad data
                    machines.splice(0, machines.length, ...parsedData);
                }
            }
        }
        
        // Spara aktuell data för att säkerställa att alla maskiner finns
        // efter att laddningen är klar
        saveMachineData();
    }
    
    // Anropa för att ladda maskiner när sidan laddas
    loadMachineData();
    
    // Uppdatera renderMainMachineList för att hantera admin-läge
    function renderMainMachineList(adminReorder = false) {
        machineList.innerHTML = '';
        mainMachines.forEach(mainMachine => {
            // Beräkna total framsteg för alla undermaskiner
            let totalTasks = 0;
            let completedTasks = 0;
            
            mainMachine.submachines.forEach(submachineId => {
                const submachine = machines.find(m => m.id === submachineId);
                if (submachine) {
                    totalTasks += submachine.tasks.length;
                    completedTasks += submachine.tasks.filter(task => task.completed).length;
                }
            });
            
            const progressPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            const card = document.createElement('div');
            card.className = 'machine-card';
            card.dataset.id = mainMachine.id;
            
            let statusLabel = '';
            let statusClass = '';
            
            if (progressPercentage === 100) {
                statusLabel = 'Klar';
                statusClass = 'status-complete';
            } else if (progressPercentage > 0) {
                statusLabel = 'Pågående';
                statusClass = 'status-progress';
            } else {
                statusLabel = 'Ej påbörjad';
                statusClass = 'status-not-started';
            }
            
            const dragHandle = adminReorder ? `<div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>` : '';
            
            card.innerHTML = `
                ${dragHandle}
                <h3>${mainMachine.name}</h3>
                <p>${mainMachine.description}</p>
                <div class="progress-indicator">
                    <div class="progress-value" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="card-footer">
                    <span>${completedTasks} av ${totalTasks} uppgifter klara</span>
                    <span class="status-label ${statusClass}">${statusLabel}</span>
                </div>
            `;
            
            if (!adminReorder) {
                card.addEventListener('click', () => showSubmachineList(mainMachine));
            }
            
            machineList.appendChild(card);
        });
    }
    
    // Uppdatera renderTaskList-funktionen för att stödja redigering i admin-läge
    function renderTaskList() {
        taskList.innerHTML = '';
        currentMachine.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            // Lägg till mer information för vissa uppgifter
            const hasMoreInfo = task.moreInfo || task.image; // Om uppgiften har mer info eller en bild
            const infoButton = hasMoreInfo ? 
                `<button class="info-button" data-id="${task.id}"><i class="fas fa-info-circle"></i></button>` : '';
            
            // Lägg till admin-knappar om i admin-läge
            const adminButtons = adminMode ? 
                `<div class="task-admin-controls">
                    <button class="edit-task-btn" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-task-btn" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                </div>` : '';
            
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                </div>
                ${infoButton}
                ${adminButtons}
            `;
            
            const checkbox = taskElement.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                taskElement.classList.toggle('completed', checkbox.checked);
                updateProgressBar();
                saveTaskStatus();
                renderMainMachineList(); // Uppdatera även huvudmaskinlistan
            });
            
            // Lägg till eventlyssnare för info-knappen om den finns
            const infoBtnElement = taskElement.querySelector('.info-button');
            if (infoBtnElement) {
                infoBtnElement.addEventListener('click', (e) => {
                    e.stopPropagation(); // Förhindra att klicket påverkar andra element
                    showTaskDetails(task);
                });
            }
            
            // Lägg till eventlyssnare för admin-knappar om i admin-läge
            if (adminMode) {
                const editBtn = taskElement.querySelector('.edit-task-btn');
                if (editBtn) {
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showTaskForm(task);
                    });
                }
                
                const deleteBtn = taskElement.querySelector('.delete-task-btn');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (confirm(`Är du säker på att du vill ta bort uppgiften "${task.title}"?`)) {
                            // Ta bort uppgiften
                            const index = currentMachine.tasks.findIndex(t => t.id === task.id);
                            if (index !== -1) {
                                currentMachine.tasks.splice(index, 1);
                                renderTaskList();
                                updateProgressBar();
                                saveMachineData();
                                renderMainMachineList();
                                showNotification('Uppgift borttagen', 'success');
                            }
                        }
                    });
                }
            }
            
            taskList.appendChild(taskElement);
        });
        
        // Lägg till en knapp för att lägga till uppgifter om i admin-läge
        if (adminMode) {
            const addTaskElement = document.createElement('div');
            addTaskElement.className = 'add-task-item';
            addTaskElement.innerHTML = `
                <button class="admin-action-btn"><i class="fas fa-plus"></i> Lägg till ny uppgift</button>
            `;
            
            addTaskElement.querySelector('button').addEventListener('click', () => {
                showTaskForm();
            });
            
            taskList.appendChild(addTaskElement);
        }
    }
    
    // Lägg till CSS för notifikationer och task-admin-knappar
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--card-bg);
            color: var(--text-color);
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            border-left: 4px solid var(--complete-color);
        }
        
        .notification.error {
            border-left: 4px solid var(--incomplete-color);
        }
        
        .task-admin-controls {
            display: flex;
            gap: 5px;
            margin-left: 10px;
        }
        
        .edit-task-btn, .delete-task-btn {
            background: none;
            border: none;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .edit-task-btn {
            color: #2196F3;
        }
        
        .delete-task-btn {
            color: #F44336;
        }
        
        .edit-task-btn:hover, .delete-task-btn:hover {
            background-color: rgba(0, 0, 0, 0.05);
            transform: scale(1.1);
        }
        
        .dark-theme .edit-task-btn:hover, .dark-theme .delete-task-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .add-task-item {
            display: flex;
            justify-content: center;
            padding: 15px 0;
            border-top: 1px solid var(--border-color);
            margin-top: 10px;
        }
        
        .dark-theme .add-task-item {
            border-top-color: #444;
        }

        .submachine-item {
            display: flex;
            padding: 15px;
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .submachine-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .submachine-content {
            flex: 1;
        }

        .submachine-title {
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 5px;
        }

        .submachine-description {
            color: var(--text-secondary);
            margin-bottom: 10px;
            font-size: 0.9em;
        }

        .progress-indicator.small {
            height: 6px;
            margin-bottom: 5px;
        }

        .task-count {
            font-size: 0.85em;
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(style);
    
    // Initialisera appen
    renderMainMachineList();
    
    // Language switching functionality
    const langSwedish = document.getElementById('lang-sv');
    const langEnglish = document.getElementById('lang-en');
    
    // Default language is Swedish (as specified in the HTML lang attribute)
    let currentLang = 'sv';
    
    // Load translations
    const translations = {
        'sv': {
            'title': 'L65 Omställningschecklista',
            'admin_mode': 'Administratörsläge',
            'reorder_machines': 'Ändra maskinordning',
            'add_machine': 'Lägg till maskin',
            'edit_selected': 'Redigera vald maskin',
            'delete_selected': 'Ta bort vald maskin',
            'add_task': 'Lägg till uppgift',
            'import_export': 'Importera/Exportera data',
            'logout': 'Logga ut',
            'back': 'Tillbaka',
            'mark_all': 'Markera alla som klara',
            'progress': '% klar'
            // Add more translations as needed
        },
        'en': {
            'title': 'L65 Changeover Checklist',
            'admin_mode': 'Administrator Mode',
            'reorder_machines': 'Change Machine Order',
            'add_machine': 'Add Machine',
            'edit_selected': 'Edit Selected Machine',
            'delete_selected': 'Delete Selected Machine',
            'add_task': 'Add Task',
            'import_export': 'Import/Export Data',
            'logout': 'Log out',
            'back': 'Back',
            'mark_all': 'Mark All as Complete',
            'progress': '% complete'
            // Add more translations as needed
        }
    };
    
    // Function to update UI language
    function updateLanguage(lang) {
        document.documentElement.lang = lang;
        currentLang = lang;
        
        // Update active button
        if (lang === 'sv') {
            langSwedish.classList.add('active');
            langEnglish.classList.remove('active');
        } else {
            langEnglish.classList.add('active');
            langSwedish.classList.remove('active');
        }
        
        // Update text elements
        document.querySelector('.logo-container h1').textContent = translations[lang]['title'];
        document.querySelector('.admin-header h2').textContent = translations[lang]['admin_mode'];
        document.getElementById('reorder-machines').innerHTML = `<i class="fas fa-sort"></i> ${translations[lang]['reorder_machines']}`;
        document.getElementById('add-machine').innerHTML = `<i class="fas fa-plus"></i> ${translations[lang]['add_machine']}`;
        document.getElementById('edit-selected').innerHTML = `<i class="fas fa-edit"></i> ${translations[lang]['edit_selected']}`;
        document.getElementById('delete-selected').innerHTML = `<i class="fas fa-trash"></i> ${translations[lang]['delete_selected']}`;
        document.getElementById('add-task').innerHTML = `<i class="fas fa-plus-circle"></i> ${translations[lang]['add_task']}`;
        document.getElementById('import-export').innerHTML = `<i class="fas fa-exchange-alt"></i> ${translations[lang]['import_export']}`;
        document.getElementById('admin-logout').innerHTML = `<i class="fas fa-sign-out-alt"></i> ${translations[lang]['logout']}`;
        
        // Update detail view buttons if they exist
        const backBtn = document.getElementById('back-to-list');
        const markAllBtn = document.getElementById('mark-all-complete');
        const progressText = document.getElementById('progress-text');
        
        if (backBtn) backBtn.innerHTML = `<i class="fas fa-arrow-left"></i> ${translations[lang]['back']}`;
        if (markAllBtn) markAllBtn.innerHTML = `<i class="fas fa-check-double"></i> ${translations[lang]['mark_all']}`;
        if (progressText) {
            const percentage = progressText.textContent.split('%')[0];
            progressText.textContent = `${percentage}${translations[lang]['progress']}`;
        }
        
        // Save preference to localStorage
        localStorage.setItem('preferred-language', lang);
        
        // You might need to update dynamically generated content here too
        updateDynamicContent();
    }
    
    // Function to update any dynamically generated content
    function updateDynamicContent() {
        // Add code here to update machine cards and task lists
        // This will depend on how your app generates this content
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        updateLanguage(savedLang);
    }
    
    // Event listeners for language buttons
    langSwedish.addEventListener('click', () => updateLanguage('sv'));
    langEnglish.addEventListener('click', () => updateLanguage('en'));
});
