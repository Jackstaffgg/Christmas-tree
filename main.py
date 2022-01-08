from flask import Flask, render_template, request, make_response
import mimetypes
from tree_settings_db import SQlite
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__)
db = SQlite("database/settings.db")

@app.route("/", methods=["POST", "GET"])
def index():
    try:
        if request.method == "POST":
            data = request.form.to_dict()
            print(data)
            if data.get("is_snowy"): is_snowy = 1
            else: is_snowy = 0
            if data.get("is_lighting"): is_lighting = 1
            else: is_lighting = 0

            db.update_settings([data["tree_size"], data["balls_count"], is_snowy, is_lighting])
    except Exception:
        print("Something went wrong while reading request!")

    return render_template("index.html",
                           title="Christmas tree",
                           tree_size=db.get_param("tree_size"),
                           balls_count=db.get_param("balls_count"),
                           is_snowy=db.get_param("is_snowy"),
                           is_lighting=db.get_param("is_lighting"),
    )



if __name__ == "__main__":
    app.run(debug=True)