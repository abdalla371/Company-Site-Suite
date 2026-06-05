import os, hashlib, base64, time, json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=[
    "https://abdalla371.github.io",
    "http://localhost:*",
    "http://127.0.0.1:*",
], supports_credentials=True)

# ── DATABASE CONFIG ──────────────────────────────────────────────
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///dev.db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get("SESSION_SECRET", "dev_secret_change_me")

db = SQLAlchemy(app)

# ── MODELS ──────────────────────────────────────────────────────
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    phone = db.Column(db.String(50))
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default="job_seeker")  # job_seeker | employer | admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "fullName": self.full_name, "email": self.email,
                "phone": self.phone, "role": self.role, "createdAt": self.created_at.isoformat()}


class Job(db.Model):
    __tablename__ = "jobs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(200), nullable=False)
    company_logo = db.Column(db.String(500))
    location = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # full_time|part_time|contract|internship|remote
    salary = db.Column(db.String(100))
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    requirements = db.Column(db.Text)
    is_featured = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "title": self.title, "companyName": self.company_name,
                "companyLogo": self.company_logo, "location": self.location, "type": self.type,
                "salary": self.salary, "description": self.description, "category": self.category,
                "requirements": self.requirements, "isFeatured": self.is_featured,
                "createdAt": self.created_at.isoformat()}


class Company(db.Model):
    __tablename__ = "companies"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    logo = db.Column(db.String(500))
    industry = db.Column(db.String(100))
    location = db.Column(db.String(200))
    open_positions = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "logo": self.logo,
                "industry": self.industry, "location": self.location, "openPositions": self.open_positions}


class InternshipApplication(db.Model):
    __tablename__ = "internship_applications"
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50))
    university = db.Column(db.String(200), nullable=False)
    field_of_study = db.Column(db.String(200), nullable=False)
    year_of_study = db.Column(db.String(50))
    cv_url = db.Column(db.String(500))
    cover_letter = db.Column(db.Text)
    start_date = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "fullName": self.full_name, "email": self.email,
                "phone": self.phone, "university": self.university,
                "fieldOfStudy": self.field_of_study, "yearOfStudy": self.year_of_study,
                "cvUrl": self.cv_url, "coverLetter": self.cover_letter,
                "startDate": self.start_date, "status": self.status,
                "createdAt": self.created_at.isoformat()}


class ShaqotagApplication(db.Model):
    __tablename__ = "shaqotag_applications"
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50))
    occupation = db.Column(db.String(200), nullable=False)
    experience = db.Column(db.Text, nullable=False)
    skills = db.Column(db.Text)
    cv_url = db.Column(db.String(500))
    cover_letter = db.Column(db.Text)
    preferred_sector = db.Column(db.String(200))
    status = db.Column(db.String(50), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "fullName": self.full_name, "email": self.email,
                "phone": self.phone, "occupation": self.occupation, "experience": self.experience,
                "skills": self.skills, "cvUrl": self.cv_url, "coverLetter": self.cover_letter,
                "preferredSector": self.preferred_sector, "status": self.status,
                "createdAt": self.created_at.isoformat()}


class MembershipPlan(db.Model):
    __tablename__ = "membership_plans"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.String(100), nullable=False)
    features = db.Column(db.Text, nullable=False)  # JSON array string
    is_popular = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "price": self.price,
                "duration": self.duration, "features": json.loads(self.features),
                "isPopular": self.is_popular}


class Membership(db.Model):
    __tablename__ = "memberships"
    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey("membership_plans.id"), nullable=False)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "planId": self.plan_id, "fullName": self.full_name,
                "email": self.email, "phone": self.phone, "status": self.status,
                "createdAt": self.created_at.isoformat()}


# ── HELPERS ──────────────────────────────────────────────────────
def hash_password(password):
    secret = app.config["SECRET_KEY"]
    return hashlib.sha256(f"{password}{secret}".encode()).hexdigest()

def generate_token(user_id, email):
    raw = f"{user_id}:{email}:{int(time.time())}"
    return base64.b64encode(raw.encode()).decode()

def get_current_user():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    try:
        token = auth_header[7:]
        decoded = base64.b64decode(token.encode()).decode()
        user_id = int(decoded.split(":")[0])
        return User.query.get(user_id)
    except Exception:
        return None


# ── AUTH ROUTES ──────────────────────────────────────────────────
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ["fullName", "email", "password", "role"]):
        return jsonify({"error": "Missing required fields"}), 400
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 400
    user = User(
        full_name=data["fullName"], email=data["email"],
        phone=data.get("phone"), password_hash=hash_password(data["password"]),
        role=data["role"]
    )
    db.session.add(user)
    db.session.commit()
    token = generate_token(user.id, user.email)
    return jsonify({"user": user.to_dict(), "token": token}), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ["email", "password"]):
        return jsonify({"error": "Missing email or password"}), 400
    user = User.query.filter_by(email=data["email"]).first()
    if not user or user.password_hash != hash_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401
    token = generate_token(user.id, user.email)
    return jsonify({"user": user.to_dict(), "token": token})


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    return jsonify({"success": True})


