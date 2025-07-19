const intros = [
  {
    welcomeText: "Hi, I'm",
    firstName: "Sagar",
    lastName: "Koju",
    caption: "A Flutter Developer",
    description:
      "I am a passionate Flutter developer with a keen interest in building beautiful and functional mobile applications. I love to create seamless user experiences and am always eager to learn new technologies.",
  },
];

const about = [
  {
    lottieURL: "https://i.postimg.cc/3rS2GCZZ/profile.jpg",
    name: "Sagar Koju",
    contactNumber: "9863180182",
    emailAddress: "sagarkoju5@gmail.com",
    linkedln: "https://www.linkedin.com/in/sagar-koju-444442166/",
    githubAccount: "https://github.com/sagarkoju33",
    description1:
      "I am a Flutter developer with a passion for creating beautiful and functional mobile applications.",
    description2:
      "I have experience in building cross-platform apps using Flutter and Dart, and I am always eager to learn new technologies.",
    skills: [
      {
        name: "Flutter",
        level: "1.0",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      },
      {
        name: "Dart",
        level: "0.9",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      },
      {
        name: "Firebase",
        level: "0.75",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "REST APIs",
        level: "1",
        image: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
      },
      {
        name: "BLOC",
        level: "0.7",
        image:
          "https://raw.githubusercontent.com/felangel/bloc/master/docs/assets/bloc_logo_full.png",
      },
      {
        name: "Provider",
        level: "0.8",
        image:
          "https://raw.githubusercontent.com/rrousselGit/provider/master/resources/logo.png",
      },
      {
        name: "Riverpod",
        level: "0.6",
        image: "https://riverpod.dev/assets/logo.svg",
      },
      {
        name: "Getx",
        level: "0.95",
        image:
          "https://raw.githubusercontent.com/jonataslaw/getx-community/master/get.png",
      },
      {
        name: "Clean Architecture",
        level: "1",
        image:
          "https://miro.medium.com/v2/resize:fit:700/1*LtSI1FzE_tBMKFA-uFSz6g.png",
      },
      {
        name: "Responsive Design",
        level: "1",
        image: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
      },
      {
        name: "Kotlin",
        level: "0.6",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      },
      {
        name: "React Native",
        level: "0.5",
        image:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
    ],
  },
];

const projects = [
  {
    title: "Movie Application (BLoC)",
    description:
      "A powerful movie browsing application developed using Flutter and the BLoC pattern. It features dynamic UI updates, categorized movie listings, and integration with a movie API to deliver up-to-date content seamlessly.",
    image: "",
    link: "https://github.com/sagarkoju33/Movie_bloc",
    technologies: ["Flutter", "Dart", "BLoC", "REST API"],
  },
  {
    title: "KHEC Application",
    description:
      "A complete digital companion for Kathmandu Engineering College. It provides access to notices, class routines, exam schedules, faculty details, and more. Designed with a focus on UI/UX and smooth navigation.",
    image: "",
    link: "https://github.com/sagarkoju33/KHEC",
    technologies: ["Flutter", "Dart", "Firebase", "REST API"],
  },
  {
    title: "Article Blog (BLoC)",
    description:
      "A clean and modern blogging app powered by BLoC. Users can browse, read, and manage articles with real-time data handling and efficient state management for a seamless experience.",
    image: "",
    link: "https://github.com/sagarkoju/ArticleBlog/tree/master",
    technologies: ["Flutter", "Dart", "BLoC", "REST API"],
  },
  {
    title: "COVID Tracker",
    description:
      "A real-time COVID-19 tracker app that displays global and country-wise statistics, safety tips, and interactive charts. Built to spread awareness and help users stay informed.",
    image: "",
    link: "https://github.com/sagarkoju/COVID19Tracker",
    technologies: ["Flutter", "Dart", "Chart.js", "REST API"],
  },
  {
    title: "Dice Roller Game",
    description:
      "A fun and interactive dice-rolling app built using Flutter. The simple UI and random number logic offer an engaging experience, ideal for learning Flutter basics and animations.",
    image: "",
    link: "https://github.com/sagarkoju/Dice-Roller-Game/tree/master",
    technologies: ["Flutter", "Dart"],
  },
  {
    title: "MyPay",
    description:
      "MyPay is a versatile mobile wallet application allowing users to pay utility bills, transfer funds, and access financial services through an intuitive interface. Ensures secure transactions and swift operations.",
    image: "",
    link: "https://play.google.com/store/apps/details?id=com.mobile.smartcard",
    technologies: ["Flutter", "Dart", "Firebase", "Payment Gateway"],
  },
  {
    title: "MyPay Gold",
    description:
      "An advanced version of the MyPay wallet with added features such as gold savings, investment tracking, and premium services. Designed for a smooth financial experience with rich UI.",
    image: "",
    link: "https://play.google.com/store/apps/details?id=app.mypay.MyPayGold",
    technologies: ["Flutter", "Dart", "Secure Storage", "Firebase"],
  },
  {
    title: "Xpress Sewa",
    description:
      "Transfer Money At Your Fingertips. Send & receive money in seconds with great rates and cheaper transaction fees. Trusted by millions of people. Xpress Sewa aims to make the money transfer process effortless and super fast.",
    image: "",
    link: "https://play.google.com/store/apps/details?id=transfer.money.com.xpress_sewa",
    technologies: ["Flutter", "Dart", "Money Transfer", "Firebase"],
  },
  {
    title: "Asan Remit",
    description:
      "Transfer Money At Your Fingertips. Send & receive money in seconds with great rates and cheaper transaction fees. Trusted by millions of people. Asan Remit aims to make the money transfer process effortless and super fast.",
    image: "",
    link: "https://play.google.com/store/apps/details?id=transfer.money.com.asanremit",
    technologies: ["Flutter", "Dart", "Money Transfer", "Firebase"],
  },
  {
    title: "Insta Remit",
    description:
      "At Insta Remit, we redefine money transfers, prioritizing your control and satisfaction. Our platform ensures swift approvals, real-time tracking, and secure transactions.",
    image: "",
    link: "https://play.google.com/store/apps/details?id=transfer.money.com.instaremit",
    technologies: ["Flutter", "Dart", "Secure Payment", "Firebase"],
  },
  {
    title: "Taka Pay",
    description:
      "TakaPay aims to make the money transfer process effortless and super fast. We maintain complete transparency to give you better control over the transactions, and our thorough verification processes ensure the money is safe and reaches the right recipients.",
    image: "",
    link: "https://play.google.com/store/apps/details?id=com.xpress.takapay",
    technologies: ["Flutter", "Dart", "Money Transfer", "Firebase"],
  },
];

const experience = [
  {
    title: "Mid Level Flutter Developer",
    period: "Apr 2023 - Ongoing",
    description: [
      "Led the development of production-level Flutter applications with robust architecture.",
      "Integrated RESTful APIs and third-party services such as payment gateways and Firebase.",
      "Optimized application performance and responsiveness across multiple platforms.",
      "Maintained and refactored legacy codebases for scalability and maintainability.",
      "Collaborated with UI/UX designers to deliver pixel-perfect mobile interfaces.",
      "Implemented real-time features using GetX for state management and routing.",
      "Conducted peer code reviews and mentored junior developers.",
      "Participated in Agile development cycles and daily stand-ups.",
    ],
    company: "MyPay Smart Card Pvt. Ltd., Kathmandu, Nepal",
  },
  {
    title: "Associate Flutter Developer",
    period: "Aug 2022 - Feb 2023",
    description: [
      "Contributed to the design and development of cross-platform mobile apps.",
      "Utilized Flutter widgets and custom components to build interactive UIs.",
      "Worked closely with QA teams to resolve bugs and ensure quality assurance.",
      "Assisted in deploying apps to Google Play Store and Apple App Store.",
      "Integrated Firebase services for authentication, database, and notifications.",
      "Wrote modular, testable, and clean Dart code following best practices.",
      "Managed app state effectively using Provider and Riverpod.",
      "Collaborated with product managers to refine feature requirements.",
    ],
    company: "Worldlink Technologies Pvt. Ltd., Kathmandu, Nepal",
  },
  {
    title: "Associate Flutter Developer",
    period: "May 2021 - Aug 2022",
    description: [
      "Implemented real-time features using GetX for state management and routing.",
      "Conducted peer code reviews and mentored junior developers.",
      "Assisted in debugging and troubleshooting app issues in production.",
    ],
    company: "Yellow Nepal Pvt. Ltd., Kathmandu, Nepal",
  },
];

const education = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "Kathmandu Engineering College, Tribhuvan University",
    duration: "2018 - 2023",
    description:
      "Focused on software engineering principles, algorithms, data structures, database systems, and mobile application development. Participated in multiple academic projects, hackathons, and open-source contributions.",
    link: "https://khec.edu.np/",
  },
  {
    degree: "Higher Secondary Education (Science)",
    institution: "Bagmati Secondary School, Kathmandu",
    duration: "2016 - 2018",
    description:
      "Studied core science subjects including Physics, Chemistry, and Mathematics. Developed foundational skills in analytical reasoning, problem-solving, and logical thinking.",
    link: "https://bagmatischool.edu.np/",
  },
  {
    degree: "School Leaving Certificate (SLC)",
    institution: "Shree Nepal Rastriya Secondary School",
    duration: "2016",
    description:
      "Completed school-level education with a focus on core subjects including Mathematics, Science, English, and Computer Science.",
    link: "#",
  },
];

const contact = [
  {
    name: "Sagar Koju",
    gender: "Male",
    age: "28",
    email: "sagarkoju5@gmail.com",
    mobile: "+977 9863180182",
    address: "Kamalbinyak-10, Nepal",
  },
];
const uploadImage = {
    "succes": true,
    "msg": "File Uploaded Successfully!",
    "data": {
        "file_url": "https://res.cloudinary.com/dve98ojdc/image/upload/v1752944210/ez3yxagukql3k9mdno83.png",
        "_id": "687bce5231536ed07632c444",
        "__v": 0
    }
}