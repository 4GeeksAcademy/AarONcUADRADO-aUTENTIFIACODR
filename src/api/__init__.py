from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from api.models import db

# Inicializar Flask-Migrate
migrate = Migrate(app, db)


app = Flask(__name__)

# Configuración de la base de datos (ajústalo según la base de datos que uses)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Clave secreta para JWT (cámbiala por una más segura)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# Inicializar la base de datos
with app.app_context():
    db.create_all()

# Importar las rutas después de inicializar la app
from api import routes
