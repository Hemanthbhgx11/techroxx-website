import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { placementCompanies } from '../data/constants';

// W3Schools-Style Course Chapters Mapping (fully preserved from Guides)
const courseChapters = {
    'c-cpp-guide': [
        { id: 'intro', title: '1. Systems Compilations' },
        { id: 'pointers', title: '2. Pointers Math & Addresses' },
        { id: 'dynamic', title: '3. Stack vs Heap (malloc)' },
        { id: 'structures', title: '4. Structs & Hardware Unions' }
    ],
    'java-guide': [
        { id: 'java-intro', title: '1. JVM Bytecode Architecture' },
        { id: 'oop-foundations', title: '2. OOP Design Patterns' },
        { id: 'collections', title: '3. Java Collections Framework' }
    ],
    'mern-guide': [
        { id: 'mern-intro', title: '1. MERN Stack Overview' },
        { id: 'express-routing', title: '2. Express REST API Routers' },
        { id: 'mongoose', title: '3. Mongoose Schemas & Models' }
    ],
    'embedded-guide': [
        { id: 'embedded-intro', title: '1. ESP32 Microcontrollers' },
        { id: 'gpio', title: '2. GPIO Register Configurations' },
        { id: 'freertos-tasks', title: '3. FreeRTOS Task Scheduler' }
    ],
    'ai-ml-guide': [
        { id: 'ai-intro', title: '1. AI vs. Machine Learning' },
        { id: 'tensorflow-keras', title: '2. Keras Model Architectures' }
    ],
    'data-science-guide': [
        { id: 'ds-intro', title: '1. Data Pipeline Lifecycles' },
        { id: 'pandas', title: '2. DataFrame Data Analytics' }
    ]
};

