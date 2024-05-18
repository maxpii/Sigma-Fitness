from flask import render_template,url_for,flash,redirect
from main import app, db, bcrypt
from main.forms import RegistrationForm, LoginForm
from main.models import User

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/login", methods=["GET","POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == "admin@blog.com" and form.password.data == "password":
            flash("You have been logged in")
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