@app.route("/api/auth/me", methods=["GET"])
def me():
    user = get_current_user()
    if not user:
        return jsonify({"error": "Not authenticated"}), 401
    return jsonify(user.to_dict())


# ── JOB ROUTES ──────────────────────────────────────────────────
@app.route("/api/jobs", methods=["GET"])
def list_jobs():
    query = Job.query.filter_by(is_active=True)
    search = request.args.get("search")
    category = request.args.get("category")
    job_type = request.args.get("type")
    location = request.args.get("location")
    limit = int(request.args.get("limit", 20))
    offset = int(request.args.get("offset", 0))
    if search:
        query = query.filter(
            db.or_(Job.title.ilike(f"%{search}%"),
                   Job.company_name.ilike(f"%{search}%"),
                   Job.description.ilike(f"%{search}%"))
        )
    if category:
        query = query.filter_by(category=category)
    if job_type:
        query = query.filter_by(type=job_type)
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    result = query.order_by(Job.is_featured.desc(), Job.created_at.desc()).limit(limit).offset(offset).all()
    return jsonify([j.to_dict() for j in result])


@app.route("/api/jobs/featured", methods=["GET"])
def featured_jobs():
    featured = Job.query.filter_by(is_active=True, is_featured=True).order_by(Job.created_at.desc()).limit(6).all()
    if len(featured) < 6:
        ids = [j.id for j in featured]
        extra = Job.query.filter_by(is_active=True).filter(~Job.id.in_(ids)).order_by(Job.created_at.desc()).limit(6 - len(featured)).all()
        featured += extra
    return jsonify([j.to_dict() for j in featured])


