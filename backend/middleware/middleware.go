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
	tasks = append(tasks, models.Task{Id: "1", Title: "Study with friends", IsDone: false})
	tasks = append(tasks, models.Task{Id: "2", Title: "Buy groceries", IsDone: true})
	tasks = append(tasks, models.Task{Id: "3", Title: "Read textbook", IsDone: true})
	tasks = append(tasks, models.Task{Id: "4", Title: "Study with friends", IsDone: false})
	tasks = append(tasks, models.Task{Id: "5", Title: "Buy groceries", IsDone: true})
	tasks = append(tasks, models.Task{Id: "6", Title: "Read textbook", IsDone: true})
	tasks = append(tasks, models.Task{Id: "7", Title: "Study with friends", IsDone: false})
	tasks = append(tasks, models.Task{Id: "8", Title: "Buy groceries", IsDone: true})
	tasks = append(tasks, models.Task{Id: "9", Title: "Read textbook", IsDone: true})
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
	var task models.Task
	_ = json.NewDecoder(r.Body).Decode(&task)
	task.Id = strconv.Itoa(rand.Intn(100000000))
	tasks = append(tasks, task)
	json.NewEncoder(w).Encode(task)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	params := mux.Vars(r)
	for index, task := range tasks {
		if task.Id == params["id"] {
			var task models.Task
			_ = json.NewDecoder(r.Body).Decode(&task)
			task.Id = params["id"]
			tasks[index] = task
			json.NewEncoder(w).Encode(task)
			return
		}
	}
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	params := mux.Vars(r)
	for index, task := range tasks {
		if task.Id == params["id"] {
			tasks = append(tasks[:index], tasks[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(tasks)
}
