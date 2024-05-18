from main import app, routes
from main.routes import s
app.run(port=8000, debug=True)
print(s.output)