// Dynamic Programming Code Lessons Generator (W3Schools Style - fully preserved)
const renderActiveChapterContent = (slug, chapterId) => {
    const defaultMsg = "<h3>Lesson Content</h3><p>Select a curriculum topic from the left sidebar navigator to display the full interactive coding lesson.</p>";
    
    if (slug === 'c-cpp-guide') {
        switch (chapterId) {
            case 'intro':
                return `
                    <h3>1. Introduction to Systems Compilations</h3>
                    <p>C and C++ are compiled, system-level programming languages that translate source code directly into native CPU instructions. This gives the developer raw control over physical memory layers and hardware execution pipelines.</p>
                    
                    <div class="code-box-header"><i class="fas fa-terminal"></i> Compilation Stages</div>
                    <pre class="code-block"><code>Source Code (.cpp) 
  ↳ Preprocessor (Expands headers & macros)
    ↳ Compiler (Translates to Assembly .s)
      ↳ Assembler (Creates machine object .o)
        ↳ Linker (Combines objects & libs into Executable)</code></pre>
                    
                    <p>To compile C++ source code from a terminal command shell using GCC, execute the following command:</p>
                    <pre class="code-block-cmd"><code>g++ -O3 -Wall main.cpp -o techroxx_app</code></pre>
                `;
            case 'pointers':
                return `
                    <h3>2. Pointers Mathematics & Addresses</h3>
                    <p>A pointer is a variable that stores the physical memory address of another variable. Master the address-of operator (<code>&</code>) and the dereference operator (<code>*</code>).</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Pointer Syntax & Math Example</div>
                    <pre class="code-block"><code>#include &lt;iostream&gt;
 
int main() {
    int sensorReading = 42;
    int* ptr = &sensorReading; // Store memory address of sensorReading

    std::cout << "Value: " << sensorReading << std::endl; // Prints 42
    std::cout << "Address: " << ptr << std::endl;         // Prints 0x7ffd52
    std::cout << "Dereferenced: " << *ptr << std::endl;   // Prints 42

    *ptr = 100; // Modify the value at memory address directly
    std::cout << "New Value: " << sensorReading << std::endl; // Prints 100
    return 0;
}</code></pre>
                `;
            case 'dynamic':
                return `
                    <h3>3. Dynamic Stack vs. Heap Allocation</h3>
                    <p>Memory in system languages is divided into two primary zones: the stack and the heap. Stack variables are managed automatically by the scope, whereas heap allocations are persisted until freed manually by the programmer.</p>
                    
                    <table class="premium-table">
                        <thead>
                            <tr>
                                <th>Memory Stack</th>
                                <th>Memory Heap</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Super fast automatic local scope allocation.</td>
                                <td>Flexible persistent dynamic manual allocation.</td>
                            </tr>
                            <tr>
                                <td>Strict memory limits (can cause stack overflow).</td>
                                <td>Vast, bounded only by system virtual RAM.</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Dynamic Heap Allocation in C & C++</div>
                    <pre class="code-block"><code>// Dynamic Heap Allocation in C style
int* c_array = (int*)malloc(10 * sizeof(int));
free(c_array); // Mandatory cleanup

// Dynamic Heap Allocation in C++ style
double* cpp_array = new double[50];
delete[] cpp_array; // Mandatory cleanup to prevent Memory Leaks</code></pre>
                `;
            case 'structures':
                return `
                    <h3>4. Structures & Hardware Unions</h3>
                    <p>Structures allow you to group related variables together, while Unions allow multiple variables to share the exact same memory space—crucial for low-level register abstractions.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Register Union Representation</div>
                    <pre class="code-block"><code>#include &lt;iostream&gt;

union Register {
    uint32_t raw_32;
    struct {
        uint8_t byte0;
        uint8_t byte1;
        uint8_t byte2;
        uint8_t byte3;
    } bytes;
};

int main() {
    Register reg;
    reg.raw_32 = 0xAABBCCDD; // Assign 32-bit hex
    std::cout << std::hex << (int)reg.bytes.byte0 << std::endl; // Prints DD
    return 0;
}</code></pre>
                `;
            default: return defaultMsg;
        }
    }
    
    if (slug === 'java-guide') {
        switch (chapterId) {
            case 'java-intro':
                return `
                    <h3>1. JVM Bytecode & Execution Pipeline</h3>
                    <p>Java's core philosophy is "Write Once, Run Anywhere" (WORA). This portability is achieved by compiling source code (.java) into intermediate bytecode (.class) which is executed by the Java Virtual Machine.</p>
                    
                    <div class="code-box-header"><i class="fas fa-terminal"></i> Java Compilation Process</div>
                    <pre class="code-block"><code>Source Code (App.java) 
  ↳ Java Compiler (javac App.java)
    ↳ Bytecode (App.class - platform independent)
      ↳ JVM (Interpreter + JIT Compiler)
        ↳ Machine Instructions (Platform specific)</code></pre>
                `;
            case 'oop-foundations':
                return `
                    <h3>2. Object-Oriented Design Patterns</h3>
                    <p>Java enforces a strict Object-Oriented paradigm. Master interfaces, abstract classes, encapsulation, polymorphism, and inheritance rules.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Interface & Polymorphism Code</div>
                    <pre class="code-block"><code>interface Sensor {
    double readData();
}

class TelemetryNode implements Sensor {
    private double lastValue = 0.0;
    
    @Override
    public double readData() {
        return this.lastValue = Math.random() * 100.0;
    }
}</code></pre>
                `;
            case 'collections':
                return `
                    <h3>3. Java Collections Framework</h3>
                    <p>Java Collections provide structured, standard interfaces for holding references to dynamic data elements.</p>
                    
                    <pre class="code-block"><code>import java.util.ArrayList;
import java.util.HashMap;

public class CollectionsDemo {
    public static void main(String[] args) {
        // Dynamic arrays
        ArrayList<String> list = new ArrayList<>();
        list.add("TechRoxx");
        
        // Key-Value Dictionary maps
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Sensor01", 95);
    }
}</code></pre>
                `;
            default: return defaultMsg;
        }
    }
    
    if (slug === 'mern-guide') {
        switch (chapterId) {
            case 'mern-intro':
                return `
                    <h3>1. MERN Full-Stack Overview</h3>
                    <p>The MERN stack consists of MongoDB, Express, React, and Node.js. It is an entirely Javascript-driven framework stack for creating highly scalable web applications.</p>
                    <pre class="code-block"><code>[ React.js Frontend ] (Client SPA UI)
          ↕ (REST APIs / JSON)
[ Node.js + Express Server ] (Business Logic Router API)
          ↕ (Mongoose Driver)
[ MongoDB NoSQL Database ] (Dynamic Document Store)</code></pre>
                `;
            case 'express-routing':
                return `
                    <h3>2. Express REST API Routers</h3>
                    <p>Express acts as the routing layer on top of Node's native HTTP servers, supporting routes, middleware, and request/response pipelines.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Express Server Setup</div>
                    <pre class="code-block"><code>const express = require('express');
const app = express();
app.use(express.json()); // Middleware for JSON bodies

app.get('/api/telemetry', (req, res) => {
    res.json({ status: "online", activeNodes: 24 });
});

app.listen(5000, () => console.log('Server active on port 5000'));</code></pre>
                `;
            case 'mongoose':
                return `
                    <h3>3. Mongoose Schemas & Validation Models</h3>
                    <p>Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing strict schema validations and query modeling interfaces.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Defining Mongoose Schema</div>
                    <pre class="code-block"><code>const mongoose = require('mongoose');

const InternSchema = new mongoose.Schema({
    name: { type: String, required: true },
    empId: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    joinedDate: { type: Date, default: Date.now }
});

const Intern = mongoose.model('Intern', InternSchema);</code></pre>
                `;
            default: return defaultMsg;
        }
    }
    
    if (slug === 'embedded-guide') {
        switch (chapterId) {
            case 'embedded-intro':
                return `
                    <h3>1. ESP32 Microcontroller Core</h3>
                    <p>The ESP32 is a dual-core microcontroller with integrated Wi-Fi and Bluetooth, making it the premier choice for Internet of Things (IoT) hardware prototyping.</p>
                    <pre class="code-block"><code>ESP32 Features:
- Dual-core Tensilica Xtensa 32-bit LX6 processors
- 520 KB SRAM / 4 MB Flash memory
- Integrated 2.4 GHz WiFi & BLE
- 36 General Purpose Input/Output (GPIO) pins</code></pre>
                `;
            case 'gpio':
                return `
                    <h3>2. GPIO Low-Level Register Configurations</h3>
                    <p>GPIO configurations allow you to configure physical pins as input/output, pull-up/pull-down, or dynamic analog ports.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Led Pin Blink setup</div>
                    <pre class="code-block"><code>#define LED_PIN 2

void setup() {
    pinMode(LED_PIN, OUTPUT);
}

void loop() {
    digitalWrite(LED_PIN, HIGH); // Output 3.3V
    delay(1000);
    digitalWrite(LED_PIN, LOW);  // Output 0V
    delay(1000);
}</code></pre>
                `;
            case 'freertos-tasks':
                return `
                    <h3>3. FreeRTOS Multithreaded Task Scheduler</h3>
                    <p>FreeRTOS is a real-time operating system scheduler natively supported on the ESP32 dual-core processors, enabling true parallel thread operations.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> FreeRTOS Task Creation</div>
                    <pre class="code-block"><code>void setup() {
    Serial.begin(115200);
    
    // Create Task on Core 0
    xTaskCreatePinnedToCore(
        TaskSensorRead,    // Function pointer
        "SensorRead",      // Task name
        2048,              // Stack size (words)
        NULL,              // Parameters
        1,                 // Priority
        NULL,              // Task handler
        0                  // Core ID (0)
    );
}</code></pre>
                `;
            default: return defaultMsg;
        }
    }
    
    if (slug === 'ai-ml-guide') {
        switch (chapterId) {
            case 'ai-intro':
                return `
                    <h3>1. Artificial Intelligence vs. Machine Learning</h3>
                    <p>Understand the hierarchies of analytical models:</p>
                    <pre class="code-block"><code>[ Artificial Intelligence (AI) ] - Broader technology systems behaving intelligently.
     ↳ [ Machine Learning (ML) ] - Predictive statistics trained on features.
          ↳ [ Deep Learning (DL) ] - Multi-layer neural networks (CNNs, Transformers).</code></pre>
                `;
            case 'tensorflow-keras':
                return `
                    <h3>2. Keras Neural Network Models</h3>
                    <p>Keras provides a high-level API wrapper for TensorFlow, allowing developers to define layered neural networks in minutes.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Simple MLP Neural Network</div>
                    <pre class="code-block"><code>import tensorflow as tf
from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Dense(64, activation='relu', input_shape=(10,)),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid') // Binary classification output
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])</code></pre>
                `;
            default: return defaultMsg;
        }
    }
    
    if (slug === 'data-science-guide') {
        switch (chapterId) {
            case 'ds-intro':
                return `
                    <h3>1. Data Pipeline Lifecycles</h3>
                    <p>Data science pipelines are structured in iterative stages:</p>
                    <pre class="code-block"><code>Data Collection ↳ Data Cleaning ↳ Explanatory Analysis ↳ Machine Learning ↳ Production Dashboard Deployment</code></pre>
                `;
            case 'pandas':
                return `
                    <h3>2. DataFrame Analytics in Pandas</h3>
                    <p>Pandas is the premier scientific computing framework in Python for structured data manipulations.</p>
                    
                    <div class="code-box-header"><i class="fas fa-code"></i> Python Data Aggregation</div>
                    <pre class="code-block"><code>import pandas as pd

# Load structured dataset
df = pd.read_csv('telemetry_nodes.csv')

# Group and aggregate analytics metrics
summary = df.groupby('node_id').agg({
    'temperature': 'mean',
    'packet_delivery_rate': 'min'
})
print(summary)</code></pre>
                `;
            default: return defaultMsg;
        }
    }
    
    return defaultMsg;
};

