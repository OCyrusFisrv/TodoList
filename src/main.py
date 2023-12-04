from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample in-memory storage for tasks (replace with database storage in a real application)
tasks = {
    "incomplete": [],
    "completed": []
}

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks/add", methods=["POST"])
def add_task():
    task_data = request.json
    new_task = {
        "description": task_data.get("description"),
        "status": "incomplete"
    }
    tasks["incomplete"].append(new_task)
    return jsonify(tasks)

# Similarly, create routes for editing, marking as done, deleting, and clearing tasks

if __name__ == "__main__":
    app.run(debug=True)
