# auth.py
from flask import Blueprint, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not (name and email and password):
        return {"error": "name, email, password required"}, 400

    if User.query.filter_by(email=email).first():
        return {"error": "email already exists"}, 400

    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password)
    )
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity={"id": user.id, "email": user.email})
    return {"token": token, "user": {"id": user.id, "name": user.name, "email": user.email}}

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return {"error": "invalid credentials"}, 401

    token = create_access_token(identity={"id": user.id, "email": user.email})
    return {"token": token, "user": {"id": user.id, "name": user.name, "email": user.email}}

@auth_bp.get("/me")
@jwt_required()
def me():
    ident = get_jwt_identity()  # {"id":..., "email":...}
    user = User.query.get(ident["id"])
    return {"id": user.id, "name": user.name, "email": user.email}

