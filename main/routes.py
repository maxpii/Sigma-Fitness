from flask import render_template,url_for,flash,redirect, request
from main import app, db, bcrypt
from main.forms import RegistrationForm, LoginForm
from main.models import User, Workout
from flask_login import login_user

output = []

class s():
    global output


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/workout")
def workout():
    return render_template("workout.html")

@app.route("/process",  methods=["GET","POST"])
def process():
    global output
    output = request.get_json()
    for i in output["List"]:
        workout = Workout(name=i['name'],type=i['type'],muscle=i['muscle'],
                          equipment=i['equipment'],difficulty=i['difficulty'],
                          instructions = i['instructions'])
        db.session.add(workout)
    db.session.commit()
        
    return []
@app.route("/saved", methods=["GET","POST"])
def saved():
    data = []
    for i in Workout.query.all():
        data.append(i.name)
    return render_template("saved.html",data=output)

@app.route("/meditation")
def meditation():
    return render_template("meditation.html")

# name = db.Column(db.String(100), nullable=False)
#     type = db.Column(db.String(100), nullable=False)
#     muscle = db.Column(db.String(100), nullable=False)
#     equipment = db.Column(db.String(100), nullable=False)
#     difficulty = db.Column(db.String(100), nullable=False)
#     instructions = db.Column(db.String(100), nullable=False)

@app.route("/login", methods=["GET","POST"])
def login():
    form = LoginForm()
    if form.is_submitted() and form.validate():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user,remember=form.remember.data)
            flash("Login sucessful!")
            return redirect(url_for("mainPage"))
    elif form.is_submitted() and not form.validate():
        flash("Login unsuccessful. Please check username and password")
    return render_template("login.html",form=form)


@app.route("/register", methods=["GET","POST"])
def register():
    form = RegistrationForm()
    if form.is_submitted() and form.validate():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data,email=form.email.data,password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash(f"Account created for {form.username.data}!")
        return redirect(url_for("mainPage"))
    
    elif form.is_submitted() and not form.validate():
        flash("Invalid data")
    return render_template("register.html",form=form)

@app.route("/learn")
def learn():
    return render_template("learn.html")

@app.route("/mainPage")
def mainPage():
    return render_template("mainPage.html")

print(output)
