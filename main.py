from flask import Flask, render_template, request, make_response
import time
import mimetypes
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__)


@app.route("/")
def index():
    response = make_response(render_template("index.html", title="Christmas tree", tree_size="min", balls_count=5, is_snowy=1, is_lighting=1))
    response.headers["Content-Type"] = "text/html"
    return response



if __name__ == "__main__":
    app.run(debug=True)