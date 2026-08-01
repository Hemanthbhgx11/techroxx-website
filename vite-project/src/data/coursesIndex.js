// Dynamic Course Registry and Syllabus Data for Tech Roxx Learn
export const COURSES = {
  "html": {
    title: "HTML5 Tutorial",
    category: "Web Development",
    icon: "fab fa-html5",
    color: "#e34c26",
    description: "Learn the standard markup language for Web pages with interactive code play and quizzes.",
    chapters: [
      {
        slug: "01-introduction-to-html",
        title: "HTML Introduction",
        difficulty: "Beginner",
        sandbox: {
          html: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
  <style>
    body { font-family: sans-serif; text-align: center; background-color: #f0f4f8; padding: 40px; }
    h1 { color: #ea580c; }
  </style>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph in the Tech Roxx interactive sandbox.</p>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "High Tech Markup Language"
          ],
          answer: 0,
          explanation: "HTML stands for Hyper Text Markup Language. It is the language used to structure web pages."
        }
      },
      {
        slug: "02-html-editors-and-basic-documents",
        title: "HTML Editors & Basics",
        difficulty: "Beginner",
        sandbox: {
          html: `<!DOCTYPE html>
<html>
<body>
  <h2>Writing in a Simple Text Editor</h2>
  <p>To write HTML, you can use Notepad (PC) or TextEdit (Mac).</p>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which tag is used to define the visible document body in HTML?",
          options: [
            "<head>",
            "<body>",
            "<html>",
            "<document>"
          ],
          answer: 1,
          explanation: "The <body> tag contains all the visible content of an HTML document, such as headings, paragraphs, and images."
        }
      },
      {
        slug: "03-html-elements-and-attributes",
        title: "HTML Elements & Attributes",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <h1>HTML Attributes</h1>
  <a href="https://techroxx.in" target="_blank">Visit Tech Roxx</a>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "What is the correct syntax for adding a hyperlink reference attribute to an anchor tag?",
          options: [
            "<a link=\"url\">",
            "<a href=\"url\">",
            "<a src=\"url\">",
            "<a path=\"url\">"
          ],
          answer: 1,
          explanation: "The href attribute specifies the URL of the page the link goes to: <a href='url'>."
        }
      },
      {
        slug: "04-html-headings-and-paragraphs",
        title: "HTML Headings & Paragraphs",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <p>This is a paragraph.</p>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which heading tag represents the most important heading on an HTML page?",
          options: [
            "<h6>",
            "<h1>",
            "<h0>",
            "<head>"
          ],
          answer: 1,
          explanation: "<h1> defines the most important heading. <h6> defines the least important heading."
        }
      },
      {
        slug: "05-html-styles-and-formatting",
        title: "HTML Styles & Formatting",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <p style="color:red; font-size:20px;">This is structured style text.</p>
  <p>This text is <strong>strong</strong>, and this is <em>emphasized</em>.</p>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which HTML style attribute value syntax changes the text color to red?",
          options: [
            "style=\"text-color:red;\"",
            "style=\"color:red;\"",
            "color=\"red\"",
            "style=\"font-color:red;\""
          ],
          answer: 1,
          explanation: "The style attribute style='color:red;' is used to define inline styles for text colors."
        }
      },
      {
        slug: "06-html-quotations-and-comments",
        title: "HTML Quotations & Comments",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <!-- This is an HTML comment that won't show up in the browser -->
  <p>This is a regular paragraph text.</p>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "What is the correct syntax to define a comment in HTML?",
          options: [
            "// This is a comment",
            "/* This is a comment */",
            "<!-- This is a comment -->",
            "# This is a comment"
          ],
          answer: 2,
          explanation: "HTML comments start with <!-- and end with -->."
        }
      },
      {
        slug: "07-html-colors",
        title: "HTML Colors",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <h2 style="background-color: Tomato; color: white; padding: 10px;">Tomato Color</h2>
  <h2 style="background-color: #3b82f6; color: white; padding: 10px;">Hex Blue</h2>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which of the following Hexadecimal color codes represents pure white?",
          options: [
            "#000000",
            "#ffffff",
            "#ff0000",
            "#rgb(255,255,255)"
          ],
          answer: 1,
          explanation: "#ffffff represents pure white, while #000000 represents black."
        }
      },
      {
        slug: "08-html-css-basics",
        title: "HTML CSS Basics",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<head>
  <style>
    h1 { color: purple; text-align: center; }
  </style>
</head>
<body>
  <h1>Internal CSS Style</h1>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Where is the correct tag location to place internal CSS styles within an HTML document?",
          options: [
            "At the bottom of the <body> section",
            "Inside the <head> section using a <style> tag",
            "Inside a separate .js file",
            "Inside the <footer> element"
          ],
          answer: 1,
          explanation: "Internal CSS is defined within the <style> element, inside the <head> section of an HTML page."
        }
      },
      {
        slug: "09-html-links",
        title: "HTML Links",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <p><a href="https://techroxx.in" target="_blank">Click here to open Tech Roxx in a new tab!</a></p>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which attribute and value are used to open a hyperlink in a new browser tab?",
          options: [
            "target=\"_new\"",
            "target=\"_blank\"",
            "window=\"new\"",
            "mode=\"external\""
          ],
          answer: 1,
          explanation: "The target='_blank' attribute opens the linked document in a new window or tab."
        }
      },
      {
        slug: "10-html-images",
        title: "HTML Images",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=300" alt="Web Design Image" style="width: 100%; max-width: 300px; border-radius: 8px;">
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which attribute is required to provide alternative description text for screen readers or when an image fails to load?",
          options: [
            "title",
            "desc",
            "alt",
            "src"
          ],
          answer: 2,
          explanation: "The alt attribute provides an alternate text for an image, if the user cannot view it."
        }
      },
      {
        slug: "11-html-tables",
        title: "HTML Tables",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<head>
  <style>
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <table>
    <tr><th>Company</th><th>Role</th></tr>
    <tr><td>Google</td><td>Product-Based</td></tr>
    <tr><td>TCS</td><td>Service-Based</td></tr>
  </table>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which HTML tag is used to define a single row inside a table?",
          options: [
            "<td>",
            "<tr>",
            "<th>",
            "<row>"
          ],
          answer: 1,
          explanation: "<tr> stands for Table Row, which acts as the container for <th> (header cells) and <td> (data cells)."
        }
      },
      {
        slug: "12-html-lists",
        title: "HTML Lists",
        difficulty: "Beginner",
        sandbox: {
          html: `<html>
<body>
  <h3>Unordered List</h3>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
  </ul>
  <h3>Ordered List</h3>
  <ol>
    <li>Intro</li>
    <li>Basics</li>
  </ol>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which HTML tag is used to initialize an ordered (numbered) list?",
          options: [
            "<ul>",
            "<ol>",
            "<li>",
            "<list>"
          ],
          answer: 1,
          explanation: "<ol> defines an ordered list, which automatically prefixes items with numerical indexes."
        }
      },
      {
        slug: "13-html-div-and-span",
        title: "HTML Div & Span",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
    <h3>Block Div Element</h3>
    <p>This is a block container. The word <span style="color: blue; font-weight: bold;">blue</span> is wrapped in a span.</p>
  </div>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which of the following describes the span element correctly?",
          options: [
            "It is a block-level element.",
            "It is an inline container used to mark up a part of a text.",
            "It is used to add layout grids.",
            "It requires a source attribute."
          ],
          answer: 1,
          explanation: "The <span> element is an inline container used to mark up a part of a text or document."
        }
      },
      {
        slug: "14-html-classes-and-id",
        title: "HTML Classes & ID",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<head>
  <style>
    .city { background-color: tomato; color: white; padding: 10px; margin: 5px; }
    #main-header { text-align: center; color: dodgerblue; }
  </style>
</head>
<body>
  <h1 id="main-header">My Website Header</h1>
  <div class="city">New York</div>
  <div class="city">London</div>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Can multiple HTML elements share the exact same id attribute value on a single web page?",
          options: [
            "Yes, as many as needed.",
            "No, the id attribute must be unique to a single element.",
            "Only within tables.",
            "Yes, if they are elements of different tags."
          ],
          answer: 1,
          explanation: "The id attribute specifies a unique id for an HTML element. The value of the id attribute must be unique within the HTML document."
        }
      },
      {
        slug: "15-html-iframes",
        title: "HTML Iframes",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <h2>Embedded Page</h2>
  <iframe src="https://techroxx.in" width="100%" height="200px" style="border:1px solid #ccc; border-radius:8px;"></iframe>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which HTML tag is used to embed another document or webpage directly within the current HTML page?",
          options: [
            "<frame>",
            "<embed>",
            "<iframe>",
            "<object>"
          ],
          answer: 2,
          explanation: "An HTML iframe is used to display a web page within a web page: <iframe>."
        }
      },
      {
        slug: "16-html-forms",
        title: "HTML Forms",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <form style="display: flex; flex-direction: column; gap: 10px; max-width: 200px;">
    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname">
    <input type="submit" value="Submit" style="cursor: pointer; background: #ea580c; color: white; border: none; padding: 8px; border-radius: 4px;">
  </form>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which attribute binds an HTML <label> element to its corresponding input field?",
          options: [
            "id",
            "name",
            "for",
            "bind"
          ],
          answer: 2,
          explanation: "The for attribute of the <label> tag should be equal to the id attribute of the <input> element to bind them together."
        }
      },
      {
        slug: "17-html-form-input-types",
        title: "HTML Form Input Types",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <form>
    <input type="checkbox" id="c1"><label for="c1"> Checkbox</label><br>
    <input type="radio" id="r1" name="opt"><label for="r1"> Option A</label>
  </form>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which input type value should be used to restrict selections to a single choice among a set of radio button choices?",
          options: [
            "type=\"checkbox\"",
            "type=\"select\"",
            "type=\"radio\"",
            "type=\"option\""
          ],
          answer: 2,
          explanation: "The type='radio' input type defines radio buttons, allowing a user to select only one of a limited number of choices."
        }
      },
      {
        slug: "18-html-semantic-elements-layout",
        title: "HTML Semantic Elements",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <header style="background:#334155; color:white; padding:10px; text-align:center;">Header</header>
  <nav style="background:#475569; padding:5px; text-align:center;"><a href="#" style="color:white; text-decoration:none;">Nav</a></nav>
  <main style="padding:15px;">Main Section</main>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which of the following elements is a semantic element that clearly describes its meaning to both the browser and developer?",
          options: [
            "<div>",
            "<span>",
            "<article>",
            "<table>"
          ],
          answer: 2,
          explanation: "<article> is a semantic element. Semantic elements clearly describe their content (like <form>, <table>, <article>)."
        }
      },
      {
        slug: "19-html-media-audio-video",
        title: "HTML Media Audio & Video",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which attribute must be added to enable play, pause, and volume buttons on the HTML5 video player?",
          options: [
            "buttons",
            "controls",
            "play",
            "settings"
          ],
          answer: 1,
          explanation: "The controls attribute adds video controls, like play, pause, and volume."
        }
      },
      {
        slug: "20-html-graphics-canvas-svg-responsive",
        title: "HTML Graphics Canvas & SVG",
        difficulty: "Intermediate",
        sandbox: {
          html: `<html>
<body>
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>
</body>
</html>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which graphic standard is vector-based, stored in XML format, and scales infinitely without losing sharpness?",
          options: [
            "Canvas",
            "SVG",
            "PNG",
            "JPEG"
          ],
          answer: 1,
          explanation: "SVG stands for Scalable Vector Graphics. It is vector-based XML, rendering crisp elements at any size."
        }
      }
    ]
  },
  "esp32-telemetry": {
    title: "ESP32 Telemetry & IoT",
    category: "Embedded & IoT",
    icon: "fas fa-microchip",
    color: "#ea580c",
    description: "A deep-dive technical guide explaining ESP32 architecture, sensor interfacing, and MQTT telemetry.",
    chapters: [
      {
        slug: "esp32-intro",
        title: "Introduction to Telemetry",
        difficulty: "Technical Guide",
        content: `
          <h3>Introduction to Embedded IoT & Telemetry</h3>
          <p>In the modern industrial landscape, Internet of Things (IoT) technologies are shifting from simple remote-control utilities to sophisticated, real-time telemetry pipelines. At the core of many of these embedded designs lies the ESP32 microcontroller, a low-cost, low-power system-on-a-chip (SoC) featuring integrated Wi-Fi and dual-mode Bluetooth. Understanding how to build reliable telemetry architectures with the ESP32 is an essential skill for modern electronics and software developers.</p>
          
          <div class="info-note">
            <strong>IoT Evolution:</strong> Standard HTTP APIs are often too heavy for telemetry. Modern telemetry relies on persistent, lightweight connection tunnels.
          </div>
        `,
        quiz: {
          question: "Which chip interfaces are typically used to acquire digital sensor readings?",
          options: [
            "HDMI and DisplayPort",
            "I2C, SPI, and UART",
            "SATA and PCI Express",
            "USB 3.0 only"
          ],
          answer: 1,
          explanation: "I2C, SPI, and UART are standard serial protocols used in embedded hardware to interface sensors with a microcontroller like the ESP32."
        }
      },
      {
        slug: "esp32-anatomy",
        title: "Anatomy of the ESP32",
        difficulty: "Technical Guide",
        content: `
          <h3>ESP32 Microcontroller Internals</h3>
          <p>The ESP32 is powered by a Tensilica Xtensa Dual-Core 32-bit LX6 microprocessor, operating at speeds up to 240 MHz. It contains 520 KB of internal SRAM and is typically paired with 4 MB or 8 MB of external flash memory. For telemetry applications, the ESP32 offers an abundant array of peripherals, including:</p>
          <ul>
            <li><strong>Analog-to-Digital Converters (ADC):</strong> Two 12-bit SAR ADCs supporting up to 18 channels, used to read analog sensors.</li>
            <li><strong>Digital-to-Analog Converters (DAC):</strong> Two 8-bit DAC channels for generating analog signals.</li>
            <li><strong>GPIO (General Purpose Input/Output):</strong> Digital pins to toggle states or interface buttons/relays.</li>
          </ul>
        `,
        quiz: {
          question: "What is the typical internal SRAM size of the ESP32?",
          options: [
            "520 KB",
            "4 MB",
            "128 KB",
            "16 MB"
          ],
          answer: 0,
          explanation: "The ESP32 microcontroller features 520 KB of on-chip SRAM, while flash storage (typically 4MB or 8MB) is external."
        }
      },
      {
        slug: "esp32-pipeline",
        title: "Designing MQTT Pipelines",
        difficulty: "Technical Guide",
        content: `
          <h3>Designing the Telemetry Pipeline: MQTT vs HTTP</h3>
          <p>For data transmission in IoT, Message Queuing Telemetry Transport (MQTT) is the industry standard. Unlike HTTP, which is a heavy request-response protocol, MQTT is a lightweight publish-subscribe protocol designed for constrained networks. It uses a persistent TCP connection, keeping headers extremely small (often just 2 bytes), which conserves power and bandwidth.</p>
          
          <h4>MQTT Quality of Service (QoS) Levels:</h4>
          <ul>
            <li><strong>QoS 0 (At most once):</strong> Fast, no delivery confirmation.</li>
            <li><strong>QoS 1 (At least once):</strong> Guaranteed delivery, but duplicates can occur.</li>
            <li><strong>QoS 2 (Exactly once):</strong> Four-step handshake, highest reliability.</li>
          </ul>
        `,
        sandbox: {
          html: `<div style="padding: 20px; font-family: sans-serif;">
  <h3>MQTT Connection Simulator</h3>
  <p>Broker: <code>broker.hivemq.com</code></p>
  <p>Status: <span id="status" style="color: red; font-weight: bold;">Disconnected</span></p>
  <button id="btn" style="padding: 8px 16px; cursor: pointer;">Connect</button>
</div>
<script>
  const btn = document.getElementById('btn');
  const status = document.getElementById('status');
  btn.onclick = () => {
    status.innerText = "Connected";
    status.style.color = "green";
    btn.disabled = true;
  }
</script>`,
          css: "",
          js: ""
        },
        quiz: {
          question: "Which MQTT QoS level guarantees a message is received exactly once?",
          options: [
            "QoS 0",
            "QoS 1",
            "QoS 2",
            "QoS 3"
          ],
          answer: 2,
          explanation: "QoS 2 is the highest level of service in MQTT, guaranteeing that a message is delivered exactly once through a 4-way handshake."
        }
      }
    ]
  },
  "pcb-design": {
    title: "Advanced PCB Design",
    category: "VLSI & Electronics",
    icon: "fas fa-project-diagram",
    color: "#2563eb",
    description: "A professional guide detailing multi-layer board stackups, return paths, impedance matching, and decoupling.",
    chapters: [
      {
        slug: "pcb-stackup",
        title: "Layer Stackups & Return Paths",
        difficulty: "Technical Guide",
        content: `
          <h3>Foundations of PCB Layout Design</h3>
          <p>For modern microcontroller-based circuits operating above a few Megahertz, a simple 2-layer board is often insufficient. A 4-layer board is the standard entry point, providing dedicated ground and power planes. A typical 4-layer stackup consists of:</p>
          <ul>
            <li><strong>Layer 1 (Top):</strong> High-speed signals, component pads.</li>
            <li><strong>Layer 2:</strong> Solid Ground Plane (GND) - provides shortest return paths.</li>
            <li><strong>Layer 3:</strong> Power Plane (VCC) or signal routing.</li>
            <li><strong>Layer 4 (Bottom):</strong> Slow signals, test points, auxiliary routes.</li>
          </ul>
          <p>A solid ground plane directly beneath the signal layer is critical because high-frequency signals follow the path of least <em>inductance</em>. The return current will naturally flow in the ground plane directly below the signal trace.</p>
        `,
        quiz: {
          question: "Why is a ground plane directly below high-speed signal lines necessary?",
          options: [
            "It decreases mechanical board weight.",
            "It acts as a heat sink only.",
            "It provides a path of least inductance, minimizing return loop area and EMI.",
            "It converts AC signals into DC."
          ],
          answer: 2,
          explanation: "High frequency signals follow the path of least inductance. A reference ground plane immediately below allows the return current to flow directly under the trace, minimizing loop area and EMI."
        }
      },
      {
        slug: "pcb-impedance",
        title: "Impedance & Decoupling",
        difficulty: "Technical Guide",
        content: `
          <h3>Impedance Control & Signal Integrity</h3>
          <p>When routing high-speed lines (such as USB differential pairs, Ethernet tracks, or DDR memory lines), the traces must be treated as transmission lines. The characteristic impedance of these lines must match the source and load impedance (typically 50Ω single-ended or 90Ω/100Ω differential) to prevent signal reflections.</p>
          
          <h3>Decoupling and Power Integrity</h3>
          <p>Integrated circuits require clean power. When a CPU switch occurs, it draws rapid spikes of current from the power supply. If the power supply cannot deliver this current instantly, the voltage will sag, causing digital glitches. To solve this, decoupling capacitors (typically 0.1µF and 10nF ceramic capacitors) are placed close to every IC power pin.</p>
        `,
        quiz: {
          question: "Where should decoupling capacitors be placed for maximum efficiency?",
          options: [
            "As close as possible to the power source/battery.",
            "Directly adjacent to the power pins of the ICs.",
            "Anywhere on the bottom layer.",
            "In series with the high-speed differential signal pairs."
          ],
          answer: 1,
          explanation: "Decoupling capacitors should be placed as close as possible to the IC power pins to minimize parasitic inductance of the trace connection."
        }
      }
    ]
  },
  "agentic-ai": {
    title: "Agentic AI & Orchestration",
    category: "Artificial Intelligence",
    icon: "fas fa-brain",
    color: "#10b981",
    description: "An in-depth guide outlining cognitive agentic design patterns, tool integration, and orchestration (CrewAI vs LangGraph).",
    chapters: [
      {
        slug: "agentic-foundations",
        title: "Foundations of AI Agents",
        difficulty: "Research Guide",
        content: `
          <h3>Understanding Agentic AI & Autonomy</h3>
          <p>The AI landscape is rapidly evolving from passive, instruction-following chatbots into autonomous agentic architectures. While traditional Large Language Models (LLMs) operate on a simple input-output prompt cycle, Agentic AI introduces loops, memory registers, tool interfaces, and planning mechanisms that enable models to act as independent decision-makers.</p>
          
          <h4>Four Pillars of AI Agents:</h4>
          <ol>
            <li><strong>Core Brain:</strong> The LLM reasoning engine (e.g. GPT-4, Claude 3.5 Sonnet, Gemini 1.5 Pro).</li>
            <li><strong>Memory Systems:</strong> Context variables (short-term) and Vector Databases / RAG (long-term).</li>
            <li><strong>Tool Integration:</strong> External APIs, code execution, web scrapers.</li>
            <li><strong>Planning Frameworks:</strong> Structuring complex reasoning cycles (e.g. ReAct).</li>
          </ol>
        `,
        quiz: {
          question: "Which component of an AI agent is typically used for persisting historical logs and background knowledge?",
          options: [
            "GPU memory cache",
            "Vector databases using RAG (Retrieval-Augmented Generation)",
            "System command prompt string",
            "Local file caches"
          ],
          answer: 1,
          explanation: "Vector databases combined with RAG form the long-term memory system of advanced AI agents, letting them retrieve relevant historical logs or files."
        }
      },
      {
        slug: "agentic-orchestration",
        title: "Multi-Agent Orchestration",
        difficulty: "Research Guide",
        content: `
          <h3>Multi-Agent Collaborative Workflows</h3>
          <p>For complex business applications, a single agent often struggles with context drift and error propagation. The industry standard has shifted toward Multi-Agent Systems (MAS). In a collaborative multi-agent architecture, specialized agents with distinct prompts, tools, and roles work together, much like a software development team.</p>
          
          <h3>CrewAI vs LangGraph</h3>
          <ul>
            <li><strong>CrewAI:</strong> High-level, role-based framework that makes it easy to define agents, tasks, and tools in a sequential or hierarchical flow. Ideal for standard business workflows.</li>
            <li><strong>LangGraph:</strong> Low-level, graph-based framework built by LangChain. It models workflows as cyclic graphs, offering control over states, loops, and human-in-the-loop steps. Ideal for complex agent behaviors.</li>
          </ul>
        `,
        quiz: {
          question: "What makes LangGraph particularly suitable for complex developer assistants or debuggers compared to CrewAI?",
          options: [
            "It is written in C++ instead of Python.",
            "It supports circular loops (cyclic graphs) and granular state/human-in-the-loop controls.",
            "It doesn't require an LLM to run.",
            "It executes commands directly on raw hardware."
          ],
          answer: 1,
          explanation: "LangGraph models agentic interactions as a graph of nodes and edges, allowing cyclic workflows (loops), which are essential for debugging cycles and complex feedback loops."
        }
      }
    ]
  },
  "mern-fullstack": {
    title: "MERN Stack Optimization",
    category: "Software Engineering",
    icon: "fas fa-code",
    color: "#ec4899",
    description: "A career strategy guide for MERN developers, covering MongoDB indexing, Node security, and React caching.",
    chapters: [
      {
        slug: "mern-databases",
        title: "MongoDB & Node Optimization",
        difficulty: "Career Guide",
        content: `
          <h3>Production MongoDB Optimization</h3>
          <p>In production, unoptimized database queries lead to high latency and database crashes. Full-stack developers must master:</p>
          <ul>
            <li><strong>Indexing:</strong> Using compound indexes, partial indexes, and text indexes. Analyzing performance using <code>explain()</code>.</li>
            <li><strong>Aggregation Pipelines:</strong> Performing data transformations directly on the database cluster instead of loading records into Node.js memory.</li>
            <li><strong>Data Modeling:</strong> Deciding when to embed documents (1-to-few) vs when to reference them (1-to-many).</li>
          </ul>
          
          <h3>Scalable Node.js Backend Design</h3>
          <p>Protecting endpoints from abuse requires rate limiting (e.g. <code>express-rate-limit</code>) and header security (e.g. <code>helmet</code>). Caching database responses using <strong>Redis</strong> can offload major read overheads from your database clusters.</p>
        `,
        quiz: {
          question: "Which tool is best used to cache database query responses in Node.js to improve application read performance?",
          options: [
            "Docker Containers",
            "MongoDB Indexes",
            "Redis Caching Store",
            "JSON files"
          ],
          answer: 2,
          explanation: "Redis is an in-memory key-value database ideal for caching heavy database queries to achieve sub-millisecond response times."
        }
      }
    ]
  }
};
