/* ==========================================================================
   CampusConnect - Global Script
   One script file for every page. Plain (vanilla) JavaScript, no libraries.

   Contents
     1.  Small helpers
     2.  Mobile navigation
     3.  Toast messages (placeholder actions such as Login / Download Catalog)
     4.  Program data  (courses.html)
     5.  Service data  (services.html)
     6.  Detail dialog renderer
     7.  Course search + department filter
     8.  Student enquiry form validation (contact.html)
     9.  Footer year
     10. Boot
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Small helpers
     ------------------------------------------------------------------------ */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function icon(name) {
    return '<span class="material-symbols-outlined">' + name + "</span>";
  }

  /* ------------------------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = $("#navToggle");
    var drawer = $("#mobileNav");
    if (!toggle || !drawer) return;

    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      $(".material-symbols-outlined", toggle).textContent = open ? "close" : "menu";
    });
  }

  /* ------------------------------------------------------------------------
     3. Toast messages
     Any element carrying data-toast="..." shows that message when clicked.
     Used for features that belong to a later tier (login, catalog download).
     ------------------------------------------------------------------------ */
  var toastTimer = null;

  function showToast(message) {
    var toast = $("#toast");
    if (!toast) return;

    $(".toast-text", toast).textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 3600);
  }

  function initToastTriggers() {
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-toast]");
      if (!trigger) return;
      event.preventDefault();
      showToast(trigger.getAttribute("data-toast"));
    });
  }

  /* ------------------------------------------------------------------------
     4. Program data - powers the "Explore Program" dialog on courses.html
     ------------------------------------------------------------------------ */
  var PROGRAMS = {
    cs: {
      eyebrow: "Computer Science",
      title: "BS Computer Science",
      lead:
        "A four-year undergraduate degree built around algorithmic thinking, computer " +
        "systems and artificial intelligence. The programme starts with programming and " +
        "mathematics foundations and moves towards specialised electives in the final two years.",
      master: [
        "Designing and analysing algorithms, then reasoning about their time and space cost",
        "Writing clean, tested code in C++, Python and Java",
        "Modelling data and querying it efficiently with SQL",
        "Understanding how an operating system schedules processes and manages memory",
        "Building and evaluating machine learning models on real datasets"
      ],
      subjects: [
        "Programming Fundamentals (C++)",
        "Object Oriented Programming",
        "Data Structures & Algorithms",
        "Discrete Mathematics",
        "Database Systems (SQL)",
        "Operating Systems",
        "Computer Networks",
        "Artificial Intelligence",
        "Machine Learning with Python",
        "Theory of Automata",
        "Compiler Construction",
        "Final Year Project"
      ],
      skills: [
        "C++", "Python", "Java", "SQL", "Git", "Linux", "Problem Solving", "Research Writing"
      ],
      faculty:
        "The department is led by faculty working in algorithms, computer vision and natural " +
        "language processing. Most core courses are taught by PhD-qualified instructors, and " +
        "each student is assigned an academic advisor who reviews the degree plan every semester.",
      careers: [
        "Software Developer",
        "Data Scientist / ML Engineer",
        "Research Assistant or MS/PhD study",
        "Systems and Backend Engineer"
      ]
    },

    se: {
      eyebrow: "Software Engineering",
      title: "BS Software Engineering",
      lead:
        "Software Engineering focuses on building large systems that stay maintainable. " +
        "Where Computer Science leans towards theory, this degree leans towards process: " +
        "requirements, architecture, quality assurance and delivery, practised through team projects.",
      master: [
        "Gathering and documenting requirements, then turning them into use cases and specifications",
        "Designing systems with UML, design patterns and layered architecture",
        "Building full-stack applications with HTML, CSS, JavaScript and a database behind them",
        "Writing unit and integration tests, and running code reviews",
        "Managing a project with Agile / Scrum, version control and CI pipelines"
      ],
      subjects: [
        "Programming Fundamentals (C++)",
        "Object Oriented Programming",
        "Data Structures & Algorithms",
        "Software Requirements Engineering",
        "Software Design & Architecture",
        "Database Systems",
        "Web Technologies (HTML/CSS/JS)",
        "Software Quality Assurance & Testing",
        "Human Computer Interaction",
        "Software Project Management",
        "Python for Automation",
        "Final Year Project"
      ],
      skills: [
        "C++", "Python", "JavaScript", "SQL", "UML", "Git & GitHub", "Agile / Scrum", "Testing"
      ],
      faculty:
        "Courses are taught by a mix of academic staff and instructors with industry delivery " +
        "experience, so requirement and design work is graded the way it would be reviewed on a real " +
        "project. Every batch runs a two-semester final year project with a supervisor and an " +
        "external evaluation panel.",
      careers: [
        "Software Engineer",
        "QA / Test Engineer",
        "Business or Systems Analyst",
        "DevOps and Release Engineer"
      ]
    },

    it: {
      eyebrow: "Information Technology",
      title: "BS Information Technology",
      lead:
        "An applied degree for students who want to run and secure the infrastructure that " +
        "organisations depend on: networks, servers, databases and cloud platforms. Lab work " +
        "carries a heavy weight in almost every core course.",
      master: [
        "Configuring routers, switches, subnets and secure network topologies",
        "Administering Linux and Windows servers, users and permissions",
        "Designing and tuning relational databases, plus backup and recovery",
        "Deploying and monitoring applications on cloud platforms",
        "Applying security controls and responding to common attack patterns"
      ],
      subjects: [
        "Introduction to Information Technology",
        "Programming Fundamentals",
        "Computer Networks",
        "Network Security & Cryptography",
        "Database Administration",
        "Operating Systems & System Administration",
        "Cloud Computing",
        "Web Systems & Technologies",
        "IT Infrastructure Management",
        "Data Warehousing",
        "Ethics in Information Technology",
        "Final Year Project"
      ],
      skills: [
        "Linux", "Networking", "Cybersecurity", "SQL", "Cloud (AWS/Azure)", "Python Scripting", "Virtualisation"
      ],
      faculty:
        "The department maintains a dedicated networking and security lab, and several instructors " +
        "hold industry certifications, so course content stays close to current certification tracks. " +
        "Students are encouraged to take a semester-long internship in their final year.",
      careers: [
        "Network / Systems Administrator",
        "Cybersecurity Analyst",
        "Cloud Support Engineer",
        "Database Administrator"
      ]
    },

    bba: {
      eyebrow: "Business Administration",
      title: "BBA (Business Administration)",
      lead:
        "A broad four-year business degree covering management, marketing, finance and " +
        "entrepreneurship. The first two years are common to all students; specialisation is " +
        "chosen in the third year and reinforced with case studies and a market research project.",
      master: [
        "Reading financial statements and building a working budget",
        "Planning and costing a marketing campaign for a defined segment",
        "Analysing organisational behaviour and leading small teams",
        "Building a business plan with a financial model behind it",
        "Presenting a recommendation to a non-technical audience"
      ],
      subjects: [
        "Principles of Management",
        "Financial Accounting",
        "Microeconomics & Macroeconomics",
        "Business Mathematics & Statistics",
        "Marketing Management",
        "Organisational Behaviour",
        "Human Resource Management",
        "Corporate Finance",
        "Business Research Methods",
        "Entrepreneurship & New Venture Planning",
        "Business Communication",
        "Final Year Business Project"
      ],
      skills: [
        "Financial Analysis", "MS Excel", "Market Research", "Presentation", "Business Writing", "Team Leadership"
      ],
      faculty:
        "Teaching is case-driven, with faculty drawn from finance, marketing and management " +
        "practice. The department runs a business incubator where final year students can pitch a " +
        "venture idea and get mentoring support for one semester.",
      careers: [
        "Management Trainee",
        "Marketing / Brand Executive",
        "Financial Analyst",
        "Entrepreneur or Family Business Owner"
      ]
    },

    ee: {
      eyebrow: "Electrical Engineering",
      title: "BS Electrical Engineering",
      lead:
        "A hardware-focused engineering degree spanning circuits, electronics, power systems " +
        "and embedded design. Theory in each area is paired with a lab, and the final year project " +
        "must produce a working prototype.",
      master: [
        "Analysing analogue and digital circuits from first principles",
        "Programming microcontrollers and interfacing them with sensors",
        "Processing and filtering signals in the time and frequency domain",
        "Designing and protecting power distribution systems",
        "Simulating designs in MATLAB and Proteus before building them"
      ],
      subjects: [
        "Linear Circuit Analysis",
        "Electronic Devices & Circuits",
        "Digital Logic Design",
        "Signals & Systems",
        "Electromagnetic Field Theory",
        "Microprocessors & Embedded Systems",
        "Control Systems",
        "Power Generation & Distribution",
        "Digital Signal Processing",
        "Communication Systems",
        "Robotics",
        "Final Year Design Project"
      ],
      skills: [
        "MATLAB", "Simulink", "C for Embedded", "Proteus", "PCB Design", "Arduino / STM32", "Lab Instrumentation"
      ],
      faculty:
        "The department runs electronics, power and embedded systems labs that stay open outside " +
        "class hours for project work. Faculty supervise student teams in national engineering " +
        "design competitions each year.",
      careers: [
        "Electrical Design Engineer",
        "Embedded Systems Engineer",
        "Power Distribution Engineer",
        "Automation / Control Engineer"
      ]
    },

    math: {
      eyebrow: "Mathematics",
      title: "BS Mathematics",
      lead:
        "A rigorous degree in pure and applied mathematics for students who enjoy proof and " +
        "abstraction, with enough computational work to make the theory usable in modelling, " +
        "statistics and data analysis.",
      master: [
        "Writing correct, readable mathematical proofs",
        "Working confidently with calculus, linear algebra and differential equations",
        "Building and testing statistical models on real data",
        "Solving problems numerically when a closed form does not exist",
        "Using Python, MATLAB and R to compute and visualise results"
      ],
      subjects: [
        "Calculus I, II & III",
        "Linear Algebra",
        "Real Analysis",
        "Abstract Algebra",
        "Ordinary & Partial Differential Equations",
        "Probability & Statistics",
        "Numerical Analysis",
        "Complex Analysis",
        "Topology",
        "Mathematical Modelling",
        "Operations Research",
        "Final Year Research Project"
      ],
      skills: [
        "Mathematical Proof", "Python", "MATLAB", "R", "LaTeX", "Statistical Modelling", "Analytical Reasoning"
      ],
      faculty:
        "Small class sizes mean core analysis and algebra courses run close to a tutorial format. " +
        "Faculty research covers applied analysis and computational statistics, and final year " +
        "students often co-author a short paper with their supervisor.",
      careers: [
        "Data / Statistical Analyst",
        "Actuarial or Risk Analyst",
        "Teaching and MS/PhD study",
        "Operations Research Analyst"
      ]
    }
  };

  /* ------------------------------------------------------------------------
     5. Service data - powers the "Access Resource" dialog on services.html
     ------------------------------------------------------------------------ */
  var SERVICES = {
    advising: {
      eyebrow: "Student Services",
      title: "Academic Advising",
      lead:
        "Every enrolled student is assigned an academic advisor from their own department. " +
        "The advising office helps you plan your semester, stay on track for graduation and " +
        "recover if a semester goes badly.",
      offers: [
        "Semester registration planning and course load advice",
        "Degree audit: which credits are done and what is still required",
        "Guidance on electives, specialisations and minor selection",
        "Support for probation recovery, course repeats and grade improvement",
        "Approval for credit transfer and semester freeze requests"
      ],
      how: [
        "Walk in to Academic Block A, Room 104 during office hours",
        "Or book a 20-minute slot by emailing advising@campusconnect.edu",
        "Bring your registration number and latest transcript to the meeting"
      ],
      hours: "Monday to Friday, 9:00 AM to 4:00 PM",
      contact: "advising@campusconnect.edu"
    },

    library: {
      eyebrow: "Student Services",
      title: "Library & Learning Commons",
      lead:
        "The central library holds the print collection, the digital database subscriptions and " +
        "the quiet and group study areas. Your student card is also your library card.",
      offers: [
        "Book lending: up to 4 titles for 14 days, renewable twice",
        "Digital access to IEEE, ACM, Springer and JSTOR from campus Wi-Fi",
        "Silent reading hall plus bookable group discussion rooms",
        "Past papers, thesis archive and final year project reports",
        "Referencing and plagiarism-check support before submission"
      ],
      how: [
        "Search the catalogue from any campus terminal or the student portal",
        "Reserve a group room at the circulation desk up to 3 days ahead",
        "Off-campus database access is issued on request to final year students"
      ],
      hours: "Monday to Saturday, 8:00 AM to 10:00 PM",
      contact: "library@campusconnect.edu"
    },

    career: {
      eyebrow: "Student Services",
      title: "Career Services",
      lead:
        "Career Services connects students with internships and first jobs, and prepares them " +
        "for the hiring process before they get there.",
      offers: [
        "CV and cover letter review with written feedback",
        "Mock interviews, including technical interview practice",
        "Internship and job board maintained with partner employers",
        "Two campus career fairs each academic year",
        "Workshops on LinkedIn, portfolio building and salary negotiation"
      ],
      how: [
        "Register on the student portal careers tab to see open listings",
        "Book a CV review at least one week before an application deadline",
        "Final year students are contacted directly about placement drives"
      ],
      hours: "Monday to Friday, 10:00 AM to 5:00 PM",
      contact: "careers@campusconnect.edu"
    },

    affairs: {
      eyebrow: "Student Services",
      title: "Student Affairs",
      lead:
        "Student Affairs handles campus life outside the classroom: societies, events, hostel " +
        "matters, scholarships and student welfare.",
      offers: [
        "Student society registration, funding and event approvals",
        "Hostel allotment, transport routes and campus card issues",
        "Scholarship, financial aid and fee instalment applications",
        "Confidential counselling and student wellbeing support",
        "Handling of complaints, disciplinary matters and appeals"
      ],
      how: [
        "Student Affairs Office, Administration Block, ground floor",
        "Scholarship and aid forms open in the first two weeks of each semester",
        "Counselling appointments are booked privately by email"
      ],
      hours: "Monday to Friday, 9:00 AM to 5:00 PM",
      contact: "studentaffairs@campusconnect.edu"
    },

    it: {
      eyebrow: "Student Services",
      title: "IT Support Desk",
      lead:
        "The IT help desk supports every campus digital service: your student account, the " +
        "portal, campus Wi-Fi, email and licensed software.",
      offers: [
        "Student portal and LMS account creation, password reset and lockouts",
        "Campus Wi-Fi setup and device registration",
        "University email, cloud storage and video conferencing access",
        "Free licences for MATLAB, Microsoft 365, Visual Studio and design tools",
        "Computer lab bookings and printing quota issues"
      ],
      how: [
        "Raise a ticket from the student portal help section for anything non-urgent",
        "Walk in to the IT Desk, Computing Block, Room 12 for account lockouts",
        "Typical response time is one working day"
      ],
      hours: "Monday to Friday, 8:30 AM to 6:00 PM",
      contact: "ithelp@campusconnect.edu"
    },

    admissions: {
      eyebrow: "Student Services",
      title: "Admissions Office",
      lead:
        "Admissions manages applications for every undergraduate programme, from the entry " +
        "test through to enrolment and orientation.",
      offers: [
        "Programme eligibility criteria and merit information",
        "Online application, entry test scheduling and result queries",
        "Document verification and credit transfer assessment",
        "Merit and need-based scholarship information for new students",
        "Campus tours and orientation for admitted students"
      ],
      how: [
        "Applications open twice a year, in Fall and Spring intake windows",
        "Apply online through the admissions portal and upload scanned documents",
        "Admissions Office, Main Building, front desk, for in-person queries"
      ],
      hours: "Monday to Saturday, 9:00 AM to 4:00 PM",
      contact: "admissions@campusconnect.edu"
    }
  };

  /* ------------------------------------------------------------------------
     6. Detail dialog renderer
     One dialog markup is reused by both the courses and services pages; the
     body is rebuilt from the data objects above each time it opens.
     ------------------------------------------------------------------------ */
  var lastFocused = null;

  function listBlock(title, items) {
    if (!items || !items.length) return "";
    var rows = items
      .map(function (item) {
        return "<li>" + icon("check_circle") + "<span>" + item + "</span></li>";
      })
      .join("");
    return (
      '<div class="detail-block"><h3>' + title + '</h3><ul class="bullet-list">' + rows + "</ul></div>"
    );
  }

  function chipBlock(title, items) {
    if (!items || !items.length) return "";
    var chips = items
      .map(function (item) {
        return '<span class="chip">' + item + "</span>";
      })
      .join("");
    return (
      '<div class="detail-block"><h3>' + title + '</h3><div class="chip-list">' + chips + "</div></div>"
    );
  }

  function subjectBlock(title, items) {
    if (!items || !items.length) return "";
    var rows = items
      .map(function (item) {
        return "<li>" + icon("book_2") + "<span>" + item + "</span></li>";
      })
      .join("");
    return (
      '<div class="detail-block"><h3>' + title + '</h3>' +
      '<ul class="bullet-list subject-grid">' + rows + "</ul></div>"
    );
  }

  function programHtml(data) {
    return (
      '<p class="modal-eyebrow">' + data.eyebrow + " &middot; 4 Years &middot; Undergraduate</p>" +
      "<h2>" + data.title + "</h2>" +
      '<p class="modal-lead">' + data.lead + "</p>" +
      listBlock("What you will master", data.master) +
      subjectBlock("Core subjects", data.subjects) +
      chipBlock("Skills and tools you will use", data.skills) +
      '<div class="detail-block"><h3>Faculty and teaching</h3>' +
      '<p class="faculty-note">' + data.faculty + "</p></div>" +
      listBlock("Where graduates go", data.careers) +
      '<div class="modal-actions">' +
      '<a class="btn btn-primary" href="contacts.html">Ask about this program</a>' +
      '<a class="btn btn-outline" href="departments.html">View department</a>' +
      "</div>"
    );
  }

  function serviceHtml(data) {
    return (
      '<p class="modal-eyebrow">' + data.eyebrow + "</p>" +
      "<h2>" + data.title + "</h2>" +
      '<p class="modal-lead">' + data.lead + "</p>" +
      listBlock("What this service offers", data.offers) +
      listBlock("How to access it", data.how) +
      '<div class="detail-block"><h3>Office hours and contact</h3>' +
      '<p class="faculty-note"><strong>' + data.hours + "</strong><br>" + data.contact + "</p></div>" +
      '<div class="modal-actions">' +
      '<a class="btn btn-primary" href="contacts.html">Contact this office</a>' +
      "</div>"
    );
  }

  function openModal(html) {
    var modal = $("#detailModal");
    if (!modal) return;

    lastFocused = document.activeElement;
    $("#modalBody", modal).innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.scrollTop = 0;
    $(".modal-close", modal).focus();
  }

  function closeModal() {
    var modal = $("#detailModal");
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function initDetailModal() {
    var modal = $("#detailModal");
    if (!modal) return;

    document.addEventListener("click", function (event) {
      var programTrigger = event.target.closest("[data-program]");
      if (programTrigger) {
        var program = PROGRAMS[programTrigger.getAttribute("data-program")];
        if (program) openModal(programHtml(program));
        return;
      }

      var serviceTrigger = event.target.closest("[data-service]");
      if (serviceTrigger) {
        var service = SERVICES[serviceTrigger.getAttribute("data-service")];
        if (service) openModal(serviceHtml(service));
        return;
      }

      if (event.target.closest("[data-close]")) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
  }

  /* ------------------------------------------------------------------------
     7. Course search + department filter (courses.html)
     ------------------------------------------------------------------------ */
  function initCourseFilter() {
    var search = $("#courseSearch");
    var department = $("#departmentFilter");
    if (!search || !department) return;

    var cards = $$(".course-card");
    var rows = $$(".course-row");
    var empty = $("#courseEmpty");
    var count = $("#courseCount");
    var reset = $("#clearFilters");

    function apply() {
      var term = search.value.trim().toLowerCase();
      var dept = department.value;
      var visible = 0;

      cards.forEach(function (card) {
        var haystack = (card.getAttribute("data-keywords") || "").toLowerCase();
        var matchesTerm = term === "" || haystack.indexOf(term) !== -1;
        var matchesDept = dept === "all" || card.getAttribute("data-department") === dept;
        var show = matchesTerm && matchesDept;

        card.style.display = show ? "" : "none";
        if (show) visible++;
      });

      rows.forEach(function (row) {
        var haystack = (row.getAttribute("data-keywords") || "").toLowerCase();
        var matchesTerm = term === "" || haystack.indexOf(term) !== -1;
        var matchesDept = dept === "all" || row.getAttribute("data-department") === dept;
        var show = matchesTerm && matchesDept;

        row.style.display = show ? "" : "none";
      });

      if (count) {
        count.textContent = "Showing " + visible + (visible === 1 ? " module" : " modules / programs");
      }
      if (empty) {
        empty.hidden = visible !== 0;
      }
    }

    search.addEventListener("input", apply);
    department.addEventListener("change", apply);

    if (reset) {
      reset.addEventListener("click", function () {
        search.value = "";
        department.value = "all";
        apply();
      });
    }

    apply();
  }

  /* ------------------------------------------------------------------------
     8. Student enquiry form validation (contact.html)
     ------------------------------------------------------------------------ */
  function initEnquiryForm() {
    var form = $("#enquiryForm");
    if (!form) return;

    var errorAlert = $("#formError");
    var successAlert = $("#formSuccess");

    // Registration numbers look like 2023-SE-045 (year - department - roll no).
    var REG_PATTERN = /^\d{4}-[A-Za-z]{2,4}-\d{2,4}$/;
    var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var rules = [
      {
        id: "fullName",
        test: function (value) { return value.length >= 3; }
      },
      {
        id: "regNumber",
        test: function (value) { return REG_PATTERN.test(value); }
      },
      {
        id: "email",
        test: function (value) { return EMAIL_PATTERN.test(value); }
      },
      {
        id: "subject",
        test: function (value) { return value.length >= 3; }
      },
      {
        id: "message",
        test: function (value) { return value.length >= 10; }
      }
    ];

    function setFieldState(rule, valid) {
      var field = $("#" + rule.id);
      var error = $("#" + rule.id + "Error");
      field.classList.toggle("invalid", !valid);
      field.setAttribute("aria-invalid", valid ? "false" : "true");
      error.classList.toggle("show", !valid);
    }

    function validate(showErrors) {
      var allValid = true;

      rules.forEach(function (rule) {
        var valid = rule.test($("#" + rule.id).value.trim());
        if (!valid) allValid = false;
        if (showErrors) setFieldState(rule, valid);
      });

      return allValid;
    }

    // Clear a field's error as soon as the student fixes it.
    rules.forEach(function (rule) {
      var field = $("#" + rule.id);
      field.addEventListener("input", function () {
        if (field.classList.contains("invalid") && rule.test(field.value.trim())) {
          setFieldState(rule, true);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var valid = validate(true);
      errorAlert.classList.toggle("show", !valid);
      successAlert.classList.toggle("show", valid);

      if (valid) {
        form.reset();
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        errorAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ------------------------------------------------------------------------
     9. Footer year
     ------------------------------------------------------------------------ */
  function initFooterYear() {
    var slot = $("#footerYear");
    if (slot) slot.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     10. Boot
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initToastTriggers();
    initDetailModal();
    initCourseFilter();
    initEnquiryForm();
    initFooterYear();
  });
})();