@app.route("/api/jobs/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify(job.to_dict())


@app.route("/api/jobs", methods=["POST"])
def create_job():
    data = request.get_json()
    if not data or not all(k in data for k in ["title", "companyName", "location", "type", "description", "category"]):
        return jsonify({"error": "Missing required fields"}), 400
    job = Job(
        title=data["title"], company_name=data["companyName"],
        company_logo=data.get("companyLogo"), location=data["location"],
        type=data["type"], salary=data.get("salary"), description=data["description"],
        category=data["category"], requirements=data.get("requirements"),
        is_featured=data.get("isFeatured", False),
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201


# ── COMPANY ROUTES ──────────────────────────────────────────────
@app.route("/api/companies", methods=["GET"])
def list_companies():
    comps = Company.query.order_by(Company.open_positions.desc()).limit(10).all()
    return jsonify([c.to_dict() for c in comps])


# ── APPLICATION ROUTES ──────────────────────────────────────────
@app.route("/api/internship-applications", methods=["POST"])
def create_internship():
    data = request.get_json()
    if not data or not all(k in data for k in ["fullName", "email", "university", "fieldOfStudy", "startDate"]):
        return jsonify({"error": "Missing required fields"}), 400
    app_ = InternshipApplication(
        full_name=data["fullName"], email=data["email"], phone=data.get("phone"),
        university=data["university"], field_of_study=data["fieldOfStudy"],
        year_of_study=data.get("yearOfStudy"), cv_url=data.get("cvUrl"),
        cover_letter=data.get("coverLetter"), start_date=data["startDate"],
    )
    db.session.add(app_)
    db.session.commit()
    return jsonify(app_.to_dict()), 201


@app.route("/api/shaqotag-applications", methods=["POST"])
def create_shaqotag():
    data = request.get_json()
    if not data or not all(k in data for k in ["fullName", "email", "occupation", "experience"]):
        return jsonify({"error": "Missing required fields"}), 400
    app_ = ShaqotagApplication(
        full_name=data["fullName"], email=data["email"], phone=data.get("phone"),
        occupation=data["occupation"], experience=data["experience"],
        skills=data.get("skills"), cv_url=data.get("cvUrl"),
        cover_letter=data.get("coverLetter"), preferred_sector=data.get("preferredSector"),
    )
    db.session.add(app_)
    db.session.commit()
    return jsonify(app_.to_dict()), 201


# ── MEMBERSHIP ROUTES ────────────────────────────────────────────
@app.route("/api/membership-plans", methods=["GET"])
def list_plans():
    plans = MembershipPlan.query.order_by(MembershipPlan.price).all()
    return jsonify([p.to_dict() for p in plans])


@app.route("/api/memberships", methods=["POST"])
def create_membership():
    data = request.get_json()
    if not data or not all(k in data for k in ["planId", "fullName", "email", "phone"]):
        return jsonify({"error": "Missing required fields"}), 400
    m = Membership(
        plan_id=data["planId"], full_name=data["fullName"],
        email=data["email"], phone=data["phone"],
    )
    db.session.add(m)
    db.session.commit()
    return jsonify(m.to_dict()), 201


# ── STATS ROUTE ──────────────────────────────────────────────────
@app.route("/api/stats/summary", methods=["GET"])
def stats_summary():
    return jsonify({
        "totalJobs": Job.query.filter_by(is_active=True).count(),
        "totalCompanies": Company.query.count(),
        "totalMembers": Membership.query.count(),
        "totalApplications": InternshipApplication.query.count() + ShaqotagApplication.query.count(),
    })


@app.route("/api/healthz")
def healthz():
    return jsonify({"status": "ok"})


# ── SEED DATA ────────────────────────────────────────────────────
def seed_data():
    if Job.query.first():
        return  # Already seeded
    companies_data = [
        ("Hormuud Telecom", "Telecommunications", "Mogadishu, Somalia", 12),
        ("Premier Bank Somalia", "Banking & Finance", "Mogadishu, Somalia", 8),
        ("Dahabshiil Group", "Financial Services", "Mogadishu, Somalia", 15),
        ("Telesom", "Telecommunications", "Hargeisa, Somaliland", 6),
        ("Dalbile Hospital", "Healthcare", "Mogadishu, Somalia", 9),
        ("UNDP Somalia", "International Development", "Mogadishu, Somalia", 7),
        ("Galaxy IT Solutions", "Technology", "Mogadishu, Somalia", 5),
        ("SomTrans Logistics", "Logistics & Transport", "Bosaso, Somalia", 4),
    ]
    for name, ind, loc, pos in companies_data:
        db.session.add(Company(name=name, industry=ind, location=loc, open_positions=pos))

    jobs_data = [
        ("Software Developer", "Hormuud Telecom", "Mogadishu, Somalia", "full_time", "$400-$700/mo",
         "Join our growing tech team to develop and maintain internal and customer-facing systems.",
         "IT", "Bachelor in CS, 2+ years web development, JavaScript/Python.", True),
        ("Accountant", "Premier Bank Somalia", "Mogadishu, Somalia", "full_time", "$350-$550/mo",
         "Manage daily financial operations, prepare reports, and ensure regulatory compliance.",
         "Finance", "Bachelor in Accounting, 3+ years banking experience.", True),
        ("Marketing Manager", "Dahabshiil Group", "Mogadishu, Somalia", "full_time", "$500-$800/mo",
         "Lead marketing campaigns and grow brand awareness across Somalia and the Horn of Africa.",
         "Marketing", "Bachelor in Marketing, 3+ years experience, digital marketing skills.", True),
        ("Customer Service Representative", "Telesom", "Hargeisa, Somaliland", "full_time", "$200-$350/mo",
         "Handle customer inquiries and resolve complaints for our mobile money customers.",
         "Customer Service", "Diploma or degree, excellent Somali and English communication skills.", False),
        ("HR Officer", "Dalbile Hospital", "Mogadishu, Somalia", "full_time", "$300-$450/mo",
         "Support HR operations including recruitment, onboarding, and performance management.",
         "Human Resources", "Bachelor in HR Management, 2+ years experience.", False),
        ("Graphic Designer", "Galaxy IT Solutions", "Mogadishu, Somalia", "part_time", "$150-$250/mo",
         "Create visual content for digital and print media including branding and social media.",
         "Design", "Strong portfolio, proficiency in Adobe Creative Suite.", False),
        ("Logistics Coordinator", "SomTrans Logistics", "Bosaso, Somalia", "full_time", "$280-$420/mo",
         "Coordinate cargo shipments and manage supplier relationships across Somalia.",
         "Logistics", "Degree in Supply Chain or Business, 2+ years logistics experience.", False),
        ("Data Analyst", "UNDP Somalia", "Mogadishu, Somalia", "contract", "$600-$900/mo",
         "Analyze program data and produce reports to support development programs.",
         "IT", "Masters in Data Science or Statistics, proficiency in SQL and data visualization.", True),
    ]
    for t, cn, loc, jt, sal, desc, cat, req, feat in jobs_data:
        db.session.add(Job(title=t, company_name=cn, location=loc, type=jt, salary=sal,
                           description=desc, category=cat, requirements=req, is_featured=feat))

    plans = [
        ("Basic", 15.0, "1 month",
         json.dumps(["Access to job listings", "Apply to 10 jobs/month", "Email notifications", "Profile visibility"]),
         False),
        ("Professional", 35.0, "3 months",
         json.dumps(["All job listings access", "Unlimited applications", "Priority profile listing", "CV review service", "Networking events", "Email & SMS alerts"]),
         True),
        ("Premium", 80.0, "12 months",
         json.dumps(["Everything in Professional", "Featured profile badge", "Career coaching session", "Interview preparation", "Direct employer connections", "Priority support"]),
         False),
    ]
    for name, price, dur, feat_json, pop in plans:
        db.session.add(MembershipPlan(name=name, price=price, duration=dur, features=feat_json, is_popular=pop))

    db.session.commit()
    print("Database seeded successfully.")


# ── STARTUP ──────────────────────────────────────────────────────
with app.app_context():
    db.create_all()
    seed_data()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
