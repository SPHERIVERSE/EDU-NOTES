# models.py
from datetime import datetime
from extensions import db

# Users who can add notes/subjects
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Education hierarchy
class Level(db.Model):
    __tablename__ = "levels"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)  # School/Undergraduate/Postgraduate
    semesters = db.relationship("Semester", backref="level", cascade="all, delete")

class Semester(db.Model):
    __tablename__ = "semesters"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)  # "Class 1", "Semester 1", etc.
    level_id = db.Column(db.Integer, db.ForeignKey("levels.id"), nullable=False)
    subjects = db.relationship("Subject", backref="semester", cascade="all, delete")

class Subject(db.Model):
    __tablename__ = "subjects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180), nullable=False)
    semester_id = db.Column(db.Integer, db.ForeignKey("semesters.id"), nullable=False)
    notes = db.relationship("Note", backref="subject", cascade="all, delete")

class Note(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    module_name = db.Column(db.String(120), nullable=True)  # e.g., "Module 3: Integrals"
    content = db.Column(db.Text, nullable=False)            # keep MVP as text; files can be added later
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

def seed_minimal():
    """
    Idempotent seed for Levels and Semesters.
    - School: Class 1..12
    - Undergraduate: Semester 1..8
    - Postgraduate: Semester 1..4
    """
    if Level.query.first():
        return  # already seeded

    school = Level(name="School")
    ug = Level(name="Undergraduate")
    pg = Level(name="Postgraduate")
    db.session.add_all([school, ug, pg])
    db.session.flush()

    # School classes
    for i in range(1, 13):
        db.session.add(Semester(name=f"Class {i}", level_id=school.id))

    # UG / PG semesters
    for i in range(1, 9):
        db.session.add(Semester(name=f"Semester {i}", level_id=ug.id))
    for i in range(1, 5):
        db.session.add(Semester(name=f"Semester {i}", level_id=pg.id))

    db.session.commit()

