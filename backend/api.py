# api.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_
from app import db
from models import Level, Semester, Subject, Note

api_bp = Blueprint("api", __name__)

# ---------- Levels ----------
@api_bp.get("/levels")
def list_levels():
    levels = Level.query.order_by(Level.id).all()
    return [{"id": l.id, "name": l.name} for l in levels]

# ---------- Semesters ----------
@api_bp.get("/semesters")
def list_semesters():
    level_id = request.args.get("level_id", type=int)
    if not level_id:
        return {"error": "level_id is required"}, 400
    semesters = Semester.query.filter_by(level_id=level_id).order_by(Semester.id).all()
    return [{"id": s.id, "name": s.name, "level_id": s.level_id} for s in semesters]

# ---------- Subjects ----------
@api_bp.get("/subjects")
def list_subjects():
    sem_id = request.args.get("semester_id", type=int)
    if not sem_id:
        return {"error": "semester_id is required"}, 400
    subs = Subject.query.filter_by(semester_id=sem_id).order_by(Subject.name).all()
    return [{"id": sb.id, "name": sb.name, "semester_id": sb.semester_id} for sb in subs]

@api_bp.post("/subjects")
@jwt_required()
def add_subject():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    sem_id = data.get("semester_id")
    if not (name and sem_id):
        return {"error": "name and semester_id required"}, 400
    sub = Subject(name=name, semester_id=sem_id)
    db.session.add(sub)
    db.session.commit()
    return {"id": sub.id, "name": sub.name, "semester_id": sub.semester_id}, 201

# ---------- Notes ----------
@api_bp.get("/notes")
def list_notes():
    subject_id = request.args.get("subject_id", type=int)
    if not subject_id:
        return {"error": "subject_id is required"}, 400

    q = (request.args.get("q") or "").strip()
    module = (request.args.get("module") or "").strip()

    query = Note.query.filter_by(subject_id=subject_id)
    if q:
        # naive text search over title/content
        query = query.filter(or_(Note.title.ilike(f"%{q}%"), Note.content.ilike(f"%{q}%")))
    if module:
        query = query.filter(Note.module_name.ilike(f"%{module}%"))

    notes = query.order_by(Note.created_at.desc()).all()
    return [{
        "id": n.id,
        "title": n.title,
        "module_name": n.module_name,
        "content": n.content,
        "subject_id": n.subject_id,
        "user_id": n.user_id,
        "created_at": n.created_at.isoformat()
    } for n in notes]

@api_bp.post("/notes")
@jwt_required()
def add_note():
    ident = get_jwt_identity()  # {"id":..., "email":...}
    data = request.get_json() or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()
    subject_id = data.get("subject_id")
    module_name = (data.get("module_name") or "").strip()

    if not (title and content and subject_id):
        return {"error": "title, content, subject_id required"}, 400

    note = Note(
        title=title,
        content=content,
        module_name=module_name or None,
        subject_id=subject_id,
        user_id=ident["id"]
    )
    db.session.add(note)
    db.session.commit()
    return {"id": note.id}, 201

