/**
 * ALL TEXT ON THE SITE LIVES HERE.
 *
 * To change a text: edit it in both `en` and `nl` below, save, and the site updates.
 * Keep the structure (the names before the colons) the same in both languages.
 * TypeScript will warn you if a Dutch text is missing.
 */

export type Lang = 'en' | 'nl'

const en = {
  meta: {
    title: 'Sasho Svirski | Finance systems, automation & web apps',
    description:
      'I turn manual finance processes and Excel sheets into automated reporting, data models and simple web apps. Also building websites for small businesses.',
  },
  nav: {
    services: 'Services',
    demo: 'Demo',
    cases: 'Finance case studies',
    work: 'Work',
    process: 'Process',
    background: 'Background',
    contact: 'Contact',
    skip: 'Skip to content',
    language: 'Language',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    menu: 'Menu',
    close: 'Close menu',
  },
  hero: {
    eyebrow: 'Finance systems & automation · Websites & web apps',
    name: 'Sasho Svirski',
    headline:
      'I turn manual finance processes and Excel sheets into automated reporting, data models and simple web apps.',
    ctaWork: 'See my work',
    ctaContact: 'Contact me',
    statsLabel: 'Results from my finance work',
    stats: [
      { value: '15+', label: 'entities in one group consolidation' },
      { value: '~4 days', label: 'of manual reporting removed per month' },
      { value: '~3 min', label: 'reconciliation prep, down from 3–4 hours' },
      { value: '2', label: 'live web projects' },
    ],
    toolsLabel: 'Tools I work with',
  },
  services: {
    label: 'Services',
    title: 'Two ways I can help',
    items: [
      {
        title: 'Finance systems & automation',
        intro: 'For finance teams that spend too much time on manual work.',
        cta: 'Talk about your process',
        points: [
          'Excel automation',
          'SQL',
          'Power BI',
          'ERP migration',
          'Group consolidation',
        ],
      },
      {
        title: 'Simple websites & web apps',
        intro: 'For small businesses that want a site or tool that just works.',
        cta: 'Talk about your website',
        points: [
          'Built to your requirements',
          'Easy for you to maintain',
          'Fixed price',
          'All logins handed over',
        ],
      },
    ],
  },
  demo: {
    label: 'From Excel to app',
    title: 'A spreadsheet holds data. An app adds the rules.',
    intro:
      'Try this small demo app. Change the sales figures and see targets, alerts and notes update. Or work through a month-end close where each task waits for the ones before it. Nothing is stored.',
    appName: 'Finance desk',
    tabSales: 'Sales',
    tabClose: 'Month-end close',
    reset: 'Reset',
    // Sales view
    inputTitle: 'Input: monthly sales',
    inputHint: 'Tap a number to change it',
    outputTitle: 'The app',
    product: 'Product',
    total: 'Total',
    months: ['Jan', 'Feb', 'Mar'],
    monthLong: ['January', 'February', 'March'],
    products: ['Coffee beans', 'Tea', 'Mugs', 'Gift boxes'],
    kpiTotal: 'Q1 sales',
    kpiVsTarget: (pct: string) => `${pct} of target`,
    kpiChange: 'March vs February',
    kpiAlerts: 'Alerts',
    kpiAlertsNone: 'None',
    targetsTitle: 'Progress to Q1 target',
    targetOf: (target: string) => `target ${target}`,
    statusOn: 'On target',
    statusClose: 'Close',
    statusBelow: 'Below target',
    notesTitle: 'Notes, written by the app',
    noteTotal: (pct: string, above: boolean) =>
      above ? `Q1 total is ${pct} above target.` : `Q1 total is ${pct} below target.`,
    noteTotalExact: 'Q1 total is exactly on target.',
    noteMover: (product: string, pct: string, up: boolean, month: string) =>
      `${product} ${up ? 'grew' : 'fell'} ${pct} in ${month}, the biggest change of any product.`,
    noteWeakest: (product: string, pct: string) => `${product} is ${pct} below its target. Worth a look.`,
    noteAllOn: 'Every product is on or above target.',
    cellLabel: (product: string, month: string) => `${product}, ${month}`,
    // Close view
    closeIntro: 'March close',
    progress: (done: number, total: number) => `${done} of ${total} tasks done`,
    closeDone: 'Close complete. The reporting pack can go out.',
    readyTitle: 'Ready to start',
    readyNone: 'Nothing yet, waiting on open tasks.',
    logTitle: 'Activity log',
    logEmpty: 'Tick a task to start the log.',
    day: (n: number) => `Working day ${n}`,
    waitingFor: (names: string) => `Waiting for: ${names}`,
    locked: 'Locked',
    logDone: (task: string) => `${task} completed`,
    logReopened: (task: string) => `${task} reopened`,
    logCascade: (task: string, cause: string) => `${task} reopened, because it depends on ${cause}`,
    logUnlocked: (task: string) => `${task} is now unlocked`,
    tasks: [
      'Bank reconciliation',
      'Sales cut-off and invoicing',
      'Fixed assets and depreciation',
      'Accruals and prepayments',
      'Intercompany matching',
      'Trial balance review',
      'Group consolidation',
      'Management reporting pack',
    ],
  },
  cases: {
    label: 'Finance case studies',
    title: 'Finance systems I built',
    intro: 'Real work from my finance roles. Open a card to read the full story.',
    problem: 'The problem',
    built: 'What I built',
    result: 'The result',
    more: 'Read more',
    less: 'Show less',
    anim: {
      caption: 'What a group consolidation does, in 10 seconds.',
      description:
        'Animation with example figures: four entities (NL, DE, UK and BG) add up to one consolidated total of €1,000k revenue and €750k costs. A €50k invoice from NL to DE is eliminated, so revenue and costs both drop by €50k to €950k and €700k. The result stays €250k and ties back to balance.',
      pause: 'Pause animation',
      play: 'Play animation',
      text: {
        entity: 'Entity',
        revenue: 'Revenue',
        costs: 'Costs',
        result: 'Result',
        consolidated: 'Consolidated',
        example: 'Example figures',
        icTo: 'Invoiced to DE',
        icFrom: 'Invoiced by NL',
        intercompany: 'Intercompany',
        elimination: 'Elimination',
        ties: 'Ties back to balance',
      },
    },
    items: [
      {
        id: 'lucanet',
        title: 'Group consolidation in Lucanet',
        context: 'Multi-entity digital subscription group, 15+ entities.',
        problem: 'Consolidated reporting was prepared by hand every month from separate entity data.',
        built:
          'The group consolidation in Lucanet, applying the controller’s clearing rules so nothing was counted twice, tied back to balance. Then a fully automated Excel-to-Lucanet reporting connection written in Lucanet’s query language.',
        result:
          'Live consolidated view across all entities; about 4 days of manual consolidation reporting removed every month. The published annual-report figures came out of this consolidation.',
        tags: ['Lucanet', 'Consolidation', 'Excel automation', 'Eliminations'],
      },
      {
        id: 'erp',
        title: 'ERP migration: data extraction for 15+ entities',
        context: 'Group migration from AccountView to Visma.net.',
        problem:
          'The old system’s data had to be moved into the new ERP in its exact import format, with no documentation of the old table structure.',
        built:
          'Reverse-engineered the AccountView tables and relationships, and wrote every SQL query to output the data in the format Visma.net specified.',
        result: 'Peer-reviewed by the Finance Director and audited by the IT Manager before load.',
        tags: ['SQL', 'ERP migration', 'Data conversion', 'Visma.net'],
      },
      {
        id: 'recon',
        title: 'Monthly reconciliation: from hours to minutes',
        context: 'Insurance, 8 client portfolios.',
        problem: 'Upstream file-format changes kept breaking the monthly reconciliation and the close.',
        built:
          'An ID-mapping layer agreed with the actuarial team, one file architecture for all portfolios, and audit checkers comparing expected vs booked postings.',
        result: 'Preparation fell from 3-4 hours to about 3 minutes.',
        tags: ['Excel automation', 'Reconciliation', 'Controls', 'Month-end close'],
      },
    ],
  },
  work: {
    label: 'Work',
    title: 'Selected projects',
    featured: 'Featured project',
    viewLive: 'View live',
    viewCode: 'View code',
    projects: [
      {
        id: 'turbo',
        name: 'Turbo Autos',
        tag: 'Client project · March–April 2026',
        summary:
          'Business website for a car sourcing service that finds cars at dealer-only auctions across Europe and delivers in the EU.',
        details: [
          '“Dream car” request form (make, model, year, engine, gearbox, colour, options): confirmation email to the customer, full request to the business',
          'Delivered-cars showcase the owner updates by uploading a CSV file',
          'Bilingual NL / EN',
          'Domain via Strato, routed through Cloudflare',
        ],
        image: '/projects/turboautos.webp',
        alt: 'Screenshot of the Turbo Autos homepage',
        live: 'https://turboautos.nl',
        code: '',
      },
      {
        id: 'tempo',
        name: 'Tempo',
        tag: 'Personal open-source project',
        summary:
          'Training and nutrition tracker that started as my own Excel model.',
        details: [
          'Meal photo scan and barcode scan',
          '455-food database with micronutrients',
          'Workout tracker with 10 pre-built 14-week programmes',
          'Trends, works offline, optional cloud sync',
        ],
        image: '/projects/tempo.webp',
        alt: 'Screenshot of the Tempo fitness app',
        live: 'https://tempo-fitness-app.web.app',
        code: 'https://github.com/svirskisasho-web/tempo-fitness-app',
      },
    ],
  },
  process: {
    label: 'How I work',
    title: 'Four steps, no surprises',
    steps: [
      { title: 'Understand your process', text: 'I learn how you work today and where time gets lost.' },
      { title: 'Write the requirements', text: 'We agree in writing on what gets built before I start.' },
      { title: 'Build and test', text: 'I build in small steps and test everything myself.' },
      { title: 'Hand over everything', text: 'You get the files, the documentation and all logins.' },
    ],
    note:
      'I build with AI-assisted development. That makes me faster, and I still review and test every part myself.',
  },
  background: {
    label: 'Background',
    title: 'Experience',
    items: [
      {
        role: 'Finance Operations Analyst',
        org: 'Assurant (NYSE-listed insurer)',
        period: 'Jun 2022 – Feb 2026',
        points: [
          'Rebuilt the monthly client reconciliation: preparation across 8 portfolios fell from 3–4 hours to about 3 minutes.',
          'Designed a Solvency II reinsurance calculation that ended a recurring manual adjustment.',
        ],
      },
      {
        role: 'Financial Analyst',
        org: 'Cliq Digital',
        period: 'Sep 2017 – Apr 2022',
        points: [
          'Designed the data extraction for an ERP migration across 15+ entities (SQL).',
          'Built the group consolidation in Lucanet.',
          'Automated reporting that removed about 4 days of manual work per month.',
        ],
      },
      {
        role: 'Business Analyst',
        org: 'Suitsupply',
        period: '2016',
        points: ['SQL sales reporting for bonus calculation across stores worldwide.'],
      },
    ],
    educationTitle: 'Education',
    education: [
      { name: 'BSc Accountancy', org: 'HvA', period: '' },
      { name: 'Python Developer track', org: 'SoftUni', period: '2022–2024' },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Tell me what you need',
    intro: 'Describe your process or idea in a few lines.',
    name: 'Name',
    email: 'Email',
    company: 'Company (optional)',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Thanks, your message is on its way. You will receive a confirmation by email.',
    successNoConfirm: 'Thanks, your message is on its way.',
    error: 'Something went wrong. Please try again, or reach me on LinkedIn.',
    invalid: 'Please fill in your name, a valid email and a message.',
    privacy:
      'Privacy: your name, email and message are only used to reply to you. They are sent to me by email (via Resend) and not stored on this website. Spam protection by Cloudflare Turnstile. No tracking cookies.',
    elsewhere: 'Or find me on',
  },
  footer: {
    rights: 'Built by me with React, TypeScript and Tailwind CSS.',
    top: 'Back to top',
  },
}

export type Dict = typeof en

const nl: Dict = {
  meta: {
    title: 'Sasho Svirski | Financiële systemen, automatisering & web-apps',
    description:
      'Ik zet handmatige financiële processen en Excel-sheets om in geautomatiseerde rapportages, datamodellen en eenvoudige web-apps. Ook bouw ik websites voor kleine bedrijven.',
  },
  nav: {
    services: 'Diensten',
    demo: 'Demo',
    cases: 'Finance-cases',
    work: 'Werk',
    process: 'Werkwijze',
    background: 'Achtergrond',
    contact: 'Contact',
    skip: 'Naar de inhoud',
    language: 'Taal',
    themeToLight: 'Lichte modus',
    themeToDark: 'Donkere modus',
    menu: 'Menu',
    close: 'Menu sluiten',
  },
  hero: {
    eyebrow: 'Financiële systemen & automatisering · Websites & web-apps',
    name: 'Sasho Svirski',
    headline:
      'Ik zet handmatige financiële processen en Excel-sheets om in geautomatiseerde rapportages, datamodellen en eenvoudige web-apps.',
    ctaWork: 'Bekijk mijn werk',
    ctaContact: 'Neem contact op',
    statsLabel: 'Resultaten uit mijn financewerk',
    stats: [
      { value: '15+', label: 'entiteiten in één groepsconsolidatie' },
      { value: '~4 dagen', label: 'handmatige rapportage per maand geschrapt' },
      { value: '~3 min', label: 'voorbereiding reconciliatie, eerst 3–4 uur' },
      { value: '2', label: 'live webprojecten' },
    ],
    toolsLabel: 'Tools waarmee ik werk',
  },
  services: {
    label: 'Diensten',
    title: 'Twee manieren waarop ik help',
    items: [
      {
        title: 'Financiële systemen & automatisering',
        intro: 'Voor financeteams die te veel tijd kwijt zijn aan handwerk.',
        cta: 'Bespreek je proces',
        points: [
          'Excel-automatisering',
          'SQL',
          'Power BI',
          'ERP-migratie',
          'Groepsconsolidatie',
        ],
      },
      {
        title: 'Eenvoudige websites & web-apps',
        intro: 'Voor kleine bedrijven die een site of tool willen die gewoon werkt.',
        cta: 'Bespreek je website',
        points: [
          'Gebouwd naar jouw wensen',
          'Makkelijk zelf te onderhouden',
          'Vaste prijs',
          'Alle logins worden overgedragen',
        ],
      },
    ],
  },
  demo: {
    label: 'Van Excel naar app',
    title: 'Een spreadsheet bevat data. Een app voegt de regels toe.',
    intro:
      'Probeer deze kleine demo-app. Wijzig de verkoopcijfers en zie doelen, meldingen en notities meteen veranderen. Of werk een maandafsluiting af waarin elke taak wacht op de taken ervoor. Er wordt niets opgeslagen.',
    appName: 'Finance desk',
    tabSales: 'Verkoop',
    tabClose: 'Maandafsluiting',
    reset: 'Herstel',
    inputTitle: 'Invoer: omzet per maand',
    inputHint: 'Tik op een getal om het te wijzigen',
    outputTitle: 'De app',
    product: 'Product',
    total: 'Totaal',
    months: ['jan', 'feb', 'mrt'],
    monthLong: ['januari', 'februari', 'maart'],
    products: ['Koffiebonen', 'Thee', 'Mokken', 'Cadeauboxen'],
    kpiTotal: 'Omzet Q1',
    kpiVsTarget: (pct: string) => `${pct} van het doel`,
    kpiChange: 'Maart t.o.v. februari',
    kpiAlerts: 'Meldingen',
    kpiAlertsNone: 'Geen',
    targetsTitle: 'Voortgang naar doel Q1',
    targetOf: (target: string) => `doel ${target}`,
    statusOn: 'Op doel',
    statusClose: 'Bijna',
    statusBelow: 'Onder doel',
    notesTitle: 'Notities, geschreven door de app',
    noteTotal: (pct: string, above: boolean) =>
      above ? `Het totaal van Q1 ligt ${pct} boven het doel.` : `Het totaal van Q1 ligt ${pct} onder het doel.`,
    noteTotalExact: 'Het totaal van Q1 ligt precies op het doel.',
    noteMover: (product: string, pct: string, up: boolean, month: string) =>
      `${product} ${up ? 'steeg' : 'daalde'} ${pct} in ${month}, de grootste verandering van alle producten.`,
    noteWeakest: (product: string, pct: string) => `${product} ligt ${pct} onder het doel. Even naar kijken.`,
    noteAllOn: 'Alle producten zitten op of boven het doel.',
    cellLabel: (product: string, month: string) => `${product}, ${month}`,
    closeIntro: 'Afsluiting maart',
    progress: (done: number, total: number) => `${done} van ${total} taken klaar`,
    closeDone: 'Afsluiting klaar. Het rapportagepakket kan de deur uit.',
    readyTitle: 'Klaar om te starten',
    readyNone: 'Nog niets, wacht op open taken.',
    logTitle: 'Activiteitenlog',
    logEmpty: 'Vink een taak af om het log te starten.',
    day: (n: number) => `Werkdag ${n}`,
    waitingFor: (names: string) => `Wacht op: ${names}`,
    locked: 'Vergrendeld',
    logDone: (task: string) => `${task} afgerond`,
    logReopened: (task: string) => `${task} heropend`,
    logCascade: (task: string, cause: string) => `${task} heropend, omdat het afhangt van ${cause}`,
    logUnlocked: (task: string) => `${task} is nu vrijgegeven`,
    tasks: [
      'Bankreconciliatie',
      'Omzet-cut-off en facturatie',
      'Vaste activa en afschrijvingen',
      'Overlopende posten',
      'Intercompany-afstemming',
      'Controle proef- en saldibalans',
      'Groepsconsolidatie',
      'Managementrapportage',
    ],
  },
  cases: {
    label: 'Finance-cases',
    title: 'Financiële systemen die ik bouwde',
    intro: 'Echt werk uit mijn financefuncties. Open een kaart voor het volledige verhaal.',
    problem: 'Het probleem',
    built: 'Wat ik bouwde',
    result: 'Het resultaat',
    more: 'Lees meer',
    less: 'Minder tonen',
    anim: {
      caption: 'Wat een groepsconsolidatie doet, in 10 seconden.',
      description:
        'Animatie met voorbeeldcijfers: vier entiteiten (NL, DE, UK en BG) tellen op tot één geconsolideerd totaal van €1.000k omzet en €750k kosten. Een factuur van €50k van NL aan DE wordt geëlimineerd, dus omzet en kosten dalen allebei met €50k naar €950k en €700k. Het resultaat blijft €250k en sluit aan op de balans.',
      pause: 'Animatie pauzeren',
      play: 'Animatie afspelen',
      text: {
        entity: 'Entiteit',
        revenue: 'Omzet',
        costs: 'Kosten',
        result: 'Resultaat',
        consolidated: 'Geconsolideerd',
        example: 'Voorbeeldcijfers',
        icTo: 'Gefactureerd aan DE',
        icFrom: 'Gefactureerd door NL',
        intercompany: 'Intercompany',
        elimination: 'Eliminatie',
        ties: 'Sluit aan op de balans',
      },
    },
    items: [
      {
        id: 'lucanet',
        title: 'Groepsconsolidatie in Lucanet',
        context: 'Digitale abonnementengroep met meerdere entiteiten, 15+ entiteiten.',
        problem: 'De geconsolideerde rapportage werd elke maand met de hand opgesteld uit losse entiteitsdata.',
        built:
          'De groepsconsolidatie in Lucanet, met toepassing van de eliminatieregels van de controller zodat niets dubbel werd geteld, aansluitend op de balans. Daarna een volledig geautomatiseerde rapportagekoppeling van Excel naar Lucanet, geschreven in de querytaal van Lucanet.',
        result:
          'Live geconsolideerd overzicht over alle entiteiten; ongeveer 4 dagen handmatige consolidatierapportage per maand verdwenen. De gepubliceerde cijfers in het jaarverslag kwamen uit deze consolidatie.',
        tags: ['Lucanet', 'Consolidatie', 'Excel-automatisering', 'Eliminaties'],
      },
      {
        id: 'erp',
        title: 'ERP-migratie: data-extractie voor 15+ entiteiten',
        context: 'Groepsmigratie van AccountView naar Visma.net.',
        problem:
          'De data uit het oude systeem moest in het exacte importformaat naar het nieuwe ERP, zonder documentatie van de oude tabelstructuur.',
        built:
          'De tabellen en relaties van AccountView via reverse engineering in kaart gebracht, en elke SQL-query geschreven om de data uit te voeren in het formaat dat Visma.net voorschreef.',
        result: 'Vóór het laden gereviewd door de Finance Director en geaudit door de IT Manager.',
        tags: ['SQL', 'ERP-migratie', 'Dataconversie', 'Visma.net'],
      },
      {
        id: 'recon',
        title: 'Maandelijkse reconciliatie: van uren naar minuten',
        context: 'Verzekeringen, 8 klantportefeuilles.',
        problem: 'Wijzigingen in bestandsformaten verderop in de keten braken steeds de maandelijkse reconciliatie en de afsluiting.',
        built:
          'Een ID-mappinglaag, afgestemd met het actuariële team, één bestandsarchitectuur voor alle portefeuilles, en auditcontroles die verwachte met geboekte posten vergelijken.',
        result: 'De voorbereiding ging van 3-4 uur naar ongeveer 3 minuten.',
        tags: ['Excel-automatisering', 'Reconciliatie', 'Interne controles', 'Maandafsluiting'],
      },
    ],
  },
  work: {
    label: 'Werk',
    title: 'Geselecteerde projecten',
    featured: 'Uitgelicht project',
    viewLive: 'Bekijk live',
    viewCode: 'Bekijk code',
    projects: [
      {
        id: 'turbo',
        name: 'Turbo Autos',
        tag: 'Klantproject · maart–april 2026',
        summary:
          'Bedrijfswebsite voor een autozoekservice die auto’s vindt op veilingen voor handelaren in heel Europa en levert binnen de EU.',
        details: [
          '“Droomauto”-aanvraagformulier (merk, model, bouwjaar, motor, versnellingsbak, kleur, opties): bevestigingsmail naar de klant, volledige aanvraag naar het bedrijf',
          'Overzicht van geleverde auto’s dat de eigenaar bijwerkt door een CSV-bestand te uploaden',
          'Tweetalig NL / EN',
          'Domein via Strato, gerouteerd via Cloudflare',
        ],
        image: '/projects/turboautos.webp',
        alt: 'Schermafbeelding van de homepage van Turbo Autos',
        live: 'https://turboautos.nl',
        code: '',
      },
      {
        id: 'tempo',
        name: 'Tempo',
        tag: 'Persoonlijk open-sourceproject',
        summary:
          'Trainings- en voedingstracker die begon als mijn eigen Excel-model.',
        details: [
          'Maaltijdfoto scannen en barcode scannen',
          'Voedingsdatabase met 455 producten, inclusief micronutriënten',
          'Workouttracker met 10 kant-en-klare programma’s van 14 weken',
          'Trends, werkt offline, optionele cloudsynchronisatie',
        ],
        image: '/projects/tempo.webp',
        alt: 'Schermafbeelding van de Tempo-fitnessapp',
        live: 'https://tempo-fitness-app.web.app',
        code: 'https://github.com/svirskisasho-web/tempo-fitness-app',
      },
    ],
  },
  process: {
    label: 'Werkwijze',
    title: 'Vier stappen, geen verrassingen',
    steps: [
      { title: 'Jouw proces begrijpen', text: 'Ik leer hoe je nu werkt en waar tijd verloren gaat.' },
      { title: 'De eisen vastleggen', text: 'We spreken schriftelijk af wat er gebouwd wordt voordat ik begin.' },
      { title: 'Bouwen en testen', text: 'Ik bouw in kleine stappen en test alles zelf.' },
      { title: 'Alles overdragen', text: 'Je krijgt de bestanden, de documentatie en alle logins.' },
    ],
    note:
      'Ik bouw met AI-ondersteunde ontwikkeling. Daardoor werk ik sneller, en ik controleer en test nog steeds elk onderdeel zelf.',
  },
  background: {
    label: 'Achtergrond',
    title: 'Ervaring',
    items: [
      {
        role: 'Finance Operations Analyst',
        org: 'Assurant (NYSE-genoteerde verzekeraar)',
        period: 'jun 2022 – feb 2026',
        points: [
          'De maandelijkse klantreconciliatie opnieuw opgebouwd: de voorbereiding voor 8 portefeuilles ging van 3–4 uur naar ongeveer 3 minuten.',
          'Een Solvency II-herverzekeringsberekening ontworpen die een terugkerende handmatige correctie overbodig maakte.',
        ],
      },
      {
        role: 'Financial Analyst',
        org: 'Cliq Digital',
        period: 'sep 2017 – apr 2022',
        points: [
          'De data-extractie ontworpen voor een ERP-migratie over 15+ entiteiten (SQL).',
          'De groepsconsolidatie in Lucanet gebouwd.',
          'Rapportages geautomatiseerd, wat ongeveer 4 dagen handwerk per maand bespaarde.',
        ],
      },
      {
        role: 'Business Analyst',
        org: 'Suitsupply',
        period: '2016',
        points: ['SQL-verkooprapportages voor de bonusberekening van winkels wereldwijd.'],
      },
    ],
    educationTitle: 'Opleiding',
    education: [
      { name: 'BSc Accountancy', org: 'HvA', period: '' },
      { name: 'Python Developer-traject', org: 'SoftUni', period: '2022–2024' },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Vertel me wat je nodig hebt',
    intro: 'Beschrijf je proces of idee in een paar zinnen.',
    name: 'Naam',
    email: 'E-mail',
    company: 'Bedrijf (optioneel)',
    message: 'Bericht',
    send: 'Verstuur bericht',
    sending: 'Versturen…',
    success: 'Bedankt, je bericht is onderweg. Je ontvangt een bevestiging per e-mail.',
    successNoConfirm: 'Bedankt, je bericht is onderweg.',
    error: 'Er ging iets mis. Probeer het opnieuw of stuur me een bericht via LinkedIn.',
    invalid: 'Vul je naam, een geldig e-mailadres en een bericht in.',
    privacy:
      'Privacy: je naam, e-mailadres en bericht worden alleen gebruikt om je te antwoorden. Ze worden per e-mail naar mij gestuurd (via Resend) en niet op deze website opgeslagen. Spambescherming door Cloudflare Turnstile. Geen trackingcookies.',
    elsewhere: 'Of vind me op',
  },
  footer: {
    rights: 'Zelf gebouwd met React, TypeScript en Tailwind CSS.',
    top: 'Terug naar boven',
  },
}

export const translations: Record<Lang, Dict> = { en, nl }

/** Tools shown in the scrolling strip under the hero. */
export const tools = [
  'Excel',
  'SQL',
  'Power BI',
  'Lucanet',
  'Visma.net',
  'Python',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Firebase',
  'Cloudflare',
]

/** Public profile links (approved for the public site). */
export const links = {
  linkedin: 'https://www.linkedin.com/in/sasho-s-a0a61658/',
  github: 'https://github.com/svirskisasho-web',
  twine: 'https://www.twine.net/sashoo',
}
