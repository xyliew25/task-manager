package router

import (
	"github.com/gorilla/mux"
	"github.com/xyliew25/task-manager/middleware"
)

func Router() *mux.Router {
	// Initialize router
	r := mux.NewRouter()

	// Handle routes
	r.HandleFunc("/tasks", middleware.GetTasks).Methods("GET", "OPTIONS")
	r.HandleFunc("/tasks/{id}", middleware.GetTask).Methods("GET", "OPTIONS")
	r.HandleFunc("/create-task", middleware.CreateTask).Methods("POST", "OPTIONS")
	r.HandleFunc("/update-task/{id}", middleware.UpdateTask).Methods("PUT", "OPTIONS")
	r.HandleFunc("/delete-task/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")

	// Return router
	return r
}
