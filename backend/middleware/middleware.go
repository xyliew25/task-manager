package middleware

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/xyliew25/task-manager/models"
)

var tasks []models.Task

func Init() {
	// Hardcoded data
	tasks = append(tasks, models.Task{Id: "1", Title: "Look for internships", Tag: "Work", IsDone: false})
	tasks = append(tasks, models.Task{Id: "2", Title: "Do research on some modules", Desc: "CS3230, CS3243, CS3244, CS2102.", IsDone: true})
	tasks = append(tasks, models.Task{Id: "3", Title: "Buy groceries", Desc: "Milk, bread, cereal, tomatoes, eggs.", Tag: "Lifestyle", IsDone: true})
	tasks = append(tasks, models.Task{Id: "4", Title: "Revise on previous modules", IsDone: false})
	tasks = append(tasks, models.Task{Id: "5", Title: "Hangout with friends", Tag: "Social", IsDone: true})
	tasks = append(tasks, models.Task{Id: "6", Title: "Prepare for exams", Desc: "Lecture notes, tutorial sheets, lab assignments.", IsDone: true})
	tasks = append(tasks, models.Task{Id: "7", Title: "Call mummy", Tag: "Family", IsDone: false})
	tasks = append(tasks, models.Task{Id: "8", Title: "Pack luggage", IsDone: true})
	tasks = append(tasks, models.Task{Id: "9", Title: "PRACTICE!!", Tag: "Music", IsDone: true})
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	json.NewEncoder(w).Encode(tasks)
}

func GetTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, task := range tasks {
		if task.Id == params["id"] {
			json.NewEncoder(w).Encode(task)
			return
		}
	}
	json.NewEncoder(w).Encode(&models.Task{})
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	var newTask models.Task
	newTask.Id = strconv.Itoa(rand.Intn(100000000))
	_ = json.NewDecoder(r.Body).Decode(&newTask)
	tasks = append(tasks, newTask)
	json.NewEncoder(w).Encode(tasks)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")

	if (*r).Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	for index, task := range tasks {
		if task.Id == params["id"] {
			var newTask models.Task
			_ = json.NewDecoder(r.Body).Decode(&newTask)
			newTask.Id = params["id"]
			tasks[index] = newTask
			break
		}
	}
	json.NewEncoder(w).Encode(tasks)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")

	if (*r).Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	for index, task := range tasks {
		if task.Id == params["id"] {
			tasks = append(tasks[:index], tasks[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(tasks)
}