// Enriched courses & guides E-Commerce catalog
const ecomCatalog = [
    // 1. Courses (Paid)
    {
        type: 'course',
        category: 'Programming & Full Stack',
        slug: 'dsa-elite',
        title: 'Data Structures & Algorithms (DSA) Elite',
        difficulty: 'Masterclass',
        chapters: 24,
        duration: '10 Weeks',
        price: '₹2,999',
        originalPrice: '₹5,999',
        isPaid: true,
        description: 'Master time complexities, dynamic programming, trees, and graphs to ace technical software engineering interviews.',
        features: ['Live Doubt Sessions', '150+ Coding Exercises', 'Resume Reviews', 'Certificate of Completion']
    },
    {
        type: 'course',
        category: 'Data Science & AI',
        slug: 'genai-llm',
        title: 'Generative AI & LLM Systems Pro',
        difficulty: 'Masterclass',
        chapters: 16,
        duration: '8 Weeks',
        price: '₹5,999',
        originalPrice: '₹11,999',
        isPaid: true,
        description: 'Build production-grade applications using OpenAI APIs, LangChain, RAG architecture, vector databases (Pinecone), and AI agents.',
        features: ['Build 4 AI SaaS Products', 'API Keys Included', 'Autonomous Agent Lab', 'Exclusive Discord Channel']
    },
    {
        type: 'course',
        category: 'Hardware & Embedded',
        slug: 'iot-connectivity',
        title: 'Internet of Things (IoT) & Smart Systems',
        difficulty: 'Masterclass',
        chapters: 20,
        duration: '8 Weeks',
        price: '₹4,999',
        originalPrice: '₹9,999',
        isPaid: true,
        description: 'Interface sensors, write edge AI algorithms, use MQTT cloud protocols, and build fully automated smart home grids.',
        features: ['Hardware IoT Kit Included', 'Cloud Telemetry Labs', 'Edge Computing Modules', 'Project Portfolio Review']
    },
    {
        type: 'course',
        category: 'Programming & Full Stack',
        slug: 'mern-bootcamp',
        title: 'MERN Full-Stack Web Development',
        difficulty: 'Masterclass',
        chapters: 32,
        duration: '12 Weeks',
        price: '₹7,999',
        originalPrice: '₹15,999',
        isPaid: true,
        description: 'Build massive commercial platforms using MongoDB document schemas, Express REST interfaces, React, and Node.js.',
        features: ['3 Live Capstone Projects', 'Auth & Payments Integration', 'Vibe Coding with Cursor/Copilot', 'Job Referral Program']
    },
    {
        type: 'course',
        category: 'Hardware & Embedded',
        slug: 'pcb-eda',
        title: 'PCB Design & Prototyping Masterclass',
        difficulty: 'Essentials',
        chapters: 12,
        duration: '6 Weeks',
        price: '₹3,499',
        originalPrice: '₹6,999',
        isPaid: true,
        description: 'Route professional double-layer circuit boards, create custom EDA schematics in KiCad, and bring hardware products to fabrication.',
        features: ['KiCad & Eagle Libraries', 'Signal Integrity Analysis', 'DFM Manufacturing Rules', 'Free Board Fabrication Voucher']
    },
    // 2. Courses (Free)
    {
        type: 'course',
        category: 'Programming & Full Stack',
        slug: 'python-foundations',
        title: 'Python & Computing Foundations',
        difficulty: 'Beginner',
        chapters: 10,
        duration: '4 Weeks',
        price: 'Free',
        isPaid: false,
        description: 'Learn core python syntax, object-oriented concepts, dynamic file handling, Git version control, and Linux terminal scripts.',
        features: ['Hands-on Lab Shells', 'Graded Quizzes', 'Lifetime Access', 'Community Forum Support']
    },
    {
        type: 'course',
        category: 'Arts, Management & Analytics',
        slug: 'pm-ai-intro',
        title: 'Product Management with AI Essentials',
        difficulty: 'Beginner',
        chapters: 8,
        duration: '3 Weeks',
        price: 'Free',
        isPaid: false,
        description: 'Ideate features, write comprehensive Product Requirement Documents (PRDs), and optimize product cycles using LLM agents.',
        features: ['PRD Templates', 'Agile/Scrum Sheets', 'Interactive Case Studies', 'Career Guidance Session']
    },
    // 3. Guides (Free)
    {
        type: 'guide',
        category: 'Placement & Career',
        slug: 'placement-guide',
        title: 'Placement Directory Guide',
        difficulty: 'Masterclass',
        chapters: 12,
        price: 'Free',
        isPaid: false,
        description: 'Unlock corporate placement success with tier-1/tier-2 industry directories, resume guidelines, and recruiting portals.',
        features: ['Google, Qualcomm, Amazon Careers', 'TCS, Infosys recruiting boards', 'Direct HR Telegram channel access', 'Ongoing job updates'],
        content: "<h3>Placement Success Blueprint & Career Directory</h3><p>Explore career pages and open job boards of top companies hiring across multiple industries. Join our WhatsApp Placement Community to get daily hiring updates directly from our recruiters.</p>"
    },
    {
        type: 'guide',
        category: 'Placement & Career',
        slug: 'resume-architecture',
        title: 'ATS Resume Architecture Guide',
        difficulty: 'Essentials',
        chapters: 6,
        price: 'Free',
        isPaid: false,
        description: 'Optimize your technical profile for Applicant Tracking Systems (ATS) using standard single-page layouts and the XYZ formula.',
        features: ['ATS-Compatible Docx Templates', 'XYZ Achievement Formula', 'Resume Length Guidelines', 'Skills Classification Mapping'],
        content: "<h3>Building an Industry-Grade Resume</h3><p>Your resume is the first point of contact with recruiter systems. Optimize it with these proven guidelines:</p><ul><li><strong>Use the XYZ Formula:</strong> Accomplished [X] as measured by [Y], by doing [Z]. For example: <em>'Reduced API latency by 45% using Redis caching strategies.'</em></li><li><strong>Strict Single-Page Rule:</strong> Keep margins to 0.5 inches and typography clean (e.g. Arial or Calibri, size 10-11pt).</li><li><strong>ATS Optimization:</strong> Ensure technical keywords (React, Node.js, Python, SQL) are clearly presented under a dedicated 'Skills' section.</li></ul>"
    },
    // 4. Guides (Paid)
    {
        type: 'guide',
        category: 'Programming & Full Stack',
        slug: 'c-cpp-guide',
        title: 'C & C++ Systems Programming Guide',
        difficulty: 'Masterclass',
        chapters: 18,
        price: '₹999',
        originalPrice: '₹1,999',
        isPaid: true,
        description: 'Comprehensive system guide: low-level compilation stages, pointer math, memory allocation (stack vs heap), and hardware registers.',
        features: ['Full Embedded Code Blocks', 'Pointers Memory Diagrams', 'Union Registers Abstractions', '18 Curated PDF Chapters']
    },
    {
        type: 'guide',
        category: 'Programming & Full Stack',
        slug: 'java-guide',
        title: 'Java & Advanced Data Structures Guide',
        difficulty: 'Essentials',
        chapters: 22,
        price: '₹1,299',
        originalPrice: '₹2,499',
        isPaid: true,
        description: 'Master core Object-Oriented principles, Collection framework algorithms, and interview-essential dynamic programming structures.',
        features: ['JVM Bytecode Blueprints', 'Dynamic Programming Patterns', 'Collections Framework Cheat Sheets', 'Self-Graded Code Problems']
    },
    {
        type: 'guide',
        category: 'Hardware & Embedded',
        slug: 'embedded-guide',
        title: 'Embedded Systems & Firmware Guide',
        difficulty: 'Masterclass',
        chapters: 20,
        price: '₹1,499',
        originalPrice: '₹2,999',
        isPaid: true,
        description: 'ESP32 dual-core register hacks, interrupt service routines, I2C/SPI routing, and FreeRTOS multithreaded task schedulers.',
        features: ['ESP32 Schematic Checklists', 'FreeRTOS Thread Safe Mutexes', 'ADC/DAC Calibration Formulas', 'Device Driver Source Code']
    },
    {
        type: 'guide',
        category: 'Data Science & AI',
        slug: 'ai-ml-guide',
        title: 'AI & ML Systems Engineering Guide',
        difficulty: 'Masterclass',
        chapters: 16,
        price: '₹1,999',
        originalPrice: '₹3,999',
        isPaid: true,
        description: 'Implement ML regressions/classifications, build neural network models, and deploy deep learning pipelines with TensorFlow/Keras.',
        features: ['TensorFlow Model Checkpoints', 'Feature Engineering Rules', 'YOLO v8 Object Detection Code', '16 Curated Chapters']
    },
    {
        type: 'guide',
        category: 'Data Science & AI',
        slug: 'data-science-guide',
        title: 'Data Science & Analytics Guide',
        difficulty: 'Essentials',
        chapters: 15,
        price: '₹1,199',
        originalPrice: '₹2,199',
        isPaid: true,
        description: 'Master Pandas statistical pipelines, complex SQL analytical joins, window functions, and matplotlib data visual styling.',
        features: ['Pandas Aggregation Exercises', 'SQL Window Query Cheat Sheets', 'Hypothesis Test Calculations', 'Lifetime Dataset Updates']
    }
];

