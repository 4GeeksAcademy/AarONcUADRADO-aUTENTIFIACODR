from flask import request, jsonify, Blueprint
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Ruta para registrar usuarios
@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    email = body.get('email')
    password = body.get('password')

    # Verificar si faltan datos
    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    # Verificar si el usuario ya existe
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"message": "User already exists"}), 400

    # Crear el nuevo usuario y hashear la contraseña
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True)

    # Guardar en la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Ruta para iniciar sesión
@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    email = body.get('email')
    password = body.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    # Crear un token JWT
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token}), 200

# Ruta para acceder a una página privada (solo usuarios autenticados)
@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"message": f"Welcome {user.email}, this is a private route."}), 200
