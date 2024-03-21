from flask import Flask, render_template, redirect, url_for, request, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure key in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'  # SQLite database
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Define Product model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

# Define Cart model
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

# Route for home page
@app.route('/')
def home():
    if 'user_id' in session:
        return render_template('home.html', logged_in=True)
    return render_template('home.html', logged_in=False)

# Route for registration page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html')

# Route for login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            return redirect(url_for('profile'))
        else:
            return render_template('login.html', error='Invalid username or password')
    return render_template('login.html')

# Route for profile page
@app.route('/profile')
def profile():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return render_template('profile.html', user=user)
    else:
        return redirect(url_for('login'))

# Route for logout
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('home'))

# Route for adding product to cart
@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'user_id' in session:
        cart_item = Cart(user_id=session['user_id'], product_id=product_id)
        db.session.add(cart_item)
        db.session.commit()
        return redirect(url_for('view_cart'))
    else:
        return redirect(url_for('login'))

# Route for viewing cart
@app.route('/view_cart')
def view_cart():
    if 'user_id' in session:
        user_id = session['user_id']
        cart_items = Cart.query.filter_by(user_id=user_id).all()
        return render_template('view_cart.html', cart_items=cart_items)
    else:
        return redirect(url_for('login'))

# Route for removing product from cart
@app.route('/remove_from_cart/<int:cart_id>')
def remove_from_cart(cart_id):
    cart_item = Cart.query.get_or_404(cart_id)
    db.session.delete(cart_item)
    db.session.commit()
    return redirect(url_for('view_cart'))

# Route for checkout
@app.route('/checkout')
def checkout():
    if 'user_id' in session:
        user_id = session['user_id']
        cart_items = Cart.query.filter_by(user_id=user_id).all()
        for cart_item in cart_items:
            db.session.delete(cart_item)
        db.session.commit()
        return render_template('checkout.html')
    else:
        return redirect(url_for('login'))


# Define route for individual product page
@app.route('/product/<int:product_id>')
def product(product_id):
    # Logic to fetch product details from database based on product_id
    products = [
        {"id": 1, "name": "Product 1", "description": "Description of Product 1", "price": 99.99},
        {"id": 2, "name": "Product 2", "description": "Description of Product 2", "price": 79.99},
        {"id": 3, "name": "Product 3", "description": "Description of Product 3", "price": 99.99},
        {"id": 4, "name": "Product 4", "description": "Description of Product 4", "price": 99.99},
        {"id": 5, "name": "Product 5", "description": "Description of Product 5", "price": 99.99},
        {"id": 6, "name": "Product 6", "description": "Description of Product 6", "price": 99.99},
        {"id": 7, "name": "Product 7", "description": "Description of Product 7", "price": 99.99},
        {"id": 8, "name": "Product 8", "description": "Description of Product 8", "price": 99.99},
        # Add more products here
    ]

    # Find the product with the specified product_id
    product = next((p for p in products if p["id"] == product_id), None)

    return render_template('product_details.html', product=product)

@app.route('/product/<int:product_id>')
def product_details(product_id):
    # Fetch the details of the selected product from the database
    product = {
        'id': product_id,
        'name': f'Product {product_id}',
        'description': f'Description of Product {product_id}',
        'price': 99.99  # Example price (replace with actual price fetched from the database)
    }
    # Render the product details page and pass the product details to the template
    return render_template('product_details.html', product=product)


@app.route('/best_products')
def best_products():
    # Logic to display best products page
    return render_template('best_products.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        # Process the form submission and send the message
        # You can access form data using request.form
        email = request.form.get('email')
        message = request.form.get('message')
        # Redirect the user to another page or render a template
        return render_template('message_sent.html')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)