const Learn = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Active Selection Reading State
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [unlockedItems, setUnlockedItems] = useState({}); // Stores user sandboxed mock purchases
    
    // Catalog Filtering States
    const [catalogSearch, setCatalogSearch] = useState('');
    const [catalogTabFilter, setCatalogTabFilter] = useState('All'); // All, Courses, Guides, Free, Premium
    const [catalogSort, setCatalogSort] = useState('az');
    
    // Sidebar Reading States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeBranch, setActiveBranch] = useState('All Branches');
    const [activeChapterId, setActiveChapterId] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Placement directories search

    // E-Commerce Checkout Modal States
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutItem, setCheckoutItem] = useState(null);

    useEffect(() => {
        if (slug) {
            const active = ecomCatalog.find(g => g.slug === slug);
            if (active) {
                // If it is a paid item and not sandbox-unlocked, intercept and force checkout view
                if (active.isPaid && !unlockedItems[active.slug]) {
                    setCheckoutItem(active);
                    setIsCheckoutOpen(true);
                    setSelectedGuide(null);
                } else {
                    setSelectedGuide(active);
                    if (courseChapters[active.slug] && courseChapters[active.slug].length > 0) {
                        setActiveChapterId(courseChapters[active.slug][0].id);
                    } else {
                        setActiveChapterId('');
                    }
                }
            } else {
                setSelectedGuide(null);
            }
        } else {
            setSelectedGuide(null);
        }
    }, [slug, unlockedItems]);

    // Handle Item Selection Click from Catalog
    const handleItemClick = (item) => {
        if (item.isPaid && !unlockedItems[item.slug]) {
            setCheckoutItem(item);
            setIsCheckoutOpen(true);
        } else {
            navigate(`/learn/${item.slug}`);
        }
    };

    // Simulate sandbox purchase / instant unlock
    const handleInstantSandboxUnlock = (itemSlug) => {
        setUnlockedItems(prev => ({
            ...prev,
            [itemSlug]: true
        }));
        setIsCheckoutOpen(false);
        setCheckoutItem(null);
        navigate(`/learn/${itemSlug}`);
    };

    // Filter Ecom Catalog Items
    const filteredCatalog = ecomCatalog.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(catalogSearch.toLowerCase()) || 
            item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(catalogSearch.toLowerCase());
        
        let matchesTab = true;
        if (catalogTabFilter === 'Courses') {
            matchesTab = item.type === 'course';
        } else if (catalogTabFilter === 'Guides') {
            matchesTab = item.type === 'guide';
        } else if (catalogTabFilter === 'Free') {
            matchesTab = !item.isPaid;
        } else if (catalogTabFilter === 'Premium') {
            matchesTab = item.isPaid;
        }

        return matchesSearch && matchesTab;
    });

    // Sort Ecom Catalog Items
    const sortedCatalog = [...filteredCatalog].sort((a, b) => {
        if (catalogSort === 'az') return a.title.localeCompare(b.title);
        if (catalogSort === 'za') return b.title.localeCompare(a.title);
        if (catalogSort === 'price-low') {
            const pA = a.price === 'Free' ? 0 : parseInt(a.price.replace(/[₹,]/g, ''));
            const pB = b.price === 'Free' ? 0 : parseInt(b.price.replace(/[₹,]/g, ''));
            return pA - pB;
        }
        if (catalogSort === 'price-high') {
            const pA = a.price === 'Free' ? 0 : parseInt(a.price.replace(/[₹,]/g, ''));
            const pB = b.price === 'Free' ? 0 : parseInt(b.price.replace(/[₹,]/g, ''));
            return pB - pA;
        }
        return 0;
    });

    const getCourseIcon = (slug) => {
        switch (slug) {
            case 'placement-guide': return { icon: 'fas fa-briefcase', color: '#ef4444' };
            case 'resume-architecture': return { icon: 'fas fa-file-invoice', color: '#f97316' };
            case 'c-cpp-guide': return { icon: 'fas fa-laptop-code', color: '#3b82f6' };
            case 'java-guide': return { icon: 'fas fa-code', color: '#06b6d4' };
            case 'mern-bootcamp':
            case 'mern-guide': return { icon: 'fas fa-layer-group', color: '#a855f7' };
            case 'embedded-guide':
            case 'iot-connectivity': return { icon: 'fas fa-microchip', color: '#22c55e' };
            case 'ai-ml-guide':
            case 'genai-llm': return { icon: 'fas fa-brain', color: '#ec4899' };
            case 'data-science-guide': return { icon: 'fas fa-chart-bar', color: '#14b8a6' };
            case 'dsa-elite': return { icon: 'fas fa-cubes', color: '#3b82f6' };
            case 'pcb-eda': return { icon: 'fas fa-project-diagram', color: '#eab308' };
            default: return { icon: 'fas fa-graduation-cap', color: '#6366f1' };
        }
    };

    return (
        <>
            {selectedGuide && (
                <style>{`
                    @media (min-width: 993px) {
                        footer {
                            margin-left: 320px !important;
                            transition: margin-left 0.3s ease;
                        }
                    }
                `}</style>
            )}

            {!selectedGuide ? (
                /* --- SECTION A: HIGH-END E-COMMERCE LEARNING CATALOG --- */
                <section className="section-padding learn-catalog-page animate-enter" style={{ background: 'var(--bg-dark)', padding: '120px 0 80px 0' }}>
                    
                    {/* Parallax style top banner */}
                    <div className="page-header-banner" style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200')`,
                        height: 'auto',
                        minHeight: '340px',
                        padding: '65px 0',
                        marginTop: '0px'
                    }}>
                        <div className="container" style={{ width: '100%' }}>
                            <div className="page-header-content" style={{ maxWidth: '800px' }}>
                                <span className="learning-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                                    <i className="fas fa-graduation-cap"></i> Tech Roxx Academy
                                </span>
                                <h1 className="page-header-title" style={{ fontSize: '3.2rem', fontWeight: 900, marginBottom: '15px', color: '#ffffff' }}>Technical E-Learning Hub</h1>
                                <p className="page-header-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6 }}>
                                    Browse paid specialized courses, dynamic hardware labs, and free ATS placement guides. Secure your tech future with industry-ready training programs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container" style={{ marginTop: '50px' }}>
                        
                        {/* W3Schools style catalog controls panel */}
                        <div className="catalog-control-panel glass-panel" style={{ display: 'flex', gap: '20px', background: 'var(--bg-card)', border: 'var(--glass-border)', padding: '20px', borderRadius: '16px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {/* Search */}
                            <div className="catalog-search-wrapper" style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--text-muted)' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search paid courses, syllabus, free guides..." 
                                    value={catalogSearch}
                                    onChange={(e) => setCatalogSearch(e.target.value)}
                                    className="catalog-search-input"
                                    style={{ width: '100%', padding: '12px 15px 12px 42px', borderRadius: '10px', border: 'var(--glass-border)', outline: 'none', background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                                />
                            </div>

                            {/* Sort */}
                            <div className="catalog-sort-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="fas fa-sort-amount-down"></i> Sort by:
                                </label>
                                <select 
                                    value={catalogSort}
                                    onChange={(e) => setCatalogSort(e.target.value)}
                                    className="catalog-sort-select"
                                    style={{ padding: '10px 15px', borderRadius: '10px', border: 'var(--glass-border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontFamily: 'var(--font-body)', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
                                >
                                    <option value="az">Alphabetical (A - Z)</option>
                                    <option value="za">Alphabetical (Z - A)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                </select>
                            </div>
                        </div>

                        {/* W3Schools style Category filter tabs */}
                        <div className="catalog-tabs-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                            {['All', 'Courses', 'Guides', 'Free', 'Premium'].map(tab => {
                                const isActive = catalogTabFilter === tab;
                                const matchedItems = ecomCatalog.filter(item => {
                                    if (tab === 'All') return true;
                                    if (tab === 'Courses') return item.type === 'course';
                                    if (tab === 'Guides') return item.type === 'guide';
                                    if (tab === 'Free') return !item.isPaid;
                                    if (tab === 'Premium') return item.isPaid;
                                    return true;
                                });
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setCatalogTabFilter(tab)}
                                        className={`catalog-tab-btn ${isActive ? 'active' : ''}`}
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '30px',
                                            border: 'var(--glass-border)',
                                            background: isActive ? 'var(--secondary-blue)' : 'var(--bg-card)',
                                            color: isActive ? 'white' : 'var(--text-muted)',
                                            fontFamily: 'var(--font-head)',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            transition: 'all 0.2s ease',
                                            boxShadow: isActive ? '0 5px 15px rgba(59, 130, 246, 0.2)' : 'none'
                                        }}
                                    >
                                        {tab} <span style={{ background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-dark)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', color: isActive ? 'white' : 'var(--text-main)' }}>{matchedItems.length}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* E-Commerce Cards Grid */}
                        {sortedCatalog.length === 0 ? (
                            <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', border: 'var(--glass-border)', borderRadius: '24px', marginTop: '30px' }}>
                                <i className="fas fa-search-minus" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '15px' }}></i>
                                <h3 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-head)', fontWeight: 800 }}>No Curriculums Found</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto' }}>We couldn't find any courses or guides matching your parameters. Please adjust your filter tags.</p>
                            </div>
                        ) : (
                            <div className="ecom-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
                                {sortedCatalog.map(item => {
                                    const { icon, color } = getCourseIcon(item.slug);
                                    const isUnlocked = !item.isPaid || unlockedItems[item.slug];
                                    return (
                                        <div 
                                            key={item.slug} 
                                            className="ecom-catalog-card"
                                            style={{
                                                background: 'var(--bg-card)',
                                                border: 'var(--glass-border)',
                                                borderRadius: '20px',
                                                padding: '30px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: 'var(--card-shadow)',
                                                transition: 'transform 0.3s ease, border-color 0.3s ease'
                                            }}
                                        >
                                            <div className="card-decor-glow" style={{ position: 'absolute', top: '-10px', right: '-10px', width: '130px', height: '130px', background: `radial-gradient(circle, rgba(${color === '#ef4444' ? '239, 68, 68' : '59, 130, 246'}, 0.06) 0%, transparent 70%)`, filter: 'blur(10px)', pointerEvents: 'none' }}></div>
                                            
                                            {/* Header Tags */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                                <span style={{ 
                                                    background: item.type === 'course' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                                                    color: item.type === 'course' ? '#3b82f6' : '#ef4444',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 800,
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {item.type === 'course' ? 'Course 🎓' : 'Guide 📖'}
                                                </span>
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    {item.isPaid ? (
                                                        <span style={{ background: isUnlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)', color: isUnlocked ? '#22c55e' : '#f97316', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                                                            {isUnlocked ? 'Unlocked 🔓' : 'Premium 💎'}
                                                        </span>
                                                    ) : (
                                                        <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                                                            Free 🎁
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Title & Info */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-dark)', border: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: color }}>
                                                    <i className={icon}></i>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-head)', margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.category}</span>
                                                </div>
                                            </div>

                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>{item.description}</p>

                                            {/* Feature Checks */}
                                            <ul style={{ padding: 0, listStyle: 'none', margin: '0 0 25px 0', display: 'grid', gap: '8px' }}>
                                                {item.features.slice(0, 3).map((f, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                                                        <i className="fas fa-check" style={{ color: '#22c55e', fontSize: '0.72rem' }}></i> {f}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Price and Action button */}
                                            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    {item.isPaid ? (
                                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{item.originalPrice}</span>
                                                            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--secondary-blue)', fontFamily: 'var(--font-head)' }}>{item.price}</span>
                                                        </div>
                                                    ) : (
                                                        <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#22c55e', fontFamily: 'var(--font-head)' }}>Free</span>
                                                    )}
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>
                                                        {item.type === 'course' ? `${item.duration} Duration` : `${item.chapters} Digital Modules`}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() => handleItemClick(item)}
                                                    className="btn"
                                                    style={{
                                                        background: isUnlocked ? 'rgba(59, 130, 246, 0.08)' : 'var(--secondary-blue)',
                                                        color: isUnlocked ? 'var(--secondary-blue)' : 'white',
                                                        border: isUnlocked ? '1px solid rgba(59, 130, 246, 0.3)' : 'none',
                                                        padding: '10px 20px',
                                                        borderRadius: '30px',
                                                        fontWeight: 700,
                                                        fontSize: '0.82rem',
                                                        cursor: 'pointer',
                                                        transition: '0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    {item.type === 'course' ? (
                                                        <>
                                                            <i className="fas fa-sign-in-alt"></i>
                                                            {isUnlocked ? 'Start Course' : 'Enroll Now'}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-book-open"></i>
                                                            {isUnlocked ? 'Read Guide' : 'Get Guide'}
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* CSS Rules specifically for Card Hover Lifting */}
                    <style>{`
                        .ecom-catalog-card:hover {
                            transform: translateY(-6px);
                            border-color: var(--secondary-blue) !important;
                            box-shadow: var(--card-hover-shadow) !important;
                        }
                    `}</style>
                </section>
            ) : (
                /* --- SECTION B: INTERACTIVE READING WORKSPACE (PRESERVED W3SCHOOLS PANEL WITH DYNAMIC CURRICULUM SIDEBAR) --- */
                <>
                    {isSidebarOpen && (
                        <div 
                            className="sidebar-overlay"
                            onClick={() => setIsSidebarOpen(false)}
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 900, background: 'rgba(0,0,0,0.4)', display: 'none' }}
                        />
                    )}
                    
                    <div className="guides-layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
                        {/* Sidebar Navigator Index */}
                        <div className={`guides-sidebar-panel ${isSidebarOpen ? 'open' : 'collapsed'}`} style={{ width: '320px', background: 'var(--bg-panel)', borderRight: 'var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '100px 20px 20px 20px', position: 'fixed', height: '100vh', top: 0, left: 0, zIndex: 950, transition: 'transform 0.3s ease' }}>
                            <button 
                                onClick={() => navigate('/learn')}
                                className="sidebar-dashboard-back"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '12px 15px', borderRadius: '8px', border: 'var(--glass-border)', background: 'var(--bg-dark)', color: 'var(--text-main)', cursor: 'pointer', fontFamily: 'var(--font-head)', fontSize: '0.82rem', fontWeight: 700, transition: '0.2s', marginBottom: '25px' }}
                            >
                                <i className="fas fa-th-large"></i> Back to Catalog Directory
                            </button>

                            {selectedGuide.slug === 'placement-guide' ? (
                                /* 1. Placement directories index */
                                <div className="sidebar-index-container animate-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '15px' }}>Directory Search</h4>
                                    <div style={{ position: 'relative', marginBottom: '25px' }}>
                                        <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                                        <input 
                                            type="text"
                                            placeholder="Search companies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ width: '100%', padding: '10px 15px 10px 35px', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.12)', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-main)', background: 'var(--bg-dark)' }}
                                        />
                                    </div>

                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '12px' }}>Curriculum Branches</h4>
                                    <ul className="sidebar-chapters-list" style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                                        {['All Branches', 'CS & IT', 'ECE / EEE', 'Mechanical', 'Civil', 'Pharmaceutical', 'Business / MBA'].map(branch => {
                                            const isActive = activeBranch === branch;
                                            return (
                                                <li key={branch} style={{ marginBottom: '6px' }}>
                                                    <div 
                                                        onClick={() => {
                                                            setActiveBranch(branch);
                                                            setIsSidebarOpen(false);
                                                        }}
                                                        style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s', background: isActive ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(59, 130, 246, 0.05))' : 'transparent', borderLeft: isActive ? '3px solid #ef4444' : '3px solid transparent', color: isActive ? '#ef4444' : 'var(--text-muted)' }}
                                                    >
                                                        <i className="fas fa-filter" style={{ marginRight: '8px', fontSize: '0.72rem', opacity: 0.7 }}></i>
                                                        {branch}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : courseChapters[selectedGuide.slug] ? (
                                /* 2. Programming chapter index */
                                <div className="sidebar-index-container animate-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '12px' }}>Course Syllabus</h4>
                                    <ul className="sidebar-chapters-list" style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                                        {courseChapters[selectedGuide.slug].map(chapter => {
                                            const isActive = activeChapterId === chapter.id;
                                            return (
                                                <li key={chapter.id} style={{ marginBottom: '5px' }}>
                                                    <div 
                                                        onClick={() => {
                                                            setActiveChapterId(chapter.id);
                                                            setIsSidebarOpen(false);
                                                        }}
                                                        style={{ padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s', background: isActive ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(59, 130, 246, 0.05))' : 'transparent', borderLeft: isActive ? '3px solid #ef4444' : '3px solid transparent', color: isActive ? '#ef4444' : 'var(--text-muted)' }}
                                                    >
                                                        <i className="far fa-circle" style={{ marginRight: '8px', fontSize: '0.7rem', color: isActive ? '#ef4444' : 'inherit' }}></i>
                                                        {chapter.title}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                /* 3. Fallback table module index (Resume guide, Free courses outlines) */
                                <div className="sidebar-index-container animate-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                                    <h4 className="sidebar-section-title" style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 800, marginBottom: '12px' }}>Module Table</h4>
                                    <ul className="sidebar-chapters-list" style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                                        <li>
                                            <div 
                                                onClick={() => setIsSidebarOpen(false)}
                                                style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(59, 130, 246, 0.05))', borderLeft: '3px solid #ef4444', color: '#ef4444' }}
                                            >
                                                1. Core Overview
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right Content Reading Area */}
                        <div className="guides-content-area" style={{ flex: 1, paddingLeft: '320px', transition: 'padding-left 0.3s ease' }}>
                            <div className="guides-main-container" style={{ padding: '120px 40px 80px 40px', maxWidth: '1000px', margin: '0 auto' }}>
                                
                                {/* Breadcrumb back navigation link */}
                                <div 
                                    className="reading-back-breadcrumb" 
                                    onClick={() => navigate('/learn')} 
                                    style={{ marginBottom: '25px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: '0.2s' }}
                                >
                                    <i className="fas fa-th-large"></i> Back to Hub Catalog
                                </div>

                                <div className="mobile-toggle-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <button 
                                        onClick={() => navigate('/learn')}
                                        className="back-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'none', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <i className="fas fa-th-large"></i> Back to Hub
                                    </button>
                                    
                                    {/* Mobile Sidebar Toggle (Visible only via media queries in guides screen layouts) */}
                                    <button 
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="back-btn mobile-only-toggle-btn"
                                        style={{ border: 'var(--glass-border)', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'none', gap: '8px', alignItems: 'center', fontWeight: 700, fontSize: '0.8rem' }}
                                    >
                                        <i className={`fas ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'}`}></i>
                                        {isSidebarOpen ? 'Close Menu' : 'Course Index'}
                                    </button>
                                </div>

                                {/* Reading Panel Area */}
                                <div 
                                    className="glass-panel guides-reading-pane animate-enter" 
                                    style={{ background: 'var(--bg-panel)', borderRadius: '24px', border: 'var(--glass-border)', padding: '45px', boxShadow: 'var(--card-shadow)', minHeight: '400px' }}
                                >
                                    <div className="animate-enter guide-content-render">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                            <span style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.08))', color: '#3b82f6', fontSize: '0.78rem', fontWeight: 800, padding: '5px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {selectedGuide.category}
                                            </span>
                                            <span className={`catalog-difficulty-badge ${selectedGuide.difficulty.toLowerCase()}`}>
                                                {selectedGuide.difficulty}
                                            </span>
                                        </div>

                                        {/* Dynamic content rendering based on whether it is placement-guide vs programming-guide */}
                                        {courseChapters[selectedGuide.slug] ? (
                                            /* I. Programming dynamic reader chapters content */
                                            <div className="dynamic-course-syllabus-reader animate-enter">
                                                <div 
                                                    dangerouslySetInnerHTML={{ __html: renderActiveChapterContent(selectedGuide.slug, activeChapterId) }} 
                                                    className="html-article-body"
                                                    style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.02rem' }}
                                                />
                                            </div>
                                        ) : (
                                            /* II. Static directory / placement lists */
                                            <div className="static-guide-content-reader">
                                                <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--text-main)', margin: '15px 0 25px', borderBottom: '1px solid rgba(220,38,38,0.06)', paddingBottom: '15px' }}>
                                                    {selectedGuide.title}
                                                </h1>
                                                
                                                <div 
                                                    dangerouslySetInnerHTML={{ __html: selectedGuide.content }} 
                                                    className="html-article-body"
                                                    style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.02rem' }}
                                                />

                                                {selectedGuide.slug === 'placement-guide' && (
                                                    <div style={{ marginTop: '30px' }} className="animate-enter">
                                                        {/* Placement Success Dashboard Banner */}
                                                        <div style={{ marginBottom: '45px', padding: '35px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.03), rgba(249, 115, 22, 0.03), rgba(124, 58, 237, 0.03), rgba(59, 130, 246, 0.03))', borderRadius: '20px', border: '1px solid rgba(220, 38, 38, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 30px rgba(0, 0, 0, 0.02)', position: 'relative', overflow: 'hidden' }}>
                                                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>
                                                            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>

                                                            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <i className="fas fa-rocket" style={{ color: 'var(--primary-red)' }}></i> Placement Success Portal
                                                            </h3>
                                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '25px', lineHeight: 1.6 }}>
                                                                Unlock your career potential with daily job alerts, official recruiting coordinates, and domain guides mapped for corporate recruitment.
                                                            </p>
                                                            
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                                                <a 
                                                                    href="https://whatsapp.com/channel/0029VaDqiVd0rGiIrgvc0s3T" 
                                                                    target="_blank" 
                                                                    rel="noreferrer" 
                                                                    className="wa-glow-btn"
                                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontSize: '0.9rem', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.35)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                                >
                                                                    <i className="fab fa-whatsapp" style={{ fontSize: '1.25rem' }}></i> Join WhatsApp Community
                                                                </a>

                                                                <button 
                                                                    onClick={() => navigate('/services/job-roles')}
                                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--bg-panel)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.9rem', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.02)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                                    className="roles-nav-btn"
                                                                >
                                                                    <i className="fas fa-briefcase"></i> Understand the Roles
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Company Directory List */}
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                                                            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                                                Corporate Recruitment Directories
                                                            </h3>
                                                        </div>

                                                        {(() => {
                                                            const getCategoryForBranch = (branch) => {
                                                                switch (branch) {
                                                                    case 'CS & IT': return "CS & IT (Product & Services)";
                                                                    case 'ECE / EEE': return "Electronics & Electrical (ECE/EEE)";
                                                                    case 'Mechanical': return "Mechanical Engineering";
                                                                    case 'Civil': return "Civil Engineering & Construction";
                                                                    case 'Pharmaceutical': return "Pharmaceutical Industry";
                                                                    case 'Business / MBA': return "Business & Marketing (BBA/MBA)";
                                                                    default: return null;
                                                                }
                                                            };
                                                            const targetCategory = getCategoryForBranch(activeBranch);
                                                            const filteredCategories = Object.entries(placementCompanies).filter(([category]) => {
                                                                if (!targetCategory) return true;
                                                                return category === targetCategory;
                                                            });

                                                            return filteredCategories.map(([category, companies]) => {
                                                                const filteredCompanies = companies.filter(c => 
                                                                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                                    c.role.toLowerCase().includes(searchQuery.toLowerCase())
                                                                );

                                                                if (filteredCompanies.length === 0) return null;

                                                                return (
                                                                    <div key={category} style={{ marginBottom: '40px' }} className="animate-enter">
                                                                        <h4 style={{ color: '#3b82f6', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                            <i className="fas fa-building" style={{ opacity: 0.8 }}></i> {category}
                                                                        </h4>
                                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
                                                                            {filteredCompanies.map((c, i) => (
                                                                                <a 
                                                                                    key={i} 
                                                                                    href={c.link} 
                                                                                    target="_blank" 
                                                                                    rel="noreferrer" 
                                                                                    className="glass-panel"
                                                                                    style={{ padding: '18px', borderRadius: '12px', background: 'var(--bg-card)', border: 'var(--glass-border)', display: 'block', transition: 'transform 0.2s, border-color 0.2s', textDecoration: 'none' }}
                                                                                >
                                                                                    <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '4px' }}>{c.name}</div>
                                                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.role}</div>
                                                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#3b82f6', marginTop: '10px', fontWeight: 700 }}>
                                                                                        Visit Careers <i className="fas fa-external-link-alt" style={{ fontSize: '0.62rem' }}></i>
                                                                                    </span>
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            });
                                                        })()}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Desktop Responsive Layout overrides for Reader Workspace */}
                    <style>{`
                        @media (max-width: 992px) {
                            .guides-sidebar-panel {
                                transform: translateX(-100%);
                            }
                            .guides-sidebar-panel.open {
                                transform: translateX(0);
                            }
                            .sidebar-overlay {
                                display: block !important;
                            }
                            .guides-content-area {
                                padding-left: 0 !important;
                            }
                            .mobile-only-toggle-btn {
                                display: flex !important;
                            }
                            .back-btn {
                                display: flex !important;
                            }
                        }
                    `}</style>
                </>
            )}

            {/* --- SECTION C: PREMIUM CHECKOUT MODAL (DYNAMIC WHATSAPP GATEWAY) --- */}
            {isCheckoutOpen && checkoutItem && (
                <div 
                    className="checkout-modal-overlay"
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 3000,
                        background: 'rgba(9, 13, 22, 0.75)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <div 
                        className="checkout-card glass-panel animate-enter"
                        style={{
                            background: 'var(--bg-panel)',
                            border: 'var(--glass-border)',
                            borderRadius: '24px',
                            maxWidth: '520px',
                            width: '100%',
                            padding: '40px',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #ef4444, #3b82f6)' }}></div>
                        
                        {/* Close button */}
                        <button 
                            onClick={() => { setIsCheckoutOpen(false); setCheckoutItem(null); navigate('/learn'); }}
                            style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        {/* Title details */}
                        <span style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', fontSize: '0.72rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {checkoutItem.type === 'course' ? 'Premium Course Enrollment 🎓' : 'Premium Guide Acquisition 📖'}
                        </span>
                        
                        <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'var(--font-head)', margin: '15px 0 10px 0', lineHeight: 1.3 }}>
                            {checkoutItem.title}
                        </h3>
                        
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '25px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{checkoutItem.originalPrice}</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--secondary-blue)', fontFamily: 'var(--font-head)' }}>{checkoutItem.price}</span>
                            <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 700 }}>(Save 50% Today!)</span>
                        </div>

                        {/* Program benefits */}
                        <div style={{ background: 'var(--bg-card)', border: 'var(--glass-border)', padding: '20px', borderRadius: '14px', marginBottom: '30px' }}>
                            <h5 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-main)', letterSpacing: '0.5px' }}>Included in this Syllabus:</h5>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '8px' }}>
                                {checkoutItem.features.map((feature, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                        <i className="fas fa-check-circle" style={{ color: '#22c55e', fontSize: '0.85rem' }}></i> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '30px', textAlign: 'center' }}>
                            Enroll securely by contacting our admission office. Click below to initiate instant WhatsApp checkout or request a callbacks/invoice.
                        </p>

                        {/* Interactive Checkout Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {/* WhatsApp Gateway Checkout */}
                            <a 
                                href={`https://wa.me/919550251208?text=Hi%20Tech%20Roxx!%20I%20am%20interested%20in%20enrolling%20in%20the%20${encodeURIComponent(checkoutItem.title)}%20(${encodeURIComponent(checkoutItem.price)}).%20Please%20guide%20me%20through%20the%20registration%20and%20payment%20process.`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    background: '#22c55e',
                                    color: 'white',
                                    padding: '12px',
                                    borderRadius: '30px',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 5px 15px rgba(34, 197, 94, 0.3)',
                                    textAlign: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Proceed to WhatsApp Checkout
                            </a>

                            {/* Contact Us redirect */}
                            <button
                                onClick={() => { setIsCheckoutOpen(false); navigate('/contact'); }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    background: 'var(--bg-panel)',
                                    color: 'var(--text-main)',
                                    border: 'var(--glass-border)',
                                    padding: '12px',
                                    borderRadius: '30px',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <i className="fas fa-phone-alt"></i> Callback Registration Request
                            </button>

                            {/* Sandbox instant simulation unlock */}
                            <button
                                onClick={() => handleInstantSandboxUnlock(checkoutItem.slug)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: 'var(--secondary-blue)',
                                    border: '1px solid rgba(59, 130, 246, 0.25)',
                                    padding: '10px',
                                    borderRadius: '30px',
                                    fontWeight: 700,
                                    fontSize: '0.78rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    marginTop: '10px'
                                }}
                            >
                                <i className="fas fa-unlock"></i> [Demo] Simulate Sandbox Unlock 🔓
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Learn;
