# backend/seed.py
from app import create_app, db
from models import Level, Semester, Subject

app = create_app()

with app.app_context():
    # Reset DB
    db.drop_all()
    db.create_all()

    # -------------------------
    # LEVELS
    # -------------------------
    school = Level(name="School (Class 1-12)")
    btech = Level(name="Undergraduate - B.Tech")
    bsc = Level(name="Undergraduate - B.Sc")
    ba = Level(name="Undergraduate - B.A")
    mbbs = Level(name="Undergraduate - MBBS")
    pg = Level(name="Postgraduate")

    db.session.add_all([school, btech, bsc, ba, mbbs, pg])
    db.session.commit()

    # -------------------------
    # SCHOOL (Classes 1–12)
    # -------------------------
    school_classes = []
    for i in range(1, 13):
        cls = Semester(name=f"Class {i}", level_id=school.id)
        school_classes.append(cls)
    db.session.add_all(school_classes)
    db.session.commit()

    school_subjects = {
        "Class 1": ["Mathematics", "English", "Hindi", "EVS", "Drawing", "GK", "Moral Science", "Music", "Computer Basics", "Craft"],
        "Class 2": ["Mathematics", "English", "Hindi", "EVS", "Drawing", "GK", "Moral Science", "Music", "Computer Basics", "Craft"],
        "Class 3": ["Mathematics", "English", "Hindi", "EVS", "Science", "Social Studies", "Computer Basics", "Drawing", "GK", "Craft"],
        "Class 4": ["Mathematics", "English", "Hindi", "Science", "Social Studies", "EVS", "Computer Science", "GK", "Drawing", "Art"],
        "Class 5": ["Mathematics", "English", "Hindi", "Science", "Social Studies", "GK", "Computer Science", "Drawing", "Art", "Moral Science"],
        "Class 6": ["Mathematics", "Science", "English", "Social Studies", "Computer Science", "History", "Geography", "Civics", "Hindi", "Art"],
        "Class 7": ["Mathematics", "Science", "English", "Social Studies", "Computer Science", "History", "Geography", "Civics", "Hindi", "GK"],
        "Class 8": ["Mathematics", "Science", "English", "History", "Geography", "Civics", "Computer Applications", "Hindi", "Environmental Science", "Art"],
        "Class 9": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Political Science", "Computer Science", "Economics"],
        "Class 10": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Social Science", "Economics", "Political Science", "Computer Science", "Hindi"],
        "Class 11": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics", "Accountancy", "Business Studies", "Psychology"],
        "Class 12": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics", "Accountancy", "Business Studies", "Political Science"]
    }

    for cls in school_classes:
        if cls.name in school_subjects:
            for subj in school_subjects[cls.name]:
                db.session.add(Subject(name=subj, semester_id=cls.id))
    db.session.commit()

    # -------------------------
    # B.TECH (8 Semesters)
    # -------------------------
    btech_sems = [Semester(name=f"Semester {i}", level_id=btech.id) for i in range(1, 9)]
    db.session.add_all(btech_sems)
    db.session.commit()

    btech_subjects = {
        "Semester 1": ["Mathematics I", "Physics", "Chemistry", "Engineering Graphics", "Basic Electrical", "Programming in C", "Communication Skills", "Environmental Studies", "Workshop", "Biology for Engineers"],
        "Semester 2": ["Mathematics II", "Physics II", "Basic Electronics", "Data Structures", "Engineering Mechanics", "Object-Oriented Programming (C++)", "Digital Logic", "Professional Communication", "Engineering Drawing", "Engineering Chemistry"],
        "Semester 3": ["Mathematics III", "Computer Organization", "Operating Systems", "Database Management Systems", "Discrete Mathematics", "Data Communication", "Electrical Machines", "Electronics Circuits", "Probability & Statistics", "Software Engineering"],
        "Semester 4": ["Algorithms", "Microprocessors", "Computer Networks", "Theory of Computation", "Signals & Systems", "Java Programming", "Compiler Design", "Web Technology", "Economics", "Numerical Methods"],
        "Semester 5": ["Artificial Intelligence", "Machine Learning", "Cloud Computing", "Software Engineering II", "Database Systems II", "Digital Signal Processing", "Design & Analysis of Algorithms", "Cryptography", "Mobile Computing", "Computer Graphics"],
        "Semester 6": ["Big Data Analytics", "Deep Learning", "Internet of Things", "Cyber Security", "Compiler Construction", "Operating Systems II", "Advanced Java", "Image Processing", "Cloud Services", "Control Systems"],
        "Semester 7": ["Distributed Systems", "Blockchain Technology", "Advanced AI", "Robotics", "Parallel Computing", "Data Mining", "Embedded Systems", "Project Work I", "Elective I", "Elective II"],
        "Semester 8": ["Project Work II", "Seminar", "Internship", "Elective III", "Elective IV", "Entrepreneurship Development", "Research Methodology", "Ethics in Engineering", "Management Principles", "Comprehensive Viva"]
    }

    for sem in btech_sems:
        if sem.name in btech_subjects:
            for subj in btech_subjects[sem.name]:
                db.session.add(Subject(name=subj, semester_id=sem.id))
    db.session.commit()

    # -------------------------
    # MBBS (9 Semesters)
    # -------------------------
    mbbs_sems = [Semester(name=f"Semester {i}", level_id=mbbs.id) for i in range(1, 10)]
    db.session.add_all(mbbs_sems)
    db.session.commit()

    mbbs_subjects = {
        "Semester 1": ["Anatomy I", "Physiology I", "Biochemistry I", "Community Medicine I", "Medical Ethics", "Clinical Orientation", "Embryology", "Histology", "Genetics", "Biophysics"],
        "Semester 2": ["Anatomy II", "Physiology II", "Biochemistry II", "Community Medicine II", "Microbiology I", "Clinical Posting", "Forensic Medicine I", "Pharmacology I", "Pathology I", "Behavioral Science"],
        "Semester 3": ["Pharmacology II", "Pathology II", "Microbiology II", "Forensic Medicine II", "Community Medicine III", "Medicine I", "Surgery I", "Pediatrics I", "Obstetrics I", "Clinical Posting II"],
        "Semester 4": ["Medicine II", "Surgery II", "Pediatrics II", "Obstetrics II", "Ophthalmology", "ENT", "Community Medicine IV", "Anesthesia I", "Orthopedics I", "Dermatology I"],
        "Semester 5": ["Medicine III", "Surgery III", "Psychiatry", "Radiology", "Community Medicine V", "Orthopedics II", "Dermatology II", "Anesthesia II", "Elective I", "Elective II"],
        "Semester 6": ["Medicine IV", "Surgery IV", "Pediatrics III", "Obstetrics III", "Elective III", "Elective IV", "Ophthalmology II", "ENT II", "Community Medicine VI", "Pathology III"],
        "Semester 7": ["Medicine V", "Surgery V", "Pediatrics IV", "Obstetrics IV", "Elective V", "Elective VI", "Forensic Medicine III", "Pharmacology III", "Radiology II", "Community Medicine VII"],
        "Semester 8": ["Internship I", "Project I", "Seminar I", "Elective VII", "Elective VIII", "Research Methods I", "Medical Ethics II", "Community Medicine VIII", "Pediatrics V", "Surgery VI"],
        "Semester 9": ["Internship II", "Project II", "Seminar II", "Elective IX", "Elective X", "Research Methods II", "Medical Ethics III", "Community Medicine IX", "Final Year Practical", "Comprehensive Viva"]
    }

    for sem in mbbs_sems:
        if sem.name in mbbs_subjects:
            for subj in mbbs_subjects[sem.name]:
                db.session.add(Subject(name=subj, semester_id=sem.id))
    db.session.commit()

    # -------------------------
    # B.Sc (6 Semesters)
    # -------------------------
    bsc_sems = [Semester(name=f"Semester {i}", level_id=bsc.id) for i in range(1, 7)]
    db.session.add_all(bsc_sems)
    db.session.commit()

    bsc_subjects = {
        "Semester 1": ["Mathematics I", "Physics I", "Chemistry I", "Botany I", "Zoology I", "English I", "Computer Science I", "Environmental Studies", "Statistics I", "Elective I"],
        "Semester 2": ["Mathematics II", "Physics II", "Chemistry II", "Botany II", "Zoology II", "English II", "Computer Science II", "Statistics II", "Elective II", "Elective III"],
        "Semester 3": ["Mathematics III", "Physics III", "Chemistry III", "Botany III", "Zoology III", "Computer Science III", "Statistics III", "Elective IV", "Elective V", "Elective VI"],
        "Semester 4": ["Mathematics IV", "Physics IV", "Chemistry IV", "Botany IV", "Zoology IV", "Computer Science IV", "Statistics IV", "Elective VII", "Elective VIII", "Elective IX"],
        "Semester 5": ["Mathematics V", "Physics V", "Chemistry V", "Botany V", "Zoology V", "Computer Science V", "Statistics V", "Elective X", "Elective XI", "Elective XII"],
        "Semester 6": ["Mathematics VI", "Physics VI", "Chemistry VI", "Botany VI", "Zoology VI", "Computer Science VI", "Statistics VI", "Elective XIII", "Elective XIV", "Elective XV"]
    }

    for sem in bsc_sems:
        if sem.name in bsc_subjects:
            for subj in bsc_subjects[sem.name]:
                db.session.add(Subject(name=subj, semester_id=sem.id))
    db.session.commit()

    # -------------------------
    # B.A (6 Semesters)
    # -------------------------
    ba_sems = [Semester(name=f"Semester {i}", level_id=ba.id) for i in range(1, 7)]
    db.session.add_all(ba_sems)
    db.session.commit()

    ba_subjects = {
        "Semester 1": ["English Literature I", "History I", "Political Science I", "Sociology I", "Psychology I", "Economics I", "Philosophy I", "Public Administration I", "Elective I", "Elective II"],
        "Semester 2": ["English Literature II", "History II", "Political Science II", "Sociology II", "Psychology II", "Economics II", "Philosophy II", "Public Administration II", "Elective III", "Elective IV"],
        "Semester 3": ["English Literature III", "History III", "Political Science III", "Sociology III", "Psychology III", "Economics III", "Philosophy III", "Public Administration III", "Elective V", "Elective VI"],
        "Semester 4": ["English Literature IV", "History IV", "Political Science IV", "Sociology IV", "Psychology IV", "Economics IV", "Philosophy IV", "Public Administration IV", "Elective VII", "Elective VIII"],
        "Semester 5": ["English Literature V", "History V", "Political Science V", "Sociology V", "Psychology V", "Economics V", "Philosophy V", "Public Administration V", "Elective IX", "Elective X"],
        "Semester 6": ["English Literature VI", "History VI", "Political Science VI", "Sociology VI", "Psychology VI", "Economics VI", "Philosophy VI", "Public Administration VI", "Elective XI", "Elective XII"]
    }

    for sem in ba_sems:
        if sem.name in ba_subjects:
            for subj in ba_subjects[sem.name]:
                db.session.add(Subject(name=subj, semester_id=sem.id))
    db.session.commit()

    # -------------------------
    # POSTGRADUATE (4 Semesters)
    # -------------------------
    pg_sems = [Semester(name=f"Semester {i}", level_id=pg.id) for i in range(1, 5)]
    db.session.add_all(pg_sems)
    db.session.commit()

    pg_subjects = {
        "Semester 1": ["Research Methodology", "Advanced Mathematics", "Core Subject I", "Core Subject II", "Elective I", "Seminar I", "Computer Applications", "Professional Communication", "Statistics I", "Library Work"],
        "Semester 2": ["Core Subject III", "Core Subject IV", "Elective II", "Elective III", "Seminar II", "Project I", "Advanced Research Methods", "Statistics II", "Teaching Practice", "Internship I"],
        "Semester 3": ["Core Subject V", "Core Subject VI", "Elective IV", "Elective V", "Seminar III", "Project II", "Dissertation I", "Internship II", "Advanced Seminar", "Professional Development"],
        "Semester 4": ["Core Subject VII", "Core Subject VIII", "Elective VI", "Elective VII", "Seminar IV", "Project III", "Dissertation II", "Internship III", "Comprehensive Viva", "Thesis Submission"]
    }

    for sem in pg_sems:
        if sem.name in pg_subjects:
            for subj in pg_subjects[sem.name]:
                db.session.add(Subject(name=subj, semester_id=sem.id))
    db.session.commit()

    print("✅ Database seeded successfully with Levels, Semesters & Subjects!")

