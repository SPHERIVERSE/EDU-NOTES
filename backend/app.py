# app.py
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

from extensions import db, jwt

def create_app():
    load_dotenv()
    app = Flask(__name__)

    # Config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret")

    # Init
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Register blueprints
    from auth import auth_bp
    from api import api_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(api_bp,  url_prefix="/api")

    # Health check
    @app.get("/ping")
    def ping():
        return {"ok": True, "app": "edunotes-backend"}

    return app

if __name__ == "__main__":
    app = create_app()
    
    with app.app_context():
        from models import seed_minimal # ensure models are loaded & seed callable
        
        db.create_all()
        seed_minimal()  # idempotent seed for Levels & Semesters
    app.run(host="0.0.0.0", port=5001, debug=True)

